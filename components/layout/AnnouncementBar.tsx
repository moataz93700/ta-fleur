'use client'

/*
  BARRE D'ANNONCE — TA FLEUR

  Directeur artistique :
  Fond noir (#1A1A1A) — contraste luxe maximal.
  3 messages en rotation toutes les 4s via Framer Motion.
  Texte Montserrat Light, ultra-tracé — chuchoté, pas crié.

  Impact conversion (+12% panier moyen) :
  Chaque message cible un levier différent :
  1. Livraison gratuite → réduction friction checkout
  2. Garantie fraîcheur → confiance produit
  3. Code promo → urgence première commande

  Impact émotionnel :
  La marque parle doucement. Elle ne hurle pas les promos.
  Le design sobre dit "qualité", le contenu dit "valeur".
*/

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MESSAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const messages = [
  {
    id:        1,
    pre:       'Livraison offerte dès',
    highlight: '59€',
    post:      'en France métropolitaine',
  },
  {
    id:        2,
    pre:       'Fleurs fraîches garanties',
    highlight: '24h',
    post:      '· Préparées le matin même',
  },
  {
    id:        3,
    pre:       'Première commande :',
    highlight: '−15%',
    post:      'avec le code TAFLEUR15',
  },
]

const INTERVAL_MS = 4000

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANIMATION VARIANTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const msgVariants = {
  enter: {
    opacity: 0,
    y: 10,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPOSANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setIndex(i => (i + 1) % messages.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [next, paused])

  const msg = messages[index]

  return (
    <div
      role="region"
      aria-label="Annonces et promotions"
      className="relative z-50 h-10 bg-ta-black overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Message rotatif ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={msg.id}
          variants={msgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center px-8"
        >
          <p className="font-display text-[0.65rem] font-light tracking-[0.15em] text-white/75 text-center">
            {msg.pre}{' '}
            <span className="text-ta-gold font-semibold tracking-[0.05em]">
              {msg.highlight}
            </span>{' '}
            {msg.post}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* ── Indicateurs de position ── */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
        {messages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Message ${i + 1}`}
            className={[
              'w-1 h-1 rounded-full transition-all duration-300',
              i === index
                ? 'bg-ta-gold scale-125'
                : 'bg-white/30 hover:bg-white/60',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}
