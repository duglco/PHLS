import Image from "next/image";
import Link from "next/link";

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

const galleryImages = [
  "/gallery-1.svg",
  "/gallery-2.svg",
  "/gallery-3.svg",
  "/gallery-4.svg",
  "/gallery-5.svg",
  "/gallery-6.svg"
];

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
          Fresh stripes, trimmed edges, and tidy beds from recent Pine Hills
          properties. We treat every yard like it&apos;s our own.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((src) => (
          <div
            key={src}
            className="overflow-hidden rounded-3xl border border-soil-200 bg-white shadow-sm"
          >
            <Image
              src={src}
              alt="Lawn care example"
              width={480}
              height={360}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

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
