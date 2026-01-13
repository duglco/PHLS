import { siteConfig } from "@/lib/site";

export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-soil-200 bg-white shadow-card md:hidden">
      <div className="grid grid-cols-3 text-xs font-semibold uppercase tracking-[0.2em] text-soil-700">
        <a
          className="flex flex-col items-center justify-center gap-1 py-3"
          href={siteConfig.phoneHref}
        >
          Call
          <span className="text-[11px] font-normal tracking-normal">
            {siteConfig.phone}
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center gap-1 border-x border-soil-200 py-3"
          href={siteConfig.textHref}
        >
          Text
          <span className="text-[11px] font-normal tracking-normal">Fast reply</span>
        </a>
        <a
          className="flex flex-col items-center justify-center gap-1 py-3"
          href="/contact"
        >
          Estimate
          <span className="text-[11px] font-normal tracking-normal">Free quote</span>
        </a>
      </div>
    </div>
  );
}
