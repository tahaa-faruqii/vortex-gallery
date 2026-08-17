"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  href?: string;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  href,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface/40 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-muted">
        {icon}
      </div>
      <h3 className="font-serif text-3xl text-foreground">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted">{description}</p>
      {href && actionLabel ? (
        <Button href={href} className="mt-7">
          {actionLabel}
        </Button>
      ) : null}
      {!href && actionLabel && onAction ? (
        <Button className="mt-7" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
      {!href && !onAction && actionLabel ? (
        <Link href="/explore" className="mt-7 text-sm text-accent">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
