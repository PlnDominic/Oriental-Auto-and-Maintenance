"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface VehicleDisplayProps {
  activeEngine: string;
  vehicleColor: string;
}

const vehicleViews = [
  "Front 3/4",
  "Side Profile",
  "Rear 3/4",
  "Interior",
  "Detail",
  "Overhead",
];

// SVG car illustration — a clean, premium side-profile silhouette
function CarSilhouette({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 900 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", maxHeight: "340px" }}
    >
      {/* Shadow */}
      <ellipse cx="450" cy="375" rx="320" ry="14" fill="rgba(0,0,0,0.07)" />

      {/* Body */}
      <path
        d="M120 300 L120 240 C120 240 180 180 230 160 L340 130 C370 123 400 120 430 120 L520 120 C560 120 590 130 620 145 L720 195 C750 210 780 230 800 255 L810 275 L810 300 Z"
        fill={color}
        stroke="#C8C8C8"
        strokeWidth="1.5"
      />

      {/* Roof */}
      <path
        d="M310 120 C330 95 360 78 395 72 L510 72 C545 72 570 82 595 100 L640 130 L300 130 Z"
        fill={color}
        stroke="#C8C8C8"
        strokeWidth="1.5"
      />

      {/* Windshield */}
      <path
        d="M315 128 C332 104 358 86 390 80 L500 80 C528 80 548 90 568 104 L608 128 Z"
        fill="rgba(180,210,240,0.35)"
        stroke="#B0C8D8"
        strokeWidth="1"
      />

      {/* Rear window */}
      <path
        d="M608 128 L640 128 L635 108 C622 90 608 80 590 78 L568 104 Z"
        fill="rgba(180,210,240,0.3)"
        stroke="#B0C8D8"
        strokeWidth="1"
      />

      {/* Door lines */}
      <path
        d="M420 128 L416 295"
        stroke="#B0B0B0"
        strokeWidth="1"
      />
      <path
        d="M580 128 L577 295"
        stroke="#B0B0B0"
        strokeWidth="1"
      />

      {/* Door handles */}
      <rect x="440" y="215" width="28" height="5" rx="2.5" fill="#A0A0A0" />
      <rect x="598" y="215" width="28" height="5" rx="2.5" fill="#A0A0A0" />

      {/* Headlight */}
      <path
        d="M125 255 C138 245 155 238 172 238 L190 238 L185 268 L120 268 Z"
        fill="rgba(240,245,255,0.9)"
        stroke="#C0C8D0"
        strokeWidth="1"
      />
      <path
        d="M130 255 L182 255"
        stroke="#E8F0FF"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Tail light */}
      <path
        d="M800 252 L805 252 L810 268 L798 268 Z"
        fill="rgba(255,80,60,0.7)"
        stroke="#C04040"
        strokeWidth="1"
      />

      {/* Front wheel well */}
      <path
        d="M160 300 C160 265 185 245 220 245 C255 245 280 265 280 300"
        stroke={color}
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
      />

      {/* Rear wheel well */}
      <path
        d="M620 300 C620 265 645 245 680 245 C715 245 740 265 740 300"
        stroke={color}
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
      />

      {/* Front wheel */}
      <circle cx="220" cy="310" r="52" fill="#1A1A1A" />
      <circle cx="220" cy="310" r="38" fill="#2A2A2A" />
      <circle cx="220" cy="310" r="18" fill="#D0D0D0" />
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1={220 + 18 * Math.cos((deg * Math.PI) / 180)}
          y1={310 + 18 * Math.sin((deg * Math.PI) / 180)}
          x2={220 + 36 * Math.cos((deg * Math.PI) / 180)}
          y2={310 + 36 * Math.sin((deg * Math.PI) / 180)}
          stroke="#B0B0B0"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      <circle cx="220" cy="310" r="5" fill="#888" />

      {/* Rear wheel */}
      <circle cx="680" cy="310" r="52" fill="#1A1A1A" />
      <circle cx="680" cy="310" r="38" fill="#2A2A2A" />
      <circle cx="680" cy="310" r="18" fill="#D0D0D0" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1={680 + 18 * Math.cos((deg * Math.PI) / 180)}
          y1={310 + 18 * Math.sin((deg * Math.PI) / 180)}
          x2={680 + 36 * Math.cos((deg * Math.PI) / 180)}
          y2={310 + 36 * Math.sin((deg * Math.PI) / 180)}
          stroke="#B0B0B0"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      <circle cx="680" cy="310" r="5" fill="#888" />

      {/* Ground line */}
      <line x1="100" y1="362" x2="830" y2="362" stroke="#E5E5E5" strokeWidth="1" />

      {/* Underside/rocker panels */}
      <path d="M280 300 L620 300 L620 310 L280 310 Z" fill="#888888" />
    </svg>
  );
}

export default function VehicleDisplay({ activeEngine, vehicleColor }: VehicleDisplayProps) {
  const [currentView, setCurrentView] = useState(0);

  const totalViews = vehicleViews.length;

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
            key={`${activeEngine}-${currentView}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex items-center justify-center"
            style={{ padding: "0 24px" }}
          >
            <CarSilhouette color={vehicleColor} />
          </motion.div>
        </AnimatePresence>
      </div>

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
              animate={{ width: `${((currentView + 1) / totalViews) * 100}%` }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span style={{ fontSize: "11px", color: "#A0A0A0", fontWeight: 500, whiteSpace: "nowrap" }}>
            {currentView + 1} / {totalViews}
          </span>
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView((v) => (v - 1 + totalViews) % totalViews)}
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
            onClick={() => setCurrentView((v) => (v + 1) % totalViews)}
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
            key={currentView}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: "11px", color: "#A0A0A0", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            {vehicleViews[currentView]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
