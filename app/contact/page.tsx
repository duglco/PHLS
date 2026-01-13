import Link from "next/link";

import EstimateForm from "@/components/EstimateForm";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Request a lawn care estimate from Pine Hills Lawn Services. Fast responses and flexible scheduling.",
  openGraph: {
    title: "Contact",
    description:
      "Request a lawn care estimate from Pine Hills Lawn Services. Fast responses and flexible scheduling."
  }
};

export default function ContactPage() {
  return (
    <div className="section-shell space-y-12 py-16">
      <section className="grid gap-10 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-700">
            Request an estimate
          </p>
          <h1 className="font-display text-4xl text-soil-900">
            Tell us about your property and we&apos;ll follow up quickly.
          </h1>
          <p className="text-base text-soil-700">
            Share a few details and we&apos;ll put together a plan that fits your
            lawn, schedule, and budget.
          </p>
          <div className="space-y-3 text-sm text-soil-700">
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              <a className="text-pine-700 hover:text-pine-600" href={siteConfig.phoneHref}>
                {siteConfig.phone}
              </a>
            </p>
            <p>
              <span className="font-semibold">Text:</span>{" "}
              <a className="text-pine-700 hover:text-pine-600" href={siteConfig.textHref}>
                Send a quick message
              </a>
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                className="text-pine-700 hover:text-pine-600"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
          <div className="rounded-3xl border border-soil-200 bg-pine-50 p-5 text-sm text-soil-700">
            <p className="font-semibold text-pine-700">Service Area</p>
            <p className="mt-2">{siteConfig.location}</p>
            <p className="mt-2 text-xs text-soil-500">
              Request details for HOA, rental, and small commercial properties.
            </p>
          </div>
        </div>
        <div className="rounded-[32px] border border-soil-200 bg-white p-6 shadow-card">
          <EstimateForm />
        </div>
      </section>

      <section className="rounded-[32px] bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-700">
              Trusted & Insured
            </p>
            <p className="text-base text-soil-700">
              We maintain liability coverage and follow safety-first service
              procedures. Ask us for details when we send your estimate.
            </p>
          </div>
          <Link
            href={siteConfig.phoneHref}
            className="button-base border border-pine-600 text-pine-700 hover:bg-pine-50"
          >
            Call now
          </Link>
        </div>
      </section>
    </div>
  );
}
