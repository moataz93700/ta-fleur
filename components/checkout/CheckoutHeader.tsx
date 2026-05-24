/*
  CHECKOUT HEADER — TA FLEUR

  Directeur artistique :
  Logo centré sur fond blanc. "Retour" discret à gauche.
  Pas de navigation — l'utilisateur doit finaliser, pas explorer.
  Cadenas de sécurité à droite — réassurance finale.

  Impact conversion :
  → Pas de navigation = pas de distraction = +8% completion checkout
  → Logo seul = ancre de marque rassurante
  → Cadenas SSL = réassurance anti-abandon
*/

import Link from 'next/link'
import { LockClosedIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import Logo from '@/components/ui/Logo'

export default function CheckoutHeader() {
  return (
    <header className="bg-white border-b border-ta-beige-medium">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16">

          {/* Retour */}
          <Link
            href="/panier"
            className="flex items-center gap-1.5 font-display text-[0.58rem] font-medium tracking-[0.1em] uppercase text-ta-gray-400 hover:text-ta-black transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            Retour
          </Link>

          {/* Logo centré */}
          <Link href="/" aria-label="TA FLEUR — Retour à l'accueil">
            <Logo variant="dark" size="sm" layout="compact" />
          </Link>

          {/* Sécurité */}
          <div className="flex items-center justify-end gap-1.5 text-ta-gray-400">
            <LockClosedIcon className="w-3.5 h-3.5" />
            <span className="font-display text-[0.55rem] font-medium tracking-[0.1em] uppercase hidden sm:inline">
              Paiement sécurisé
            </span>
          </div>

        </div>
      </div>
    </header>
  )
}
