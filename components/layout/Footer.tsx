import Link from "next/link";
import { Aperture } from "lucide-react";
import { APP_NAME } from "@/data/constants";

const PRODUCT_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/categories", label: "Categories" },
  { href: "/favorites", label: "Favorites" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://x.com", label: "Twitter / X" },
  { href: "https://pinterest.com", label: "Pinterest" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface/40">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2">
            <Aperture className="h-5 w-5 text-accent" aria-hidden="true" />
            <span className="font-serif text-2xl">{APP_NAME}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            A curated visual discovery space for photography, art, and quiet
            cinematic landscapes.
          </p>
        </div>
        <FooterColumn title="Product" links={PRODUCT_LINKS} />
        <FooterColumn title="Company" links={COMPANY_LINKS} />
        <FooterColumn title="Social" links={SOCIAL_LINKS} external />
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted sm:px-6">
          © 2026 Vortex Gallery. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  external = false,
}: {
  title: string;
  links: { href: string; label: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <h2 className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
        {title}
      </h2>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            {external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-foreground/80 transition hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-foreground/80 transition hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
