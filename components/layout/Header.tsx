'use client'

/*
  HEADER PRINCIPAL — TA FLEUR
  Auth Clerk intégré : UserButton si connecté, lien /login sinon.
  Favoris en temps réel via FavoritesContext.
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
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { useAuth, UserButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'
import Navigation from './Navigation'
import MobileMenu from './MobileMenu'
import { useCart } from '@/lib/context/CartContext'
import { useFavorites } from '@/lib/context/FavoritesContext'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ICÔNE AVEC BADGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function IconButton({
  href, label, count, children,
}: {
  href: string; label: string; count?: number; children: React.ReactNode
}) {
  return (
    <Link href={href} aria-label={count ? `${label} (${count})` : label}
      className="relative p-2 text-ta-black/70 hover:text-ta-black transition-colors duration-200 rounded-md">
      {children}
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
export default function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const { totalItems, openCart } = useCart()
  const { favorites }            = useFavorites()
  const { isSignedIn }           = useAuth()

  const onScroll = useCallback(() => setScrolled(window.scrollY > 20), [])
  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-[200] transition-all duration-500 ease-luxury',
          scrolled
            ? 'bg-white/[0.97] backdrop-blur-md shadow-[0_1px_0_rgba(237,227,220,1),0_2px_20px_rgba(0,0,0,0.06)]'
            : 'bg-white border-b border-ta-beige-medium'
        )}
      >
        <div className="container-ta">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[72px] lg:h-[80px]">

            {/* ── Gauche : Nav / Hamburger ── */}
            <div className="flex items-center">
              <button onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu"
                className="lg:hidden p-2 -ml-2 text-ta-black/70 hover:text-ta-black transition-colors">
                <Bars3Icon className="w-6 h-6" />
              </button>
              <Navigation variant="dark" />
            </div>

            {/* ── Centre : Logo ── */}
            <div className="flex justify-center">
              <Link href="/" aria-label="TA FLEUR — Retour à l'accueil">
                <Logo variant="dark" size="md" layout="compact"
                  className="transition-opacity duration-200 hover:opacity-80" />
              </Link>
            </div>

            {/* ── Droite : Icônes ── */}
            <div className="flex items-center justify-end gap-1">

              {/* Recherche */}
              <button onClick={() => setSearchOpen(s => !s)} aria-label="Rechercher"
                className="p-2 text-ta-black/70 hover:text-ta-black transition-colors duration-200 rounded-md hidden sm:flex">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>

              {/* Favoris */}
              <IconButton href="/account/favorites" label="Mes favoris" count={favorites.length}>
                {favorites.length > 0
                  ? <HeartSolid className="w-5 h-5 hidden sm:block text-ta-rose-deep" />
                  : <HeartIcon className="w-5 h-5 hidden sm:block" />
                }
              </IconButton>

              {/* Compte — UserButton Clerk si connecté, sinon lien login */}
              {isSignedIn ? (
                <div className="hidden sm:flex items-center p-1.5">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: 'w-8 h-8 ring-2 ring-ta-rose-medium/30',
                      },
                    }}
                  />
                </div>
              ) : (
                <IconButton href="/login" label="Mon compte">
                  <UserIcon className="w-5 h-5 hidden sm:block" />
                </IconButton>
              )}

              {/* Panier */}
              <button onClick={openCart}
                aria-label={totalItems ? `Mon panier (${totalItems})` : 'Mon panier'}
                className="relative p-2 text-ta-black/70 hover:text-ta-black transition-colors duration-200 rounded-md">
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

        {/* ── Barre de recherche ── */}
        {searchOpen && (
          <div className="border-t border-ta-beige-medium bg-white">
            <div className="container-ta py-4">
              <div className="relative max-w-xl mx-auto">
                <input type="search" placeholder="Rechercher un bouquet, une rose, un coffret…"
                  autoFocus className="input pr-10 w-full"
                  onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)} />
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ta-gray-300 pointer-events-none" />
              </div>
            </div>
          </div>
        )}
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
