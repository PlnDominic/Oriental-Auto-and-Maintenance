"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useTheme } from "@/hooks/useTheme";
import { GHS_RATE } from "@/data/vehicles";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.06 1.06M11.54 11.54l1.06 1.06M3.4 12.6l1.06-1.06M11.54 4.46l1.06-1.06" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13.5 9.5A6 6 0 016.5 2.5a6 6 0 100 11 6 6 0 007-4z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface HeaderProps {
  mode?: "catalogue" | "configurator";
  price?: number;
  currency: "USD" | "GHS";
  onCurrencyToggle: () => void;
  onBack?: () => void;
}

export default function Header({ mode = "catalogue", price, currency, onCurrencyToggle, onBack }: HeaderProps) {
  const isMobile = useIsMobile();
  const { isDark, toggle } = useTheme();

  const formattedPrice =
    price != null
      ? currency === "GHS"
        ? `GH₵ ${Math.round(price * GHS_RATE).toLocaleString()}`
        : new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(price)
      : null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        height: isMobile ? "60px" : "80px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border-header)",
        padding: isMobile ? "0 20px" : "0 60px",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Left: Logo or back button in configurator */}
      <AnimatePresence mode="wait" initial={false}>
        {mode === "configurator" && onBack ? (
          <motion.button
            key="back"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
            onClick={onBack}
            className="flex items-center cursor-pointer"
            style={{ gap: "8px", background: "none", border: "none", padding: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 13L5 8L10 3" stroke="var(--text-primary)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              style={{
                fontSize: isMobile ? "11px" : "13px",
                fontWeight: 500,
                color: "var(--text-secondary)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
            >
              {isMobile ? "Catalogue" : "Back to Catalogue"}
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="logo"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col leading-none"
          >
            <span
              style={{
                fontSize: isMobile ? "13px" : "15px",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
            >
              ORIENTAL
            </span>
            <span
              style={{
                fontSize: isMobile ? "8px" : "10px",
                fontWeight: 300,
                color: "var(--text-secondary)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
            >
              {isMobile ? "AUTO" : "AUTO & MAINTENANCE"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center nav — catalogue mode, desktop only */}
      {mode === "catalogue" && !isMobile && (
        <nav className="flex items-center" style={{ gap: "52px" }}>
          {["Catalogue", "Financing", "Dealers", "Contact"].map((item, i) => (
            <a
              key={item}
              href="#"
              className="group relative"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.3s ease",
              }}
            >
              {item}
              <span
                className="absolute bottom-[-2px] left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{
                  background: "var(--accent-line)",
                  transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </a>
          ))}
        </nav>
      )}

      {/* Right: currency toggle + theme toggle + price */}
      <div className="flex items-center" style={{ gap: isMobile ? "10px" : "16px" }}>
        {/* Currency toggle */}
        <motion.button
          onClick={onCurrencyToggle}
          whileTap={{ scale: 0.92 }}
          className="flex items-center justify-center cursor-pointer"
          style={{
            height: "32px",
            padding: "0 10px",
            background: "transparent",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            gap: "6px",
            transition: "border-color 0.3s ease, color 0.3s ease",
          }}
          title={`Switch to ${currency === "USD" ? "GHS" : "USD"}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currency}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              {currency}
            </motion.span>
          </AnimatePresence>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
            <path d="M1 3.5L5 1L9 3.5M1 6.5L5 9L9 6.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>

        {/* Theme toggle */}
        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.92 }}
          className="flex items-center justify-center cursor-pointer"
          style={{
            width: "32px",
            height: "32px",
            background: "transparent",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            transition: "border-color 0.3s ease, color 0.3s ease",
          }}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "sun" : "moon"}
              initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex" }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Price — configurator mode only */}
        {mode === "configurator" && formattedPrice != null && (
          <div className="flex flex-col items-end">
            {!isMobile && (
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  transition: "color 0.3s ease",
                }}
              >
                Configuration
              </span>
            )}
            <AnimatePresence mode="wait">
              <motion.span
                key={`${price}-${currency}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: isMobile ? "17px" : "22px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  transition: "color 0.3s ease",
                }}
              >
                {formattedPrice}
              </motion.span>
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.header>
  );
}
