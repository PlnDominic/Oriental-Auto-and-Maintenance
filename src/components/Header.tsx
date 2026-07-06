"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  vehicleCount: number;
}

export default function Header({ vehicleCount }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-[60px]"
      style={{
        height: "80px",
        background: "#FFFFFF",
        borderBottom: "1px solid #F1F1F1",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col leading-none">
          <span
            className="font-bold tracking-widest uppercase"
            style={{ fontSize: "15px", color: "#111111", letterSpacing: "0.15em" }}
          >
            ORIENTAL
          </span>
          <span
            className="font-light tracking-widest uppercase"
            style={{ fontSize: "10px", color: "#6B6B6B", letterSpacing: "0.25em" }}
          >
            AUTO &amp; MAINTENANCE
          </span>
        </div>
      </div>

      {/* Center Navigation */}
      <nav className="hidden md:flex items-center gap-10 lg:gap-[60px]">
        {["Our Vehicles", "Services", "About", "Contact"].map((item, i) => (
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

      {/* Fleet availability */}
      <div className="flex flex-col items-end">
        <span style={{ fontSize: "11px", color: "#A0A0A0", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
          Available Now
        </span>
        <motion.span
          key={vehicleCount}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "22px", fontWeight: 600, color: "#111111", letterSpacing: "-0.02em" }}
        >
          {vehicleCount} Vehicles
        </motion.span>
      </div>
    </motion.header>
  );
}
