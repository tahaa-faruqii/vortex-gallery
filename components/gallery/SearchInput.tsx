"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Search visuals, artists, tags",
  className,
}: SearchInputProps) {
  return (
    <label
      className={cn(
        "relative flex h-11 w-full items-center rounded-full border border-border bg-background px-4",
        className,
      )}
    >
      <Search className="h-4 w-4 text-muted" aria-hidden="true" />
      <span className="sr-only">Search gallery</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-full w-full bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </label>
  );
}
