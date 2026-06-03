"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VehicleInfo from "@/components/VehicleInfo";
import VehicleDisplay from "@/components/VehicleDisplay";
import ConfigPanel, { EngineOption } from "@/components/ConfigPanel";

const engines: EngineOption[] = [
  {
    id: "35-tfsi",
    name: "35 TFSI",
    price: 41848,
    horsepower: 150,
    acceleration: 8.9,
    consumption: "38 mpg",
  },
  {
    id: "40-tfsi",
    name: "40 TFSI S",
    price: 46490,
    horsepower: 197,
    acceleration: 6.8,
    consumption: "34 mpg",
    tag: "Popular",
  },
  {
    id: "45-tfsi",
    name: "45 TFSI quattro",
    price: 52950,
    horsepower: 245,
    acceleration: 5.4,
    consumption: "30 mpg",
  },
  {
    id: "tts",
    name: "TTS quattro",
    price: 59900,
    horsepower: 288,
    acceleration: 4.9,
    consumption: "28 mpg",
    tag: "Sport",
  },
];

const vehicleColors: Record<string, string> = {
  "35-tfsi": "#C8C8C0",
  "40-tfsi": "#E8E0D0",
  "45-tfsi": "#2A3A4A",
  "tts": "#1A1A1A",
};

const variants: Record<string, string> = {
  "35-tfsi": "35 TFSI S Tronic — 150 PS",
  "40-tfsi": "40 TFSI S Tronic — 197 PS",
  "45-tfsi": "45 TFSI quattro S Tronic — 245 PS",
  "tts": "TTS Roadster quattro — 288 PS",
};

export default function ConfiguratorPage() {
  const [activeCategory, setActiveCategory] = useState("engine");
  const [activeEngine, setActiveEngine] = useState("40-tfsi");

  const currentEngine = engines.find((e) => e.id === activeEngine) ?? engines[1];

  return (
    <div
      className="flex flex-col"
      style={{
        height: "100vh",
        background: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Header price={currentEngine.price} />

      {/* Main area — fills remaining height below header */}
      <main
        className="flex flex-col flex-1 overflow-hidden"
        style={{ marginTop: "80px" }}
      >
        {/* Hero section */}
        <div
          className="flex flex-1 items-center overflow-hidden"
          style={{ padding: "0 40px 0 24px", minHeight: 0 }}
        >
          {/* Sidebar */}
          <Sidebar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Vertical divider */}
          <div
            style={{
              width: "1px",
              height: "60%",
              background: "#F0F0F0",
              margin: "0 32px",
              flexShrink: 0,
            }}
          />

          {/* Vehicle info */}
          <AnimatePresence mode="wait">
            <VehicleInfo
              key={activeEngine}
              vehicleName="Audi TT"
              year={2024}
              variant={variants[activeEngine]}
            />
          </AnimatePresence>

          {/* Vehicle display */}
          <VehicleDisplay
            activeEngine={activeEngine}
            vehicleColor={vehicleColors[activeEngine] ?? "#C8C8C0"}
          />
        </div>

        {/* Config panel */}
        <ConfigPanel
          engines={engines}
          activeEngine={activeEngine}
          onEngineChange={setActiveEngine}
        />
      </main>
    </div>
  );
}
