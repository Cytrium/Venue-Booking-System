export type VenueType = "wedding" | "corporate" | "party" | "networking";
export type PriceRange = "any" | "budget" | "standard" | "premium" | "luxury";

export type VenueRecord = {
  id: string;
  image: string;
  title: string;
  category: string;
  location: string;
  city: string;
  description: string;
  venueType: VenueType;
  hourlyRate: number;
  pax: number;
  rating: number;
  reviews: number;
  isNew: boolean;
  availableDates: string[];
};

export type DestinationSuggestion = {
  name: string;
  country: string;
  caption: string;
};

export type CategoryRecord = {
  title: string;
  description: string;
  image: string;
};

export type HowItWorksStep = {
  title: string;
  description: string;
};

export const destinationSuggestions: DestinationSuggestion[] = [
  {
    name: "Kuala Lumpur",
    country: "Malaysia",
    caption: "For skyline weddings and luxury ballrooms",
  },
  {
    name: "Penang",
    country: "Malaysia",
    caption: "For waterfront events and heritage charm",
  },
  {
    name: "Johor Bahru",
    country: "Malaysia",
    caption: "For corporate launches and private dinners",
  },
  {
    name: "Malacca",
    country: "Malaysia",
    caption: "For cultural venues and boutique celebrations",
  },
  {
    name: "Shah Alam",
    country: "Malaysia",
    caption: "For spacious convention and wedding halls",
  },
];

export const popularCategories: CategoryRecord[] = [
  {
    title: "Weddings",
    description: "Stunning estates, ballrooms, and garden spaces.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5wuM0xf-sCnXl3ZfXprwZhq4jurYfddGvcDMWuGhwwlnMwxb21TmvP-JA4KChhDJqbFGQgy4HXjIrzL-1-DfWQdUHr8rqfzRUAl5LAECDz_HJl7PbL9m_oVweqIt6xvmaFVAOTBI8REuxYcN64HnpUykurhQTYPwlza0Fhf2O3v91MDL65QP7pCMLAZ2LX95uNAEB0z67reEaIWPZUlt-qtozEMQMuqy8nwo4x1101hNuV6c5T_DkrRClKUHHV7FuEyjXGADosYU",
  },
  {
    title: "Corporate",
    description: "Productive meeting rooms and conferences.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIqHDlZWSoRarcUQKHMmnGksabdm3dZ_MjG5EheT6pItxtBYc8f4sZZq5JmSNCdThEOUAddYs-QYPVACAxLbmIy_7vsF4VFTyEym1TZqPefXam3oVi4M59qLYuUAZn3btIdmQZe8yp6zNQoxPhWT1doFlr1d3tKCJuPguB6xyc9ybUwgFLuHDN4pDAwcocI13pS8AeDdKY6HIyNuDn0eNpH28pANFsPWFSOgx7obYNaVuT4UFxC_pPbuecjh61_DqktbGP08aeBxI",
  },
  {
    title: "Party",
    description: "Clubs, rooftops, and creative lofts.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVkHaY7Wcm8zNHcA9ry2DZBMn9nC59bMRcklbqUKgRcrV0iVakepvqhNXql6FPwIdA5le-t4NbQ2J9DMh_APrfF8DACe_Nloo4xFb_vaZrPTsza26CIC-mTHIiITC7yMqu0Et9-J7W5iwCr-lT8mylWjPInF2NTYPyMU4bTMVG4XjeNsHL2US23hgwKxMjUvB2hY5w3wd58ASZP5U1LV6HBQ7yfnBR9du1M8Z8NP_sysHME53acJdrunU0_Pdd89otC2_NbhGfPNw",
  },
  {
    title: "Networking",
    description: "Elegant bars and social spaces.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbSk3dYm9rmrb7uNQjKuI5UwwJdijO_Qr3LBt2AnAWdquzjP23wE2Z1DBUtJOwlmhdiNAL2CIOo6dTvnr3iNHneEoZ97pt_7OA8aAe0n8xSzA3mnFIlCprfCZc3ez80Pa9CK7JjvMZA95LkA7fVg4U67GgDZUNdw4S0SS3T21B8jgcqwlhvpshBKBVORW0vpT9DD4W76PefTxtHd-ctkWISMI6o0K0BNAOz-_VdaD_Nr_qn7lwGwwkdXdWPw_QJP0veHy8lPuVUTo",
  },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    title: "Set Your Requirements",
    description:
      "Pick venue type, location, date, pax, and budget to instantly narrow down relevant options.",
  },
  {
    title: "Compare Curated Venues",
    description:
      "Review photos, capacity, amenities, and transparent hourly MYR pricing before deciding.",
  },
  {
    title: "Submit Booking Request",
    description:
      "Send your event request in minutes. The venue team verifies slot availability and requirements.",
  },
  {
    title: "Get Confirmed Quickly",
    description:
      "Receive confirmation, coordinate setup details, and manage your booking from one dashboard.",
  },
];

