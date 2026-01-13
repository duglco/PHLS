"use client";

import { useMemo, useState, type FormEvent } from "react";

import { leadSchema, serviceOptions, yardSizes, contactPreferences } from "@/lib/leadSchema";
import type { LeadPayload } from "@/lib/leadSchema";
import { logEvent } from "@/lib/analytics";

const initialForm: LeadPayload = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  serviceType: [],
  yardSize: "medium",
  preferredContact: "call",
  notes: ""
};

type FormErrors = Partial<Record<keyof LeadPayload, string>>;

export default function EstimateForm() {
  const [form, setForm] = useState<LeadPayload>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [leadId, setLeadId] = useState<string | null>(null);

  const hasSelectedService = useMemo(
    () => form.serviceType.length > 0,
    [form.serviceType]
  );

  function updateField<K extends keyof LeadPayload>(key: K, value: LeadPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleService(value: (typeof serviceOptions)[number]) {
    setForm((prev) => {
      const selected = prev.serviceType.includes(value)
        ? prev.serviceType.filter((item) => item !== value)
        : [...prev.serviceType, value];
      return { ...prev, serviceType: selected };
    });
    setErrors((prev) => ({ ...prev, serviceType: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const nextErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LeadPayload | undefined;
        if (field) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const payload = (await response.json()) as { leadId?: string };
      setLeadId(payload.leadId ?? null);
      setStatus("success");
      setForm(initialForm);
      logEvent({ name: "estimate_submitted" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit}
      aria-live="polite"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-soil-700">
          Full name
          <input
            className="input-base mt-2"
            name="fullName"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            autoComplete="name"
            required
          />
          {errors.fullName && (
            <span className="mt-1 block text-xs text-red-600">
              {errors.fullName}
            </span>
          )}
        </label>
        <label className="text-sm font-semibold text-soil-700">
          Phone
          <input
            className="input-base mt-2"
            name="phone"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            autoComplete="tel"
            required
          />
          {errors.phone && (
            <span className="mt-1 block text-xs text-red-600">{errors.phone}</span>
          )}
        </label>
        <label className="text-sm font-semibold text-soil-700">
          Email
          <input
            className="input-base mt-2"
            name="email"
            type="email"
            value={form.email ?? ""}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
          />
          {errors.email && (
            <span className="mt-1 block text-xs text-red-600">{errors.email}</span>
          )}
        </label>
        <label className="text-sm font-semibold text-soil-700">
          Service address
          <input
            className="input-base mt-2"
            name="address"
            value={form.address}
            onChange={(event) => updateField("address", event.target.value)}
            autoComplete="street-address"
            required
          />
          {errors.address && (
            <span className="mt-1 block text-xs text-red-600">
              {errors.address}
            </span>
          )}
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-soil-700">
          Service type (select all that apply)
        </legend>
        <div className="grid gap-3 md:grid-cols-2">
          {serviceOptions.map((service) => (
            <label
              key={service}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                form.serviceType.includes(service)
                  ? "border-pine-600 bg-pine-50 text-pine-800"
                  : "border-soil-200 bg-white text-soil-700"
              }`}
            >
              <span>{service}</span>
              <input
                type="checkbox"
                className="h-4 w-4 accent-pine-600"
                checked={form.serviceType.includes(service)}
                onChange={() => toggleService(service)}
              />
            </label>
          ))}
        </div>
        {!hasSelectedService && errors.serviceType && (
          <span className="text-xs text-red-600">{errors.serviceType}</span>
        )}
      </fieldset>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-soil-700">
          Yard size
          <select
            className="input-base mt-2"
            name="yardSize"
            value={form.yardSize}
            onChange={(event) =>
              updateField("yardSize", event.target.value as LeadPayload["yardSize"])
            }
          >
            {yardSizes.map((size) => (
              <option key={size} value={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-soil-700">
          Preferred contact
          <select
            className="input-base mt-2"
            name="preferredContact"
            value={form.preferredContact}
            onChange={(event) =>
              updateField(
                "preferredContact",
                event.target.value as LeadPayload["preferredContact"]
              )
            }
          >
            {contactPreferences.map((pref) => (
              <option key={pref} value={pref}>
                {pref.charAt(0).toUpperCase() + pref.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="text-sm font-semibold text-soil-700">
        Notes
        <textarea
          className="input-base mt-2 min-h-[120px]"
          name="notes"
          value={form.notes ?? ""}
          onChange={(event) => updateField("notes", event.target.value)}
          placeholder="Tell us about gates, pets, or timing."
        />
        {errors.notes && (
          <span className="mt-1 block text-xs text-red-600">{errors.notes}</span>
        )}
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="button-base bg-pine-600 text-white shadow-glow hover:bg-pine-700 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Request Estimate"}
        </button>
        {status === "success" && (
          <p className="text-sm font-semibold text-pine-700">
            Thanks! We&apos;ll be in touch soon. Lead ID: {leadId}
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-semibold text-red-600">
            Something went wrong. Please call or text us directly.
          </p>
        )}
      </div>
    </form>
  );
}
