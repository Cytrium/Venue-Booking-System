import { LoadingSpinner } from "@/components/ui/loading-spinner";

/**
 * Admin dashboard loading state.
 */
export default function AdminLoading() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="h-8 w-48 rounded-lg animate-shimmer mb-2" />
        <div className="h-4 w-64 rounded animate-shimmer" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card p-6">
            <div className="w-10 h-10 rounded-xl animate-shimmer mb-3" />
            <div className="h-8 w-16 rounded animate-shimmer mb-2" />
            <div className="h-4 w-24 rounded animate-shimmer" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="card p-6">
        <LoadingSpinner size={24} text="Loading bookings..." className="py-12" />
      </div>
    </div>
  );
}
