import Link from "next/link";

import GalleryGrid from "@/components/GalleryGrid";

export const metadata = {
  title: "Gallery",
  description:
    "Browse recent Pine Hills Lawn Services projects showcasing crisp mowing and clean edges.",
  openGraph: {
    title: "Gallery",
    description:
      "Browse recent Pine Hills Lawn Services projects showcasing crisp mowing and clean edges."
  }
};

export default function GalleryPage() {
  return (
    <div className="section-shell space-y-10 py-16">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-700">
          Gallery
        </p>
        <h1 className="font-display text-4xl text-soil-900">
          Lawn care results you can see.
        </h1>
        <p className="max-w-2xl text-base text-soil-700">
          Fresh stripes, trimmed edges, and tidy beds from recent properties. We
          treat every yard like it&apos;s our own.
        </p>
      </div>

      <GalleryGrid />

      <div className="rounded-[32px] bg-pine-600 px-6 py-10 text-white md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-100">
              Ready to upgrade your lawn?
            </p>
            <h2 className="font-display text-2xl">Let&apos;s build your plan.</h2>
          </div>
          <Link
            href="/contact"
            className="button-base bg-white text-pine-700 shadow-glow hover:bg-pine-50"
          >
            Request Estimate
          </Link>
        </div>
      </div>
    </div>
  );
}
