"use client";

import { motion } from "framer-motion";
import { BRANDS } from "@/data/vehicles";
import type { VehicleModel } from "@/data/vehicles";
import { useIsMobile } from "@/hooks/useIsMobile";

interface VehicleSelectorProps {
  activeBrand: string;
  activeModelId: string;
  onBrandChange: (brandId: string) => void;
  onModelChange: (model: VehicleModel) => void;
}

export default function VehicleSelector({
  activeBrand,
  activeModelId,
  onBrandChange,
  onModelChange,
}: VehicleSelectorProps) {
  const isMobile = useIsMobile();
  const headerHeight = isMobile ? 60 : 80;
  const rowHeight = isMobile ? 38 : 44;

  const currentBrand = BRANDS.find((b) => b.id === activeBrand) ?? BRANDS[0];

  return (
    <div
      className="fixed left-0 right-0 z-40"
      style={{ top: headerHeight }}
    >
      {/* Brand row */}
      <div
        className="flex items-center overflow-x-auto"
        style={{
          height: rowHeight,
          background: "var(--bg)",
          borderBottom: "1px solid var(--border-divider)",
          padding: isMobile ? "0 20px" : "0 24px 0 88px",
          gap: isMobile ? "20px" : "32px",
          scrollbarWidth: "none",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        {BRANDS.map((brand) => {
          const isActive = activeBrand === brand.id;
          return (
            <button
              key={brand.id}
              onClick={() => {
                onBrandChange(brand.id);
                onModelChange(brand.models[0]);
              }}
              className="relative shrink-0 cursor-pointer"
              style={{
                background: "none",
                border: "none",
                padding: "0",
                fontSize: isMobile ? "11px" : "12px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              {brand.label}
              {isActive && (
                <motion.div
                  layoutId="brand-underline"
                  className="absolute left-0 right-0"
                  style={{
                    bottom: isMobile ? -(rowHeight / 2 - 1) : -(rowHeight / 2 - 1),
                    height: "1.5px",
                    background: "var(--text-primary)",
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Model row */}
      <div
        className="flex items-center overflow-x-auto"
        style={{
          height: rowHeight,
          background: "var(--bg-soft)",
          borderBottom: "1px solid var(--border)",
          padding: isMobile ? "0 20px" : "0 24px 0 88px",
          gap: isMobile ? "18px" : "28px",
          scrollbarWidth: "none",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        {currentBrand.models.map((model) => {
          const isActive = activeModelId === model.id;
          return (
            <button
              key={model.id}
              onClick={() => onModelChange(model)}
              className="relative shrink-0 cursor-pointer"
              style={{
                background: "none",
                border: "none",
                padding: "0",
                fontSize: isMobile ? "11px" : "12px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                letterSpacing: "0.06em",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              {model.model}
              {isActive && (
                <motion.div
                  layoutId="model-underline"
                  className="absolute left-0 right-0"
                  style={{
                    bottom: isMobile ? -(rowHeight / 2 - 1) : -(rowHeight / 2 - 1),
                    height: "1.5px",
                    background: "var(--text-primary)",
                    opacity: 0.5,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
