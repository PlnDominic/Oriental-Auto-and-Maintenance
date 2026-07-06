"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Vehicle } from "@/data/vehicles";

interface VehicleDisplayProps {
  vehicle: Vehicle;
}

export default function VehicleDisplay({ vehicle }: VehicleDisplayProps) {
  const [currentView, setCurrentView] = useState(0);

  // start from the front view whenever the vehicle changes
  useEffect(() => {
    setCurrentView(0);
  }, [vehicle.id]);

  const views = [
    { label: "Front View", image: vehicle.image, credit: vehicle.credit },
    ...(vehicle.views ?? []),
  ];
  const view = views[Math.min(currentView, views.length - 1)];
  const total = views.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="flex flex-col justify-center items-center"
      style={{ width: "55%", position: "relative" }}
    >
      {/* Vehicle image area */}
      <div className="relative w-full flex items-center justify-center" style={{ height: "420px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${vehicle.id}-${view.image}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
            style={{ padding: "0 24px" }}
          >
            <Image
              src={view.image}
              alt={`${vehicle.name} ${vehicle.year} — ${view.label}`}
              fill
              sizes="(max-width: 1200px) 60vw, 800px"
              priority
              style={{ objectFit: "contain" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Photo credit */}
      <a
        href={view.credit.page}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: "9px",
          color: "#C0C0C0",
          textDecoration: "none",
          marginTop: "4px",
          letterSpacing: "0.03em",
        }}
      >
        Photo: {view.credit.artist} · {view.credit.license} · Wikimedia Commons
      </a>

      {/* Slider controls */}
      <div className="flex items-center gap-6 mt-2">
        {/* Progress line */}
        <div className="flex items-center gap-2">
          <div
            className="relative overflow-hidden"
            style={{ width: "120px", height: "1px", background: "#E5E5E5" }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full bg-black"
              animate={{ width: `${((currentView + 1) / total) * 100}%` }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span style={{ fontSize: "11px", color: "#A0A0A0", fontWeight: 500, whiteSpace: "nowrap" }}>
            {currentView + 1} / {total}
          </span>
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView((v) => (v - 1 + total) % total)}
            className="flex items-center justify-center transition-all duration-200 hover:bg-gray-100"
            style={{
              width: "32px",
              height: "32px",
              border: "1px solid #E5E5E5",
              background: "white",
              cursor: "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7L9 3" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentView((v) => (v + 1) % total)}
            className="flex items-center justify-center transition-all duration-200 hover:bg-gray-100"
            style={{
              width: "32px",
              height: "32px",
              border: "1px solid #E5E5E5",
              background: "white",
              cursor: "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 11L9 7L5 3" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* View label */}
        <AnimatePresence mode="wait">
          <motion.span
            key={`${vehicle.id}-${currentView}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: "11px", color: "#A0A0A0", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            {view.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
