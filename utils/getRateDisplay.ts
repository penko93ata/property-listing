import { TPropertyRates } from "@/types/properties.types";

export function getRateDisplay(rates: TPropertyRates) {
  if (rates.monthly) {
    return `$${rates.monthly.toLocaleString()}/mo`;
  }
  if (rates.weekly) {
    return `$${rates.weekly.toLocaleString()}/wk`;
  }
  return `$${rates.nightly?.toLocaleString()}/night`;
}
