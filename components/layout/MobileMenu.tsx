"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/components/layout/navLinks";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useFilteredImages";
import { useUiStore } from "@/store/uiStore";

export function MobileMenu() {
  const open = useUiStore((state) => state.mobileMenuOpen);
  const setOpen = useUiStore((state) => state.setMobileMenuOpen);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[65] md:hidden">
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.nav
            initial={reduced ? { opacity: 0 } : { x: "100%" }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="absolute top-0 right-0 flex h-full w-[min(84vw,360px)] flex-col border-l border-border bg-background p-6"
            aria-label="Mobile"
          >
            <div className="mb-8 flex items-center justify-between">
              <p className="font-serif text-2xl">Menu</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-lg",
                      active
                        ? "bg-foreground text-background"
                        : "text-foreground hover:bg-foreground/5",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  useUiStore.getState().setSettingsOpen(true);
                }}
                className="mt-4 rounded-2xl px-4 py-3 text-left text-lg text-foreground hover:bg-foreground/5"
              >
                Settings
              </button>
            </div>
          </motion.nav>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
