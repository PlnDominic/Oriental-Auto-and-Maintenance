"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VehicleInfo from "@/components/VehicleInfo";
import VehicleDisplay from "@/components/VehicleDisplay";
import ConfigPanel, { EngineOption } from "@/components/ConfigPanel";
import ColourPicker from "@/components/ColourPicker";
import VehicleSelector from "@/components/VehicleSelector";
import InvoiceModal from "@/components/InvoiceModal";
import { useIsMobile } from "@/hooks/useIsMobile";
import { BRANDS } from "@/data/vehicles";
import type { VehicleModel } from "@/data/vehicles";
import type { Currency } from "@/lib/currency";

/* ── Helpers ── */
function buildEngines(model: VehicleModel): EngineOption[] {
  return model.engines.map(({ defaultColor: _dc, variantLabel: _vl, ...rest }) => rest);
}

function buildEngineDefaults(model: VehicleModel): Record<string, string> {
  return Object.fromEntries(model.engines.map((e) => [e.id, e.defaultColor]));
}

function buildVariantLabels(model: VehicleModel): Record<string, string> {
  return Object.fromEntries(model.engines.map((e) => [e.id, e.variantLabel]));
}

/* ── Initial state from first brand/model ── */
const initialModel = BRANDS[0].models[0];

export default function ConfiguratorPage() {
  const isMobile = useIsMobile();

  /* Brand / model selection */
  const [activeBrand, setActiveBrand]   = useState(BRANDS[0].id);
  const [activeModel,  setActiveModel]  = useState<VehicleModel>(initialModel);

  /* Derived from selected model */
  const engines        = buildEngines(activeModel);
  const engineDefaults = buildEngineDefaults(activeModel);
  const variantLabels  = buildVariantLabels(activeModel);

  /* Configurator state */
  const [activeEngine,    setActiveEngine]    = useState(engines[0].id);
  const [vehicleColor,    setVehicleColor]    = useState(engineDefaults[engines[0].id]);
  const [activeCategory,  setActiveCategory]  = useState("engine");
  const [colourPanelOpen, setColourPanelOpen] = useState(false);
  const [invoiceOpen,     setInvoiceOpen]     = useState(false);
  const [currency,        setCurrency]        = useState<Currency>("USD");

  const currentEngine = engines.find((e) => e.id === activeEngine) ?? engines[0];

  /* Selector height (two rows) */
  const selectorHeight = isMobile ? 76 : 88;
  const headerHeight   = isMobile ? 60 : 80;
  const topOffset      = headerHeight + selectorHeight;

  /* ── Handlers ── */
  function handleBrandChange(brandId: string) {
    setActiveBrand(brandId);
  }

  function handleModelChange(model: VehicleModel) {
    setActiveModel(model);
    const newEngines  = buildEngines(model);
    const newDefaults = buildEngineDefaults(model);
    const firstId     = newEngines[0].id;
    setActiveEngine(firstId);
    setVehicleColor(newDefaults[firstId]);
    setColourPanelOpen(false);
    setActiveCategory("engine");
  }

  function handleEngineChange(id: string) {
    setActiveEngine(id);
    setVehicleColor(engineDefaults[id]);
    setColourPanelOpen(false);
  }

  function handleCategoryChange(id: string) {
    setActiveCategory(id);
    setColourPanelOpen(id === "exterior");
  }

  function toggleCurrency() {
    setCurrency((c) => (c === "USD" ? "GHS" : "USD"));
  }

  /* ── Shared invoice modal (rendered once, outside layout branches) ── */
  const invoiceModal = (
    <InvoiceModal
      isOpen={invoiceOpen}
      onClose={() => setInvoiceOpen(false)}
      vehicleName={`${activeModel.brand} ${activeModel.model}`}
      variant={variantLabels[activeEngine] ?? ""}
      year={parseInt(activeModel.year, 10)}
      price={currentEngine.price}
      colorHex={vehicleColor}
      currency={currency}
    />
  );

  /* ── Bottom panel ── */
  const bottomPanel = (
    <AnimatePresence mode="wait">
      {colourPanelOpen ? (
        <ColourPicker
          key="colour-picker"
          selectedHex={vehicleColor}
          currency={currency}
          onColorChange={setVehicleColor}
          onClose={() => {
            setColourPanelOpen(false);
            setActiveCategory("engine");
          }}
        />
      ) : (
        <ConfigPanel
          key={`config-${activeModel.id}`}
          engines={engines}
          activeEngine={activeEngine}
          currency={currency}
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
      <div style={{ minHeight: "100vh", background: "var(--bg)", transition: "background 0.3s ease" }}>
        <Header price={currentEngine.price} currency={currency} onToggleCurrency={toggleCurrency} />
        <VehicleSelector
          activeBrand={activeBrand}
          activeModelId={activeModel.id}
          onBrandChange={handleBrandChange}
          onModelChange={handleModelChange}
        />
        <div style={{ marginTop: topOffset, display: "flex", flexDirection: "column" }}>
          <Sidebar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <AnimatePresence mode="wait">
            <VehicleDisplay key={`display-${activeEngine}`} activeEngine={activeEngine} vehicleColor={vehicleColor} />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <VehicleInfo
              key={`info-${activeEngine}`}
              vehicleName={`${activeModel.brand} ${activeModel.model}`}
              year={parseInt(activeModel.year, 10)}
              variant={variantLabels[activeEngine] ?? ""}
              onRequestInvoice={() => setInvoiceOpen(true)}
            />
          </AnimatePresence>
          {bottomPanel}
        </div>
        {invoiceModal}
      </div>
    );
  }

  /* ── Desktop layout ── */
  return (
    <div style={{ height: "100vh", background: "var(--bg)", overflow: "hidden", display: "flex", flexDirection: "column", transition: "background 0.3s ease" }}>
      <Header price={currentEngine.price} currency={currency} onToggleCurrency={toggleCurrency} />
      <VehicleSelector
        activeBrand={activeBrand}
        activeModelId={activeModel.id}
        onBrandChange={handleBrandChange}
        onModelChange={handleModelChange}
      />
      <main style={{ marginTop: topOffset, display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <div style={{ display: "flex", flex: 1, alignItems: "center", overflow: "hidden", padding: "0 40px 0 24px", minHeight: 0 }}>
          <Sidebar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <div style={{ width: "1px", height: "60%", background: "var(--border-divider)", margin: "0 32px", flexShrink: 0 }} />
          <AnimatePresence mode="wait">
            <VehicleInfo
              key={`${activeModel.id}-${activeEngine}`}
              vehicleName={`${activeModel.brand} ${activeModel.model}`}
              year={parseInt(activeModel.year, 10)}
              variant={variantLabels[activeEngine] ?? ""}
              onRequestInvoice={() => setInvoiceOpen(true)}
            />
          </AnimatePresence>
          <VehicleDisplay activeEngine={activeEngine} vehicleColor={vehicleColor} />
        </div>
        {bottomPanel}
      </main>
      {invoiceModal}
    </div>
  );
}
