"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VehicleInfo from "@/components/VehicleInfo";
import VehicleDisplay from "@/components/VehicleDisplay";
import VehiclePanel from "@/components/VehiclePanel";
import { vehicles } from "@/data/vehicles";

export default function ShowroomPage() {
  const [activeBrand, setActiveBrand] = useState("All");
  const [activeVehicle, setActiveVehicle] = useState(vehicles[0].id);

  const filteredVehicles =
    activeBrand === "All"
      ? vehicles
      : vehicles.filter((v) => v.brand === activeBrand);

  const currentVehicle =
    filteredVehicles.find((v) => v.id === activeVehicle) ?? filteredVehicles[0];

  const handleBrandChange = (brand: string) => {
    setActiveBrand(brand);
    const pool = brand === "All" ? vehicles : vehicles.filter((v) => v.brand === brand);
    if (!pool.some((v) => v.id === activeVehicle)) {
      setActiveVehicle(pool[0].id);
    }
  };

  return (
    <div
      className="flex flex-col"
      style={{
        height: "100vh",
        background: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Header vehicleCount={vehicles.length} />

      {/* Main area — fills remaining height below header */}
      <main
        className="flex flex-col flex-1 overflow-hidden"
        style={{ marginTop: "80px" }}
      >
        {/* Hero section */}
        <div
          className="flex flex-1 items-center overflow-hidden"
          style={{ padding: "0 40px 0 24px", minHeight: 0 }}
        >
          {/* Brand filter */}
          <Sidebar activeBrand={activeBrand} onBrandChange={handleBrandChange} />

          {/* Vertical divider */}
          <div
            style={{
              width: "1px",
              height: "60%",
              background: "#F0F0F0",
              margin: "0 32px",
              flexShrink: 0,
            }}
          />

          {/* Vehicle info */}
          <AnimatePresence mode="wait">
            <VehicleInfo
              key={currentVehicle.id}
              vehicleName={currentVehicle.name}
              year={currentVehicle.year}
              variant={currentVehicle.variant}
            />
          </AnimatePresence>

          {/* Vehicle display */}
          <VehicleDisplay vehicle={currentVehicle} />
        </div>

        {/* Vehicle selector panel */}
        <VehiclePanel
          vehicles={filteredVehicles}
          activeVehicle={currentVehicle.id}
          onVehicleChange={setActiveVehicle}
        />
      </main>
    </div>
  );
}
