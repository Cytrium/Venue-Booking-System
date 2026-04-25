import { getAllBookings, getBookingStats } from "@/lib/actions/admin";
import { StatsCards } from "@/components/admin/stats-cards";
import { BookingsTable } from "@/components/admin/bookings-table";
import { LayoutDashboard } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [bookings, stats] = await Promise.all([
    getAllBookings(),
    getBookingStats(),
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-approved-bg)] text-[var(--color-primary)]">
            <LayoutDashboard size={18} />
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text)]">
            Dashboard Overview
          </h2>
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">
          Monitor booking volume, review pending requests, and process decisions.
        </p>
      </div>

      <div className="mb-8">
        <StatsCards stats={stats} />
      </div>

      <div>
        <h3 className="text-lg font-bold text-[var(--color-text)] mb-4">
          Recent Booking Requests
        </h3>
        <BookingsTable initialBookings={bookings} />
      </div>
    </div>
  );
}
