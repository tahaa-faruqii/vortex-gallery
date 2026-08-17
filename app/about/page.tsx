import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "A local, browser-first space for looking at images.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-accent uppercase">Company</p>
      <h1 className="mt-3 font-serif text-5xl">About Vortex</h1>
      <div className="mt-8 space-y-5 text-sm leading-7 text-muted">
        <p>
          Vortex Gallery is a local, browser-first space for looking. It is not
          a social network and it does not ask for an account. Images live in
          the client, favorites stay on the device, and the interface is built
          to get out of the way.
        </p>
        <p>
          The project is a study in restraint: dark rooms, generous type,
          masonry rhythm, and interactions that feel physical without becoming
          theatrical.
        </p>
        <p>
          Everything you save, sort, and revisit is stored locally. Refresh the
          page and the collection you made is still yours.
        </p>
      </div>
    </div>
  );
}
