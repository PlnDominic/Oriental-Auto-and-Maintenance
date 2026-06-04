"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Vehicle, VehicleVariant } from "@/data/vehicles";

const actionLinks = [
  { label: "Save Configuration", href: "#" },
  { label: "Plan Test Drive", href: "#" },
  { label: "Request Invoice", href: "#" },
];

const ORIGIN_LINE: Record<string, string> = {
  japan: "Imported from Japan · Delivered to Ghana",
  china: "Imported from China · Delivered to Ghana",
};

interface VehicleInfoProps {
  vehicle: Vehicle;
  activeVariant: VehicleVariant;
}

export default function VehicleInfo({ vehicle, activeVariant }: VehicleInfoProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 16 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="flex flex-col justify-center"
      style={{
        width: isMobile ? "100%" : "35%",
        minWidth: isMobile ? "auto" : "300px",
        padding: isMobile ? "24px 20px 28px" : "0",
        paddingRight: isMobile ? "20px" : "48px",
        borderBottom: isMobile ? "1px solid var(--border-divider)" : "none",
        transition: "border-color 0.3s ease",
      }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: isMobile ? "8px" : "12px",
          transition: "color 0.3s ease",
        }}
      >
        Your Configuration
      </motion.span>

      {/* Brand */}
      <AnimatePresence mode="wait">
        <motion.div
          key={vehicle.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: isMobile ? "12px" : "13px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginBottom: "4px",
            transition: "color 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {vehicle.brand}
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "2px 7px",
              background: vehicle.condition === "new" ? "var(--text-primary)" : "var(--border)",
              color: vehicle.condition === "new" ? "var(--bg)" : "var(--text-secondary)",
              transition: "background 0.3s ease, color 0.3s ease",
            }}
          >
            {vehicle.condition === "new" ? "New" : "Used"}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Model + Year */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={vehicle.model}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: isMobile ? "34px" : "clamp(38px, 4vw, 58px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            marginBottom: "8px",
            transition: "color 0.3s ease",
          }}
        >
          {vehicle.model}
          <span
            style={{
              color: "var(--text-muted)",
              fontWeight: 300,
              transition: "color 0.3s ease",
            }}
          >
            {" "}
            {vehicle.year}
          </span>
        </motion.h1>
      </AnimatePresence>

      {/* Variant subtitle */}
      <AnimatePresence mode="wait">
        <motion.p
          key={activeVariant.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          style={{
            fontSize: isMobile ? "13px" : "15px",
            fontWeight: 400,
            color: "var(--text-secondary)",
            letterSpacing: "0.02em",
            marginBottom: isMobile ? "8px" : "16px",
            transition: "color 0.3s ease",
          }}
        >
          {activeVariant.name} · {activeVariant.engine} · {activeVariant.transmission}
        </motion.p>
      </AnimatePresence>

      {/* Origin line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          fontSize: "11px",
          fontWeight: 400,
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
          marginBottom: isMobile ? "20px" : "40px",
          transition: "color 0.3s ease",
        }}
      >
        {ORIGIN_LINE[vehicle.origin] ?? "Delivered to Ghana"}
      </motion.p>

      <div
        style={{
          width: "40px",
          height: "1px",
          background: "var(--border)",
          marginBottom: isMobile ? "20px" : "36px",
          transition: "background 0.3s ease",
        }}
      />

      {/* Action links */}
      <div className="flex flex-col" style={{ gap: isMobile ? "14px" : "16px" }}>
        {actionLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.07 }}
            className="group flex items-center gap-3 no-underline"
            style={{
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: 500,
              color: "var(--text-primary)",
              textDecoration: "none",
              letterSpacing: "0.01em",
              transition: "color 0.3s ease",
            }}
          >
            <span className="relative">
              {link.label}
              <span
                className="absolute bottom-[-1px] left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{
                  background: "var(--accent-line)",
                  transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-1 transition-transform duration-300 shrink-0"
              style={{ color: "var(--text-muted)" }}
            >
              <path
                d="M3 8H13M10 5L13 8L10 11"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
