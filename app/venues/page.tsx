"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, ListFilter, MapPin, Search, Star, Users, Wallet } from "lucide-react";
import { venueCatalog, type PriceRange, type VenueRecord } from "@/lib/data/venues";
import { searchFiltersSchema, type SearchFilters } from "@/lib/schemas/search-filters";
import { formatMYR } from "@/lib/utils/currency";
import styles from "./venues.module.css";

const defaultFilters: SearchFilters = {
  venueType: "any",
  location: "",
  date: "",
  pax: "",
  priceRange: "any",
};

function inPriceRange(rate: number, range: PriceRange) {
  if (range === "budget") return rate < 700;
  if (range === "standard") return rate >= 700 && rate <= 1200;
  if (range === "premium") return rate > 1200 && rate <= 1800;
  if (range === "luxury") return rate > 1800;
  return true;
}

function matchVenue(filters: SearchFilters, venue: VenueRecord) {
  const typeMatch = filters.venueType === "any" || filters.venueType === venue.venueType;
  const locationMatch =
    filters.location.trim().length === 0 ||
    venue.location.toLowerCase().includes(filters.location.trim().toLowerCase()) ||
    venue.city.toLowerCase().includes(filters.location.trim().toLowerCase());
  const paxValue = Number(filters.pax);
  const paxMatch = Number.isNaN(paxValue) || filters.pax.trim() === "" || venue.pax >= paxValue;
  const priceMatch = inPriceRange(venue.hourlyRate, filters.priceRange);
  const dateMatch = filters.date.trim() === "" || venue.availableDates.includes(filters.date);
  return typeMatch && locationMatch && paxMatch && priceMatch && dateMatch;
}

export default function VenuesPage() {
  const [draft, setDraft] = useState<SearchFilters>(defaultFilters);
  const [applied, setApplied] = useState<SearchFilters>(defaultFilters);
  const [errors, setErrors] = useState<Partial<Record<keyof SearchFilters, string>>>({});
  const [sortBy, setSortBy] = useState<"rating" | "price-asc" | "price-desc">("rating");

  const filtered = useMemo(
    () =>
      venueCatalog
        .filter((venue) => matchVenue(applied, venue))
        .sort((a, b) => {
          if (sortBy === "price-asc") return a.hourlyRate - b.hourlyRate;
          if (sortBy === "price-desc") return b.hourlyRate - a.hourlyRate;
          return b.rating - a.rating;
        }),
    [applied, sortBy],
  );

  function applyFilters(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = searchFiltersSchema.safeParse(draft);
    if (!result.success) {
      const nextErrors: Partial<Record<keyof SearchFilters, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof SearchFilters | undefined;
        if (field && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setDraft(result.data);
    setApplied(result.data);
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Venue Listing</p>
          <h1 className={styles.title}>Explore curated spaces across Malaysia</h1>
          <p className={styles.subtitle}>
            Browse, filter, and compare verified event spaces with transparent MYR pricing.
          </p>
        </div>
      </section>

      <section className={styles.filtersWrap}>
        <div className={styles.filtersInner}>
          <form onSubmit={applyFilters} className={styles.filtersForm} noValidate>
            <label className={styles.field}>
              <span>Venue Type</span>
              <select
                value={draft.venueType}
                onChange={(event) => {
                  setDraft((prev) => ({ ...prev, venueType: event.target.value as SearchFilters["venueType"] }));
                  setErrors((prev) => ({ ...prev, venueType: undefined }));
                }}
              >
                <option value="any">Any venue type</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate</option>
                <option value="party">Party</option>
                <option value="networking">Networking</option>
              </select>
              {errors.venueType && <small>{errors.venueType}</small>}
            </label>

            <label className={styles.field}>
              <span>Location</span>
              <input
                value={draft.location}
                onChange={(event) => {
                  setDraft((prev) => ({ ...prev, location: event.target.value }));
                  setErrors((prev) => ({ ...prev, location: undefined }));
                }}
                placeholder="City or area"
              />
              {errors.location && <small>{errors.location}</small>}
            </label>

            <label className={styles.field}>
              <span>Date</span>
              <input
                type="date"
                value={draft.date}
                onChange={(event) => {
                  setDraft((prev) => ({ ...prev, date: event.target.value }));
                  setErrors((prev) => ({ ...prev, date: undefined }));
                }}
              />
              {errors.date && <small>{errors.date}</small>}
            </label>

            <label className={styles.field}>
              <span>Pax</span>
              <input
                type="number"
                min={1}
                value={draft.pax}
                onChange={(event) => {
                  setDraft((prev) => ({ ...prev, pax: event.target.value }));
                  setErrors((prev) => ({ ...prev, pax: undefined }));
                }}
                placeholder="Guests"
              />
              {errors.pax && <small>{errors.pax}</small>}
            </label>

            <label className={styles.field}>
              <span>Price Range</span>
              <select
                value={draft.priceRange}
                onChange={(event) => {
                  setDraft((prev) => ({ ...prev, priceRange: event.target.value as PriceRange }));
                  setErrors((prev) => ({ ...prev, priceRange: undefined }));
                }}
              >
                <option value="any">Any budget</option>
                <option value="budget">Under MYR 700/hr</option>
                <option value="standard">MYR 700-1,200/hr</option>
                <option value="premium">MYR 1,201-1,800/hr</option>
                <option value="luxury">Above MYR 1,800/hr</option>
              </select>
              {errors.priceRange && <small>{errors.priceRange}</small>}
            </label>

            <button type="submit" className={styles.searchBtn}>
              <Search size={16} />
              Apply Filters
            </button>
          </form>

          <div className={styles.resultsBar}>
            <p>
              Showing <strong>{filtered.length}</strong> venues
            </p>
            <label className={styles.sortControl}>
              <ListFilter size={15} />
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as "rating" | "price-asc" | "price-desc")
                }
              >
                <option value="rating">Top rated</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No venues match your filters yet. Adjust your criteria and try again.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((venue) => (
                <article key={venue.id} className={styles.card}>
                  <img src={venue.image} alt={venue.title} className={styles.cardImage} />
                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <span className={styles.badge}>{venue.category}</span>
                      <span className={styles.rating}>
                        <Star size={13} fill="#005bbf" />
                        {venue.rating.toFixed(1)}
                      </span>
                    </div>
                    <h2>{venue.title}</h2>
                    <p className={styles.description}>{venue.description}</p>
                    <div className={styles.meta}>
                      <span>
                        <MapPin size={14} />
                        {venue.location}
                      </span>
                      <span>
                        <Users size={14} />
                        {venue.pax} pax
                      </span>
                    </div>
                    <div className={styles.footer}>
                      <p>
                        <Wallet size={14} />
                        {formatMYR(venue.hourlyRate)}/hr
                      </p>
                      <div className={styles.actions}>
                        <Link href={`/venues/${venue.id}#booking`}>Book</Link>
                        <Link href={`/venues/${venue.id}`}>Details</Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.bottomCta}>
        <div className={styles.bottomCard}>
          <div>
            <h3>Need help choosing a venue?</h3>
            <p>
              Send a booking request and our team will recommend the most suitable spaces based on
              your event goals.
            </p>
          </div>
          <div className={styles.bottomActions}>
            <Link href="/book" className={styles.primaryLink}>
              Submit Request
            </Link>
            <Link href="/how-it-works" className={styles.secondaryLink}>
              <CalendarDays size={15} />
              How it works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
