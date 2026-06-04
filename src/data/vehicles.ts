import type { EngineOption } from "@/components/ConfigPanel";

export interface VehicleEngineOption extends EngineOption {
  defaultColor: string;
  variantLabel: string;
}

export interface VehicleModel {
  id: string;
  brand: string;
  model: string;
  year: string;
  engines: VehicleEngineOption[];
}

export interface BrandData {
  id: string;
  label: string;
  models: VehicleModel[];
}

export const BRANDS: BrandData[] = [
  // ── TOYOTA ──────────────────────────────────────────────────────────────
  {
    id: "toyota", label: "Toyota",
    models: [
      {
        id: "land-cruiser", brand: "Toyota", model: "Land Cruiser", year: "2024",
        engines: [
          { id: "lc-gxr",  name: "GXR",         price: 82500,  horsepower: 270, acceleration: 8.0, consumption: "15 mpg", defaultColor: "#C2C2BA", variantLabel: "Land Cruiser GXR · 4.0L V6 · 270 PS" },
          { id: "lc-vxr",  name: "VXR",          price: 89500,  horsepower: 270, acceleration: 7.8, consumption: "14 mpg", defaultColor: "#1C1C1C", variantLabel: "Land Cruiser VXR · 4.0L V6 · 270 PS", tag: "Popular" },
          { id: "lc-zx",   name: "ZX Luxury",    price: 98500,  horsepower: 409, acceleration: 6.4, consumption: "16 mpg", defaultColor: "#1D3A5B", variantLabel: "Land Cruiser ZX · 3.5L Twin-T V6 · 409 PS", tag: "Flagship" },
        ],
      },
      {
        id: "fortuner", brand: "Toyota", model: "Fortuner", year: "2024",
        engines: [
          { id: "fort-25",  name: "2.5G",         price: 44500,  horsepower: 148, acceleration: 10.0, consumption: "28 mpg", defaultColor: "#F4F3EF", variantLabel: "Fortuner 2.5G · 2.5L Diesel · 148 PS" },
          { id: "fort-28",  name: "2.8V 4WD",     price: 52000,  horsepower: 204, acceleration:  8.3, consumption: "26 mpg", defaultColor: "#4A4A4A", variantLabel: "Fortuner 2.8V · 2.8L Diesel · 204 PS", tag: "Popular" },
          { id: "fort-leg", name: "Legender 4WD", price: 58000,  horsepower: 204, acceleration:  8.1, consumption: "25 mpg", defaultColor: "#1C1C1C", variantLabel: "Fortuner Legender · 2.8L Diesel · 204 PS", tag: "Limited" },
        ],
      },
      {
        id: "hilux", brand: "Toyota", model: "Hilux", year: "2024",
        engines: [
          { id: "hx-sr",    name: "SR 4×2",       price: 38000,  horsepower: 148, acceleration: 10.4, consumption: "30 mpg", defaultColor: "#E8E0D0", variantLabel: "Hilux SR · 2.4L Diesel · 148 PS" },
          { id: "hx-sr5",   name: "SR5 4×4",      price: 44500,  horsepower: 148, acceleration: 10.0, consumption: "29 mpg", defaultColor: "#656565", variantLabel: "Hilux SR5 · 2.4L Diesel · 148 PS", tag: "Popular" },
          { id: "hx-rogue", name: "Rogue 4×4",    price: 51000,  horsepower: 224, acceleration:  8.7, consumption: "26 mpg", defaultColor: "#1C1C1C", variantLabel: "Hilux Rogue · 2.8L Diesel · 224 PS", tag: "Top Spec" },
        ],
      },
      {
        id: "corolla", brand: "Toyota", model: "Corolla", year: "2024",
        engines: [
          { id: "cor-16",   name: "1.6G",          price: 27500, horsepower: 122, acceleration: 9.1, consumption: "36 mpg", defaultColor: "#F4F3EF", variantLabel: "Corolla 1.6G · 1.6L Petrol · 122 PS" },
          { id: "cor-20",   name: "2.0S",          price: 32000, horsepower: 152, acceleration: 7.7, consumption: "34 mpg", defaultColor: "#C2C2BA", variantLabel: "Corolla 2.0S · 2.0L Petrol · 152 PS", tag: "Popular" },
          { id: "cor-hyb",  name: "Hybrid",        price: 35500, horsepower: 122, acceleration: 8.7, consumption: "52 mpg", defaultColor: "#1D3A5B", variantLabel: "Corolla Hybrid · 1.8L Hybrid · 122 PS" },
        ],
      },
      {
        id: "camry", brand: "Toyota", model: "Camry", year: "2024",
        engines: [
          { id: "cam-le",   name: "LE",            price: 34000, horsepower: 203, acceleration: 7.2, consumption: "32 mpg", defaultColor: "#E8E0D0", variantLabel: "Camry LE · 2.5L Petrol · 203 PS" },
          { id: "cam-se",   name: "SE",            price: 38500, horsepower: 203, acceleration: 7.0, consumption: "30 mpg", defaultColor: "#1C1C1C", variantLabel: "Camry SE · 2.5L Petrol · 203 PS", tag: "Popular" },
          { id: "cam-xse",  name: "XSE",           price: 43000, horsepower: 203, acceleration: 6.8, consumption: "29 mpg", defaultColor: "#1D3A5B", variantLabel: "Camry XSE · 2.5L Petrol · 203 PS" },
        ],
      },
      {
        id: "rav4", brand: "Toyota", model: "RAV4", year: "2024",
        engines: [
          { id: "rv-le",    name: "LE",            price: 35000, horsepower: 203, acceleration: 7.5, consumption: "30 mpg", defaultColor: "#4A5240", variantLabel: "RAV4 LE · 2.5L Petrol · 203 PS" },
          { id: "rv-xle",   name: "XLE",           price: 39500, horsepower: 203, acceleration: 7.3, consumption: "28 mpg", defaultColor: "#656565", variantLabel: "RAV4 XLE · 2.5L Petrol · 203 PS", tag: "Popular" },
          { id: "rv-hyb",   name: "Hybrid",        price: 45000, horsepower: 219, acceleration: 6.8, consumption: "41 mpg", defaultColor: "#2C4A3C", variantLabel: "RAV4 Hybrid · 2.5L Hybrid · 219 PS" },
        ],
      },
    ],
  },

  // ── HAVAL ────────────────────────────────────────────────────────────────
  {
    id: "haval", label: "Haval",
    models: [
      {
        id: "haval-h6", brand: "Haval", model: "H6", year: "2024",
        engines: [
          { id: "h6-com",   name: "Comfort",       price: 24500, horsepower: 169, acceleration: 7.8, consumption: "32 mpg", defaultColor: "#E8E0D0", variantLabel: "H6 Comfort · 1.5T Petrol · 169 PS" },
          { id: "h6-prem",  name: "Premium",       price: 29500, horsepower: 224, acceleration: 6.8, consumption: "29 mpg", defaultColor: "#C2C2BA", variantLabel: "H6 Premium · 2.0T Petrol · 224 PS", tag: "Popular" },
          { id: "h6-dhev",  name: "DHEV Hybrid",   price: 34500, horsepower: 243, acceleration: 5.9, consumption: "46 mpg", defaultColor: "#2C4A3C", variantLabel: "H6 DHEV · 1.5T Hybrid · 243 PS", tag: "Hybrid" },
        ],
      },
      {
        id: "haval-jolion", brand: "Haval", model: "Jolion", year: "2024",
        engines: [
          { id: "jol-std",  name: "Standard",      price: 19500, horsepower: 147, acceleration: 8.9, consumption: "33 mpg", defaultColor: "#F4F3EF", variantLabel: "Jolion Standard · 1.5T Petrol · 147 PS" },
          { id: "jol-lux",  name: "Luxury",        price: 22500, horsepower: 147, acceleration: 8.7, consumption: "33 mpg", defaultColor: "#C2C2BA", variantLabel: "Jolion Luxury · 1.5T Petrol · 147 PS", tag: "Popular" },
          { id: "jol-sup",  name: "Super Luxury",  price: 25500, horsepower: 147, acceleration: 8.5, consumption: "32 mpg", defaultColor: "#1C1C1C", variantLabel: "Jolion Super Luxury · 1.5T Petrol · 147 PS" },
        ],
      },
      {
        id: "haval-dargo", brand: "Haval", model: "Dargo", year: "2024",
        engines: [
          { id: "drg-2wd",  name: "2WD",           price: 28500, horsepower: 224, acceleration: 6.9, consumption: "29 mpg", defaultColor: "#4A4A4A", variantLabel: "Dargo 2WD · 2.0T Petrol · 224 PS" },
          { id: "drg-4wd",  name: "4WD",           price: 33500, horsepower: 224, acceleration: 6.6, consumption: "28 mpg", defaultColor: "#2C4A3C", variantLabel: "Dargo 4WD · 2.0T Petrol · 224 PS", tag: "Popular" },
        ],
      },
    ],
  },

  // ── BYD ──────────────────────────────────────────────────────────────────
  {
    id: "byd", label: "BYD",
    models: [
      {
        id: "byd-atto3", brand: "BYD", model: "Atto 3", year: "2024",
        engines: [
          { id: "atto-std", name: "Standard Range", price: 32000, horsepower: 201, acceleration: 7.3, consumption: "280 mi", defaultColor: "#19336A", variantLabel: "Atto 3 Standard · EV 60.5 kWh · 201 PS" },
          { id: "atto-ext", name: "Extended Range", price: 37500, horsepower: 201, acceleration: 7.3, consumption: "330 mi", defaultColor: "#1C1C1C", variantLabel: "Atto 3 Extended · EV 72.8 kWh · 201 PS", tag: "Popular" },
        ],
      },
      {
        id: "byd-seal", brand: "BYD", model: "Seal", year: "2024",
        engines: [
          { id: "seal-rwd", name: "Standard RWD",   price: 38000, horsepower: 310, acceleration: 5.9, consumption: "310 mi", defaultColor: "#1C1C1C", variantLabel: "Seal RWD · EV 82.5 kWh · 310 PS" },
          { id: "seal-awd", name: "Performance AWD",price: 46000, horsepower: 530, acceleration: 3.8, consumption: "285 mi", defaultColor: "#19336A", variantLabel: "Seal Performance · EV 82.5 kWh · 530 PS", tag: "Performance" },
        ],
      },
      {
        id: "byd-han", brand: "BYD", model: "Han", year: "2024",
        engines: [
          { id: "han-std",  name: "Standard",       price: 45000, horsepower: 197, acceleration: 7.9, consumption: "355 mi", defaultColor: "#1D3A5B", variantLabel: "Han Standard · EV 85.4 kWh · 197 PS" },
          { id: "han-lr",   name: "Long Range",     price: 52000, horsepower: 280, acceleration: 6.5, consumption: "405 mi", defaultColor: "#1C1C1C", variantLabel: "Han Long Range · EV 100 kWh · 280 PS", tag: "Popular" },
          { id: "han-perf", name: "AWD Performance",price: 58000, horsepower: 469, acceleration: 3.9, consumption: "360 mi", defaultColor: "#C2C2BA", variantLabel: "Han AWD · EV 100 kWh · 469 PS", tag: "Performance" },
        ],
      },
    ],
  },

  // ── CHERY ────────────────────────────────────────────────────────────────
  {
    id: "chery", label: "Chery",
    models: [
      {
        id: "tiggo7", brand: "Chery", model: "Tiggo 7 Pro", year: "2024",
        engines: [
          { id: "t7-com",   name: "1.5T Comfort",   price: 22000, horsepower: 156, acceleration: 8.3, consumption: "30 mpg", defaultColor: "#C2C2BA", variantLabel: "Tiggo 7 Pro Comfort · 1.5T Petrol · 156 PS" },
          { id: "t7-prem",  name: "2.0T Premium",   price: 27000, horsepower: 197, acceleration: 7.0, consumption: "28 mpg", defaultColor: "#485040", variantLabel: "Tiggo 7 Pro Premium · 2.0T Petrol · 197 PS", tag: "Popular" },
        ],
      },
      {
        id: "tiggo8", brand: "Chery", model: "Tiggo 8 Pro", year: "2024",
        engines: [
          { id: "t8-5s",    name: "2.0T 5-Seat",    price: 29000, horsepower: 197, acceleration: 7.4, consumption: "27 mpg", defaultColor: "#C4A020", variantLabel: "Tiggo 8 Pro · 2.0T Petrol · 197 PS" },
          { id: "t8-7s",    name: "2.0T 7-Seat",    price: 33000, horsepower: 197, acceleration: 7.4, consumption: "27 mpg", defaultColor: "#1C1C1C", variantLabel: "Tiggo 8 Pro 7-Seat · 2.0T Petrol · 197 PS", tag: "Popular" },
          { id: "t8-phev",  name: "PHEV Max",        price: 39000, horsepower: 326, acceleration: 5.7, consumption: "50 mpg", defaultColor: "#1D3A5B", variantLabel: "Tiggo 8 Pro PHEV · 1.6T Plug-in Hybrid · 326 PS" },
        ],
      },
    ],
  },

  // ── MG ───────────────────────────────────────────────────────────────────
  {
    id: "mg", label: "MG",
    models: [
      {
        id: "mg-zs", brand: "MG", model: "ZS", year: "2024",
        engines: [
          { id: "zs-pet",   name: "1.5T Petrol",    price: 19500, horsepower: 106, acceleration: 9.4, consumption: "34 mpg", defaultColor: "#B5302A", variantLabel: "ZS 1.5T Petrol · 1.5L · 106 PS" },
          { id: "zs-ev",    name: "EV Plus",         price: 27000, horsepower: 176, acceleration: 8.5, consumption: "264 mi", defaultColor: "#1C1C1C", variantLabel: "ZS EV Plus · 51 kWh · 176 PS", tag: "Electric" },
        ],
      },
      {
        id: "mg-hs", brand: "MG", model: "HS", year: "2024",
        engines: [
          { id: "hs-15",    name: "1.5T",            price: 24000, horsepower: 162, acceleration: 7.8, consumption: "31 mpg", defaultColor: "#E8E0D0", variantLabel: "HS 1.5T · 1.5T Petrol · 162 PS" },
          { id: "hs-20",    name: "2.0T Trophy",     price: 29500, horsepower: 218, acceleration: 6.8, consumption: "28 mpg", defaultColor: "#656565", variantLabel: "HS 2.0T Trophy · 2.0T Petrol · 218 PS", tag: "Popular" },
        ],
      },
    ],
  },

  // ── GAC ──────────────────────────────────────────────────────────────────
  {
    id: "gac", label: "GAC",
    models: [
      {
        id: "gac-gs4", brand: "GAC", model: "GS4", year: "2024",
        engines: [
          { id: "gs4-15",   name: "1.5T Comfort",   price: 21000, horsepower: 150, acceleration: 8.7, consumption: "31 mpg", defaultColor: "#C2C2BA", variantLabel: "GS4 Comfort · 1.5T Petrol · 150 PS" },
          { id: "gs4-phev", name: "PHEV",            price: 28000, horsepower: 241, acceleration: 6.1, consumption: "47 mpg", defaultColor: "#2E4A3E", variantLabel: "GS4 PHEV · 1.5T Plug-in Hybrid · 241 PS", tag: "Hybrid" },
        ],
      },
      {
        id: "gac-gs8", brand: "GAC", model: "GS8", year: "2024",
        engines: [
          { id: "gs8-20",   name: "2.0T",            price: 35000, horsepower: 252, acceleration: 7.0, consumption: "26 mpg", defaultColor: "#1D3A5B", variantLabel: "GS8 · 2.0T Petrol · 252 PS" },
          { id: "gs8-plat", name: "2.0T Platinum",   price: 42000, horsepower: 252, acceleration: 6.8, consumption: "25 mpg", defaultColor: "#1C1C1C", variantLabel: "GS8 Platinum · 2.0T Petrol · 252 PS", tag: "Flagship" },
        ],
      },
    ],
  },

  // ── GEELY ────────────────────────────────────────────────────────────────
  {
    id: "geely", label: "Geely",
    models: [
      {
        id: "geely-coolray", brand: "Geely", model: "Coolray", year: "2024",
        engines: [
          { id: "cool-std", name: "Standard",        price: 21000, horsepower: 177, acceleration: 6.0, consumption: "30 mpg", defaultColor: "#C2C2BA", variantLabel: "Coolray Standard · 1.5T Petrol · 177 PS" },
          { id: "cool-sp",  name: "Sport",           price: 24000, horsepower: 177, acceleration: 6.0, consumption: "30 mpg", defaultColor: "#4A2E60", variantLabel: "Coolray Sport · 1.5T Petrol · 177 PS", tag: "Popular" },
        ],
      },
      {
        id: "geely-emgrand", brand: "Geely", model: "Emgrand", year: "2024",
        engines: [
          { id: "emg-base", name: "1.5 Comfort",     price: 18500, horsepower: 102, acceleration: 9.5, consumption: "35 mpg", defaultColor: "#F4F3EF", variantLabel: "Emgrand Comfort · 1.5L Petrol · 102 PS" },
          { id: "emg-prem", name: "1.5T Premium",    price: 22000, horsepower: 177, acceleration: 7.9, consumption: "32 mpg", defaultColor: "#C2C2BA", variantLabel: "Emgrand Premium · 1.5T Petrol · 177 PS", tag: "Popular" },
        ],
      },
    ],
  },
];
