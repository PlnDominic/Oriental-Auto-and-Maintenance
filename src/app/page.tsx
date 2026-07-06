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
      className="flex flex-col min-h-screen md:h-screen md:overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <Header vehicleCount={vehicles.length} />

      {/* Main area — fills remaining height below header */}
      <main
        className="flex flex-col flex-1 md:overflow-hidden"
        style={{ marginTop: "80px" }}
      >
        {/* Hero section */}
        <div
          className="flex flex-col md:flex-row flex-1 md:items-center md:overflow-hidden px-4 pt-4 md:pt-0 md:pl-6 md:pr-10"
          style={{ minHeight: 0 }}
        >
          {/* Brand filter */}
          <Sidebar activeBrand={activeBrand} onBrandChange={handleBrandChange} />

          {/* Vertical divider */}
          <div
            className="hidden md:block shrink-0"
            style={{
              width: "1px",
              height: "60%",
              background: "#F0F0F0",
              margin: "0 32px",
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
