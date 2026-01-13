import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Request Estimate" },
  { href: "/privacy", label: "Privacy" }
];

export default function Footer() {
  return (
    <footer className="border-t border-soil-200 bg-white">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1.4fr,1fr,1fr]">
        <div className="space-y-4">
          <p className="font-display text-xl text-soil-800">
            {siteConfig.name}
          </p>
          <p className="text-sm text-soil-600">{siteConfig.location}</p>
          <div className="space-y-2 text-sm text-soil-700">
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              <a className="hover:text-pine-700" href={siteConfig.phoneHref}>
                {siteConfig.phone}
              </a>
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a className="hover:text-pine-700" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
            <p>
              <span className="font-semibold">Hours:</span> {siteConfig.hours}
            </p>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-[0.2em] text-pine-700">
            Explore
          </p>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-pine-700" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 text-sm text-soil-600">
          <p className="font-semibold uppercase tracking-[0.2em] text-pine-700">
            Trusted & Insured
          </p>
          <p>
            We carry general liability coverage and follow local guidelines. Ask for
            details when requesting your estimate.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-soil-400">
            Crisp lines. Clean finish.
          </p>
        </div>
      </div>
      <div className="border-t border-soil-200 bg-soil-100 py-4 text-center text-xs text-soil-500">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
