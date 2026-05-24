/*
  ROBOTS.TXT — TA FLEUR
  Généré automatiquement par Next.js 14.
  Indique aux crawlers ce qu'ils peuvent et ne peuvent pas indexer.

  Règles :
  → Checkout / compte / panier → privés, pas de valeur SEO, protège la vie privée
  → Reste du site → ouvert à l'indexation
*/

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:    '/',
        disallow: [
          '/checkout',
          '/checkout/',
          '/compte',
          '/compte/',
          '/panier',
          '/panier/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://tafleur.fr/sitemap.xml',
  }
}
