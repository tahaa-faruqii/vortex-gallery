import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-background/50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
