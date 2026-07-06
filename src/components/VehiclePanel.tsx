"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Vehicle } from "@/data/vehicles";

interface VehiclePanelProps {
  vehicles: Vehicle[];
  activeVehicle: string;
  onVehicleChange: (id: string) => void;
}

export default function VehiclePanel({ vehicles, activeVehicle, onVehicleChange }: VehiclePanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="w-full shrink-0"
      style={{
        background: "#F7F7F7",
        borderTop: "1px solid #E5E5E5",
        padding: "32px 40px 32px 40px",
      }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#111111",
          }}
        >
          Available Vehicles
        </span>
        <span style={{ fontSize: "11px", color: "#A0A0A0", letterSpacing: "0.05em" }}>
          Select a vehicle to view
        </span>
      </div>

      {/* Cards row */}
      <div className="flex items-stretch gap-4 overflow-x-auto pb-1">
        {vehicles.map((vehicle, i) => {
          const isActive = activeVehicle === vehicle.id;
          return (
            <motion.button
              key={vehicle.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.05 }}
              onClick={() => onVehicleChange(vehicle.id)}
              whileHover={{ y: -2, boxShadow: "0 6px 24px rgba(0,0,0,0.1)" }}
              className="relative flex flex-col text-left cursor-pointer shrink-0"
              style={{
                width: "220px",
                padding: "0 0 14px 0",
                background: isActive ? "#FFFFFF" : "#F8F8F8",
                border: isActive ? "2px solid #111111" : "1px solid #E5E5E5",
                boxShadow: isActive ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
                overflow: "hidden",
              }}
            >
              {/* Thumbnail */}
              <div className="relative w-full" style={{ height: "110px", background: "#EDEDED" }}>
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  sizes="220px"
                  style={{ objectFit: "cover" }}
                />
                {/* Tag */}
                {vehicle.tag && (
                  <span
                    className="absolute top-2 right-2"
                    style={{
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      background: "#111111",
                      padding: "2px 7px",
                    }}
                  >
                    {vehicle.tag}
                  </span>
                )}
              </div>

              {/* Name + year */}
              <div style={{ padding: "12px 16px 0 16px" }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#111111",
                    letterSpacing: "-0.01em",
                    marginBottom: "2px",
                  }}
                >
                  {vehicle.name}
                </div>
                <div style={{ fontSize: "12px", fontWeight: 500, color: "#6B6B6B" }}>
                  {vehicle.year}
                </div>
              </div>

              {/* Specs */}
              <div className="flex flex-col gap-1 mt-3" style={{ padding: "0 16px" }}>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "11px", color: "#A0A0A0", letterSpacing: "0.04em" }}>Engine</span>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "#111111" }}>{vehicle.engine}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "11px", color: "#A0A0A0", letterSpacing: "0.04em" }}>Fuel</span>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "#111111" }}>{vehicle.fuel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "11px", color: "#A0A0A0", letterSpacing: "0.04em" }}>Seats</span>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "#111111" }}>{vehicle.seats}</span>
                </div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="vehicle-active"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </motion.button>
          );
        })}

        {/* CTA card */}
        <motion.a
          href="#"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 + vehicles.length * 0.05 }}
          whileHover={{ scale: 1.02, background: "#1A1A1A" }}
          className="flex flex-col items-start justify-between shrink-0 cursor-pointer no-underline"
          style={{
            width: "160px",
            minHeight: "120px",
            padding: "18px 20px",
            background: "#111111",
            border: "none",
            transition: "background 0.2s ease",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            Book a
            <br />
            Test Drive
          </span>
          <div className="flex items-center justify-between w-full mt-auto">
            <span style={{ fontSize: "11px", color: "#6B6B6B", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Contact Us
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M10 5L13 8L10 11" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.a>
      </div>
    </motion.section>
  );
}
