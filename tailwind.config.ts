import type { Config } from 'tailwindcss'

/**
 * TA FLEUR — Configuration Tailwind CSS
 * Système de design premium, inspiré du luxe moderne
 */

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      /* ━━━━━━━━━━━━━━━━━━━━━━
         PALETTE DE COULEURS
      ━━━━━━━━━━━━━━━━━━━━━━ */
      colors: {
        ta: {
          /* Fonds */
          white:   '#FFFFFF',
          ivory:   '#FFFEF5',           /* Ivoire — fond clair officiel */
          beige: {
            light:      '#F5E9EB',      /* Rose pâle officiel */
            DEFAULT:    '#E7D0CA',      /* Beige chaud officiel */
            medium:     '#DBBDB5',
            dark:       '#CEADA4',
          },
          /* Rose — couleur signature officielle */
          rose: {
            whisper:  '#FFF5F7',
            warm:     '#F5E9EB',        /* Rose pâle officiel */
            pastel:   '#F0C8D0',
            medium:   '#E9B2BC',        /* Rose poudré officiel — COULEUR PRINCIPALE */
            deep:     '#D4748C',
            dark:     '#B85C74',
            wine:     '#8B3A52',
          },
          /* Or — accent luxe officiel */
          gold: {
            whisper:  '#FAF3E0',
            light:    '#EDD88A',
            DEFAULT:  '#D4A537',        /* Doré officiel */
            medium:   '#B88C1E',
            dark:     '#9A7210',
          },
          /* Neutres */
          black:  '#222222',            /* Noir profond officiel */
          gray: {
            900:  '#3A3A3A',
            700:  '#4A4A4A',
            500:  '#6B6B6B',
            400:  '#8A8A8A',
            300:  '#A8A4A0',
            200:  '#C8C4C0',
            100:  '#E8E4E0',
          },
        },
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         TYPOGRAPHIES
      ━━━━━━━━━━━━━━━━━━━━━━ */
      fontFamily: {
        serif:   ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        sans:    ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Helvetica Neue', 'system-ui', 'sans-serif'],
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         TAILLE DE TEXTE
      ━━━━━━━━━━━━━━━━━━━━━━ */
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '9xl': ['8rem',     { lineHeight: '1' }],
        '10xl': ['10rem',   { lineHeight: '1' }],
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         LETTER SPACING
      ━━━━━━━━━━━━━━━━━━━━━━ */
      letterSpacing: {
        'tightest':  '-0.04em',
        'luxury':    '0.35em',
        'brand':     '0.25em',
        'widest':    '0.20em',
        'wider':     '0.10em',
        'wide':      '0.05em',
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         ESPACEMENTS
      ━━━━━━━━━━━━━━━━━━━━━━ */
      spacing: {
        '4.5':   '1.125rem',
        '13':    '3.25rem',
        '15':    '3.75rem',
        '17':    '4.25rem',
        '18':    '4.5rem',
        '19':    '4.75rem',
        '22':    '5.5rem',
        '26':    '6.5rem',
        '30':    '7.5rem',
        '34':    '8.5rem',
        '38':    '9.5rem',
        '42':    '10.5rem',
        '50':    '12.5rem',
        '68':    '17rem',
        '76':    '19rem',
        '84':    '21rem',
        '88':    '22rem',
        '92':    '23rem',
        '100':   '25rem',
        '112':   '28rem',
        '128':   '32rem',
        '144':   '36rem',
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         BORDER RADIUS
      ━━━━━━━━━━━━━━━━━━━━━━ */
      borderRadius: {
        'xs':  '2px',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         OMBRES
      ━━━━━━━━━━━━━━━━━━━━━━ */
      boxShadow: {
        'rose':        '0 8px 32px 0 rgba(233, 178, 188, 0.28)',   /* #E9B2BC rose poudré */
        'rose-lg':     '0 16px 56px 0 rgba(233, 178, 188, 0.38)',
        'gold':        '0 8px 32px 0 rgba(212, 165, 55, 0.22)',    /* #D4A537 doré */
        'gold-lg':     '0 16px 56px 0 rgba(212, 165, 55, 0.32)',
        'beige':       '0 4px 24px 0 rgba(231, 208, 202, 0.60)',   /* #E7D0CA beige chaud */
        'luxury':      '0 24px 80px 0 rgba(34, 34, 34, 0.14)',     /* #222222 noir profond */
        'card':        '0 2px 8px 0 rgba(34, 34, 34, 0.06)',
        'card-hover':  '0 12px 40px 0 rgba(34, 34, 34, 0.12)',
        'inset-rose':  'inset 0 1px 3px 0 rgba(233, 178, 188, 0.20)',
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         TRANSITIONS
      ━━━━━━━━━━━━━━━━━━━━━━ */
      transitionTimingFunction: {
        'luxury':  'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'elegant': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'spring':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '400':  '400ms',
        '600':  '600ms',
        '700':  '700ms',
        '800':  '800ms',
        '900':  '900ms',
        '1200': '1200ms',
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         ANIMATIONS
      ━━━━━━━━━━━━━━━━━━━━━━ */
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%':   { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%':   { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        revealWidth: {
          '0%':   { width: '0%', opacity: '0' },
          '100%': { width: '100%', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
      animation: {
        'fade-in':       'fadeIn 0.6s ease forwards',
        'fade-in-up':    'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-down':  'fadeInDown 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-left':  'fadeInLeft 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-right': 'fadeInRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in':      'scaleIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'float':         'float 4s ease-in-out infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'marquee':       'marquee 30s linear infinite',
        'reveal-width':  'revealWidth 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-slow':    'pulse 3s ease-in-out infinite',
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         ASPECT RATIOS
      ━━━━━━━━━━━━━━━━━━━━━━ */
      aspectRatio: {
        '4/5':   '4 / 5',
        '3/4':   '3 / 4',
        '2/3':   '2 / 3',
        '5/7':   '5 / 7',
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         HEIGHT
      ━━━━━━━━━━━━━━━━━━━━━━ */
      height: {
        'screen-90':  '90vh',
        'screen-85':  '85vh',
        'screen-80':  '80vh',
        'screen-70':  '70vh',
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         MAX WIDTH
      ━━━━━━━━━━━━━━━━━━━━━━ */
      maxWidth: {
        'xxs':  '18rem',
        '8xl':  '88rem',
        '9xl':  '96rem',
        '10xl': '110rem',
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         BACKDROP BLUR
      ━━━━━━━━━━━━━━━━━━━━━━ */
      backdropBlur: {
        'xs': '2px',
      },

      /* ━━━━━━━━━━━━━━━━━━━━━━
         SCREENS (breakpoints)
      ━━━━━━━━━━━━━━━━━━━━━━ */
      screens: {
        'xs':  '475px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}

export default config
