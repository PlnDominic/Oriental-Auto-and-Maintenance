"use client";

import { useState, useEffect } from "react";
import { GHS_RATE } from "@/data/vehicles";

export function useCurrency() {
  const [currency, setCurrency] = useState<"USD" | "GHS">("USD");

  useEffect(() => {
    const stored = localStorage.getItem("currency") as "USD" | "GHS" | null;
    if (stored === "USD" || stored === "GHS") setCurrency(stored);
  }, []);

  function toggle() {
    setCurrency((prev) => {
      const next = prev === "USD" ? "GHS" : "USD";
      localStorage.setItem("currency", next);
      return next;
    });
  }

  function format(usd: number): string {
    if (currency === "GHS") {
      return `GH₵ ${Math.round(usd * GHS_RATE).toLocaleString()}`;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(usd);
  }

  return { currency, toggle, format };
}
