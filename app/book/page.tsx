import { BookingForm } from "@/components/booking/booking-form";
import { Calendar } from "lucide-react";

/**
 * Booking Page — Where users submit their venue booking request.
 * Uses the BookingForm client component for interactivity.
 */
export default function BookPage() {
  return (
    <>
      {/* Page header */}
      <section
        className="py-10 sm:py-16"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-[var(--color-accent)] mb-4">
            <Calendar size={28} />
          </div>
          <h1
            className="text-2xl sm:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Book Your Event
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-md mx-auto">
            Fill out the form below and our events team will review your request
            within 24 hours.
          </p>
        </div>
      </section>

      {/* Booking form */}
      <section className="section">
        <div className="container mx-auto max-w-2xl">
          <div className="card p-5 sm:p-8 lg:p-10">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
