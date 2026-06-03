"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VehicleInfo from "@/components/VehicleInfo";
import VehicleDisplay from "@/components/VehicleDisplay";
import ConfigPanel, { EngineOption } from "@/components/ConfigPanel";
import ColourPicker from "@/components/ColourPicker";
import { useIsMobile } from "@/hooks/useIsMobile";

const engines: EngineOption[] = [
  { id: "35-tfsi", name: "35 TFSI",         price: 41848, horsepower: 150, acceleration: 8.9, consumption: "38 mpg" },
  { id: "40-tfsi", name: "40 TFSI S",       price: 46490, horsepower: 197, acceleration: 6.8, consumption: "34 mpg", tag: "Popular" },
  { id: "45-tfsi", name: "45 TFSI quattro", price: 52950, horsepower: 245, acceleration: 5.4, consumption: "30 mpg" },
  { id: "tts",     name: "TTS quattro",     price: 59900, horsepower: 288, acceleration: 4.9, consumption: "28 mpg", tag: "Sport" },
];

const engineDefaults: Record<string, string> = {
  "35-tfsi": "#C2C2BA",
  "40-tfsi": "#E8E0D0",
  "45-tfsi": "#1D3A5B",
  "tts":     "#1C1C1C",
};

const variants: Record<string, string> = {
  "35-tfsi": "35 TFSI S Tronic — 150 PS",
  "40-tfsi": "40 TFSI S Tronic — 197 PS",
  "45-tfsi": "45 TFSI quattro S Tronic — 245 PS",
  "tts":     "TTS Roadster quattro — 288 PS",
};

export default function ConfiguratorPage() {
  const [activeCategory, setActiveCategory]     = useState("engine");
  const [activeEngine,   setActiveEngine]        = useState("40-tfsi");
  const [vehicleColor,   setVehicleColor]        = useState(engineDefaults["40-tfsi"]);
  const [colourPanelOpen, setColourPanelOpen]    = useState(false);
  const isMobile = useIsMobile();

  const currentEngine = engines.find((e) => e.id === activeEngine) ?? engines[1];

  function handleEngineChange(id: string) {
    setActiveEngine(id);
    setVehicleColor(engineDefaults[id]);
    setColourPanelOpen(false);
  }

  function handleCategoryChange(id: string) {
    setActiveCategory(id);
    if (id === "exterior") {
      setColourPanelOpen(true);
    } else {
      setColourPanelOpen(false);
    }
  }

  /* ── Bottom panel (shared by both layouts) ── */
  const bottomPanel = (
    <AnimatePresence mode="wait">
      {colourPanelOpen ? (
        <ColourPicker
          key="colour-picker"
          selectedHex={vehicleColor}
          onColorChange={setVehicleColor}
          onClose={() => {
            setColourPanelOpen(false);
            setActiveCategory("engine");
          }}
        />
      ) : (
        <ConfigPanel
          key="config-panel"
          engines={engines}
          activeEngine={activeEngine}
          onEngineChange={handleEngineChange}
          onChooseColours={() => {
            setColourPanelOpen(true);
            setActiveCategory("exterior");
          }}
        />
      )}
    </AnimatePresence>
  );

  /* ── Mobile layout ── */
  if (isMobile) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", transition: "background 0.3s ease" }}>
        <Header price={currentEngine.price} />
        <div style={{ marginTop: "60px", display: "flex", flexDirection: "column", flex: 1 }}>
          <Sidebar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <AnimatePresence mode="wait">
            <VehicleDisplay key={`display-${activeEngine}`} activeEngine={activeEngine} vehicleColor={vehicleColor} />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <VehicleInfo key={`info-${activeEngine}`} vehicleName="Audi TT" year={2024} variant={variants[activeEngine]} />
          </AnimatePresence>
          {bottomPanel}
        </div>
      </div>
    );
  }

  /* ── Desktop layout ── */
  return (
    <div style={{ height: "100vh", background: "var(--bg)", overflow: "hidden", display: "flex", flexDirection: "column", transition: "background 0.3s ease" }}>
      <Header price={currentEngine.price} />
      <main style={{ marginTop: "80px", display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <div style={{ display: "flex", flex: 1, alignItems: "center", overflow: "hidden", padding: "0 40px 0 24px", minHeight: 0 }}>
          <Sidebar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <div style={{ width: "1px", height: "60%", background: "var(--border-divider)", margin: "0 32px", flexShrink: 0 }} />
          <AnimatePresence mode="wait">
            <VehicleInfo key={activeEngine} vehicleName="Audi TT" year={2024} variant={variants[activeEngine]} />
          </AnimatePresence>
          <VehicleDisplay activeEngine={activeEngine} vehicleColor={vehicleColor} />
        </div>
        {bottomPanel}
      </main>
    </div>
  );
}
