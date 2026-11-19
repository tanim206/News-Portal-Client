import Link from "next/link";
import { ArrowLeft, Home, Newspaper } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-16">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Newspaper size={32} strokeWidth={1.8} />
        </div>

        <h1 className="text-8xl font-black tracking-tighter text-primary sm:text-9xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          Sorry, the page you are looking for doesn't exist, has been moved, or
          is temporarily unavailable.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/90 sm:w-auto"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
          >
            <ArrowLeft size={17} />
            Return to Homepage
          </Link>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-6">
          <p className="text-xs font-bold tracking-wide text-gray-400">
            NEWS PORTAL
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Stay informed. Stay connected.
          </p>
        </div>
      </div>
    </main>
  );
}
