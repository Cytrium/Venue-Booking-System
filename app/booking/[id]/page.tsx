import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { StatusBadge } from "@/components/ui/status-badge";
import { TIME_SLOTS } from "@/lib/schemas/booking";
import { Calendar, Clock, Users, Mail, User, Phone, PartyPopper, FileText, ArrowLeft, CheckCircle2 } from "lucide-react";

/**
 * Booking Confirmation Page — Shows booking details after submission.
 *
 * This is a SERVER component (no "use client") because:
 * - It fetches data from Supabase on the server (faster, more secure)
 * - No client-side interactivity needed
 * - The booking ID comes from the URL params
 */

// Generate page metadata dynamically
export async function generateMetadata() {
  return { title: "Booking Confirmation | RuangKita" };
}

export default async function BookingConfirmationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { id } = await params;
  const { token } = await searchParams;
  const tokenValue = Array.isArray(token) ? token[0] : token;

  if (!tokenValue) {
    notFound();
  }

  const supabase = await createClient();

  // Fetch confirmation-safe booking payload by id + public token
  const { data, error } = await supabase.rpc("get_booking_confirmation", {
    p_id: id,
    p_token: tokenValue,
  });

  const booking = Array.isArray(data) ? data[0] : null;

  // If booking not found, show 404
  if (error || !booking) {
    notFound();
  }

  // Find the readable time slot label
  const timeSlot = TIME_SLOTS.find((s) => s.value === booking.time_slot);
  const formattedDate = format(new Date(booking.date + "T00:00:00"), "EEEE, MMMM d, yyyy");

  return (
    <>
      {/* Header */}
      <section
        className="py-10 sm:py-16"
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-approved)]/20 text-[var(--color-approved)] mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h1
            className="text-2xl sm:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Booking Submitted!
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-md mx-auto">
            Your booking request has been received. Here are your details.
          </p>
        </div>
      </section>

      {/* Booking details card */}
      <section className="section">
        <div className="container mx-auto max-w-2xl">
          <div className="card p-5 sm:p-8 lg:p-10">
            {/* Status badge */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-6 border-b border-[var(--color-border)]">
              <div>
                <p className="text-xs text-[var(--color-text-light)] uppercase tracking-wider mb-1">
                  Booking Status
                </p>
                <StatusBadge status={booking.status} />
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--color-text-light)] uppercase tracking-wider mb-1">
                  Booking ID
                </p>
                <p className="text-sm font-mono text-[var(--color-text-muted)] break-all sm:break-normal">
                  {booking.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DetailItem icon={User} label="Full Name" value={booking.name} />
              <DetailItem icon={Mail} label="Email" value={booking.email} />
              {booking.phone && (
                <DetailItem icon={Phone} label="Phone" value={booking.phone} />
              )}
              <DetailItem icon={PartyPopper} label="Event Type" value={booking.event_type} />
              <DetailItem icon={Users} label="Guests" value={`${booking.guests} people`} />
              <DetailItem icon={Calendar} label="Date" value={formattedDate} />
              <DetailItem
                icon={Clock}
                label="Time Slot"
                value={timeSlot ? `${timeSlot.label} (${timeSlot.time})` : booking.time_slot}
              />
              {booking.notes && (
                <div className="sm:col-span-2">
                  <DetailItem icon={FileText} label="Notes" value={booking.notes} />
                </div>
              )}
            </div>

            {/* Status message */}
            <div className="mt-8 p-4 rounded-xl bg-[var(--color-bg-muted)] border border-[var(--color-border)]">
              {booking.status === "pending" && (
                <p className="text-sm text-[var(--color-text-muted)]">
                  Your booking is being reviewed by our venue team. You will receive
                  an email notification once it is approved or if we need additional
                  information.
                </p>
              )}
              {booking.status === "approved" && (
                <p className="text-sm text-[var(--color-approved)]">
                  Your booking has been approved. We look forward to hosting your
                  event and will contact you with final details.
                </p>
              )}
              {booking.status === "rejected" && (
                <p className="text-sm text-[var(--color-rejected)]">
                  Unfortunately, your booking could not be confirmed. Please contact
                  us for alternative dates or arrangements.
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/" className="btn btn-outline flex-1" id="conf-go-home">
                <ArrowLeft size={16} /> Back to Home
              </Link>
              <Link href="/book" className="btn btn-primary flex-1" id="conf-book-another">
                <Calendar size={16} /> Book Another Event
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Reusable detail item component */
function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[var(--color-accent)]">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs text-[var(--color-text-light)] uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-[var(--color-text)]">{value}</p>
      </div>
    </div>
  );
}
