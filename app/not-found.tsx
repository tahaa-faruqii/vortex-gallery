import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-xs tracking-[0.2em] text-accent uppercase">404</p>
      <h1 className="mt-3 font-serif text-5xl">This room is empty</h1>
      <p className="mt-4 text-sm text-muted">
        The page you were looking for is not in the archive.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-fg"
      >
        Return home
      </Link>
    </div>
  );
}
