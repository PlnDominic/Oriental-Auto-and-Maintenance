"use client";

import { motion, AnimatePresence } from "framer-motion";

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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ConfigPanel({ engines, activeEngine, onEngineChange }: ConfigPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="w-full shrink-0"
      style={{
        background: "#F7F7F7",
        borderTop: "1px solid #E5E5E5",
        padding: "32px 40px 32px 40px",
      }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#111111",
          }}
        >
          Engine Options
        </span>
        <span style={{ fontSize: "11px", color: "#A0A0A0", letterSpacing: "0.05em" }}>
          Select powertrain
        </span>
      </div>

      {/* Cards row */}
      <div className="flex items-stretch gap-4 overflow-x-auto pb-1">
        {engines.map((engine, i) => {
          const isActive = activeEngine === engine.id;
          return (
            <motion.button
              key={engine.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.08 }}
              onClick={() => onEngineChange(engine.id)}
              whileHover={{ y: -2, boxShadow: "0 6px 24px rgba(0,0,0,0.1)" }}
              className="relative flex flex-col justify-between text-left cursor-pointer shrink-0"
              style={{
                width: "220px",
                minHeight: "120px",
                padding: "18px 20px",
                background: isActive ? "#FFFFFF" : "#F8F8F8",
                border: isActive ? "2px solid #111111" : "1px solid #E5E5E5",
                boxShadow: isActive ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {/* Tag */}
              {engine.tag && (
                <span
                  className="absolute top-3 right-3"
                  style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    background: "#111111",
                    padding: "2px 7px",
                  }}
                >
                  {engine.tag}
                </span>
              )}

              {/* Engine name + price */}
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#111111",
                    letterSpacing: "-0.01em",
                    marginBottom: "2px",
                  }}
                >
                  {engine.name}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`price-${engine.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#6B6B6B",
                    }}
                  >
                    {formatPrice(engine.price)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Specs */}
              <div className="flex flex-col gap-1 mt-3">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "11px", color: "#A0A0A0", letterSpacing: "0.04em" }}>Power</span>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "#111111" }}>{engine.horsepower} hp</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "11px", color: "#A0A0A0", letterSpacing: "0.04em" }}>0-60 mph</span>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "#111111" }}>{engine.acceleration}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "11px", color: "#A0A0A0", letterSpacing: "0.04em" }}>Efficiency</span>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "#111111" }}>{engine.consumption}</span>
                </div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="engine-active"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </motion.button>
          );
        })}

        {/* CTA card */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 + engines.length * 0.08 }}
          whileHover={{ scale: 1.02, background: "#1A1A1A" }}
          className="flex flex-col items-start justify-between shrink-0 cursor-pointer"
          style={{
            width: "160px",
            minHeight: "120px",
            padding: "18px 20px",
            background: "#111111",
            border: "none",
            transition: "background 0.2s ease",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            Choose
            <br />
            Colours
          </span>
          <div className="flex items-center justify-between w-full mt-auto">
            <span style={{ fontSize: "11px", color: "#6B6B6B", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Explore
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M10 5L13 8L10 11" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.button>
      </div>
    </motion.section>
  );
}
