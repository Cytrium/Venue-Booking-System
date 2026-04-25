"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Global error boundary — catches unhandled errors in page components.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-rejected-bg)] text-[var(--color-rejected)] mb-4">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-bold text-[var(--color-primary)] mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button onClick={reset} className="btn btn-primary">
          Try Again
        </button>
      </div>
    </div>
  );
}
