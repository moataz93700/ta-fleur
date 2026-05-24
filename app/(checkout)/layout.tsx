/*
  CHECKOUT LAYOUT — TA FLEUR
  Minimal : header simplifié uniquement, pas de footer, pas d'announcement bar.
  L'utilisateur est dans le tunnel de conversion — on le guide, on ne le distrait pas.
*/

import type { ReactNode } from 'react'
import CheckoutHeader from '@/components/checkout/CheckoutHeader'

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ta-beige-light">
      <CheckoutHeader />
      <main>{children}</main>
    </div>
  )
}
