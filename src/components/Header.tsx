"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface HeaderProps {
  price: number;
}

export default function Header({ price }: HeaderProps) {
  const isMobile = useIsMobile();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        height: isMobile ? "60px" : "80px",
        background: "#FFFFFF",
        borderBottom: "1px solid #F1F1F1",
        padding: isMobile ? "0 20px" : "0 60px",
      }}
    >
      {/* Logo */}
      <div className="flex flex-col leading-none">
        <span
          style={{
            fontSize: isMobile ? "13px" : "15px",
            fontWeight: 700,
            color: "#111111",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          ORIENTAL
        </span>
        <span
          style={{
            fontSize: isMobile ? "8px" : "10px",
            fontWeight: 300,
            color: "#6B6B6B",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {isMobile ? "AUTO" : "AUTO & MAINTENANCE"}
        </span>
      </div>

      {/* Center nav — desktop only */}
      {!isMobile && (
        <nav className="flex items-center" style={{ gap: "60px" }}>
          {["My Vehicle", "Brochure", "Dealers", "Contact"].map((item, i) => (
            <a
              key={item}
              href="#"
              className="group relative"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: i === 0 ? "#111111" : "#6B6B6B",
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
            >
              {item}
              <span
                className="absolute bottom-[-2px] left-0 right-0 h-px bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
              />
            </a>
          ))}
        </nav>
      )}

      {/* Price */}
      <div className="flex flex-col items-end">
        {!isMobile && (
          <span
            style={{
              fontSize: "11px",
              color: "#A0A0A0",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Current Configuration
          </span>
        )}
        <motion.span
          key={price}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: isMobile ? "17px" : "22px",
            fontWeight: 600,
            color: "#111111",
            letterSpacing: "-0.02em",
          }}
        >
          {formattedPrice}
        </motion.span>
      </div>
    </motion.header>
  );
}
