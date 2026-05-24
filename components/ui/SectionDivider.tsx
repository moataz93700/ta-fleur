/*
  SECTION DIVIDER — TA FLEUR

  Directeur artistique :
  Séparateur décoratif entre sections de la homepage.
  Rose SVG miniature entourée de lignes or dégradées.
  Signature visuelle distinctive — Jacquemus utilise la même logique
  avec ses diviseurs minimalistes.

  Impact branding :
  → Crée un rythme visuel entre les sections (luxe = espacement + ponctuation)
  → Rappelle le motif de la rose dans le logo → cohérence totale
  → Différencie TA FLEUR des marques génériques sans motif récurrent
*/

import { cn } from '@/lib/utils'

interface SectionDividerProps {
  className?: string
  variant?:   'gold' | 'rose' | 'beige'
}

export default function SectionDivider({
  className,
  variant = 'gold',
}: SectionDividerProps) {
  const lineColor = {
    gold:  'from-transparent via-ta-gold/50 to-transparent',
    rose:  'from-transparent via-ta-rose-pastel/60 to-transparent',
    beige: 'from-transparent via-ta-beige-dark/60 to-transparent',
  }[variant]

  const roseCenter = {
    gold:  '#C9A96E',
    rose:  '#D4748C',
    beige: '#A8A4A0',
  }[variant]

  return (
    <div className={cn('flex items-center justify-center gap-5 py-2', className)}>
      {/* Ligne gauche */}
      <div className={cn('flex-1 max-w-48 h-px bg-gradient-to-r', lineColor)} />

      {/* Rose miniature SVG */}
      <svg
        width="18"
        height="18"
        viewBox="-18 -18 36 36"
        fill="none"
        aria-hidden="true"
      >
        {/* Pétales extérieurs */}
        {[0, 72, 144, 216, 288].map(angle => (
          <path
            key={angle}
            transform={`rotate(${angle},0,0)`}
            d="M0,-14 C4,-17 8,-12 7,-7 C5,-3 1,-1 0,0 C-1,-1 -5,-3 -7,-7 C-8,-12 -4,-17 0,-14Z"
            fill="#FAD4E0"
          />
        ))}
        {/* Pétales médians */}
        {[36, 108, 180, 252, 324].map(angle => (
          <path
            key={angle}
            transform={`rotate(${angle},0,0)`}
            d="M0,-9 C2.5,-11 5,-8 4.5,-4.5 C3.5,-2 1,0 0,0 C-1,0 -3.5,-2 -4.5,-4.5 C-5,-8 -2.5,-11 0,-9Z"
            fill="#F2B5C5"
          />
        ))}
        {/* Centre */}
        <circle r="3.5" fill={roseCenter} />
        <circle r="2"   fill="#B85C74" />
        <circle r="1"   fill="#FAD4E0" opacity="0.5" />
      </svg>

      {/* Ligne droite */}
      <div className={cn('flex-1 max-w-48 h-px bg-gradient-to-l', lineColor)} />
    </div>
  )
}
