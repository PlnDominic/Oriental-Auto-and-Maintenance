export type Condition = "new" | "used";
export type FuelType = "petrol" | "diesel" | "electric" | "hybrid";
export type BodyType = "sedan" | "suv" | "pickup" | "crossover";
export type Origin = "japan" | "china";

export interface VehicleVariant {
  id: string;
  name: string;
  engine: string;
  horsepower: number;
  acceleration: number; // 0–100 km/h in seconds
  fuelType: FuelType;
  transmission: string;
  priceUSD: number;
  tag?: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  condition: Condition;
  bodyType: BodyType;
  origin: Origin;
  baseColorHex: string;
  tagline: string;
  variants: VehicleVariant[];
  featured?: boolean;
}

export const GHS_RATE = 14.5;

export const BRANDS = [
  { id: "all",    label: "All Brands" },
  { id: "toyota", label: "Toyota"     },
  { id: "haval",  label: "Haval"      },
  { id: "byd",    label: "BYD"        },
  { id: "chery",  label: "Chery"      },
  { id: "mg",     label: "MG"         },
  { id: "gac",    label: "GAC"        },
  { id: "geely",  label: "Geely"      },
] as const;

export const vehicles: Vehicle[] = [
  // ── TOYOTA ──────────────────────────────────────────────────────────────
  {
    id: "toyota-land-cruiser-new",
    brand: "Toyota", model: "Land Cruiser", year: "2024",
    condition: "new", bodyType: "suv", origin: "japan",
    baseColorHex: "#C2C2BA", featured: true,
    tagline: "The undisputed benchmark of off-road luxury.",
    variants: [
      { id: "lc-gxr",   name: "GXR",        engine: "4.0L V6",       horsepower: 270, acceleration: 9.2, fuelType: "petrol", transmission: "6-Speed Auto",  priceUSD: 82500 },
      { id: "lc-vxr",   name: "VXR",        engine: "4.0L V6",       horsepower: 270, acceleration: 9.0, fuelType: "petrol", transmission: "6-Speed Auto",  priceUSD: 89500, tag: "Popular" },
      { id: "lc-zx",    name: "ZX Luxury",  engine: "3.5L Twin-T V6",horsepower: 409, acceleration: 7.4, fuelType: "petrol", transmission: "10-Speed Auto", priceUSD: 98500, tag: "Flagship" },
    ],
  },
  {
    id: "toyota-fortuner-new",
    brand: "Toyota", model: "Fortuner", year: "2024",
    condition: "new", bodyType: "suv", origin: "japan",
    baseColorHex: "#1C1C1C",
    tagline: "Unstoppable. On every Ghanaian road.",
    variants: [
      { id: "fort-25g",  name: "2.5G",        engine: "2.5L Diesel", horsepower: 148, acceleration: 11.5, fuelType: "diesel", transmission: "6-Speed Auto", priceUSD: 44500 },
      { id: "fort-28v",  name: "2.8V 4WD",    engine: "2.8L Diesel", horsepower: 204, acceleration:  9.5, fuelType: "diesel", transmission: "6-Speed Auto", priceUSD: 52000, tag: "Popular" },
      { id: "fort-leg",  name: "Legender 4WD",engine: "2.8L Diesel", horsepower: 204, acceleration:  9.3, fuelType: "diesel", transmission: "6-Speed Auto", priceUSD: 58000, tag: "Limited" },
    ],
  },
  {
    id: "toyota-hilux-new",
    brand: "Toyota", model: "Hilux", year: "2024",
    condition: "new", bodyType: "pickup", origin: "japan",
    baseColorHex: "#4A4A4A",
    tagline: "Built tough for business and beyond.",
    variants: [
      { id: "hx-sr",     name: "SR 4×2",      engine: "2.4L Diesel", horsepower: 148, acceleration: 12.0, fuelType: "diesel", transmission: "6-Speed Manual", priceUSD: 38000 },
      { id: "hx-sr5",    name: "SR5 4×4",     engine: "2.4L Diesel", horsepower: 148, acceleration: 11.5, fuelType: "diesel", transmission: "6-Speed Auto",   priceUSD: 44500, tag: "Popular" },
      { id: "hx-rogue",  name: "Rogue 4×4",   engine: "2.8L Diesel", horsepower: 224, acceleration: 10.0, fuelType: "diesel", transmission: "6-Speed Auto",   priceUSD: 51000, tag: "Top Spec" },
    ],
  },
  {
    id: "toyota-corolla-new",
    brand: "Toyota", model: "Corolla", year: "2024",
    condition: "new", bodyType: "sedan", origin: "japan",
    baseColorHex: "#F4F3EF",
    tagline: "Refined comfort for every journey.",
    variants: [
      { id: "cor-16",    name: "1.6G",        engine: "1.6L Petrol", horsepower: 122, acceleration: 10.5, fuelType: "petrol", transmission: "CVT", priceUSD: 27500 },
      { id: "cor-20",    name: "2.0S",        engine: "2.0L Petrol", horsepower: 152, acceleration:  8.9, fuelType: "petrol", transmission: "CVT", priceUSD: 32000, tag: "Popular" },
      { id: "cor-hyb",   name: "Hybrid",      engine: "1.8L Hybrid", horsepower: 122, acceleration: 10.0, fuelType: "hybrid", transmission: "CVT", priceUSD: 35500 },
    ],
  },
  {
    id: "toyota-corolla-used",
    brand: "Toyota", model: "Corolla", year: "2018–2021",
    condition: "used", bodyType: "sedan", origin: "japan",
    baseColorHex: "#C2C2BA",
    tagline: "Japan-quality reliability at a Ghanaian-friendly price.",
    variants: [
      { id: "ucor-18",   name: "2018 · 1.8G", engine: "1.8L Petrol", horsepower: 140, acceleration:  9.8, fuelType: "petrol", transmission: "CVT", priceUSD: 10500 },
      { id: "ucor-20",   name: "2020 · 2.0G", engine: "2.0L Petrol", horsepower: 150, acceleration:  9.2, fuelType: "petrol", transmission: "CVT", priceUSD: 14500, tag: "Best Value" },
      { id: "ucor-21h",  name: "2021 · Hybrid",engine: "1.8L Hybrid",horsepower: 122, acceleration:  9.5, fuelType: "hybrid", transmission: "CVT", priceUSD: 17500 },
    ],
  },
  {
    id: "toyota-camry-used",
    brand: "Toyota", model: "Camry", year: "2019–2022",
    condition: "used", bodyType: "sedan", origin: "japan",
    baseColorHex: "#1D3A5B",
    tagline: "Executive presence. Proven reliability.",
    variants: [
      { id: "ucam-19",   name: "2019 · LE",   engine: "2.5L Petrol", horsepower: 203, acceleration:  8.3, fuelType: "petrol", transmission: "8-Speed Auto", priceUSD: 16500 },
      { id: "ucam-21se", name: "2021 · SE",   engine: "2.5L Petrol", horsepower: 203, acceleration:  8.0, fuelType: "petrol", transmission: "8-Speed Auto", priceUSD: 21000, tag: "Popular" },
      { id: "ucam-22xse",name: "2022 · XSE",  engine: "2.5L Petrol", horsepower: 203, acceleration:  7.8, fuelType: "petrol", transmission: "8-Speed Auto", priceUSD: 24500 },
    ],
  },
  {
    id: "toyota-rav4-used",
    brand: "Toyota", model: "RAV4", year: "2019–2022",
    condition: "used", bodyType: "suv", origin: "japan",
    baseColorHex: "#4A5240",
    tagline: "The world's best-selling SUV.",
    variants: [
      { id: "urav-le",   name: "2019 · LE",   engine: "2.5L Petrol", horsepower: 203, acceleration: 8.6, fuelType: "petrol", transmission: "8-Speed Auto", priceUSD: 22000 },
      { id: "urav-xle",  name: "2021 · XLE",  engine: "2.5L Petrol", horsepower: 203, acceleration: 8.4, fuelType: "petrol", transmission: "8-Speed Auto", priceUSD: 27000, tag: "Popular" },
      { id: "urav-hyb",  name: "2022 · Hybrid",engine: "2.5L Hybrid",horsepower: 219, acceleration: 7.8, fuelType: "hybrid", transmission: "E-CVT",        priceUSD: 32000 },
    ],
  },

  // ── HAVAL ────────────────────────────────────────────────────────────────
  {
    id: "haval-h6-new",
    brand: "Haval", model: "H6", year: "2024",
    condition: "new", bodyType: "suv", origin: "china",
    baseColorHex: "#E8E0D0", featured: true,
    tagline: "China's best-selling SUV. Now in Ghana.",
    variants: [
      { id: "h6-com",    name: "Comfort",      engine: "1.5T Petrol", horsepower: 169, acceleration: 9.0, fuelType: "petrol", transmission: "7-Speed DCT", priceUSD: 24500 },
      { id: "h6-prem",   name: "Premium",      engine: "2.0T Petrol", horsepower: 224, acceleration: 7.8, fuelType: "petrol", transmission: "7-Speed DCT", priceUSD: 29500, tag: "Popular" },
      { id: "h6-dhev",   name: "DHEV Hybrid",  engine: "1.5T Hybrid", horsepower: 243, acceleration: 6.8, fuelType: "hybrid", transmission: "E-CVT",        priceUSD: 34500, tag: "Hybrid" },
    ],
  },
  {
    id: "haval-jolion-new",
    brand: "Haval", model: "Jolion", year: "2024",
    condition: "new", bodyType: "crossover", origin: "china",
    baseColorHex: "#C2C2BA",
    tagline: "Smart. Stylish. Affordable.",
    variants: [
      { id: "jol-std",   name: "Standard",     engine: "1.5T Petrol", horsepower: 147, acceleration: 10.2, fuelType: "petrol", transmission: "7-Speed DCT", priceUSD: 19500 },
      { id: "jol-lux",   name: "Luxury",       engine: "1.5T Petrol", horsepower: 147, acceleration: 10.0, fuelType: "petrol", transmission: "7-Speed DCT", priceUSD: 22500, tag: "Popular" },
      { id: "jol-sup",   name: "Super Luxury", engine: "1.5T Petrol", horsepower: 147, acceleration:  9.8, fuelType: "petrol", transmission: "7-Speed DCT", priceUSD: 25500 },
    ],
  },
  {
    id: "haval-dargo-new",
    brand: "Haval", model: "Dargo", year: "2024",
    condition: "new", bodyType: "suv", origin: "china",
    baseColorHex: "#2C4A3C",
    tagline: "Adventure-ready. City-polished.",
    variants: [
      { id: "drg-2wd",   name: "2WD",          engine: "2.0T Petrol", horsepower: 224, acceleration: 8.0, fuelType: "petrol", transmission: "7-Speed DCT", priceUSD: 28500 },
      { id: "drg-4wd",   name: "4WD",          engine: "2.0T Petrol", horsepower: 224, acceleration: 7.6, fuelType: "petrol", transmission: "7-Speed DCT", priceUSD: 33500, tag: "Popular" },
    ],
  },

  // ── BYD ──────────────────────────────────────────────────────────────────
  {
    id: "byd-atto3-new",
    brand: "BYD", model: "Atto 3", year: "2024",
    condition: "new", bodyType: "suv", origin: "china",
    baseColorHex: "#19336A",
    tagline: "Pure electric. Zero limits.",
    variants: [
      { id: "atto-std",  name: "Standard Range",  engine: "EV · 60.5 kWh", horsepower: 201, acceleration: 7.3, fuelType: "electric", transmission: "Single Speed", priceUSD: 32000 },
      { id: "atto-ext",  name: "Extended Range",  engine: "EV · 72.8 kWh", horsepower: 201, acceleration: 7.3, fuelType: "electric", transmission: "Single Speed", priceUSD: 37500, tag: "Popular" },
    ],
  },
  {
    id: "byd-seal-new",
    brand: "BYD", model: "Seal", year: "2024",
    condition: "new", bodyType: "sedan", origin: "china",
    baseColorHex: "#1C1C1C",
    tagline: "Electric performance. Redefined.",
    variants: [
      { id: "seal-rwd",  name: "Standard RWD",    engine: "EV · 82.5 kWh", horsepower: 310, acceleration: 5.9, fuelType: "electric", transmission: "Single Speed", priceUSD: 38000 },
      { id: "seal-awd",  name: "Performance AWD", engine: "EV · 82.5 kWh", horsepower: 530, acceleration: 3.8, fuelType: "electric", transmission: "Single Speed", priceUSD: 46000, tag: "Performance" },
    ],
  },

  // ── CHERY ────────────────────────────────────────────────────────────────
  {
    id: "chery-tiggo7-new",
    brand: "Chery", model: "Tiggo 7 Pro", year: "2024",
    condition: "new", bodyType: "suv", origin: "china",
    baseColorHex: "#485040",
    tagline: "Pro features at a smart price.",
    variants: [
      { id: "t7-com",    name: "1.5T Comfort",    engine: "1.5T Petrol", horsepower: 156, acceleration:  9.5, fuelType: "petrol", transmission: "CVT",         priceUSD: 22000 },
      { id: "t7-prem",   name: "2.0T Premium",    engine: "2.0T Petrol", horsepower: 197, acceleration:  8.0, fuelType: "petrol", transmission: "7-Speed DCT", priceUSD: 27000, tag: "Popular" },
    ],
  },
  {
    id: "chery-tiggo8-new",
    brand: "Chery", model: "Tiggo 8 Pro", year: "2024",
    condition: "new", bodyType: "suv", origin: "china",
    baseColorHex: "#C4A020",
    tagline: "7-seat luxury. Chinese value.",
    variants: [
      { id: "t8-5seat",  name: "2.0T · 5-Seat",   engine: "2.0T Petrol", horsepower: 197, acceleration: 8.5, fuelType: "petrol", transmission: "7-Speed DCT", priceUSD: 29000 },
      { id: "t8-7seat",  name: "2.0T · 7-Seat",   engine: "2.0T Petrol", horsepower: 197, acceleration: 8.5, fuelType: "petrol", transmission: "7-Speed DCT", priceUSD: 33000, tag: "Popular" },
      { id: "t8-phev",   name: "PHEV Max",         engine: "1.6T PHEV",   horsepower: 326, acceleration: 6.5, fuelType: "hybrid", transmission: "E-CVT",        priceUSD: 39000 },
    ],
  },

  // ── MG ───────────────────────────────────────────────────────────────────
  {
    id: "mg-zs-new",
    brand: "MG", model: "ZS", year: "2024",
    condition: "new", bodyType: "crossover", origin: "china",
    baseColorHex: "#B5302A",
    tagline: "British heritage. Chinese value.",
    variants: [
      { id: "zs-pet",    name: "1.5T Petrol",     engine: "1.5L Petrol", horsepower: 106, acceleration: 10.8, fuelType: "petrol",  transmission: "CVT",          priceUSD: 19500 },
      { id: "zs-ev",     name: "EV Plus",          engine: "EV · 51 kWh", horsepower: 176, acceleration:  8.5, fuelType: "electric", transmission: "Single Speed", priceUSD: 27000, tag: "Electric" },
    ],
  },
  {
    id: "mg-hs-new",
    brand: "MG", model: "HS", year: "2024",
    condition: "new", bodyType: "suv", origin: "china",
    baseColorHex: "#656565",
    tagline: "Family SUV. Flagship comfort.",
    variants: [
      { id: "hs-15t",    name: "1.5T",             engine: "1.5T Petrol", horsepower: 162, acceleration: 9.0, fuelType: "petrol", transmission: "6-Speed Auto", priceUSD: 24000 },
      { id: "hs-20t",    name: "2.0T Trophy",       engine: "2.0T Petrol", horsepower: 218, acceleration: 7.8, fuelType: "petrol", transmission: "8-Speed Auto", priceUSD: 29500, tag: "Popular" },
    ],
  },

  // ── GAC ──────────────────────────────────────────────────────────────────
  {
    id: "gac-gs4-new",
    brand: "GAC", model: "GS4", year: "2024",
    condition: "new", bodyType: "crossover", origin: "china",
    baseColorHex: "#2E4A3E",
    tagline: "Precision from Guangzhou. Proven globally.",
    variants: [
      { id: "gs4-15",    name: "1.5T Comfort",     engine: "1.5T Petrol", horsepower: 150, acceleration: 10.0, fuelType: "petrol", transmission: "CVT",   priceUSD: 21000 },
      { id: "gs4-phev",  name: "PHEV",             engine: "1.5T PHEV",   horsepower: 241, acceleration:  7.0, fuelType: "hybrid", transmission: "E-CVT", priceUSD: 28000, tag: "Hybrid" },
    ],
  },
  {
    id: "gac-gs8-new",
    brand: "GAC", model: "GS8", year: "2024",
    condition: "new", bodyType: "suv", origin: "china",
    baseColorHex: "#1D3A5B",
    tagline: "Full-size luxury SUV from China.",
    variants: [
      { id: "gs8-20t",   name: "2.0T",             engine: "2.0T Petrol", horsepower: 252, acceleration: 8.0, fuelType: "petrol", transmission: "8-Speed Auto", priceUSD: 35000 },
      { id: "gs8-20tp",  name: "2.0T Platinum",    engine: "2.0T Petrol", horsepower: 252, acceleration: 7.8, fuelType: "petrol", transmission: "8-Speed Auto", priceUSD: 42000, tag: "Flagship" },
    ],
  },

  // ── GEELY ────────────────────────────────────────────────────────────────
  {
    id: "geely-coolray-new",
    brand: "Geely", model: "Coolray", year: "2024",
    condition: "new", bodyType: "crossover", origin: "china",
    baseColorHex: "#4A2E60",
    tagline: "Cool looks. Hot performance.",
    variants: [
      { id: "cool-std",  name: "Standard",         engine: "1.5T Petrol", horsepower: 177, acceleration: 6.9, fuelType: "petrol", transmission: "7-Speed DCT", priceUSD: 21000 },
      { id: "cool-sp",   name: "Sport",            engine: "1.5T Petrol", horsepower: 177, acceleration: 6.9, fuelType: "petrol", transmission: "7-Speed DCT", priceUSD: 24000, tag: "Popular" },
    ],
  },
];
