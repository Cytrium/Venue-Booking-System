"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CheckCircle2, Clock3, Send, XCircle } from "lucide-react";

type AvailabilityBookingProps = {
  venueId: string;
  venueTitle: string;
};

const TIME_SLOTS = [
  { id: "morning", label: "Morning", time: "09:00 - 13:00" },
  { id: "afternoon", label: "Afternoon", time: "14:00 - 18:00" },
  { id: "evening", label: "Evening", time: "19:00 - 23:00" },
];

function getSlotStatus(venueId: string, date: string, slotId: string) {
  if (!date) return "idle" as const;
  const day = new Date(`${date}T00:00:00`).getDate();
  const venueSeed = venueId.charCodeAt(venueId.length - 1);
  const slotSeed = slotId.charCodeAt(0);
  const hash = (day + venueSeed + slotSeed) % 4;
  return hash === 0 ? ("booked" as const) : ("available" as const);
}

export function AvailabilityBooking({ venueId, venueTitle }: AvailabilityBookingProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const status = useMemo(
    () => getSlotStatus(venueId, selectedDate, selectedSlot),
    [selectedDate, selectedSlot, venueId],
  );

  const canRequest = selectedDate !== "" && selectedSlot !== "" && status === "available";

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="venue-date" className="label">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} /> Select Date
          </span>
        </label>
        <input
          id="venue-date"
          type="date"
          className="input"
          value={selectedDate}
          onChange={(event) => {
            setSelectedDate(event.target.value);
            setSelectedSlot("");
          }}
        />
      </div>

      <div>
        <p className="label mb-2">
          <span className="flex items-center gap-1.5">
            <Clock3 size={14} /> Select Time Slot
          </span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TIME_SLOTS.map((slot) => {
            const slotStatus = getSlotStatus(venueId, selectedDate, slot.id);
            const selected = selectedSlot === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  slotStatus === "booked"
                    ? "border-[rgba(186,26,26,0.2)] bg-[var(--color-rejected-bg)]"
                    : selected
                      ? "border-[var(--color-primary)] bg-[var(--color-approved-bg)]"
                      : "border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/50"
                }`}
                onClick={() => setSelectedSlot(slot.id)}
              >
                <p className="font-semibold text-sm text-[var(--color-text)]">{slot.label}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{slot.time}</p>
                {slotStatus === "available" && (
                  <p className="mt-2 text-xs font-semibold text-[var(--color-approved)]">
                    Available ✅
                  </p>
                )}
                {slotStatus === "booked" && (
                  <p className="mt-2 text-xs font-semibold text-[var(--color-rejected)]">
                    Already booked ❌
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-4">
        {!selectedDate && <p className="text-sm text-[var(--color-text-muted)]">Choose a date first.</p>}
        {selectedDate && !selectedSlot && (
          <p className="text-sm text-[var(--color-text-muted)]">Select a time slot to check status.</p>
        )}
        {selectedDate && selectedSlot && status === "available" && (
          <p className="text-sm text-[var(--color-approved)] flex items-center gap-1.5">
            <CheckCircle2 size={15} /> Slot is available for {venueTitle}.
          </p>
        )}
        {selectedDate && selectedSlot && status === "booked" && (
          <p className="text-sm text-[var(--color-rejected)] flex items-center gap-1.5">
            <XCircle size={15} /> This slot is already booked. Please choose another slot.
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!canRequest}
        className="btn btn-primary w-full"
        onClick={() => {
          if (!canRequest) return;
          router.push(`/book?venue=${encodeURIComponent(venueTitle)}&date=${selectedDate}&slot=${selectedSlot}`);
        }}
      >
        <Send size={15} />
        Request Booking
      </button>
    </div>
  );
}
