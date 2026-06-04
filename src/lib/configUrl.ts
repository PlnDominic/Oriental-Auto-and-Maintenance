import { BRANDS } from "@/data/vehicles";
import type { VehicleModel } from "@/data/vehicles";
import type { Currency } from "@/lib/currency";

export interface ResolvedConfig {
  brandId: string;
  model: VehicleModel;
  engineId: string;
  color: string;
  currency: Currency;
}

/** Writes current config into the URL without triggering navigation */
export function writeConfigToUrl(config: {
  brandId: string;
  modelId: string;
  engineId: string;
  color: string;
  currency: Currency;
}): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.set("b",   config.brandId);
  url.searchParams.set("m",   config.modelId);
  url.searchParams.set("e",   config.engineId);
  url.searchParams.set("c",   config.color.replace("#", ""));
  url.searchParams.set("cur", config.currency);
  window.history.replaceState(null, "", url.toString());
}

/** Reads and validates config from URL params. Returns null if params are absent or invalid. */
export function readConfigFromUrl(): ResolvedConfig | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const brandId  = p.get("b");
  const modelId  = p.get("m");
  const engineId = p.get("e");
  const colorRaw = p.get("c");
  const cur      = p.get("cur");

  if (!brandId || !modelId || !engineId || !colorRaw) return null;
  if (!/^[0-9a-fA-F]{6}$/.test(colorRaw)) return null;

  const brand = BRANDS.find((b) => b.id === brandId);
  if (!brand) return null;

  const model = brand.models.find((m) => m.id === modelId);
  if (!model) return null;

  const engine = model.engines.find((e) => e.id === engineId);
  if (!engine) return null;

  return {
    brandId,
    model,
    engineId,
    color: `#${colorRaw.toUpperCase()}`,
    currency: cur === "GHS" ? "GHS" : "USD",
  };
}
