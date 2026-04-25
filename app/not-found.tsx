import Link from "next/link";
import { Home, Search } from "lucide-react";

/**
 * 404 Not Found page — shown when a page doesn't exist.
 */
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold text-[var(--color-accent)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          404
        </p>
        <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Page Not Found
        </h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary">
            <Home size={16} /> Back to Home
          </Link>
          <Link href="/book" className="btn btn-outline">
            <Search size={16} /> Book a Venue
          </Link>
        </div>
      </div>
    </div>
  );
}
