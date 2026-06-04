"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const actionLinks = [
  { label: "Save Configuration", href: "#" },
  { label: "Plan Test Drive", href: "#" },
  { label: "Request Invoice", href: "#" },
];

interface VehicleInfoProps {
  vehicleName: string;
  variant: string;
  year: number;
}

export default function VehicleInfo({ vehicleName, variant, year }: VehicleInfoProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 16 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="flex flex-col justify-center"
      style={{
        width: isMobile ? "100%" : "35%",
        minWidth: isMobile ? "auto" : "320px",
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
        style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: isMobile ? "10px" : "16px", transition: "color 0.3s ease" }}
      >
        Your Configuration
      </motion.span>

      <AnimatePresence mode="wait">
        <motion.h1
          key={vehicleName}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: isMobile ? "36px" : "clamp(40px, 4.5vw, 64px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.025em", lineHeight: 1, marginBottom: "10px", transition: "color 0.3s ease" }}
        >
          {vehicleName}
          <span style={{ color: "var(--text-muted)", fontWeight: 300, transition: "color 0.3s ease" }}> {year}</span>
        </motion.h1>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={variant}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          style={{ fontSize: isMobile ? "13px" : "16px", fontWeight: 400, color: "var(--text-secondary)", letterSpacing: "0.04em", marginBottom: isMobile ? "20px" : "48px", transition: "color 0.3s ease" }}
        >
          {variant}
        </motion.p>
      </AnimatePresence>

      <div style={{ width: "40px", height: "1px", background: "var(--border)", marginBottom: isMobile ? "20px" : "40px", transition: "background 0.3s ease" }} />

      <div className="flex flex-col" style={{ gap: isMobile ? "14px" : "16px" }}>
        {actionLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.07 }}
            className="group flex items-center gap-3 no-underline"
            style={{ fontSize: isMobile ? "13px" : "14px", fontWeight: 500, color: "var(--text-primary)", textDecoration: "none", letterSpacing: "0.01em", transition: "color 0.3s ease" }}
          >
            <span className="relative">
              {link.label}
              <span
                className="absolute bottom-[-1px] left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: "var(--accent-line)", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
              />
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform duration-300 shrink-0" style={{ color: "var(--text-muted)" }}>
              <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
