import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'SAR'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format phone number
export function formatPhoneNumber(phone: string): string {
  // Format phone number as +971 2356 5896
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length >= 10) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)}${cleaned.slice(5, 9)} ${cleaned.slice(9, 13)}`;
  }
  return phone;
}

// Mask phone number
export function maskPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length >= 10) {
    const lastDigits = cleaned.slice(-3);
    return `*******${lastDigits}`;
  }
  return phone;
}