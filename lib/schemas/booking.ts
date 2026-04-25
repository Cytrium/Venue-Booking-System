import { z } from "zod";

/**
 * Zod validation schema for booking requests.
 *
 * WHY use Zod?
 * - Validates data on BOTH client and server (same schema)
 * - Gives clear, specific error messages
 * - Integrates with react-hook-form via @hookform/resolvers
 * - Type-safe — TypeScript types are auto-generated
 */

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),

  event_type: z
    .string()
    .min(1, "Please select an event type"),

  guests: z
    .number()
    .min(1, "Must have at least 1 guest")
    .max(500, "Maximum capacity is 500 guests"),

  date: z
    .string()
    .min(1, "Please select a date"),

  time_slot: z
    .string()
    .min(1, "Please select a time slot"),

  notes: z
    .string()
    .max(500, "Notes must be under 500 characters")
    .optional()
    .or(z.literal("")),
});

/** TypeScript type generated from the schema */
export type BookingFormData = z.infer<typeof bookingSchema>;

/** Available time slots */
export const TIME_SLOTS = [
  { value: "morning", label: "Morning", time: "9:00 AM – 12:00 PM" },
  { value: "afternoon", label: "Afternoon", time: "1:00 PM – 5:00 PM" },
  { value: "evening", label: "Evening", time: "6:00 PM – 10:00 PM" },
];

/** Available event types */
export const EVENT_TYPES = [
  "Wedding Reception",
  "Corporate Event",
  "Birthday Party",
  "Anniversary",
  "Gala Dinner",
  "Conference",
  "Cocktail Party",
  "Other",
];
