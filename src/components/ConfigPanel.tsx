"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export interface EngineOption {
  id: string;
  name: string;
  price: number;
  horsepower: number;
  acceleration: number;
  consumption: string;
  tag?: string;
}

interface ConfigPanelProps {
  engines: EngineOption[];
  activeEngine: string;
  onEngineChange: (id: string) => void;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price);
}

export default function ConfigPanel({ engines, activeEngine, onEngineChange }: ConfigPanelProps) {
  const isMobile = useIsMobile();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="w-full shrink-0"
      style={{
        background: "var(--bg-panel)",
        borderTop: "1px solid var(--border)",
        padding: isMobile ? "20px 20px 28px" : "32px 40px",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: isMobile ? "14px" : "20px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-primary)", transition: "color 0.3s ease" }}>
          Engine Options
        </span>
        <span style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.05em", transition: "color 0.3s ease" }}>
          Select powertrain
        </span>
      </div>

      <div className="flex items-stretch overflow-x-auto" style={{ gap: isMobile ? "10px" : "16px", paddingBottom: "4px" }}>
        {engines.map((engine, i) => {
          const isActive = activeEngine === engine.id;
          return (
            <motion.button
              key={engine.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.08 }}
              onClick={() => onEngineChange(engine.id)}
              whileHover={{ y: -2, boxShadow: `0 6px 24px var(--shadow-md)` }}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col justify-between text-left cursor-pointer shrink-0"
              style={{
                width: isMobile ? "160px" : "220px",
                minHeight: isMobile ? "110px" : "120px",
                padding: isMobile ? "14px 16px" : "18px 20px",
                background: isActive ? "var(--bg-card-active)" : "var(--bg-card-inactive)",
                border: isActive ? `2px solid var(--text-primary)` : `1px solid var(--border)`,
                boxShadow: isActive ? `0 4px 20px var(--shadow-sm)` : "none",
                transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {engine.tag && (
                <span className="absolute top-2 right-2" style={{ fontSize: "8px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--bg)", background: "var(--text-primary)", padding: "2px 6px", transition: "background 0.3s ease, color 0.3s ease" }}>
                  {engine.tag}
                </span>
              )}

              <div>
                <div style={{ fontSize: isMobile ? "13px" : "14px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em", marginBottom: "2px", transition: "color 0.3s ease" }}>
                  {engine.name}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={`price-${engine.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: isMobile ? "12px" : "13px", fontWeight: 500, color: "var(--text-secondary)", transition: "color 0.3s ease" }}>
                    {formatPrice(engine.price)}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col" style={{ gap: "3px", marginTop: "10px" }}>
                {[
                  ["Power", `${engine.horsepower} hp`],
                  ["0–60 mph", `${engine.acceleration}s`],
                  ...(!isMobile ? [["Efficiency", engine.consumption]] : []),
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span style={{ fontSize: "10px", color: "var(--text-muted)", transition: "color 0.3s ease" }}>{label}</span>
                    <span style={{ fontSize: "10px", fontWeight: 500, color: "var(--text-primary)", transition: "color 0.3s ease" }}>{value}</span>
                  </div>
                ))}
              </div>

              {isActive && (
                <motion.div layoutId="engine-active" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "var(--text-primary)" }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} />
              )}
            </motion.button>
          );
        })}

        {/* CTA card — intentionally stays dark in both modes */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 + engines.length * 0.08 }}
          whileHover={{ scale: 1.02, background: "#1A1A1A" }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-col items-start justify-between shrink-0 cursor-pointer"
          style={{ width: isMobile ? "120px" : "160px", minHeight: isMobile ? "110px" : "120px", padding: isMobile ? "14px 16px" : "18px 20px", background: "#111111", border: "none", transition: "background 0.2s ease" }}
        >
          <span style={{ fontSize: isMobile ? "13px" : "14px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
            Choose<br />Colours
          </span>
          <div className="flex items-center justify-between w-full mt-auto">
            <span style={{ fontSize: "10px", color: "#555555", letterSpacing: "0.08em", textTransform: "uppercase" }}>Explore</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M10 5L13 8L10 11" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.button>
      </div>
    </motion.section>
  );
}
