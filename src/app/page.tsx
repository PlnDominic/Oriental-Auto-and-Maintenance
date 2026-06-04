"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VehicleInfo from "@/components/VehicleInfo";
import VehicleDisplay from "@/components/VehicleDisplay";
import ConfigPanel from "@/components/ConfigPanel";
import ColourPicker from "@/components/ColourPicker";
import BrandBar from "@/components/BrandBar";
import CatalogueGrid from "@/components/CatalogueGrid";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCurrency } from "@/hooks/useCurrency";
import type { Vehicle, VehicleVariant, Condition } from "@/data/vehicles";

type Mode = "catalogue" | "configurator";

export default function App() {
  /* ── Global state ────────────────────────────────────────── */
  const [mode, setMode] = useState<Mode>("catalogue");
  const { currency, toggle: toggleCurrency, format: formatCurrency } = useCurrency();
  const isMobile = useIsMobile();

  /* ── Catalogue state ─────────────────────────────────────── */
  const [activeBrand, setActiveBrand] = useState("all");
  const [activeCondition, setActiveCondition] = useState<"all" | Condition>("all");

  /* ── Configurator state ──────────────────────────────────── */
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [activeVariantId, setActiveVariantId] = useState<string>("");
  const [vehicleColor, setVehicleColor] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState("engine");
  const [colourPanelOpen, setColourPanelOpen] = useState(false);

  /* ── Derived ─────────────────────────────────────────────── */
  const currentVariant: VehicleVariant | undefined = selectedVehicle?.variants.find(
    (v) => v.id === activeVariantId
  );

  /* ── Handlers ────────────────────────────────────────────── */
  function handleSelectVehicle(vehicle: Vehicle) {
    const firstVariant = vehicle.variants[0];
    setSelectedVehicle(vehicle);
    setActiveVariantId(firstVariant.id);
    setVehicleColor(vehicle.baseColorHex);
    setActiveCategory("engine");
    setColourPanelOpen(false);
    setMode("configurator");
  }

  function handleBackToCatalogue() {
    setMode("catalogue");
  }

  function handleVariantChange(id: string) {
    setActiveVariantId(id);
    setColourPanelOpen(false);
  }

  function handleCategoryChange(id: string) {
    setActiveCategory(id);
    setColourPanelOpen(id === "exterior");
  }

  /* ── Bottom panel (configurator) ─────────────────────────── */
  const bottomPanel = selectedVehicle && currentVariant ? (
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
          variants={selectedVehicle.variants}
          activeVariant={activeVariantId}
          currency={currency}
          onVariantChange={handleVariantChange}
          onChooseColours={() => {
            setColourPanelOpen(true);
            setActiveCategory("exterior");
          }}
        />
      )}
    </AnimatePresence>
  ) : null;

  /* ── Catalogue layout ────────────────────────────────────── */
  if (mode === "catalogue") {
    const headerHeight = isMobile ? 60 : 80;
    const brandBarHeight = isMobile ? 46 : 50;
    const topOffset = headerHeight + brandBarHeight;

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          overflowX: "hidden",
          transition: "background 0.3s ease",
        }}
      >
        <Header
          mode="catalogue"
          currency={currency}
          onCurrencyToggle={toggleCurrency}
        />
        <BrandBar
          activeBrand={activeBrand}
          onBrandChange={setActiveBrand}
          activeCondition={activeCondition}
          onConditionChange={setActiveCondition}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ paddingTop: topOffset }}
        >
          <CatalogueGrid
            activeBrand={activeBrand}
            activeCondition={activeCondition}
            currency={currency}
            onSelectVehicle={handleSelectVehicle}
          />
        </motion.div>
      </div>
    );
  }

  /* ── Configurator guard ──────────────────────────────────── */
  if (!selectedVehicle || !currentVariant) {
    return null;
  }

  /* ── Configurator — mobile ───────────────────────────────── */
  if (isMobile) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          transition: "background 0.3s ease",
        }}
      >
        <Header
          mode="configurator"
          price={currentVariant.priceUSD}
          currency={currency}
          onCurrencyToggle={toggleCurrency}
          onBack={handleBackToCatalogue}
        />
        <div style={{ marginTop: "60px", display: "flex", flexDirection: "column", flex: 1 }}>
          <Sidebar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <AnimatePresence mode="wait">
            <VehicleDisplay
              key={`display-${activeVariantId}`}
              activeVariant={activeVariantId}
              vehicleColor={vehicleColor}
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <VehicleInfo
              key={`info-${selectedVehicle.id}`}
              vehicle={selectedVehicle}
              activeVariant={currentVariant}
            />
          </AnimatePresence>
          {bottomPanel}
        </div>
      </div>
    );
  }

  /* ── Configurator — desktop ──────────────────────────────── */
  return (
    <div
      style={{
        height: "100vh",
        background: "var(--bg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.3s ease",
      }}
    >
      <Header
        mode="configurator"
        price={currentVariant.priceUSD}
        currency={currency}
        onCurrencyToggle={toggleCurrency}
        onBack={handleBackToCatalogue}
      />
      <main
        style={{
          marginTop: "80px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            overflow: "hidden",
            padding: "0 40px 0 24px",
            minHeight: 0,
          }}
        >
          <Sidebar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <div
            style={{
              width: "1px",
              height: "60%",
              background: "var(--border-divider)",
              margin: "0 32px",
              flexShrink: 0,
            }}
          />
          <AnimatePresence mode="wait">
            <VehicleInfo
              key={`${selectedVehicle.id}-${activeVariantId}`}
              vehicle={selectedVehicle}
              activeVariant={currentVariant}
            />
          </AnimatePresence>
          <VehicleDisplay activeVariant={activeVariantId} vehicleColor={vehicleColor} />
        </div>
        {bottomPanel}
      </main>
    </div>
  );
}
