"use client";

import { useState } from "react";
import Image from "next/image";

import gal1 from "@/lib/gallery/gal1.jpg";
import gal2 from "@/lib/gallery/gal2.jpg";
import gal3 from "@/lib/gallery/gal3.jpg";
import gal4 from "@/lib/gallery/gal4.jpg";
import gal5 from "@/lib/gallery/gal5.jpg";
import gal6 from "@/lib/gallery/gal6.jpg";

const galleryImages = [
  { src: gal1, alt: "Lawn care project 1" },
  { src: gal2, alt: "Lawn care project 2" },
  { src: gal3, alt: "Lawn care project 3" },
  { src: gal4, alt: "Lawn care project 4" },
  { src: gal5, alt: "Lawn care project 5" },
  { src: gal6, alt: "Lawn care project 6" }
] as const;

export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex !== null ? galleryImages[activeIndex] : null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <button
            key={image.alt}
            type="button"
            className="group overflow-hidden rounded-3xl border border-soil-200 bg-white shadow-sm"
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="h-64 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            />
          </button>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-10 right-0 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-soil-800"
              onClick={() => setActiveIndex(null)}
            >
              Close
            </button>
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              className="h-auto w-full rounded-3xl object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
