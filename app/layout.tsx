/*
  ROOT LAYOUT — TA FLEUR
  Minimal : fonts + CartProvider uniquement.
  Header/Footer/AnnouncementBar sont dans (shop)/layout.tsx
  Le checkout a son propre layout dans (checkout)/layout.tsx
*/

import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Playfair_Display, Poppins, Montserrat } from 'next/font/google'
import { CartProvider } from '@/lib/context/CartContext'
import './globals.css'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FONTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const playfairDisplay = Playfair_Display({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700'],
  style:    ['normal', 'italic'],
  variable: '--ta-playfair',
  display:  'swap',
})

const poppins = Poppins({
  subsets:  ['latin'],
  weight:   ['200', '300', '400', '500', '600'],
  variable: '--ta-poppins',
  display:  'swap',
})

const montserrat = Montserrat({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700'],
  variable: '--ta-montserrat',
  display:  'swap',
})

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const metadata: Metadata = {
  metadataBase: new URL('https://tafleur.fr'),
  title: {
    default:  'TA FLEUR — Bouquets de fleurs premium | Livraison rapide',
    template: '%s | TA FLEUR',
  },
  description:
    'TA FLEUR : boutique florale premium. Bouquets romantiques, roses éternelles, coffrets cadeaux. Livraison express en 24h. Fleurs fraîches garanties.',
  keywords: [
    'bouquet de fleurs', 'fleurs premium', 'roses éternelles',
    'bouquet cadeau', 'fleuriste en ligne', 'livraison fleurs',
    'bouquet romantique', 'coffret fleuri', 'fleurs luxe', 'ta fleur',
  ],
  authors:   [{ name: 'TA FLEUR' }],
  creator:   'TA FLEUR',
  publisher: 'TA FLEUR',
  openGraph: {
    type:        'website',
    locale:      'fr_FR',
    url:         'https://tafleur.fr',
    siteName:    'TA FLEUR',
    title:       'TA FLEUR — Bouquets de fleurs premium',
    description: 'Des fleurs qui racontent vos plus belles émotions. Livraison express 24h.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'TA FLEUR — Fleurs & Émotions' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'TA FLEUR — Bouquets de fleurs premium',
    description: 'Des fleurs qui racontent vos plus belles émotions.',
    images:      ['/og-image.jpg'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon:  [{ url: '/brand/favicon.png', type: 'image/png', sizes: '512x512' }, { url: '/brand/favicon.png', sizes: '32x32' }],
    apple: [{ url: '/brand/favicon.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF', width: 'device-width', initialScale: 1, maximumScale: 5,
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LAYOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${playfairDisplay.variable} ${poppins.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-white text-ta-black antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
