"use client";

import { useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { StatusBadge } from "@/components/ui/status-badge";
import { updateBookingStatus, deleteBooking } from "@/lib/actions/admin";
import { TIME_SLOTS } from "@/lib/schemas/booking";
import { Check, X, Trash2, Loader2, Search, Filter, Eye, ChevronDown, ChevronUp } from "lucide-react";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  event_type: string;
  guests: number;
  date: string;
  time_slot: string;
  notes: string | null;
  status: string;
  created_at: string;
}

interface BookingsTableProps {
  initialBookings: Booking[];
}

/**
 * BookingsTable — Interactive table for managing bookings.
 *
 * Features:
 * - Search by name or email
 * - Filter by status
 * - Approve / Reject / Delete actions
 * - Expandable rows for full details on mobile
 * - Optimistic UI updates
 */
export function BookingsTable({ initialBookings }: BookingsTableProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter bookings by search and status
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      search === "" ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle approve/reject
  async function handleStatusUpdate(id: string, status: "approved" | "rejected") {
    setLoadingId(id);
    try {
      const result = await updateBookingStatus(id, status);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      // Optimistic update
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
      toast.success(`Booking ${status}!`);
    } catch {
      toast.error("Failed to update booking");
    } finally {
      setLoadingId(null);
    }
  }

  // Handle delete
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    setLoadingId(id);
    try {
      const result = await deleteBooking(id);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast.success("Booking deleted");
    } catch {
      toast.error("Failed to delete booking");
    } finally {
      setLoadingId(null);
    }
  }

  function getSlotLabel(value: string) {
    const slot = TIME_SLOTS.find((s) => s.value === value);
    return slot ? `${slot.label} (${slot.time})` : value;
  }

  return (
    <div>
      {/* Search and Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
            id="admin-search"
          />
        </div>

        {/* Status filter */}
        <div className="relative w-full sm:w-auto">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input w-full pl-10 pr-8 sm:w-48"
            id="admin-filter"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[var(--color-text-muted)] mb-4">
        Showing {filtered.length} of {bookings.length} bookings
      </p>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-[var(--color-text-muted)]">No bookings found.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden lg:block card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--color-bg-muted)] border-b border-[var(--color-border)]">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Guest</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Event</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Date & Time</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Guests</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Status</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-[var(--color-border-light)] hover:bg-[var(--color-bg-muted)]/50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <p className="font-medium text-sm text-[var(--color-text)]">{booking.name}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">{booking.email}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-[var(--color-text)]">{booking.event_type}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-[var(--color-text)]">
                          {format(new Date(booking.date + "T00:00:00"), "MMM d, yyyy")}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {getSlotLabel(booking.time_slot)}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-[var(--color-text)]">{booking.guests}</p>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {loadingId === booking.id ? (
                            <Loader2 size={16} className="animate-spin text-[var(--color-text-muted)]" />
                          ) : (
                            <>
                              {booking.status === "pending" && (
                                <>
                                  <button
                                    onClick={() => handleStatusUpdate(booking.id, "approved")}
                                    className="btn btn-success btn-sm"
                                    title="Approve"
                                  >
                                    <Check size={14} /> Approve
                                  </button>
                                  <button
                                    onClick={() => handleStatusUpdate(booking.id, "rejected")}
                                    className="btn btn-danger btn-sm"
                                    title="Reject"
                                  >
                                    <X size={14} /> Reject
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => handleDelete(booking.id)}
                                className="btn btn-outline btn-sm text-[var(--color-rejected)]"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-4">
            {filtered.map((booking) => (
              <div key={booking.id} className="card p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                  <div>
                    <p className="font-semibold text-sm">{booking.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{booking.email}</p>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-[var(--color-text-light)]">Event: </span>
                    <span className="font-medium">{booking.event_type}</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-text-light)]">Guests: </span>
                    <span className="font-medium">{booking.guests}</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-text-light)]">Date: </span>
                    <span className="font-medium">{format(new Date(booking.date + "T00:00:00"), "MMM d, yyyy")}</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-text-light)]">Time: </span>
                    <span className="font-medium">{TIME_SLOTS.find(s => s.value === booking.time_slot)?.label || booking.time_slot}</span>
                  </div>
                </div>

                {/* Expand for notes */}
                {booking.notes && (
                  <button
                    onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
                    className="text-xs text-[var(--color-accent)] flex items-center gap-1 mb-3"
                  >
                    <Eye size={12} /> {expandedId === booking.id ? "Hide" : "Show"} Notes
                    {expandedId === booking.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                )}
                {expandedId === booking.id && booking.notes && (
                  <p className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-muted)] p-3 rounded-lg mb-3">
                    {booking.notes}
                  </p>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {loadingId === booking.id ? (
                    <Loader2 size={16} className="animate-spin text-[var(--color-text-muted)]" />
                  ) : (
                    <>
                      {booking.status === "pending" && (
                        <>
                          <button onClick={() => handleStatusUpdate(booking.id, "approved")} className="btn btn-success btn-sm grow sm:flex-1">
                            <Check size={14} /> Approve
                          </button>
                          <button onClick={() => handleStatusUpdate(booking.id, "rejected")} className="btn btn-danger btn-sm grow sm:flex-1">
                            <X size={14} /> Reject
                          </button>
                        </>
                      )}
                      <button onClick={() => handleDelete(booking.id)} className="btn btn-outline btn-sm shrink-0">
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
