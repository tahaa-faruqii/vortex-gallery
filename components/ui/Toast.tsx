"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useFilteredImages";
import { useUiStore } from "@/store/uiStore";

export function Toasts() {
  const toasts = useUiStore((state) => state.toasts);
  const dismissToast = useUiStore((state) => state.dismissToast);
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[80] flex w-[min(92vw,380px)] -translate-x-1/2 flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            message={toast.message}
            tone={toast.tone}
            reduced={reduced}
            onDismiss={dismissToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({
  id,
  message,
  tone,
  reduced,
  onDismiss,
}: {
  id: string;
  message: string;
  tone?: "default" | "success" | "error";
  reduced: boolean;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(id), 2800);
    return () => window.clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <motion.div
      layout
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
      className={cn(
        "pointer-events-auto rounded-full border border-border bg-surface/90 px-4 py-3 text-center text-sm text-foreground shadow-lg backdrop-blur-xl",
        tone === "error" && "border-red-500/30 text-red-200",
      )}
      role="status"
    >
      {message}
    </motion.div>
  );
}
