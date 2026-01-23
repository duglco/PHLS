import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site";
import HeroEstimateForm from "@/components/HeroEstimateForm";
import RecentWorkGallery from "@/components/RecentWorkGallery";

const faqs = [
  {
    question: "How often should my lawn be mowed?",
    answer:
      "Most Pine Hills lawns thrive on weekly service during peak growth and bi-weekly once growth slows."
  },
  {
    question: "Do you haul away clippings and debris?",
    answer:
      "We mulch clippings when possible and remove debris for cleanups, mulching, and hedge trimming."
  },
  {
    question: "Can you treat weeds and fertilize?",
    answer:
      "Yes. We offer seasonal fertilizer and targeted spray treatments tailored to your turf."
  },
  {
    question: "Is aeration worth it?",
    answer:
      "Aeration helps relieve compacted soil and improves nutrient absorption. We recommend it yearly or as needed."
  }
];

export const metadata = {
  title: "Lawn care that feels effortless",
  description:
    "Pine Hills Lawn Services delivers crisp mowing, clean edges, and reliable seasonal care. Request a fast estimate today.",
  openGraph: {
    title: "Lawn care that feels effortless",
    description:
      "Pine Hills Lawn Services delivers crisp mowing, clean edges, and reliable seasonal care. Request a fast estimate today."
  }
};

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[url('/grassbg1.jpg')] bg-cover bg-center">
        <div className="section-shell relative z-10 grid items-center gap-10 py-16 md:grid-cols-[1.1fr,0.9fr] md:py-24">
          <div className="space-y-6">
            <p className="text-[21px] font-semibold uppercase tracking-[0.35em] text-soil-900">
              {siteConfig.location}
            </p>
            <h1 className="font-display text-4xl text-soil-900 md:text-5xl">
              Sharp lines, healthy lawns, and a yard you&apos;re proud of.
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="button-base bg-white text-[17px] text-soil-800 shadow-glow hover:bg-soil-100"
              >
                Request Estimate
              </Link>
              <Link
                href={siteConfig.phoneHref}
                className="button-base bg-pine-200 text-[17px] text-pine-900 shadow-glow hover:bg-pine-300"
              >
                Call {siteConfig.phone}
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-10 top-10 hidden h-48 w-48 rounded-full bg-pine-200/60 blur-3xl md:block" />
            <HeroEstimateForm />
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mb-8">
          <p className="max-w-3xl text-[21px] font-semibold text-black">
            CANE BAY Lawn Services keeps your property looking crisp with
            dependable mowing, edging, and seasonal treatments. Fast responses,
            clean finishes, and care you can see.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <a
            href="https://www.facebook.com/p/Pine-Hills-Lawn-Services-LLC-100090711670064/"
            className="group flex flex-col gap-6 rounded-3xl border border-soil-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card"
          >
            <div className="flex items-center gap-4">
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={56}
                height={56}
                className="h-14 w-14"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-700">
                  Facebook
                </p>
                <h2 className="font-display text-2xl text-soil-900">
                  See our latest reviews.
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-500 text-xl">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={`fb-star-${index}`} aria-hidden="true">
                  ★
                </span>
              ))}
              <span className="font-semibold text-amber-500">
                5
              </span>
            </div>
            <p className="text-sm text-soil-600">
              “Prompt responses and reliable mowing. The yard has never looked
              better.”
            </p>
          </a>
          <a
            href="https://www.google.com/search?client=firefox-b-1-d&hs=BHp9&sca_esv=8d3b04ba9c2ae8a2&sxsrf=ANbL-n4nH1BhTu0tiex317QlnuMnu1WdtA:1768342410505&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQA0E41TF8WeLJg7oRzMHW-uQWQubbknpf_Y3UKTU-gmDGNO5YyWoT7X3QR2eCP-WbI-CXcOuGpKtyddjnOs8Yg0nnQ0tLEbZ_Fb0bH_ZJXLzqj1FA%3D%3D&q=Pine+Hills+Lawn+Services,+LLC+Reviews&sa=X&ved=2ahUKEwjdtODpxImSAxXul2oFHXutOYcQ0bkNegQIJhAC&biw=2560&bih=1297&dpr=1&aic=0"
            className="group flex flex-col gap-6 rounded-3xl border border-soil-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card"
          >
            <div className="flex items-center gap-4">
              <Image
                src="/google.svg"
                alt="Google"
                width={56}
                height={56}
                className="h-14 w-14"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-700">
                  Google
                </p>
                <h2 className="font-display text-2xl text-soil-900">
                  Top-rated lawn care.
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-500 text-xl">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={`google-star-${index}`} aria-hidden="true">
                  ★
                </span>
              ))}
              <span className="font-semibold text-amber-500">
                5
              </span>
            </div>
            <p className="text-sm text-soil-600">
              “Crisp edges, clean finish, and very easy to schedule.”
            </p>
          </a>
        </div>
      </section>

      <section className="bg-white">
        <div className="section-shell grid gap-10 py-16 md:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-700">
              Trusted & Insured
            </p>
            <h2 className="font-display text-3xl text-soil-900">
              Professional crews with coverage you can ask about.
            </h2>
            <p className="text-base text-soil-700">
              We carry general liability insurance and follow local safety
              guidelines. Share your property details and we&apos;ll outline the
              right plan before we begin.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-soil-600">
              <span>Uniformed team</span>
              <span>Equipment maintained weekly</span>
              <span>Clear communication</span>
            </div>
          </div>
          <div className="rounded-[32px] border border-soil-200 bg-pine-50 p-6 shadow-card">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-pine-700">
                Service Area
              </p>
              <h3 className="font-display text-2xl text-soil-900">
                Pine Hills and nearby neighborhoods.
              </h3>
              <p className="text-sm text-soil-600">{siteConfig.location}</p>
              <ul className="space-y-2 text-sm text-soil-700">
                <li>• Residential homes and rentals</li>
                <li>• Small commercial properties</li>
                <li>• HOA and community spaces</li>
              </ul>
              <Link
                href="/contact"
                className="button-base w-full bg-pine-600 text-white shadow-glow hover:bg-pine-700"
              >
                Get a custom quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-8 md:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-700">
              Recent Work
            </p>
            <h2 className="font-display text-3xl text-soil-900">
              See the crisp edges and clean finishes.
            </h2>
            <p className="text-base text-soil-700">
              Browse real projects from Pine Hills properties to see the detail
              we bring to every service.
            </p>
            <Link
              href="/gallery"
              className="button-base border border-pine-600 text-pine-700 hover:bg-pine-50"
            >
              View the gallery
            </Link>
          </div>
          <RecentWorkGallery />
        </div>
      </section>

      <section className="bg-white">
        <div className="section-shell grid gap-10 py-16 md:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-700">
              FAQ
            </p>
            <h2 className="font-display text-3xl text-soil-900">
              Lawn care questions, answered.
            </h2>
            <p className="text-base text-soil-700">
              We&apos;re happy to walk you through our process. Here are a few quick
              answers to common questions.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-3xl border border-soil-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-semibold text-soil-800">
                  {faq.question}
                </p>
                <p className="mt-2 text-sm text-soil-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="rounded-[32px] bg-pine-600 px-6 py-12 text-white md:px-12">
          <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] md:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine-100">
                Ready for a cleaner lawn?
              </p>
              <h2 className="font-display text-3xl">Request your estimate today.</h2>
              <p className="text-base text-pine-100">
                We respond quickly with a custom plan, pricing, and availability.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="button-base bg-white text-pine-700 shadow-glow hover:bg-pine-50"
              >
                Request Estimate
              </Link>
              <Link
                href={siteConfig.phoneHref}
                className="button-base border border-white text-white hover:bg-pine-700"
              >
                Call {siteConfig.phone}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
