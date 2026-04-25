import { z } from "zod";

const venueTypeOptions = ["any", "wedding", "corporate", "party", "networking"] as const;
const priceRangeOptions = ["any", "budget", "standard", "premium", "luxury"] as const;

export const searchFiltersSchema = z.object({
  venueType: z.enum(venueTypeOptions),
  location: z
    .string()
    .trim()
    .max(80, "Location is too long")
    .refine((value) => value.length === 0 || value.length >= 2, {
      message: "Location must be at least 2 characters",
    }),
  date: z
    .string()
    .trim()
    .refine((value) => {
      if (!value) return true;
      const selectedDate = new Date(`${value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return Number.isFinite(selectedDate.getTime()) && selectedDate >= today;
    }, "Please choose today or a future date"),
  pax: z
    .string()
    .trim()
    .refine((value) => {
      if (!value) return true;
      const pax = Number(value);
      return Number.isInteger(pax) && pax > 0 && pax <= 5000;
    }, "Pax must be a whole number between 1 and 5000"),
  priceRange: z.enum(priceRangeOptions),
});

export type SearchFilters = z.infer<typeof searchFiltersSchema>;
