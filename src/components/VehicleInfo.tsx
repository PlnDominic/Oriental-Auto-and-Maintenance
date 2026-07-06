"use client";

import { motion, AnimatePresence } from "framer-motion";

const actionLinks = [
  { label: "Book Test Drive", href: "#" },
  { label: "Request a Quote", href: "#" },
  { label: "Contact Sales", href: "#" },
];

interface VehicleInfoProps {
  vehicleName: string;
  variant: string;
  year: string;
}

export default function VehicleInfo({ vehicleName, variant, year }: VehicleInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="flex flex-col justify-center"
      style={{ width: "35%", minWidth: "320px", paddingRight: "48px" }}
    >
      {/* Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#A0A0A0",
          marginBottom: "16px",
        }}
      >
        In Our Showroom
      </motion.span>

      {/* Vehicle Name */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={vehicleName}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(40px, 4.5vw, 64px)",
            fontWeight: 700,
            color: "#111111",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            marginBottom: "12px",
          }}
        >
          {vehicleName}
          <span style={{ color: "#A0A0A0", fontWeight: 300 }}> {year}</span>
        </motion.h1>
      </AnimatePresence>

      {/* Variant */}
      <AnimatePresence mode="wait">
        <motion.p
          key={variant}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          style={{
            fontSize: "16px",
            fontWeight: 400,
            color: "#6B6B6B",
            letterSpacing: "0.04em",
            marginBottom: "48px",
          }}
        >
          {variant}
        </motion.p>
      </AnimatePresence>

      {/* Divider */}
      <div style={{ width: "40px", height: "1px", background: "#E5E5E5", marginBottom: "40px" }} />

      {/* Action links */}
      <div className="flex flex-col gap-4">
        {actionLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.07 }}
            className="group flex items-center gap-3 no-underline"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#111111",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            <span className="relative">
              {link.label}
              <span
                className="absolute bottom-[-1px] left-0 right-0 h-px bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
              />
            </span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-1 transition-transform duration-300"
              style={{ color: "#A0A0A0" }}
            >
              <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
