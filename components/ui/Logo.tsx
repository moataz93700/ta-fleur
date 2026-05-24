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
   COULEURS PAR VARIANTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const colorMap: Record<LogoVariant, {
  ta:      string
  fleur:   string
  line:    string
  tagline: string
}> = {
  dark: {
    ta:      '#1A1A1A',
    fleur:   '#1A1A1A',
    line:    '#C9A96E',
    tagline: '#6B6B6B',
  },
  white: {
    ta:      '#FFFFFF',
    fleur:   '#FFFFFF',
    line:    'rgba(255,255,255,0.5)',
    tagline: 'rgba(255,255,255,0.55)',
  },
  gold: {
    ta:      'url(#goldTextGrad)',
    fleur:   '#C9A96E',
    line:    '#C9A96E',
    tagline: '#B8904A',
  },
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ROSE — Élément décoratif SVG
  Rendu inline → hérite des fonts du document
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function RoseDecoration() {
  return (
    <g>
      {/* Feuilles */}
      <path d="M-6,28 C-16,20 -22,8 -13,3 C-8,0 -5,9 -5,22Z"  fill="#A8C9A0" opacity="0.7"/>
      <path d="M6,28 C16,20 22,8 13,3 C8,0 5,9 5,22Z"          fill="#A8C9A0" opacity="0.7"/>

      {/* Pétales extérieurs (5) */}
      {[0, 72, 144, 216, 288].map(a => (
        <path
          key={a}
          transform={`rotate(${a},0,0)`}
          d="M0,-32 C8,-38 16,-28 14,-17 C12,-7 3,-2 0,0 C-3,-2 -12,-7 -14,-17 C-16,-28 -8,-38 0,-32Z"
          fill="#FAD4E0"
        />
      ))}

      {/* Pétales médians (5, +36°) */}
      {[36, 108, 180, 252, 324].map(a => (
        <path
          key={a}
          transform={`rotate(${a},0,0)`}
          d="M0,-22 C5,-26 10,-19 9,-12 C7,-5 2,-1 0,0 C-2,-1 -7,-5 -9,-12 C-10,-19 -5,-26 0,-22Z"
          fill="#F2B5C5"
        />
      ))}

      {/* Pétales intérieurs (3) */}
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
      <circle r="1"   fill="#FAD4E0" opacity="0.5"/>
    </g>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOGO — VERSION COMPLÈTE (avec rose)
  ViewBox : 0 0 360 290
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LogoFull({ colors, showTagline }: {
  colors: typeof colorMap.dark
  showTagline: boolean
}) {
  return (
    <svg
      viewBox="0 0 360 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TA FLEUR — Fleurs & Émotions"
      role="img"
    >
      <defs>
        <linearGradient id="goldTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#E8D5B0"/>
          <stop offset="50%"  stopColor="#C9A96E"/>
          <stop offset="100%" stopColor="#9A7235"/>
        </linearGradient>
        <filter id="logoShadow" x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#1A1A1A" floodOpacity="0.06"/>
        </filter>
      </defs>

      {/* Rose — centrée entre T et A */}
      <g transform="translate(180,72)">
        <RoseDecoration />
      </g>

      {/* Monogramme TA */}
      <text
        x="180" y="200"
        fontFamily="var(--ta-playfair), 'Playfair Display', Georgia, serif"
        fontSize="178"
        fontWeight="700"
        fill={colors.ta}
        textAnchor="middle"
        letterSpacing="-4"
        filter="url(#logoShadow)"
      >
        TA
      </text>

      {/* FLEUR */}
      <text
        x="180" y="240"
        fontFamily="var(--ta-montserrat), 'Montserrat', 'Helvetica Neue', sans-serif"
        fontSize="21"
        fontWeight="300"
        fill={colors.fleur}
        textAnchor="middle"
        letterSpacing="18"
      >
        FLEUR
      </text>

      {/* Ligne or */}
      <line x1="78" y1="254" x2="282" y2="254" stroke={colors.line} strokeWidth="0.6" opacity="0.8"/>
      <polygon points="78,254 82,250 86,254 82,258"   fill={colors.line} opacity="0.7"/>
      <polygon points="274,254 278,250 282,254 278,258" fill={colors.line} opacity="0.7"/>

      {/* Tagline */}
      {showTagline && (
        <text
          x="180" y="273"
          fontFamily="var(--ta-poppins), 'Poppins', system-ui, sans-serif"
          fontSize="8.5"
          fontWeight="300"
          fill={colors.tagline}
          textAnchor="middle"
          letterSpacing="5"
        >
          FLEURS &amp; ÉMOTIONS
        </text>
      )}
    </svg>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOGO — VERSION COMPACTE (sans rose)
  Pour le header — ViewBox : 0 0 200 72
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
          <stop offset="0%"   stopColor="#E8D5B0"/>
          <stop offset="50%"  stopColor="#C9A96E"/>
          <stop offset="100%" stopColor="#9A7235"/>
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

      {/* Ligne */}
      <line x1="42" y1="57" x2="158" y2="57" stroke={colors.line} strokeWidth="0.5" opacity="0.7"/>

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
   LOGO — MONOGRAMME TA (cercle)
  Pour petits espaces, avatars
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LogoMonogram({ colors }: { colors: typeof colorMap.dark }) {
  const bgFill = colors.ta === '#FFFFFF' ? '#1A1A1A' : '#1A1A1A'
  const textFill = colors.ta === '#FFFFFF' ? '#C9A96E' : '#C9A96E'

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TA FLEUR"
      role="img"
    >
      <circle cx="24" cy="24" r="23" fill={bgFill}/>
      <circle cx="24" cy="24" r="23" fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.6"/>
      <text
        x="24" y="31"
        fontFamily="var(--ta-playfair), 'Playfair Display', Georgia, serif"
        fontSize="22"
        fontWeight="700"
        fill={textFill}
        textAnchor="middle"
        letterSpacing="-0.5"
      >
        TA
      </text>
    </svg>
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

  return (
    <div className={cn('flex items-center', sizeMap[size], className)}>
      {layout === 'stacked' ? (
        <LogoFull colors={colors} showTagline={showTagline} />
      ) : size === 'xs' ? (
        <LogoMonogram colors={colors} />
      ) : (
        <LogoCompact colors={colors} />
      )}
    </div>
  )
}

export type { LogoProps }
