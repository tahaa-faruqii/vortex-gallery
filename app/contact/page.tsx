import type { Metadata } from "next";
import { ContactForm } from "@/components/layout/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a quiet note. This form stays on your machine.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-accent uppercase">Company</p>
      <h1 className="mt-3 font-serif text-5xl">Contact</h1>
      <p className="mt-4 text-sm leading-6 text-muted">
        A quiet note is enough. This form stays on your machine.
      </p>
      <ContactForm />
    </div>
  );
}
