export type Currency = "USD" | "GHS";

/** Approximate mid-market rate — update periodically */
export const GHS_RATE = 15.8;

export function formatPrice(usdAmount: number, currency: Currency): string {
  if (currency === "GHS") {
    return `GH₵ ${Math.round(usdAmount * GHS_RATE).toLocaleString()}`;
  }
  return `USD ${usdAmount.toLocaleString()}`;
}

/** For colour premium display: "Included" or "+GH₵ X" / "+$X" */
export function formatPremium(usdAmount: number, currency: Currency): string {
  if (usdAmount === 0) return "Included";
  if (currency === "GHS") {
    return `+GH₵ ${Math.round(usdAmount * GHS_RATE).toLocaleString()}`;
  }
  return `+$${usdAmount.toLocaleString()}`;
}
