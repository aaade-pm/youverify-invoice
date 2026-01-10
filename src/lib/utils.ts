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
