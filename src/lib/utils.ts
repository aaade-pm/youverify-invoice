import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserInitials(
  firstName?: string | null,
  lastName?: string | null,
  fallback: string = "KO"
): string {
  const firstInitial = firstName?.[0] || "";
  const lastInitial = lastName?.[0] || "";
  const initials = `${firstInitial}${lastInitial}`.toUpperCase();
  return initials || fallback;
}

// Extract currency code from strings like "USD ($)" -> "USD"
export function extractCurrencyCode(currency: string): string {
  const match = currency.match(/^([A-Z]{3})/);
  return match ? match[1] : "USD";
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  const currencyCode = extractCurrencyCode(currency);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
