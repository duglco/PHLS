"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";

import edges1 from "@/lib/gallery/edges1.jpg";
import edges2 from "@/lib/gallery/edges2.jpg";
import edges3 from "@/lib/gallery/edges3.jpg";
import edges4 from "@/lib/gallery/edges4.jpg";

const galleryImages: StaticImageData[] = [edges1, edges2, edges3, edges4];

export default function RecentWorkGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {galleryImages.map((src, index) => (
          <button
            key={src.src}
            type="button"
            className="overflow-hidden rounded-lg border border-soil-200 bg-white shadow-sm"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open lawn care project ${index + 1}`}
          >
            <div className="relative aspect-square">
              <Image
                src={src}
                alt={`Lawn care project ${index + 1}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 90vw"
              />
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-soil-900/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Lawn care project preview"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-soil-700 shadow"
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="relative aspect-square w-full">
              <Image
                src={galleryImages[activeIndex]}
                alt={`Lawn care project ${activeIndex + 1}`}
                fill
                className="object-cover"
                sizes="90vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
