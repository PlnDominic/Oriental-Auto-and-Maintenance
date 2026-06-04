"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { formatPremium, type Currency } from "@/lib/currency";

export interface PaintColour {
  id: string;
  name: string;
  hex: string;
  price: number;
}

export const colourSections: { finish: string; label: string; colours: PaintColour[] }[] = [
  {
    finish: "solid",
    label: "Solid",
    colours: [
      { id: "glacier-white",  name: "Glacier White",  hex: "#F4F3EF", price: 0    },
      { id: "jet-black",      name: "Jet Black",       hex: "#1C1C1C", price: 0    },
      { id: "ibis-red",       name: "Ibis Red",        hex: "#B5302A", price: 595  },
      { id: "navarra-blue",   name: "Navarra Blue",    hex: "#1D3A5B", price: 595  },
      { id: "misano-red",     name: "Misano Red",      hex: "#8C1F1A", price: 595  },
    ],
  },
  {
    finish: "metallic",
    label: "Metallic",
    colours: [
      { id: "floret-silver",  name: "Floret Silver",   hex: "#C2C2BA", price: 695  },
      { id: "daytona-grey",   name: "Daytona Grey",    hex: "#656565", price: 695  },
      { id: "gotland-green",  name: "Gotland Green",   hex: "#2C4A3C", price: 895  },
      { id: "tango-orange",   name: "Tango Orange",    hex: "#C55620", price: 895  },
      { id: "python-yellow",  name: "Python Yellow",   hex: "#C4A020", price: 895  },
      { id: "ara-blue",       name: "Ara Blue Crystal",hex: "#19336A", price: 895  },
      { id: "chronos-grey",   name: "Chronos Grey",    hex: "#484848", price: 695  },
      { id: "aurora-violet",  name: "Aurora Violet",   hex: "#4A2E60", price: 995  },
    ],
  },
  {
    finish: "matte",
    label: "Matte",
    colours: [
      { id: "camo-green",     name: "Camouflage Green",hex: "#485040", price: 1295 },
      { id: "arrow-grey",     name: "Arrow Grey",      hex: "#585856", price: 1295 },
      { id: "ultra-black",    name: "Ultra Black",     hex: "#0C0C0C", price: 1295 },
      { id: "dew-silver",     name: "Dew Silver",      hex: "#CECEC6", price: 1295 },
    ],
  },
];

function swatchBackground(finish: string, hex: string) {
  if (finish === "metallic") {
    return `linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.18) 100%), ${hex}`;
  }
  return hex;
}

interface ColourPickerProps {
  selectedHex: string;
  currency: Currency;
  onColorChange: (hex: string) => void;
  onClose: () => void;
}

export default function ColourPicker({ selectedHex, currency, onColorChange, onClose }: ColourPickerProps) {
  const isMobile = useIsMobile();
  const [activeFinish, setActiveFinish] = useState("metallic");
  const [hovered, setHovered] = useState<PaintColour | null>(null);

  const activeSection = colourSections.find((s) => s.finish === activeFinish)!;

  const currentColour =
    hovered ??
    colourSections.flatMap((s) => s.colours).find((c) => c.hex === selectedHex) ??
    null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full shrink-0"
      style={{
        background: "var(--bg-panel)",
        borderTop: "1px solid var(--border)",
        padding: isMobile ? "20px 20px 28px" : "28px 40px 32px",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between" style={{ marginBottom: "18px" }}>
        {/* Back button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 group cursor-pointer"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:-translate-x-0.5 transition-transform duration-200">
            <path d="M9 11L5 7L9 3" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.3s ease" }}>
            Engine Options
          </span>
        </button>

        {/* Section title */}
        <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-primary)", transition: "color 0.3s ease" }}>
          Exterior Colour
        </span>

        {/* Selected / hovered colour info */}
        <AnimatePresence mode="wait">
          {currentColour ? (
            <motion.div
              key={currentColour.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2"
            >
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: swatchBackground(activeFinish, currentColour.hex),
                  border: "1px solid var(--border)",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "0.01em", whiteSpace: "nowrap", transition: "color 0.3s ease" }}>
                {currentColour.name}
                <span style={{ color: "var(--text-muted)", marginLeft: "6px" }}>
                  {formatPremium(currentColour.price, currency)}
                </span>
              </span>
            </motion.div>
          ) : (
            <motion.span key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Select a colour
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Finish tabs + swatches */}
      <div className="flex items-start gap-6">
        {/* Finish category tabs */}
        <div className="flex flex-col gap-1 shrink-0" style={{ paddingTop: "2px" }}>
          {colourSections.map((s) => {
            const isActive = activeFinish === s.finish;
            return (
              <button
                key={s.finish}
                onClick={() => setActiveFinish(s.finish)}
                className="text-left cursor-pointer"
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px 0",
                  fontSize: "11px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transition: "color 0.2s ease",
                  borderLeft: isActive ? "2px solid var(--accent-line)" : "2px solid transparent",
                  paddingLeft: "8px",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Vertical divider */}
        <div style={{ width: "1px", alignSelf: "stretch", background: "var(--border-divider)", flexShrink: 0, transition: "background 0.3s ease" }} />

        {/* Swatch grid */}
        <div className="flex-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFinish}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap"
              style={{ gap: isMobile ? "10px" : "12px" }}
            >
              {activeSection.colours.map((colour, i) => {
                const isSelected = colour.hex === selectedHex;
                const swatchSize = isMobile ? 36 : 44;

                return (
                  <motion.button
                    key={colour.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => onColorChange(colour.hex)}
                    onMouseEnter={() => setHovered(colour)}
                    onMouseLeave={() => setHovered(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer relative"
                    style={{
                      width: swatchSize,
                      height: swatchSize,
                      borderRadius: "50%",
                      background: swatchBackground(activeFinish, colour.hex),
                      border: "none",
                      padding: 0,
                      outline: "none",
                      boxShadow: isSelected
                        ? `0 0 0 2.5px var(--bg), 0 0 0 4.5px var(--text-primary)`
                        : `0 0 0 1px var(--border)`,
                      transition: "box-shadow 0.2s ease, transform 0.2s ease",
                      flexShrink: 0,
                    }}
                    title={`${colour.name} — ${formatPremium(colour.price, currency)}`}
                  >
                    {activeFinish === "matte" && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          background: "rgba(0,0,0,0.06)",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2 6L5 9L10 3"
                            stroke={colour.hex > "#888888" ? "#111111" : "#FFFFFF"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
