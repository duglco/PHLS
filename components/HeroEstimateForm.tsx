"use client";

import { useState, type FormEvent } from "react";

import { leadSchema, serviceOptions } from "@/lib/leadSchema";
import type { LeadPayload } from "@/lib/leadSchema";
import { logEvent } from "@/lib/analytics";

const initialForm = {
  fullName: "",
  phone: "",
  address: "",
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const payload: LeadPayload = {
      fullName: form.fullName,
      phone: form.phone,
      email: "",
      address: form.address,
      serviceType: form.serviceType,
      yardSize: "medium",
      preferredContact: "call",
      notes: ""
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
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-700">
          Quick Estimate
        </p>
        <h3 className="font-display text-2xl text-soil-900">
          Get pricing fast.
        </h3>
        <p className="text-sm text-soil-600">
          Share the basics and we&apos;ll follow up with a tailored quote.
        </p>
      </div>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-soil-600">
          Full name
          <input
            className="input-base mt-2"
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
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-soil-600">
          Phone
          <input
            className="input-base mt-2"
            name="phone"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            required
          />
          {errors.phone && (
            <span className="mt-1 block text-xs text-red-600">{errors.phone}</span>
          )}
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-soil-600">
          Service address
          <input
            className="input-base mt-2"
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
        <fieldset className="space-y-2">
          <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-soil-600">
            Service needed
          </legend>
          <div className="grid gap-2 text-xs text-soil-700 sm:grid-cols-2">
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
          className="button-base w-full bg-pine-700 text-white shadow-glow hover:bg-pine-800 disabled:cursor-not-allowed disabled:opacity-70"
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
