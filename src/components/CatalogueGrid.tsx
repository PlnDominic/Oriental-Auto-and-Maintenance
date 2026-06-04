"use client";

import { motion } from "framer-motion";
import { vehicles, GHS_RATE } from "@/data/vehicles";
import type { Vehicle, Condition } from "@/data/vehicles";
import { useIsMobile } from "@/hooks/useIsMobile";

interface CatalogueGridProps {
  activeBrand: string;
  activeCondition: "all" | Condition;
  currency: "USD" | "GHS";
  onSelectVehicle: (vehicle: Vehicle) => void;
}

function formatPrice(usd: number, currency: "USD" | "GHS"): string {
  if (currency === "GHS") {
    return `GH₵ ${Math.round(usd * GHS_RATE).toLocaleString()}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(usd);
}

function VehicleSilhouette({ bodyType, color }: { bodyType: string; color: string }) {
  const opacity = 0.18;

  if (bodyType === "pickup") {
    return (
      <svg viewBox="0 0 220 90" fill="none" style={{ width: "80%", opacity }}>
        <path d="M15 65 L15 44 Q15 38 21 38 L82 38 L98 20 L155 20 L165 38 L200 38 Q205 38 205 44 L205 65 Z" fill="white" />
        <circle cx="52" cy="65" r="14" fill="white" />
        <circle cx="168" cy="65" r="14" fill="white" />
        <rect x="100" y="38" width="60" height="27" fill="white" opacity="0.5" />
      </svg>
    );
  }
  if (bodyType === "sedan") {
    return (
      <svg viewBox="0 0 220 80" fill="none" style={{ width: "80%", opacity }}>
        <path d="M12 58 L12 42 Q12 35 20 35 L62 35 L82 16 L142 16 L164 35 L200 35 Q208 35 208 42 L208 58 Z" fill="white" />
        <circle cx="52" cy="58" r="13" fill="white" />
        <circle cx="168" cy="58" r="13" fill="white" />
      </svg>
    );
  }
  // SUV / crossover default
  return (
    <svg viewBox="0 0 220 90" fill="none" style={{ width: "80%", opacity }}>
      <path d="M12 65 L12 36 Q12 28 20 28 L66 28 L82 12 L142 12 L162 28 L200 28 Q208 28 208 36 L208 65 Z" fill="white" />
      <circle cx="54" cy="65" r="15" fill="white" />
      <circle cx="166" cy="65" r="15" fill="white" />
    </svg>
  );
}

const ORIGIN_LABELS: Record<string, string> = {
  japan: "Imported from Japan",
  china: "Imported from China",
};

const BODY_LABELS: Record<string, string> = {
  suv: "SUV",
  crossover: "Crossover",
  sedan: "Sedan",
  pickup: "Pickup",
};

export default function CatalogueGrid({
  activeBrand,
  activeCondition,
  currency,
  onSelectVehicle,
}: CatalogueGridProps) {
  const isMobile = useIsMobile();

  const filtered = vehicles.filter((v) => {
    if (activeBrand !== "all" && v.brand.toLowerCase() !== activeBrand) return false;
    if (activeCondition !== "all" && v.condition !== activeCondition) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: "320px" }}
      >
        <span style={{ fontSize: "14px", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
          No vehicles match your filters.
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: isMobile ? "16px" : "24px",
        padding: isMobile ? "24px 20px 48px" : "40px 60px 60px",
      }}
    >
      {filtered.map((vehicle, i) => {
        const startingPrice = Math.min(...vehicle.variants.map((v) => v.priceUSD));

        return (
          <motion.button
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: Math.min(i * 0.05, 0.4) }}
            whileHover={{ y: -5, boxShadow: "0 12px 40px var(--shadow-md)" }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelectVehicle(vehicle)}
            className="text-left cursor-pointer w-full"
            style={{
              background: "var(--bg-card-inactive)",
              border: "1px solid var(--border)",
              padding: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            }}
          >
            {/* Hero — coloured swatch with silhouette */}
            <div
              style={{
                height: isMobile ? "150px" : "185px",
                background: vehicle.baseColorHex,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <VehicleSilhouette bodyType={vehicle.bodyType} color={vehicle.baseColorHex} />

              {/* Top-left badges */}
              <div
                className="absolute flex items-center"
                style={{ top: "12px", left: "12px", gap: "6px" }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    background: vehicle.condition === "new" ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {vehicle.condition === "new" ? "New" : "Used"}
                </span>
                {vehicle.featured && (
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      background: "rgba(255,255,255,0.88)",
                      color: "#111",
                    }}
                  >
                    Featured
                  </span>
                )}
              </div>

              {/* Top-right origin */}
              <span
                className="absolute"
                style={{
                  top: "12px",
                  right: "12px",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {vehicle.origin === "japan" ? "Japan" : "China"}
              </span>

              {/* Bottom-left body type */}
              <span
                className="absolute"
                style={{
                  bottom: "12px",
                  left: "12px",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {BODY_LABELS[vehicle.bodyType] ?? vehicle.bodyType}
              </span>
            </div>

            {/* Card body */}
            <div style={{ padding: isMobile ? "16px 18px 18px" : "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Brand + year */}
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "5px",
                  transition: "color 0.3s ease",
                }}
              >
                {vehicle.brand} · {vehicle.year}
              </div>

              {/* Model */}
              <div
                style={{
                  fontSize: isMobile ? "20px" : "22px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  marginBottom: "8px",
                  transition: "color 0.3s ease",
                }}
              >
                {vehicle.model}
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.45,
                  marginBottom: "18px",
                  transition: "color 0.3s ease",
                  flex: 1,
                }}
              >
                {vehicle.tagline}
              </div>

              {/* Footer row */}
              <div className="flex items-end justify-between" style={{ marginTop: "auto" }}>
                <div>
                  <div
                    style={{
                      fontSize: "9px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginBottom: "2px",
                      transition: "color 0.3s ease",
                    }}
                  >
                    From
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "17px" : "19px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.025em",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {formatPrice(startingPrice, currency)}
                  </div>
                </div>

                <div className="flex items-center" style={{ gap: "5px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      letterSpacing: "0.04em",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Configure
                  </span>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8H13M10 5L13 8L10 11"
                      stroke="var(--text-secondary)"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
