
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  MapPin,
  Search,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-56px)] items-center justify-center overflow-hidden bg-background px-5 py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl text-center">
        {/* Icon */}
        <div className="relative mx-auto mb-8 flex size-20 items-center justify-center rounded-3xl border border-cyan-500/20 bg-cyan-500/10 shadow-lg shadow-cyan-500/5">
          <Compass className="size-10 text-cyan-600" />

          <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full border-4 border-background bg-red-500 text-xs font-bold text-white">
            !
          </span>
        </div>

        {/* 404 */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">
          Lost your way?
        </p>

        <h1 className="text-7xl font-black tracking-tighter sm:text-8xl md:text-9xl">
          <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
          Oops! Page not found
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
          Looks like this destination is off the map.
          The page you are looking for may have been moved,
          deleted, or never existed.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-600/20 transition-all hover:-translate-y-0.5 hover:bg-cyan-700"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <Link
            href="/destinations"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-semibold transition-all hover:-translate-y-0.5 hover:border-cyan-500/50 hover:bg-muted"
          >
            <MapPin className="size-4 text-cyan-600" />
            Explore Destinations
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Helpful link */}
        <div className="mt-12 border-t border-border pt-6">
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Search className="size-4" />
            Need help finding something?
            <Link
              href="/destinations"
              className="font-medium text-cyan-600 underline-offset-4 hover:underline"
            >
              Browse destinations
            </Link>
          </p>
        </div>

        <p className="mt-8 text-xs font-medium tracking-widest text-muted-foreground/70">
          WANDERLAST · KEEP EXPLORING
        </p>
      </div>
    </main>
  );
}
