"use client";

import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg hover:opacity-90 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
  secondary:
    "bg-foreground/5 text-foreground hover:bg-foreground/10 border border-border",
  ghost: "bg-transparent text-foreground hover:bg-foreground/8",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-foreground/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & { href: string };

export const Button = forwardRef<HTMLButtonElement, ButtonAsButton | ButtonAsLink>(
  function Button(
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) {
    const classes = cn(baseClass, variants[variant], sizes[size], className);

    if ("href" in props && props.href) {
      return (
        <Link href={props.href} className={classes}>
          {children}
        </Link>
      );
    }

    const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref}
        type={buttonProps.type ?? "button"}
        className={classes}
        {...buttonProps}
      >
        {children}
      </button>
    );
  },
);