export const venueCatalog: VenueRecord[] = [
  {
    id: "v-001",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3nQt9TGlrKwl6I1ek04MGksU-vlQrz_h4S1fIGJOZGRvJS_k1puCTSQlUrK0yeDMh4InVa0j7laXtldJ12ooyQiILTsBubDIPSOnGeQpeQk3AfNveY-rDltEGPhe5BKaPGJfA4SEUR3NvXbavtx1Q0afPwafwXuHbVKzL_LfW-C_wjMp6EHt2y3FMzR0o0x8qDGxKQczw4gTz5ETD8suTR9Yxc3waK6kPAFX-rAhPbb7N9QgGQLlr0jBaH9Kz27SWpPuBoHIwYHo",
    title: "Skyline Horizon Loft",
    category: "Skyline",
    location: "Jalan Ampang, Kuala Lumpur",
    city: "Kuala Lumpur",
    description: "Modern rooftop loft with skyline views for launches and receptions.",
    venueType: "corporate",
    hourlyRate: 2200,
    pax: 150,
    rating: 4.9,
    reviews: 124,
    isNew: false,
    availableDates: ["2026-05-12", "2026-05-15", "2026-05-21", "2026-06-05"],
  },
  {
    id: "v-002",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAp4UVcRK_3n1szmB05oX3_uIiEiKn-iydcxqnNeLwS1DG_ScTPGeu9a2O3VUhjW5C7QVi6CbrJDo_Q9lPxo2mRDY92pMNbAVeau1mJb9FImSfTcYb7Jv1rR4d828kJ66pnX-P2u4o2haKkSypeDIoohL8qvGLeKQPEA0uHbXscAFyIwhJRxVjeazfw6-lP3WIlGj3nwcE7PlEJnrK5-5v-Zzk1pp-k2k3_eC2C1R96HdGL4jr0SvYBKc3hc4ZEJKI9RaRJOw-QNxM",
    title: "The Heritage Barn",
    category: "Estate",
    location: "Persiaran Setia Alam, Shah Alam",
    city: "Shah Alam",
    description: "Timber barn with landscaped grounds for classic ceremonies.",
    venueType: "wedding",
    hourlyRate: 1600,
    pax: 300,
    rating: 4.8,
    reviews: 89,
    isNew: false,
    availableDates: ["2026-05-12", "2026-05-18", "2026-05-24", "2026-06-01"],
  },
  {
    id: "v-003",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCA3dUFgi2ltcJiIreF4uZCOnc_9ZreCyJPHCNkkbMdJd62yBKG7Liz4qCk8JIBh0GjYeUWvJy10wXlyh9ykjacSxrX_z0KZRgYSW48He__QMRiPUrH4f6R57wQGfDT7L4LF3gHBrJWzFu4ZH6S_bn6-Sa6h6KB6oLiR2lF91nrIJETzsTRjYoSGLD3HUMynYiJeVwqkiJFuXcO2mv6qqkPU4w_-OfqTis1RyuraPTiBf69aYReI6hBBmsxAd7TCrhKH3LdS8xNQkw",
    title: "Industrial Flux Lab",
    category: "Creative Loft",
    location: "Jalan Macalister, George Town",
    city: "Penang",
    description: "Warehouse-inspired studio for showcases and social events.",
    venueType: "party",
    hourlyRate: 980,
    pax: 80,
    rating: 5,
    reviews: 42,
    isNew: true,
    availableDates: ["2026-05-14", "2026-05-20", "2026-05-28", "2026-06-03"],
  },
  {
    id: "v-004",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2fu-E6DRNdfSd1BjOJlThGwjtmOATu2ojoIrakPsmuwncX07Ph74bMLz13PybeNH1l4t9pvhlEWt6JswZNRGdG3dAFEyQU_ktfMU7Yop57dRwo9fI3biA8r7sRNQfn2wENDLj2bZRVuaiBBuIN-yb_dNrqvWx5dNPwWH5cpdg3Gih8M4HVcoqXg_Aad8ETuDk0zYkc0iQD007B8PbawcRvBjsdMfHJYYu-_NTPwnUE8cq8mVAir0jja0kmPXBmi73unVGHThD_ZU",
    title: "Azure Art Hub",
    category: "Gallery",
    location: "Lorong Sultan, Kuala Lumpur",
    city: "Kuala Lumpur",
    description: "Contemporary gallery space for talks, launches, and showcases.",
    venueType: "networking",
    hourlyRate: 740,
    pax: 50,
    rating: 4.7,
    reviews: 38,
    isNew: true,
    availableDates: ["2026-05-12", "2026-05-16", "2026-05-25", "2026-06-07"],
  },
  {
    id: "v-005",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-m8eF-RfE8mcTUZBDhy6vBe0RcshYy8drcRTrUMppuQ50KiPlwTVWqlVuS4DvMSntYFhINwFH29JbcfjiSmCRml_r5ERYNKESbNPJFJuAt0X_JkA2AMvwPOBBXgYJ1Ugf8p1imfT0ShEg6BhxWmHKXy08QoKDO-uQeTpeehVDxPFBUbuKyM6YIQ1shoiFeoGeSOHo7c9mAOatW8dH4RcXLKeHSI-brpCUHAy8FMEJB5-1_YDtPgUNQozQajm3xU_QF6COiOXHZy8",
    title: "The Pearl Yacht",
    category: "Waterfront",
    location: "Jalan Tanjung Tokong, Penang",
    city: "Penang",
    description: "Luxury yacht deck for intimate sunset receptions and parties.",
    venueType: "party",
    hourlyRate: 1350,
    pax: 30,
    rating: 4.8,
    reviews: 56,
    isNew: true,
    availableDates: ["2026-05-13", "2026-05-20", "2026-05-27", "2026-06-11"],
  },
  {
    id: "v-006",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFMcfIFJFOZNRMVMMwpHHLLWH56P_wL66vGRFUSqaDg2TVDD_sRR8WwqNC-rBREnzOD8HOkXWHFLtEYv1AFwjgpJljRvRL8oeDzAytMRGu0bTZ4abth0fY9qXTG_ZWRxlOU_lUmXpQOpxHEYMFnoVfKSu-Hz_6vaRI7Chq2dQaNupj04HUID7FAiLQ4eaJFcId1TV4HQz1TgUfHX5VGHNKQiHJ99CiUjzv6w-3mxtTkGhHwu37Bwl2RCQsZSmCryjtTOSCrTfzKg8",
    title: "Nexus Work Pods",
    category: "Office",
    location: "Jalan Teknokrat 6, Cyberjaya",
    city: "Cyberjaya",
    description: "Private business pods and meeting rooms for focused sessions.",
    venueType: "corporate",
    hourlyRate: 520,
    pax: 12,
    rating: 4.6,
    reviews: 73,
    isNew: true,
    availableDates: ["2026-05-15", "2026-05-22", "2026-05-29", "2026-06-08"],
  },
  {
    id: "v-007",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyVZmEizA425gGS1Fwxgk4Oha9T_clHqWvLt4pSvav_m58VFp18A-l_MJ7IRNDg0WjR_-vkCRDETiOlyMS5hRTYBcJ1Cnz6eo6aYzUJ3n7Xvrncn2kCec8-nVVH3C9gSi_8woMkaysLQdlA28vArAWQp7Eo49WmsBw4bEmGphE4mUGzPkE62zgIkg02GpiIileixtiyKTxXHzmgnzJvMNI0dEKnkKo7CdmUIsYA6AwsL-p6gqv9IBPpyHz--IY9JbLi81xVH4UAWM",
    title: "Old Oak Library",
    category: "Historic",
    location: "Jalan Dato Onn, Johor Bahru",
    city: "Johor Bahru",
    description: "A restored heritage venue for timeless receptions and launches.",
    venueType: "wedding",
    hourlyRate: 860,
    pax: 40,
    rating: 4.7,
    reviews: 61,
    isNew: true,
    availableDates: ["2026-05-12", "2026-05-19", "2026-05-26", "2026-06-02"],
  },
  {
    id: "v-008",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXVuysBWVNVEWQRqggqtYUlDU946ter5ZutClGkCN8iiATnsGat9S0TrYZ3KFjoIL61dqW9Up2nAUOfxnztGPYY8R9cRDQM5dczk2lqbl5cVyzOEp1scvY-dNuZ20wBsJ9atHoxhTfg8VFt3jsOMidpN7j4VFFu8b7ScMicaDcs25g-UtHk180LAdiiJ-TzFhWBh1RSrZfAdBayUyWFQBykXbqljhNuyOM61U34jUOPf3qlHcUVgSfsU2uDIuApgpnIsvyGIpeGi4",
    title: "Riverside Pavilion",
    category: "Garden",
    location: "Jalan Merdeka, Malacca",
    city: "Malacca",
    description: "Open-air riverside pavilion for elegant sunset receptions.",
    venueType: "wedding",
    hourlyRate: 1780,
    pax: 220,
    rating: 4.9,
    reviews: 98,
    isNew: false,
    availableDates: ["2026-05-17", "2026-05-23", "2026-05-30", "2026-06-14"],
  },
  {
    id: "v-009",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2fu-E6DRNdfSd1BjOJlThGwjtmOATu2ojoIrakPsmuwncX07Ph74bMLz13PybeNH1l4t9pvhlEWt6JswZNRGdG3dAFEyQU_ktfMU7Yop57dRwo9fI3biA8r7sRNQfn2wENDLj2bZRVuaiBBuIN-yb_dNrqvWx5dNPwWH5cpdg3Gih8M4HVcoqXg_Aad8ETuDk0zYkc0iQD007B8PbawcRvBjsdMfHJYYu-_NTPwnUE8cq8mVAir0jja0kmPXBmi73unVGHThD_ZU",
    title: "Summit Convention Hall",
    category: "Convention",
    location: "Jalan Tun Razak, Kuala Lumpur",
    city: "Kuala Lumpur",
    description: "Large convention venue equipped for expos and gala dinners.",
    venueType: "corporate",
    hourlyRate: 2450,
    pax: 500,
    rating: 4.8,
    reviews: 132,
    isNew: false,
    availableDates: ["2026-05-16", "2026-05-21", "2026-05-31", "2026-06-12"],
  },
  {
    id: "v-010",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-m8eF-RfE8mcTUZBDhy6vBe0RcshYy8drcRTrUMppuQ50KiPlwTVWqlVuS4DvMSntYFhINwFH29JbcfjiSmCRml_r5ERYNKESbNPJFJuAt0X_JkA2AMvwPOBBXgYJ1Ugf8p1imfT0ShEg6BhxWmHKXy08QoKDO-uQeTpeehVDxPFBUbuKyM6YIQ1shoiFeoGeSOHo7c9mAOatW8dH4RcXLKeHSI-brpCUHAy8FMEJB5-1_YDtPgUNQozQajm3xU_QF6COiOXHZy8",
    title: "Meridian Social House",
    category: "Lounge",
    location: "Danga Bay, Johor Bahru",
    city: "Johor Bahru",
    description: "High-energy social lounge for mixers and curated private parties.",
    venueType: "networking",
    hourlyRate: 1180,
    pax: 90,
    rating: 4.6,
    reviews: 49,
    isNew: false,
    availableDates: ["2026-05-14", "2026-05-24", "2026-06-04", "2026-06-09"],
  },
];
