import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-soil-200 bg-soil-100/80 backdrop-blur">
      <div className="section-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-white">
            <Image
              src="/PHLSmower.png"
              alt="Pine Hills Lawn Services logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </div>
          <div>
            <p className="font-display text-[19px] text-pine-800">
              {siteConfig.name}
            </p>
            <p className="text-[15px] uppercase tracking-[0.2em] text-pine-700">
              Lawn Care
            </p>
            <p className="text-[15px] font-semibold uppercase tracking-[0.22em] text-pine-800">
              Veteran Owned and Operated
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-[17px] font-semibold text-soil-700 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-pine-700"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="button-base bg-pine-600 text-[17px] text-white shadow-glow hover:bg-pine-700"
          >
            Request Estimate
          </Link>
        </nav>
      </div>
      <div className="section-shell pb-4">
        <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-black">
          <span>Licensed crew</span>
          <span aria-hidden="true">•</span>
          <span>Weekly or bi-weekly plans</span>
          <span aria-hidden="true">•</span>
          <span>Same-day callbacks</span>
        </p>
      </div>
    </header>
  );
}
