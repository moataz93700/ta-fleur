import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Fusionne les classes Tailwind sans conflits */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formate un prix en euros (amount en centimes → ex: 6900 → "69,00 €") */
export function formatPrice(amount: number, currencyCode = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style:    'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(amount / 100)
}

/** Tronque un texte à N caractères */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}
