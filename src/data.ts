export type Availability = "available" | "nearly-full" | "full" | "unknown"
export type CategorySlug = "plastic" | "paper" | "metal" | "general"

export type Bin = {
  id: string
  category: CategorySlug
  label: string
  status: Availability
  fill: number | null
  updated: string
  accepts: string[]
}

export type Station = {
  id: string
  name: string
  landmark: string
  description: string
  accessibility: string
  coordinates: [number, number]
  distance: number
  walkTime: number
  bins: Bin[]
}

export const categories: {
  slug: CategorySlug
  name: string
  shortDescription: string
  description: string
  accepts: string[]
  avoids: string[]
  preparation: string
  color: string
}[] = [
  {
    slug: "plastic",
    name: "Plastic",
    shortDescription: "Clean bottles and rigid containers",
    description:
      "Illustrative campus guidance for eligible plastic containers.",
    accepts: ["Drink bottles", "Shampoo bottles", "Clean food tubs"],
    avoids: ["Plastic bags", "Food-soiled packaging", "Foam containers"],
    preparation: "Empty liquids and lightly rinse containers before disposal.",
    color: "#38A6A0",
  },
  {
    slug: "paper",
    name: "Paper",
    shortDescription: "Clean paper and flattened cardboard",
    description: "Illustrative guidance for dry, recyclable paper products.",
    accepts: ["Office paper", "Newspapers", "Flattened cardboard"],
    avoids: ["Used tissues", "Waxed paper", "Food-soiled card"],
    preparation: "Keep items dry and flatten cardboard where possible.",
    color: "#D49A3A",
  },
  {
    slug: "metal",
    name: "Metal",
    shortDescription: "Empty cans and eligible containers",
    description: "Illustrative campus guidance for common metal packaging.",
    accepts: ["Drink cans", "Food tins", "Clean foil trays"],
    avoids: ["Batteries", "Electronics", "Pressurized canisters"],
    preparation: "Empty and lightly rinse cans. Keep hazardous items separate.",
    color: "#71849A",
  },
  {
    slug: "general",
    name: "General waste",
    shortDescription: "Items that cannot enter recycling",
    description: "Illustrative guidance for non-recyclable everyday waste.",
    accepts: ["Used tissues", "Food-soiled wrappers", "Broken ceramics"],
    avoids: ["Batteries", "Liquids", "Electronic waste"],
    preparation: "Bag loose or messy waste and keep liquids out.",
    color: "#776F68",
  },
]

export const stations: Station[] = [
  {
    id: "science-main",
    name: "Science Building",
    landmark: "Main entrance",
    description:
      "Beside the Science Building main entrance, near the outdoor seating area and pedestrian walkway.",
    accessibility: "Step-free access from the central walkway.",
    coordinates: [1.29672, 103.77642],
    distance: 150,
    walkTime: 2,
    bins: [
      {
        id: "SC-P01",
        category: "plastic",
        label: "Plastic recycling",
        status: "available",
        fill: 42,
        updated: "20 sec ago",
        accepts: ["Bottles", "Clean containers"],
      },
      {
        id: "SC-PA1",
        category: "paper",
        label: "Paper recycling",
        status: "nearly-full",
        fill: 78,
        updated: "24 sec ago",
        accepts: ["Paper", "Flattened cardboard"],
      },
      {
        id: "SC-M01",
        category: "metal",
        label: "Metal recycling",
        status: "full",
        fill: 94,
        updated: "18 sec ago",
        accepts: ["Cans", "Clean foil trays"],
      },
      {
        id: "SC-G01",
        category: "general",
        label: "General waste",
        status: "available",
        fill: 35,
        updated: "22 sec ago",
        accepts: ["Non-recyclable waste"],
      },
    ],
  },
  {
    id: "library-plaza",
    name: "Central Library",
    landmark: "Plaza entrance",
    description:
      "On the covered plaza outside the library entrance, opposite the campus information screen.",
    accessibility: "Covered, well-lit, and wheelchair accessible.",
    coordinates: [1.29761, 103.7739],
    distance: 220,
    walkTime: 3,
    bins: [
      {
        id: "LI-P01",
        category: "plastic",
        label: "Plastic recycling",
        status: "available",
        fill: 26,
        updated: "35 sec ago",
        accepts: ["Bottles", "Clean containers"],
      },
      {
        id: "LI-PA1",
        category: "paper",
        label: "Paper recycling",
        status: "available",
        fill: 51,
        updated: "32 sec ago",
        accepts: ["Paper", "Flattened cardboard"],
      },
      {
        id: "LI-G01",
        category: "general",
        label: "General waste",
        status: "available",
        fill: 48,
        updated: "31 sec ago",
        accepts: ["Non-recyclable waste"],
      },
    ],
  },
  {
    id: "student-hub",
    name: "Student Hub",
    landmark: "Level 1 food court",
    description:
      "At the food court tray-return area, beside the hand-washing station on Level 1.",
    accessibility: "Lift access is available from the north lobby.",
    coordinates: [1.29556, 103.77474],
    distance: 310,
    walkTime: 4,
    bins: [
      {
        id: "HU-P01",
        category: "plastic",
        label: "Plastic recycling",
        status: "nearly-full",
        fill: 82,
        updated: "1 min ago",
        accepts: ["Bottles", "Clean containers"],
      },
      {
        id: "HU-M01",
        category: "metal",
        label: "Metal recycling",
        status: "available",
        fill: 44,
        updated: "1 min ago",
        accepts: ["Cans", "Clean foil trays"],
      },
      {
        id: "HU-G01",
        category: "general",
        label: "General waste",
        status: "available",
        fill: 61,
        updated: "1 min ago",
        accepts: ["Non-recyclable waste"],
      },
    ],
  },
  {
    id: "engineering-link",
    name: "Engineering Link",
    landmark: "Covered walkway",
    description:
      "Along the covered link between Engineering Blocks A and B, near the bicycle racks.",
    accessibility: "Step-free route with weather cover.",
    coordinates: [1.29888, 103.77712],
    distance: 430,
    walkTime: 6,
    bins: [
      {
        id: "EN-P01",
        category: "plastic",
        label: "Plastic recycling",
        status: "unknown",
        fill: null,
        updated: "18 min ago",
        accepts: ["Bottles", "Clean containers"],
      },
      {
        id: "EN-PA1",
        category: "paper",
        label: "Paper recycling",
        status: "available",
        fill: 39,
        updated: "42 sec ago",
        accepts: ["Paper", "Flattened cardboard"],
      },
      {
        id: "EN-M01",
        category: "metal",
        label: "Metal recycling",
        status: "available",
        fill: 22,
        updated: "41 sec ago",
        accepts: ["Cans", "Clean foil trays"],
      },
      {
        id: "EN-G01",
        category: "general",
        label: "General waste",
        status: "full",
        fill: 96,
        updated: "39 sec ago",
        accepts: ["Non-recyclable waste"],
      },
    ],
  },
]

export const statusLabels: Record<Availability, string> = {
  available: "Available",
  "nearly-full": "Nearly full",
  full: "Full",
  unknown: "Status unavailable",
}

export function availableCount(station: Station) {
  return station.bins.filter((bin) => bin.status === "available").length
}
