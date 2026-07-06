export interface PhotoCredit {
  artist: string;
  license: string;
  page: string;
}

export interface VehicleView {
  label: string;
  image: string;
  credit: PhotoCredit;
}

export interface Vehicle {
  id: string;
  brand: string;
  name: string;
  year: string;
  variant: string;
  engine: string;
  fuel: string;
  seats: number;
  body: string;
  image: string;
  tag?: string;
  credit: PhotoCredit;
  /** Extra angles (side, rear, interior, …). The front view is derived from `image`. */
  views?: VehicleView[];
}

export const brands = [
  "All",
  "Geely",
  "Jetour",
  "Toyota",
  "Honda",
  "Changan",
  "GMC",
] as const;

export const vehicles: Vehicle[] = [
  {
    id: "geely-hybrid",
    brand: "Geely",
    name: "Geely Emgrand",
    year: "2024",
    variant: "1.5L Hybrid — Intelligent Hybrid Sedan",
    engine: "1.5L Hybrid",
    fuel: "Hybrid",
    seats: 5,
    body: "Sedan",
    image: "/cars/geely-hybrid.png",
    tag: "Hybrid",
    credit: {
      artist: "User3204",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:2022_Geely_Emgrand_L_Hi-P_(front).jpg",
    },
  },
  {
    id: "geely-2025",
    brand: "Geely",
    name: "Geely Monjaro",
    year: "2025",
    variant: "2.0L Turbo — Flagship SUV",
    engine: "2.0L Turbo",
    fuel: "Petrol",
    seats: 5,
    body: "SUV",
    image: "/cars/geely-2025.png",
    tag: "New",
    credit: {
      artist: "Milhouse35",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Geely_Monjaro.jpg",
    },
  },
  {
    id: "jetour-t2",
    brand: "Jetour",
    name: "Jetour T2",
    year: "2024",
    variant: "2.0L Turbo — Adventure Off-Road SUV",
    engine: "2.0L Turbo",
    fuel: "Petrol",
    seats: 5,
    body: "Off-Road SUV",
    image: "/cars/jetour-t2.png",
    tag: "Off-Road",
    credit: {
      artist: "JustAnotherCarDesigner",
      license: "CC0",
      page: "https://commons.wikimedia.org/wiki/File:Jetour_Shanhai_T2_001.jpg",
    },
  },
  {
    id: "jetour-x70plus",
    brand: "Jetour",
    name: "Jetour X70 Plus",
    year: "2024",
    variant: "1.6L Turbo — 7-Seat Family SUV",
    engine: "1.6L Turbo",
    fuel: "Petrol",
    seats: 7,
    body: "SUV",
    image: "/cars/jetour-x70plus.png",
    tag: "7 Seats",
    credit: {
      artist: "Anonymousfox36",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Jetour_X70_Plus_IMG003.jpg",
    },
  },
  {
    id: "jetour-dashing",
    brand: "Jetour",
    name: "Jetour Dasheng",
    year: "2024",
    variant: "1.6L Turbo — Sport Crossover SUV",
    engine: "1.6L Turbo",
    fuel: "Petrol",
    seats: 5,
    body: "Crossover",
    image: "/cars/jetour-dashing.png",
    credit: {
      artist: "JustAnotherCarDesigner",
      license: "CC0",
      page: "https://commons.wikimedia.org/wiki/File:Jetour_Dashing_facelift_001.jpg",
    },
  },
  {
    id: "rav4",
    brand: "Toyota",
    name: "Toyota RAV4",
    year: "2019–2024",
    variant: "2.5L / Hybrid — Compact SUV (XA50)",
    engine: "2.5L / Hybrid",
    fuel: "Petrol / Hybrid",
    seats: 5,
    body: "SUV",
    image: "/cars/rav4.png",
    tag: "Popular",
    credit: {
      artist: "Alexander Migl",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:2019_Toyota_RAV4_Hybrid_01.jpg",
    },
  },
  {
    id: "honda-crv",
    brand: "Honda",
    name: "Honda CR-V",
    year: "2023",
    variant: "1.5L Turbo — Compact SUV",
    engine: "1.5L Turbo",
    fuel: "Petrol",
    seats: 5,
    body: "SUV",
    image: "/cars/honda-crv.png",
    tag: "Popular",
    credit: {
      artist: "MercurySable99",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:2023_Honda_CR-V_EX-L_AWD,_front_right,_11-13-2022.jpg",
    },
  },
  {
    id: "honda-hrv",
    brand: "Honda",
    name: "Honda HR-V",
    year: "2022",
    variant: "1.5L — Compact Crossover",
    engine: "1.5L",
    fuel: "Petrol",
    seats: 5,
    body: "Crossover",
    image: "/cars/honda-hrv.png",
    credit: {
      artist: "Ozaneee",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:2022_Honda_HR-V_RS_Turbo_Indonesia.jpg",
    },
  },
  {
    id: "changan-cs75plus",
    brand: "Changan",
    name: "Changan CS75 Plus",
    year: "2023",
    variant: "1.5T / 2.0T — Mid-Size SUV",
    engine: "1.5T / 2.0T",
    fuel: "Petrol",
    seats: 5,
    body: "SUV",
    image: "/cars/changan-cs75plus.png",
    credit: {
      artist: "JustAnotherCarDesigner",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Changan_CS75_Plus_II_004.jpg",
    },
  },
  {
    id: "changan-unik",
    brand: "Changan",
    name: "Changan UNI-K",
    year: "2023",
    variant: "2.0L Turbo — Premium SUV",
    engine: "2.0L Turbo",
    fuel: "Petrol",
    seats: 5,
    body: "SUV",
    image: "/cars/changan-unik.png",
    credit: {
      artist: "Jengtingchen",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Changan_UNI-K_001.jpg",
    },
  },
  {
    id: "gmc-yukon",
    brand: "GMC",
    name: "GMC Yukon Denali",
    year: "2021",
    variant: "6.2L V8 — Full-Size Luxury SUV",
    engine: "6.2L V8",
    fuel: "Petrol",
    seats: 7,
    body: "Full-Size SUV",
    image: "/cars/gmc-yukon.png",
    tag: "Premium",
    credit: {
      artist: "Mr.choppers",
      license: "CC BY-SA 3.0",
      page: "https://commons.wikimedia.org/wiki/File:2021_GMC_Yukon_Denali_in_Hunter_Metallic,_front_left.jpg",
    },
  },
];
