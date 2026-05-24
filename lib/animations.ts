/*
  ANIMATION VOCABULARY — TA FLEUR

  Principe : une seule bibliothèque de variants Framer Motion,
  cohérente sur toute la marque. Chaque section parle
  le même langage visuel.

  Règles d'or :
  - Durée 0.6–0.8s → assez lente pour sentir le luxe
  - Ease [0.22, 1, 0.36, 1] → notre ease-luxury maison
  - triggerOnce: true → jamais de ré-animation au scroll back
  - threshold: 0.1 → déclenche tôt, pas besoin que tout soit visible
  - Stagger 0.08–0.12s → suffisant pour le cascade, pas ennuyeux
*/

import type { Variants } from 'framer-motion'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EASING MAISON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const EASE_LUXURY  = [0.22, 1, 0.36, 1] as const
export const EASE_OUT     = [0.4, 0, 0.2, 1]   as const
export const EASE_IN_OUT  = [0.4, 0, 0.6, 1]   as const

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FADE UP — entrée basique
   Usage : titres, paragraphes, CTAs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.7, ease: EASE_LUXURY },
  },
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FADE IN — opacité seulement
   Usage : overlays, badges, dividers
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SLIDE FROM LEFT
   Usage : image EmotionSection, colonnes gauches
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x:       0,
    transition: { duration: 0.8, ease: EASE_LUXURY },
  },
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SLIDE FROM RIGHT
   Usage : texte EmotionSection, colonnes droites
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x:       0,
    transition: { duration: 0.8, ease: EASE_LUXURY },
  },
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCALE UP — apparition avec zoom
   Usage : ProductCard, CategoryCard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const scaleUp: Variants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale:   1,
    transition: { duration: 0.6, ease: EASE_LUXURY },
  },
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONTAINER STAGGER
   Usage : parent d'une liste d'enfants animés
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function staggerContainer(stagger = 0.1, delayChildren = 0): Variants {
  return {
    hidden:  {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTION HEADER — label + titre
   Animation coordonnée des en-têtes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const sectionHeader: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.12,
      delayChildren:    0.05,
    },
  },
}
