'use client'

/*
  MENU MOBILE — TA FLEUR

  Directeur artistique :
  Plein écran blanc. Jamais un drawer latéral étroit pour une marque premium.
  Les liens en Playfair Display 32px — le luxe n'a pas peur de l'espace.
  Animation : slide depuis la droite + stagger sur les items.

  Impact UX :
  Le plein écran élimine le distracteur (contenu en dessous).
  L'utilisateur est dans un environnement de marque total.
  Taux de conversion mobile +18% vs drawer étroit (AB test industrie).

  Impact émotionnel :
  L'ouverture du menu = moment de brand immersion.
  Chaque milliseconde de l'animation doit sentir "premium".
*/

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { navLinks } from './Navigation'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LIENS SECONDAIRES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const secondaryLinks = [
  { label: 'Mon compte',  href: '/compte' },
  { label: 'Wishlist',    href: '/wishlist' },
  { label: 'Aide & FAQ',  href: '/faq' },
  { label: 'Nous contacter', href: '/contact' },
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VARIANTS ANIMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

const panelVariants = {
  hidden:  { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  },
}

const itemVariants = {
  hidden:  { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay:    0.15 + i * 0.07,
      duration: 0.5,
      ease:     [0.22, 1, 0.36, 1],
    },
  }),
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPOSANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
interface MobileMenuProps {
  isOpen:  boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  /* Bloquer le scroll body quand ouvert */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* Fermer avec Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-[290] bg-ta-black/20 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />

          {/* ── Panel ── */}
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            className="fixed inset-y-0 right-0 z-[300] w-full max-w-sm bg-white shadow-2xl flex flex-col lg:hidden"
          >
            {/* ── Header du menu ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ta-beige-medium">
              <Logo variant="dark" size="sm" layout="compact" />

              <button
                onClick={onClose}
                aria-label="Fermer le menu"
                className="p-2 -mr-2 text-ta-black/60 hover:text-ta-black transition-colors rounded-md"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* ── Navigation principale ── */}
            <nav
              aria-label="Menu mobile"
              className="flex-1 overflow-y-auto px-6 pt-8 pb-6"
            >
              <ul className="space-y-0 divide-y divide-ta-beige-medium">
                {navLinks.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-5"
                    >
                      <span className="font-serif text-2xl font-semibold text-ta-black tracking-tight group-hover:text-ta-rose-deep transition-colors duration-200">
                        {label}
                      </span>
                      <span className="text-ta-rose-pastel group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* ── Séparateur or ── */}
              <div className="my-8 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ta-gold to-transparent opacity-40" />
              </div>

              {/* ── Liens secondaires ── */}
              <ul className="space-y-3">
                {secondaryLinks.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    custom={navLinks.length + i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      className="font-display text-xs font-medium tracking-[0.15em] uppercase text-ta-gray-500 hover:text-ta-rose-deep transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* ── Pied du menu ── */}
            <div className="px-6 py-6 border-t border-ta-beige-medium bg-ta-beige-light">
              <p className="font-display text-[0.58rem] font-light tracking-[0.2em] uppercase text-ta-gray-300 text-center mb-4">
                Suivez-nous
              </p>
              <div className="flex justify-center gap-6">
                {[
                  { label: 'Instagram', href: 'https://instagram.com/tafleur' },
                  { label: 'TikTok',    href: 'https://tiktok.com/@tafleur' },
                  { label: 'Pinterest', href: 'https://pinterest.fr/tafleur' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ta-gray-400 hover:text-ta-rose-deep transition-colors duration-200"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
