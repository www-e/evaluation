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
  // Format phone number as +1 234 567 8900 (E.164 format)
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+') && cleaned.length >= 10) {
    // Handle +1 format: +1 234-567-8900
    if (cleaned.length === 12 && cleaned.startsWith('+1')) {
      return `+1 ${cleaned.substring(2, 5)}-${cleaned.substring(5, 8)}-${cleaned.substring(8, 12)}`;
    }
    // General E.164 format: +X XXX XXX XXXX
    if (cleaned.length >= 2) {
      let result = cleaned.substring(0, 2); // +X
      if (cleaned.length > 2) result += ` ${cleaned.substring(2, 5)}`; // XXX
      if (cleaned.length > 5) result += `-${cleaned.substring(5, 8)}`; // XXX
      if (cleaned.length > 8) result += `-${cleaned.substring(8, 12)}`; // XXXX
      return result;
    }
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