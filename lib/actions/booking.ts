"use server";

import { createClient } from "@/lib/supabase/server";
import { bookingSchema, type BookingFormData } from "@/lib/schemas/booking";

/**
 * Server Action: Create a new booking.
 *
 * WHY server actions?
 * - Code runs on the server, so database credentials stay safe
 * - We can validate again on the server (never trust client-only validation)
 * - Next.js App Router makes calling them as easy as a function call
 *
 * Flow:
 * 1. Validate the data with Zod
 * 2. Check if the date+slot is already booked
 * 3. Insert into Supabase
 * 4. Return the new booking ID (for the confirmation page)
 */
export async function createBooking(formData: BookingFormData) {
  // Step 1: Validate on the server (defense in depth)
  const parsed = bookingSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;

  // Step 2: Prevent booking in the past
  const selectedDate = new Date(data.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    return { error: "Cannot book a date in the past" };
  }

  const supabase = await createClient();
  // Step 3: Insert booking and rely on DB partial unique index
  // (date, time_slot) where status in ('pending','approved')
  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      event_type: data.event_type,
      guests: data.guests,
      date: data.date,
      time_slot: data.time_slot,
      notes: data.notes || null,
      status: "pending",
    })
    .select("id, public_token")
    .single();

  if (error) {
    // Unique index conflict when slot is already taken
    if (error.code === "23505") {
      return { error: "This time slot was just booked. Please choose another." };
    }
    console.error("Booking insert error:", error);
    return { error: "Failed to create booking. Please try again." };
  }

  if (!booking?.public_token) {
    return { error: "Failed to generate confirmation token. Please try again." };
  }

  return { id: booking.id, public_token: booking.public_token };
}

/**
 * Server Action: Get booked slots for a specific date.
 *
 * Used by the booking form to disable already-taken time slots.
 * Only counts bookings that are NOT rejected.
 */
export async function getBookedSlots(date: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_booked_slots_public", {
    p_date: date,
  });

  if (error) {
    console.error("Error fetching booked slots:", error);
    return [];
  }

  return (data ?? []).map((row: { time_slot: string }) => row.time_slot);
}
