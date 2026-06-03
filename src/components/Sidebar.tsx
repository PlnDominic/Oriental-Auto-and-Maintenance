"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const categories = [
  {
    id: "engine",
    label: "Engine",
    icon: (active: boolean, size: number) => (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <rect x="4" y="10" width="20" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 10V7M14 10V6M20 10V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 16H1M27 16H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="10" y="13" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "exterior",
    label: "Exterior",
    icon: (active: boolean, size: number) => (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <path d="M3 18L7 12L11 9H17L21 12L25 18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 18H26V20C26 20.5523 25.5523 21 25 21H3C2.44772 21 2 20.5523 2 20V18Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="21" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="21" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 9V12H17V9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "wheels",
    label: "Wheels",
    icon: (active: boolean, size: number) => (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 4V10.5M14 17.5V24M4 14H10.5M17.5 14H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.05 7.05L11.54 11.54M16.46 16.46L20.95 20.95M20.95 7.05L16.46 11.54M11.54 16.46L7.05 20.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "interior",
    label: "Interior",
    icon: (active: boolean, size: number) => (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <path d="M5 20V11C5 9.89543 5.89543 9 7 9H21C22.1046 9 23 9.89543 23 11V20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 20H25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 9V7C8 6.44772 8.44772 6 9 6H19C19.5523 6 20 6.44772 20 7V9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 15H23" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 15V20M16 15V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "packages",
    label: "Packages",
    icon: (active: boolean, size: number) => (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <path d="M14 3L25 8.5V19.5L14 25L3 19.5V8.5L14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 3V25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8.5L14 14L25 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8.5 5.75L19.5 11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  const isMobile = useIsMobile();

  /* ── Mobile: horizontal scrollable tabs ── */
  if (isMobile) {
    return (
      <div
        className="flex overflow-x-auto"
        style={{
          gap: "8px",
          padding: "12px 20px 12px",
          borderBottom: "1px solid #F0F0F0",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1 cursor-pointer shrink-0"
              style={{
                padding: "10px 14px",
                background: isActive ? "#111111" : "#F5F5F5",
                border: "none",
                transition: "all 0.2s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div style={{ color: isActive ? "#FFFFFF" : "#6B6B6B" }}>
                {cat.icon(isActive, 22)}
              </div>
              <span
                style={{
                  fontSize: "8px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isActive ? "#FFFFFF" : "#6B6B6B",
                }}
              >
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    );
  }

  /* ── Desktop: vertical sidebar ── */
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="flex flex-col items-center justify-center gap-3 shrink-0"
      style={{ width: "100px" }}
    >
      {categories.map((cat, i) => {
        const isActive = activeCategory === cat.id;
        return (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.07 }}
            onClick={() => onCategoryChange(cat.id)}
            className="relative flex flex-col items-center justify-center gap-2 cursor-pointer group"
            style={{
              width: "72px",
              height: "72px",
              background: isActive ? "#FFFFFF" : "transparent",
              border: isActive ? "1px solid #E5E5E5" : "1px solid transparent",
              boxShadow: isActive ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
            }}
            whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
          >
            {isActive && (
              <motion.div
                layoutId="sidebar-accent"
                className="absolute left-0 top-2 bottom-2 w-0.5 bg-black"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <div
              style={{
                color: isActive ? "#111111" : "#A0A0A0",
                transition: "color 0.25s ease",
              }}
            >
              {cat.icon(isActive, 28)}
            </div>
            <span
              style={{
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: isActive ? "#111111" : "#A0A0A0",
                transition: "color 0.25s ease",
              }}
            >
              {cat.label}
            </span>
          </motion.button>
        );
      })}
    </motion.aside>
  );
}
