import { Loader2 } from "lucide-react";

/**
 * Reusable loading spinner with optional text.
 * Used for loading states throughout the app.
 */
export function LoadingSpinner({
  size = 24,
  text,
  className = "",
}: {
  size?: number;
  text?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 size={size} className="animate-spin text-[var(--color-accent)]" />
      {text && <p className="text-sm text-[var(--color-text-muted)]">{text}</p>}
    </div>
  );
}
