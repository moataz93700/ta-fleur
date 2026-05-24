import Image from 'next/image'
import { cn } from '@/lib/utils'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TYPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
type LogoVariant  = 'dark' | 'white' | 'gold'
type LogoSize     = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type LogoLayout   = 'stacked' | 'compact'

interface LogoProps {
  variant?:     LogoVariant
  size?:        LogoSize
  layout?:      LogoLayout
  showTagline?: boolean
  className?:   string
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COULEURS PAR VARIANTE (SVG compact)
   Palette officielle TA FLEUR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const colorMap: Record<LogoVariant, {
  ta:      string
  fleur:   string
  line:    string
  tagline: string
}> = {
  dark: {
    ta:      '#222222',            /* Noir profond officiel */
    fleur:   '#222222',
    line:    '#D4A537',            /* Doré officiel */
    tagline: '#6B6B6B',
  },
  white: {
    ta:      '#FFFFFF',
    fleur:   '#FFFFFF',
    line:    'rgba(255,255,255,0.55)',
    tagline: 'rgba(255,255,255,0.60)',
  },
  gold: {
    ta:      'url(#goldTextGrad)',
    fleur:   '#D4A537',            /* Doré officiel */
    line:    '#D4A537',
    tagline: '#B88C1E',
  },
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ROSE — Élément décoratif SVG
   Couleurs palette officielle
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function RoseDecoration() {
  return (
    <g>
      {/* Feuilles */}
      <path d="M-6,28 C-16,20 -22,8 -13,3 C-8,0 -5,9 -5,22Z"  fill="#A8C9A0" opacity="0.75"/>
      <path d="M6,28 C16,20 22,8 13,3 C8,0 5,9 5,22Z"          fill="#A8C9A0" opacity="0.75"/>

      {/* Pétales extérieurs — rose pâle officiel */}
      {[0, 72, 144, 216, 288].map(a => (
        <path
          key={a}
          transform={`rotate(${a},0,0)`}
          d="M0,-32 C8,-38 16,-28 14,-17 C12,-7 3,-2 0,0 C-3,-2 -12,-7 -14,-17 C-16,-28 -8,-38 0,-32Z"
          fill="#F5E9EB"
        />
      ))}

      {/* Pétales médians — rose poudré officiel */}
      {[36, 108, 180, 252, 324].map(a => (
        <path
          key={a}
          transform={`rotate(${a},0,0)`}
          d="M0,-22 C5,-26 10,-19 9,-12 C7,-5 2,-1 0,0 C-2,-1 -7,-5 -9,-12 C-10,-19 -5,-26 0,-22Z"
          fill="#E9B2BC"
        />
      ))}

      {/* Pétales intérieurs */}
      {[0, 120, 240].map(a => (
        <path
          key={a}
          transform={`rotate(${a},0,0)`}
          d="M0,-14 C3,-16 7,-12 6,-7 C4,-2 1,0 0,0 C-1,0 -4,-2 -6,-7 C-7,-12 -3,-16 0,-14Z"
          fill="#D4748C"
        />
      ))}

      {/* Centre */}
      <circle r="6.5" fill="#D4748C"/>
      <circle r="4.5" fill="#B85C74"/>
      <circle r="2.5" fill="#8B3A52"/>
      <circle r="1"   fill="#F5E9EB" opacity="0.6"/>
    </g>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOGO — VERSION COMPLÈTE PNG (stacked)
   Utilise le vrai asset PNG officiel
   mix-blend-mode:multiply efface le fond blanc
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LogoFullPNG({ size }: { size: LogoSize }) {
  /* Largeurs natives en px selon la taille demandée */
  const widthMap: Record<LogoSize, number> = {
    xs: 80,
    sm: 140,
    md: 200,
    lg: 320,
    xl: 480,
  }
  const w = widthMap[size]
  /* Le logo principal a des proportions ~1:1.22 (W:H) */
  const h = Math.round(w * 1.22)

  return (
    <Image
      src="/brand/logo-principal.png"
      alt="TA FLEUR — Fleurs & Émotions"
      width={w}
      height={h}
      className="w-full h-auto"
      style={{ mixBlendMode: 'multiply' }}
      priority={size === 'xl' || size === 'lg'}
    />
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOGO — VERSION COMPACTE SVG (header)
   SVG inline pour fonctionner sur fond dark ET light
   ViewBox : 0 0 200 72
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LogoCompact({ colors }: { colors: typeof colorMap.dark }) {
  return (
    <svg
      viewBox="0 0 200 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TA FLEUR"
      role="img"
    >
      <defs>
        <linearGradient id="goldTextGradCompact" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#EDD88A"/>
          <stop offset="50%"  stopColor="#D4A537"/>
          <stop offset="100%" stopColor="#9A7210"/>
        </linearGradient>
      </defs>

      {/* TA */}
      <text
        x="100" y="50"
        fontFamily="var(--ta-playfair), 'Playfair Display', Georgia, serif"
        fontSize="54"
        fontWeight="700"
        fill={colors.ta}
        textAnchor="middle"
        letterSpacing="-2"
      >
        TA
      </text>

      {/* Ligne dorée officielle */}
      <line x1="42" y1="57" x2="158" y2="57" stroke={colors.line} strokeWidth="0.5" opacity="0.75"/>

      {/* FLEUR */}
      <text
        x="100" y="69"
        fontFamily="var(--ta-montserrat), 'Montserrat', 'Helvetica Neue', sans-serif"
        fontSize="10"
        fontWeight="300"
        fill={colors.fleur}
        textAnchor="middle"
        letterSpacing="8"
      >
        FLEUR
      </text>
    </svg>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOGO — MONOGRAMME
   Utilise les PNG officiels par variante :
   • dark/white → favicon.png (cercle rose pâle)
   • gold       → logo-fonce.png (cercle or/noir)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LogoMonogram({ variant }: { variant: LogoVariant }) {
  const src    = variant === 'gold' ? '/brand/logo-fonce.png' : '/brand/favicon.png'
  const altTxt = 'TA FLEUR'

  return (
    <Image
      src={src}
      alt={altTxt}
      width={48}
      height={48}
      className="w-full h-auto rounded-full"
    />
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TAILLES (largeur du conteneur)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const sizeMap: Record<LogoSize, string> = {
  xs: 'w-10',   /* 40px  — favicon / monogramme */
  sm: 'w-16',   /* 64px  — header mobile */
  md: 'w-20',   /* 80px  — header desktop */
  lg: 'w-32',   /* 128px — footer */
  xl: 'w-48',   /* 192px — hero homepage */
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EXPORT PRINCIPAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Logo({
  variant     = 'dark',
  size        = 'md',
  layout      = 'compact',
  showTagline = false,
  className,
}: LogoProps) {
  const colors = colorMap[variant]

  /* Monogramme → PNG officiel */
  if (size === 'xs') {
    return (
      <div className={cn('flex items-center', sizeMap[size], className)}>
        <LogoMonogram variant={variant} />
      </div>
    )
  }

  /* Stacked (footer, pages brand) → PNG logo principal */
  if (layout === 'stacked') {
    return (
      <div className={cn('flex items-center', sizeMap[size], className)}>
        <LogoFullPNG size={size} />
      </div>
    )
  }

  /* Compact (header) → SVG inline adaptatif dark/white */
  return (
    <div className={cn('flex items-center', sizeMap[size], className)}>
      <LogoCompact colors={colors} />
    </div>
  )
}

export type { LogoProps }
