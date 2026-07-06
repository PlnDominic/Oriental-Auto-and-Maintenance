"use client";

import { motion } from "framer-motion";
import { brands } from "@/data/vehicles";

interface SidebarProps {
  activeBrand: string;
  onBrandChange: (brand: string) => void;
}

export default function Sidebar({ activeBrand, onBrandChange }: SidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-2 md:gap-3 shrink-0 w-full md:w-[100px] overflow-x-auto md:overflow-visible pb-2 md:pb-0"
    >
      {brands.map((brand, i) => {
        const isActive = activeBrand === brand;
        return (
          <motion.button
            key={brand}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.05 }}
            onClick={() => onBrandChange(brand)}
            className="relative flex flex-col items-center justify-center cursor-pointer group shrink-0"
            style={{
              width: "84px",
              height: "44px",
              background: isActive ? "#FFFFFF" : "transparent",
              border: isActive ? "1px solid #E5E5E5" : "1px solid transparent",
              boxShadow: isActive ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
            }}
            whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
          >
            {/* Left accent bar */}
            {isActive && (
              <motion.div
                layoutId="sidebar-accent"
                className="absolute left-0 top-2 bottom-2 w-0.5 bg-black"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )}

            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: isActive ? "#111111" : "#A0A0A0",
                transition: "color 0.25s ease",
              }}
              className="group-hover:text-[#111111]"
            >
              {brand}
            </span>
          </motion.button>
        );
      })}
    </motion.aside>
  );
}
