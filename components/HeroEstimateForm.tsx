"use client";

import { useState, type FormEvent } from "react";

import { leadSchema, serviceOptions } from "@/lib/leadSchema";
import type { LeadPayload } from "@/lib/leadSchema";
import { logEvent } from "@/lib/analytics";

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
  serviceType: [] as (typeof serviceOptions)[number][]
};

type FormErrors = Partial<Record<keyof LeadPayload, string>>;

export default function HeroEstimateForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  function updateField<K extends keyof typeof initialForm>(
    key: K,
    value: (typeof initialForm)[K]
  ) {
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

  function updateNotes(value: string) {
    const words = value.trim().split(/\s+/).filter(Boolean);
    if (words.length <= 1000) {
      updateField("notes", value);
      return;
    }
    const trimmed = words.slice(0, 1000).join(" ");
    updateField("notes", trimmed);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const payload: LeadPayload = {
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      address: form.address,
      serviceType: form.serviceType,
      yardSize: "medium",
      preferredContact: form.email ? "email" : "call",
      notes: form.notes
    };

    const result = leadSchema.safeParse(payload);
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

      setStatus("success");
      setForm(initialForm);
      logEvent({ name: "hero_estimate_submitted" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div className="rounded-[32px] border border-soil-200 bg-white/95 p-6 shadow-card backdrop-blur">
      <div className="space-y-2">
        <p className="text-[15px] font-semibold uppercase tracking-[0.3em] text-pine-700">
          Quick Estimate
        </p>
        <h3 className="font-display text-[27px] text-soil-900">
          Get pricing fast.
        </h3>
        <p className="text-[17px] text-soil-600">
          Share the basics and we&apos;ll follow up with a tailored quote.
        </p>
      </div>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-[5px]">
          <label className="text-[15px] font-semibold uppercase tracking-[0.2em] text-soil-600">
            <span className="mb-[1px] block">Full name</span>
            <input
              className="input-base mt-0 text-[17px]"
              name="fullName"
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              required
            />
            {errors.fullName && (
              <span className="mt-1 block text-xs text-red-600">
                {errors.fullName}
              </span>
            )}
          </label>
          <div className="mt-[10px]">
            <label className="text-[15px] font-semibold uppercase tracking-[0.2em] text-soil-600">
              <span className="mb-[1px] block">Phone</span>
              <input
                className="input-base mt-0 text-[17px]"
                name="phone"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                required
              />
              {errors.phone && (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.phone}
                </span>
              )}
            </label>
          </div>
          <div className="mt-[10px]">
            <label className="text-[15px] font-semibold uppercase tracking-[0.2em] text-soil-600">
              <span className="mb-[1px] block">Email</span>
              <input
                className="input-base mt-0 text-[17px]"
                name="email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                autoComplete="email"
              />
              {errors.email && (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.email}
                </span>
              )}
            </label>
          </div>
          <div className="mt-[10px]">
            <label className="text-[15px] font-semibold uppercase tracking-[0.2em] text-soil-600">
              <span className="mb-[1px] block">Service address</span>
              <input
                className="input-base mt-0 text-[17px]"
                name="address"
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
                required
              />
              {errors.address && (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.address}
                </span>
              )}
            </label>
          </div>
          <div className="mt-[10px]">
            <label className="text-[15px] font-semibold uppercase tracking-[0.2em] text-soil-600">
              <span className="mb-[1px] block">Comments</span>
              <textarea
                className="input-base mt-0 min-h-[110px] text-[17px]"
                name="notes"
                value={form.notes}
                onChange={(event) => updateNotes(event.target.value)}
                placeholder="Tell us about gates, pets, or timing."
              />
              {errors.notes && (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.notes}
                </span>
              )}
            </label>
          </div>
        </div>
        <fieldset className="space-y-2">
          <legend className="mb-[1px] text-[15px] font-semibold uppercase tracking-[0.2em] text-soil-600">
            SERVICE(S) NEEDED
          </legend>
          <div className="grid gap-2 text-[15px] text-soil-700 sm:grid-cols-2">
            {serviceOptions.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 accent-pine-700"
                  checked={form.serviceType.includes(option)}
                  onChange={() => toggleService(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.serviceType && (
            <span className="text-xs text-red-600">{errors.serviceType}</span>
          )}
        </fieldset>
        <button
          type="submit"
          className="button-base w-full bg-pine-700 text-[17px] text-white shadow-glow hover:bg-pine-800 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Request Estimate"}
        </button>
        {status === "success" && (
          <p className="text-xs font-semibold text-pine-700">
            Thanks! We&apos;ll be in touch soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs font-semibold text-red-600">
            Something went wrong. Please call or text us directly.
          </p>
        )}
      </form>
    </div>
  );
}
