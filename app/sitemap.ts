/*
  SITEMAP — TA FLEUR
  Généré automatiquement par Next.js 14 (App Router).
  Google indexe /sitemap.xml → découverte de toutes les pages.

  Impact SEO :
  → Toutes les fiches produits soumises à Google dès le déploiement
  → changeFrequency adapté à la volatilité : daily pour collections, weekly pour produits
  → priority 1.0 pour la homepage, 0.9 collections, 0.8 produits
*/

import type { MetadataRoute } from 'next'
import { allProducts } from '@/lib/data/products'
import { collectionSlugs } from '@/lib/data/collections'

const BASE_URL = 'https://tafleur.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  /* ── Pages statiques ── */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:              BASE_URL,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         1,
    },
    {
      url:              `${BASE_URL}/notre-histoire`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.5,
    },
    {
      url:              `${BASE_URL}/blog`,
      lastModified:     now,
      changeFrequency:  'daily',
      priority:         0.7,
    },
    {
      url:              `${BASE_URL}/faq`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.6,
    },
    {
      url:              `${BASE_URL}/contact`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.5,
    },
  ]

  /* ── Collections ── */
  const collectionRoutes: MetadataRoute.Sitemap = collectionSlugs.map(slug => ({
    url:             `${BASE_URL}/collections/${slug}`,
    lastModified:    now,
    changeFrequency: 'daily',
    priority:        0.9,
  }))

  /* ── Fiches produits ── */
  const productRoutes: MetadataRoute.Sitemap = allProducts.map(product => ({
    url:             `${BASE_URL}/produit/${product.slug}`,
    lastModified:    now,
    changeFrequency: 'weekly',
    priority:        0.8,
  }))

  return [...staticRoutes, ...collectionRoutes, ...productRoutes]
}
