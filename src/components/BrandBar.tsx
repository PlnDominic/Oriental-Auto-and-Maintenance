"use client";

import { motion } from "framer-motion";
import { BRANDS } from "@/data/vehicles";
import type { Condition } from "@/data/vehicles";
import { useIsMobile } from "@/hooks/useIsMobile";

interface BrandBarProps {
  activeBrand: string;
  onBrandChange: (id: string) => void;
  activeCondition: "all" | Condition;
  onConditionChange: (c: "all" | Condition) => void;
}

const CONDITIONS = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "used", label: "Used" },
] as const;

export default function BrandBar({
  activeBrand,
  onBrandChange,
  activeCondition,
  onConditionChange,
}: BrandBarProps) {
  const isMobile = useIsMobile();
  const headerHeight = isMobile ? 60 : 80;
  const barHeight = isMobile ? 46 : 50;

  return (
    <div
      className="fixed left-0 right-0 z-40 flex items-center"
      style={{
        top: headerHeight,
        height: barHeight,
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        padding: isMobile ? "0 20px" : "0 60px",
        gap: "24px",
        transition: "background 0.3s ease, border-color 0.3s ease",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      {/* Brand tabs */}
      <div
        className="flex items-center"
        style={{ gap: isMobile ? "18px" : "28px", flex: 1, overflowX: "auto", scrollbarWidth: "none" }}
      >
        {BRANDS.map((brand) => {
          const isActive = activeBrand === brand.id;
          return (
            <button
              key={brand.id}
              onClick={() => onBrandChange(brand.id)}
              className="relative shrink-0 cursor-pointer"
              style={{
                background: "none",
                border: "none",
                padding: "0",
                paddingBottom: "2px",
                fontSize: isMobile ? "11px" : "12px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              {brand.label}
              {isActive && (
                <motion.div
                  layoutId="brand-indicator"
                  className="absolute left-0 right-0"
                  style={{
                    bottom: isMobile ? "-14px" : "-15px",
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

      {/* Condition segmented control */}
      <div
        className="flex items-center shrink-0"
        style={{
          border: "1px solid var(--border)",
          background: "var(--bg-card-inactive)",
          padding: "2px",
          gap: "1px",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        {CONDITIONS.map((c) => {
          const isActive = activeCondition === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onConditionChange(c.id as "all" | Condition)}
              style={{
                background: isActive ? "var(--text-primary)" : "transparent",
                border: "none",
                color: isActive ? "var(--bg)" : "var(--text-muted)",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                padding: isMobile ? "4px 10px" : "5px 13px",
                cursor: "pointer",
                transition: "background 0.2s ease, color 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
