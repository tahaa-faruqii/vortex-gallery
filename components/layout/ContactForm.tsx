"use client";

import { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useUiStore } from "@/store/uiStore";

export function ContactForm() {
  const addToast = useUiStore((state) => state.addToast);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addToast("Message noted locally — this demo does not send mail");
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-4">
      <label className="block">
        <span className="text-xs tracking-[0.16em] text-muted uppercase">
          Name
        </span>
        <input
          required
          name="name"
          className="mt-2 h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>
      <label className="block">
        <span className="text-xs tracking-[0.16em] text-muted uppercase">
          Email
        </span>
        <input
          required
          type="email"
          name="email"
          className="mt-2 h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>
      <label className="block">
        <span className="text-xs tracking-[0.16em] text-muted uppercase">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={5}
          className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>
      <Button type="submit">Send note</Button>
    </form>
  );
}
