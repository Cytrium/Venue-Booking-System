"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Server Action: Get all bookings for the admin dashboard.
 * Only callable from the server (admin must be authenticated via middleware).
 */
export async function getAllBookings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  return data;
}

/**
 * Server Action: Get aggregate booking statistics.
 * Returns counts for total, pending, approved, and rejected bookings.
 */
export async function getBookingStats() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("bookings").select("status");

  if (error) {
    console.error("Error fetching stats:", error);
    return { total: 0, pending: 0, approved: 0, rejected: 0 };
  }

  return {
    total: data.length,
    pending: data.filter((b) => b.status === "pending").length,
    approved: data.filter((b) => b.status === "approved").length,
    rejected: data.filter((b) => b.status === "rejected").length,
  };
}

/**
 * Server Action: Update a booking's status (approve or reject).
 *
 * @param id - The booking UUID
 * @param status - The new status ("approved" or "rejected")
 */
export async function updateBookingStatus(
  id: string,
  status: "approved" | "rejected"
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating booking:", error);
    return { error: "Failed to update booking status" };
  }

  return { success: true };
}

/**
 * Server Action: Delete a booking.
 *
 * @param id - The booking UUID
 */
export async function deleteBooking(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error("Error deleting booking:", error);
    return { error: "Failed to delete booking" };
  }

  return { success: true };
}
