'use client'

/*
  HEADER PRINCIPAL — TA FLEUR

  Directeur artistique :
  Logo CENTRÉ (signature maisons de luxe : Dior, Celine, Jacquemus, Charlotte Tilbury).
  Navigation à gauche, icônes à droite — parfaite symétrie visuelle.
  Sticky avec backdrop-blur au scroll → l'élégance ne disparaît pas.

  UX / Conversion :
  → Sticky header : +15% de clics vers le panier (étude Baymard)
  → Badge panier visible en permanence : rappel du funnel
  → Hauteur 72px : assez imposante pour le luxe, assez compacte pour le mobile
  → Backdrop-blur : le header reste lisible sur tous les backgrounds

  Impact émotionnel :
  Le header est le "couloir d'entrée" de la boutique.
  Même sensation qu'entrer dans une boutique Dior : espace, lumière, calme.
*/

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
  ShoppingBagIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'
import Navigation from './Navigation'
import MobileMenu from './MobileMenu'
import { useCart } from '@/lib/context/CartContext'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ICÔNE AVEC BADGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function IconButton({
  href,
  label,
  count,
  children,
}: {
  href:     string
  label:    string
  count?:   number
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-label={count ? `${label} (${count})` : label}
      className="relative p-2 text-ta-black/70 hover:text-ta-black transition-colors duration-200 rounded-md"
    >
      {children}

      {/* Badge count */}
      {count !== undefined && count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-ta-rose-deep text-white font-display text-[0.5rem] font-bold leading-none">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPOSANT PRINCIPAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
interface HeaderProps {
  wishlistCount?: number
}

export default function Header({
  wishlistCount = 0,
}: HeaderProps) {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [searchOpen,   setSearchOpen]   = useState(false)
  const { totalItems, openCart } = useCart()

  /* ── Détection du scroll ── */
  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HEADER PRINCIPAL
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header
        className={cn(
          'sticky top-0 z-[200]',
          'transition-all duration-500 ease-luxury',
          scrolled
            ? [
                'bg-white/[0.97] backdrop-blur-md',
                'shadow-[0_1px_0_rgba(237,227,220,1),0_2px_20px_rgba(0,0,0,0.06)]',
              ].join(' ')
            : 'bg-white border-b border-ta-beige-medium'
        )}
      >
        <div className="container-ta">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[72px] lg:h-[80px]">

            {/* ── Colonne gauche : Navigation desktop / Hamburger mobile ── */}
            <div className="flex items-center">

              {/* Hamburger — mobile uniquement */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
                aria-expanded={mobileOpen}
                className="lg:hidden p-2 -ml-2 text-ta-black/70 hover:text-ta-black transition-colors"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>

              {/* Navigation — desktop uniquement */}
              <Navigation variant="dark" />
            </div>

            {/* ── Colonne centre : Logo ── */}
            <div className="flex justify-center">
              <Link href="/" aria-label="TA FLEUR — Retour à l'accueil">
                <Logo
                  variant="dark"
                  size="md"
                  layout="compact"
                  className="transition-opacity duration-200 hover:opacity-80"
                />
              </Link>
            </div>

            {/* ── Colonne droite : Icônes ── */}
            <div className="flex items-center justify-end gap-1">

              {/* Recherche */}
              <button
                onClick={() => setSearchOpen(s => !s)}
                aria-label="Rechercher"
                className="p-2 text-ta-black/70 hover:text-ta-black transition-colors duration-200 rounded-md hidden sm:flex"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>

              {/* Wishlist — desktop */}
              <IconButton
                href="/wishlist"
                label="Ma wishlist"
                count={wishlistCount}
              >
                <HeartIcon className="w-5 h-5 hidden sm:block" />
              </IconButton>

              {/* Compte — desktop */}
              <IconButton href="/compte" label="Mon compte">
                <UserIcon className="w-5 h-5 hidden sm:block" />
              </IconButton>

              {/* Panier — ouvre le CartDrawer */}
              <button
                onClick={openCart}
                aria-label={totalItems ? `Mon panier (${totalItems})` : 'Mon panier'}
                className="relative p-2 text-ta-black/70 hover:text-ta-black transition-colors duration-200 rounded-md"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-ta-rose-deep text-white font-display text-[0.5rem] font-bold leading-none">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Barre de recherche (expandable) ── */}
        {searchOpen && (
          <div className="border-t border-ta-beige-medium bg-white">
            <div className="container-ta py-4">
              <div className="relative max-w-xl mx-auto">
                <input
                  type="search"
                  placeholder="Rechercher un bouquet, une rose, un coffret…"
                  autoFocus
                  className="input pr-10 w-full"
                  onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                />
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ta-gray-300 pointer-events-none" />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MENU MOBILE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  )
}
