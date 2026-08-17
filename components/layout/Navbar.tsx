"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, Menu, Moon, Search, Settings, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/components/layout/navLinks";
import { APP_NAME } from "@/data/constants";
import { cn } from "@/lib/cn";
import { useFavoritesStore } from "@/store/favoritesStore";
import { usePreferencesStore } from "@/store/preferencesStore";
import { useUiStore } from "@/store/uiStore";

export function Navbar() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const theme = usePreferencesStore((state) => state.theme);
  const hydrated = usePreferencesStore((state) => state.hydrated);
  const toggleTheme = usePreferencesStore((state) => state.toggleTheme);
  const setSearchOpen = useUiStore((state) => state.setSearchOpen);
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen);
  const setSettingsOpen = useUiStore((state) => state.setSettingsOpen);
  const favoriteCount = useFavoritesStore((state) => state.favoriteIds.length);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[padding,background-color,backdrop-filter] duration-300",
        compact
          ? "border-border bg-background/80 py-2 backdrop-blur-xl"
          : "border-transparent bg-transparent py-4",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Aperture className="h-5 w-5 text-accent" aria-hidden="true" />
          <span className="font-serif text-xl tracking-tight">{APP_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition",
                  active
                    ? "bg-foreground/8 text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {link.label}
                {link.href === "/favorites" && favoriteCount > 0 ? (
                  <span className="ml-2 text-xs text-accent">{favoriteCount}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-foreground/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-foreground/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {hydrated && theme === "light" ? (
              <Moon className="h-4 w-4 transition-transform duration-300" />
            ) : (
              <Sun className="h-4 w-4 transition-transform duration-300" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-foreground/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:flex"
            aria-label="Open settings"
          >
            <Settings className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-foreground/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
