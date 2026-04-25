"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { format, addDays } from "date-fns";
import { Loader2, Calendar, Clock, Users, Mail, User, Phone, FileText, PartyPopper } from "lucide-react";
import { bookingSchema, type BookingFormData, TIME_SLOTS, EVENT_TYPES } from "@/lib/schemas/booking";
import { createBooking, getBookedSlots } from "@/lib/actions/booking";

/**
 * BookingForm — The core component for submitting venue bookings.
 *
 * Features:
 * - react-hook-form for efficient form state management
 * - Zod validation for type-safe, declarative validation
 * - Dynamic time slot availability (fetched when date changes)
 * - Loading states and toast notifications
 * - Redirects to confirmation page on success
 */
export function BookingForm() {
  const router = useRouter();
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      event_type: "",
      guests: 50,
      date: "",
      time_slot: "",
      notes: "",
    },
  });

  // Watch the date field to fetch available slots when it changes
  const selectedDate = watch("date");
  const selectedSlot = watch("time_slot");

  // Minimum date = tomorrow (can't book today or past)
  const minDate = format(addDays(new Date(), 1), "yyyy-MM-dd");
  // Maximum date = 1 year from now
  const maxDate = format(addDays(new Date(), 365), "yyyy-MM-dd");

  // Fetch booked slots whenever the selected date changes
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }

    async function fetchSlots() {
      setLoadingSlots(true);
      try {
        const slots = await getBookedSlots(selectedDate);
        setBookedSlots(slots);
        // If the currently selected slot is now unavailable, clear it
        if (slots.includes(selectedSlot)) {
          setValue("time_slot", "");
        }
      } catch {
        toast.error("Failed to check availability");
      } finally {
        setLoadingSlots(false);
      }
    }

    fetchSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  // Form submission handler
  async function onSubmit(data: BookingFormData) {
    setSubmitting(true);
    try {
      const result = await createBooking(data);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (!result.public_token) {
        toast.error("Missing confirmation token. Please contact support.");
        return;
      }

      toast.success("Booking submitted successfully!");
      const token = encodeURIComponent(result.public_token);
      router.push(`/booking/${result.id}?token=${token}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="booking-form">
      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="label">
            <span className="flex items-center gap-1.5"><User size={14} /> Full Name *</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Smith"
            className={`input ${errors.name ? "input-error" : ""}`}
            {...register("name")}
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="label">
            <span className="flex items-center gap-1.5"><Mail size={14} /> Email Address *</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            className={`input ${errors.email ? "input-error" : ""}`}
            {...register("email")}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
      </div>

      {/* Row 2: Phone + Event Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="label">
            <span className="flex items-center gap-1.5"><Phone size={14} /> Phone (optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+60 12-345 6789"
            className={`input ${errors.phone ? "input-error" : ""}`}
            {...register("phone")}
          />
          {errors.phone && <p className="error-text">{errors.phone.message}</p>}
        </div>

        {/* Event Type */}
        <div>
          <label htmlFor="event_type" className="label">
            <span className="flex items-center gap-1.5"><PartyPopper size={14} /> Event Type *</span>
          </label>
          <select
            id="event_type"
            className={`input ${errors.event_type ? "input-error" : ""}`}
            {...register("event_type")}
          >
            <option value="">Select event type...</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.event_type && <p className="error-text">{errors.event_type.message}</p>}
        </div>
      </div>

      {/* Row 3: Guests + Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Guests */}
        <div>
          <label htmlFor="guests" className="label">
            <span className="flex items-center gap-1.5"><Users size={14} /> Number of Guests *</span>
          </label>
          <input
            id="guests"
            type="number"
            min={1}
            max={500}
            placeholder="50"
            className={`input ${errors.guests ? "input-error" : ""}`}
            {...register("guests", { valueAsNumber: true })}
          />
          {errors.guests && <p className="error-text">{errors.guests.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="label">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> Event Date *</span>
          </label>
          <input
            id="date"
            type="date"
            min={minDate}
            max={maxDate}
            className={`input ${errors.date ? "input-error" : ""}`}
            {...register("date")}
          />
          {errors.date && <p className="error-text">{errors.date.message}</p>}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div>
        <label className="label">
          <span className="flex items-center gap-1.5"><Clock size={14} /> Time Slot *</span>
        </label>

        {!selectedDate ? (
          <p className="text-sm text-[var(--color-text-light)] italic">Please select a date first to see available time slots.</p>
        ) : loadingSlots ? (
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <Loader2 size={16} className="animate-spin" /> Checking availability...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TIME_SLOTS.map((slot) => {
              const isBooked = bookedSlots.includes(slot.value);
              const isSelected = selectedSlot === slot.value;
              return (
                <button
                  key={slot.value}
                  type="button"
                  disabled={isBooked}
                  onClick={() => setValue("time_slot", slot.value, { shouldValidate: true })}
                  id={`slot-${slot.value}`}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    isBooked
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
                      : isSelected
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5 shadow-md"
                        : "border-[var(--color-border)] bg-white hover:border-[var(--color-accent)]/50 hover:shadow-sm cursor-pointer"
                  }`}
                >
                  <p className={`font-semibold text-sm ${isBooked ? "text-gray-400" : isSelected ? "text-[var(--color-accent-dark)]" : "text-[var(--color-text)]"}`}>
                    {slot.label}
                  </p>
                  <p className={`text-xs mt-1 ${isBooked ? "text-gray-400" : "text-[var(--color-text-muted)]"}`}>
                    {slot.time}
                  </p>
                  {isBooked && <p className="text-xs text-[var(--color-rejected)] mt-1 font-medium">Unavailable</p>}
                </button>
              );
            })}
          </div>
        )}
        {errors.time_slot && <p className="error-text">{errors.time_slot.message}</p>}
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="label">
          <span className="flex items-center gap-1.5"><FileText size={14} /> Additional Notes (optional)</span>
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Any special requirements, setup preferences, dietary needs..."
          className={`input resize-none ${errors.notes ? "input-error" : ""}`}
          {...register("notes")}
        />
        {errors.notes && <p className="error-text">{errors.notes.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary btn-lg w-full"
        id="booking-submit"
      >
        {submitting ? (
          <><Loader2 size={18} className="animate-spin" /> Submitting...</>
        ) : (
          <><Calendar size={18} /> Submit Booking Request</>
        )}
      </button>

      <p className="text-xs text-center text-[var(--color-text-light)]">
        Your booking will be reviewed by our team. You&apos;ll receive a confirmation email once approved.
      </p>
    </form>
  );
}
