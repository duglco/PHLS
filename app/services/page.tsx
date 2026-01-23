import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site";
import servicesHero from "@/lib/gallery/gal4.jpg";

export const metadata = {
  title: "Services",
  description:
    "Explore Pine Hills Lawn Services offerings including mowing, edging, trimming, and seasonal treatments.",
  openGraph: {
    title: "Services",
    description:
      "Explore Pine Hills Lawn Services offerings including mowing, edging, trimming, and seasonal treatments."
  }
};

const serviceDetails = [
  {
    title: "Lawn mowing",
    description: "Weekly and bi-weekly mowing with consistent striping and cleanup."
  },
  {
    title: "Edging & trimming",
    description: "Defined borders around beds, walkways, and driveways."
  },
  {
    title: "Mulching",
    description: "Fresh mulch installs that protect plants and boost curb appeal."
  },
  {
    title: "Hedge & bush trimming",
    description: "Clean shaping and health-focused trims for hedges and shrubs."
  },
  {
    title: "Seasonal cleanups",
    description: "Spring and fall refreshes with debris removal and bed care."
  },
  {
    title: "Fertilizer & spray treatments",
    description: "Targeted weed control and fertilization to keep turf vibrant."
  },
  {
    title: "Leaf cleanup",
    description: "Full removal, bagging, and haul-away for tidy landscapes."
  },
  {
    title: "Aeration (optional)",
    description: "Core aeration to improve soil health and root growth."
  }
];

export default function ServicesPage() {
  return (
    <div className="section-shell space-y-16 py-16">
      <section className="grid gap-10 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-700">
            Services
          </p>
          <h1 className="font-display text-4xl text-soil-900">
            Full-service lawn care.
          </h1>
          <p className="text-base text-soil-700">
            We build plans around your property so your lawn stays healthy and
            sharp without extra work on your end.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="button-base bg-pine-600 text-white shadow-glow hover:bg-pine-700"
            >
              Request Estimate
            </Link>
            <Link
              href={siteConfig.phoneHref}
              className="button-base border border-pine-600 text-pine-700 hover:bg-pine-50"
            >
              Call {siteConfig.phone}
            </Link>
          </div>
        </div>
        <div className="rounded-[32px] border border-soil-200 bg-white p-4 shadow-card">
          <Image
            src={servicesHero}
            alt="Crew trimming hedges"
            className="rounded-[24px] object-cover"
            sizes="(min-width: 1024px) 420px, 90vw"
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {serviceDetails.map((service) => (
          <article
            key={service.title}
            className="rounded-3xl border border-soil-200 bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-xl text-soil-900">
              {service.title}
            </h2>
            <p className="mt-2 text-sm text-soil-600">{service.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[32px] border border-soil-200 bg-pine-50 p-8 md:p-10">
        <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] md:items-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-700">
              Service Area
            </p>
            <h2 className="font-display text-2xl text-soil-900">
              {siteConfig.location}
            </h2>
            <p className="text-sm text-soil-700">
              We work with homeowners, rentals, and small commercial properties
              throughout Pine Hills.
            </p>
          </div>
          <Link
            href="/contact"
            className="button-base w-full bg-pine-600 text-white shadow-glow hover:bg-pine-700"
          >
            Build my service plan
          </Link>
        </div>
      </section>
    </div>
  );
}
