/*
  DONNÉES PRODUITS — TA FLEUR
  Mock data prête à être remplacée par Shopify Storefront API.
  Structure calquée sur les types Shopify pour faciliter la migration.
*/

import type { Product } from '@/components/ui/ProductCard'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TYPE ÉTENDU (metadata collection)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export interface ProductExtended extends Product {
  collections: string[]   // slugs de collections
  occasion:    string[]   // 'anniversaire' | 'mariage' | 'saint-valentin' | 'fete-meres' | 'remerciements'
  createdAt:   string     // ISO date → tri "Nouveautés"
  sales:       number     // → tri "Popularité"
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CATALOGUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const allProducts: ProductExtended[] = [
  // ── BOUQUETS ──────────────────────────────────────
  {
    id:            'p-01',
    name:          'Bouquet Romance — Roses & Pivoines',
    slug:          'bouquet-romance',
    price:         6900,
    originalPrice: 8500,
    image:         'https://images.unsplash.com/photo-1490750967868-88df5691166b?w=600&q=80',
    imageAlt:      'Bouquet de roses et pivoines roses',
    badge:         'Bestseller',
    inStock:       true,
    collections:   ['bouquets', 'best-sellers'],
    occasion:      ['saint-valentin', 'anniversaire'],
    createdAt:     '2025-01-10',
    sales:         847,
  },
  {
    id:       'p-02',
    name:     'Bouquet Douceur — Tulipes & Renoncules',
    slug:     'bouquet-douceur',
    price:    5500,
    image:    'https://images.unsplash.com/photo-1567696911980-2c669aff9db1?w=600&q=80',
    imageAlt: 'Bouquet pastel de tulipes et renoncules',
    badge:    'Nouveau',
    inStock:  true,
    collections: ['bouquets'],
    occasion:    ['anniversaire', 'remerciements'],
    createdAt:   '2025-04-02',
    sales:       312,
  },
  {
    id:       'p-03',
    name:     'Bouquet Soleil — Tournesols & Mimosas',
    slug:     'bouquet-soleil',
    price:    4900,
    image:    'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&q=80',
    imageAlt: 'Bouquet de tournesols et mimosas jaunes',
    inStock:  true,
    collections: ['bouquets'],
    occasion:    ['anniversaire', 'remerciements', 'fete-meres'],
    createdAt:   '2025-02-14',
    sales:       228,
  },
  {
    id:       'p-04',
    name:     'Bouquet Minimaliste — Freesias & Gypsophile',
    slug:     'bouquet-minimaliste',
    price:    5900,
    image:    'https://images.unsplash.com/photo-1487530811015-780d31bf58a5?w=600&q=80',
    imageAlt: 'Bouquet épuré de freesias blancs et gypsophile',
    badge:    'Nouveau',
    inStock:  true,
    collections: ['bouquets'],
    occasion:    ['mariage', 'remerciements'],
    createdAt:   '2025-03-20',
    sales:       156,
  },
  {
    id:       'p-05',
    name:     'Grand Bouquet Romantique — 50 Roses Rouges',
    slug:     'grand-bouquet-romantique',
    price:    12900,
    image:    'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=600&q=80',
    imageAlt: '50 roses rouges dans un emballage élégant',
    badge:    'Bestseller',
    inStock:  true,
    collections: ['bouquets', 'best-sellers'],
    occasion:    ['saint-valentin', 'anniversaire'],
    createdAt:   '2025-01-01',
    sales:       1203,
  },
  {
    id:       'p-06',
    name:     'Bouquet Pastel — Pivoines & Lilas',
    slug:     'bouquet-pastel',
    price:    7500,
    image:    'https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=600&q=80',
    imageAlt: 'Bouquet pastel de pivoines et lilas',
    inStock:  true,
    collections: ['bouquets'],
    occasion:    ['fete-meres', 'anniversaire'],
    createdAt:   '2025-02-28',
    sales:       445,
  },

  // ── ROSES ÉTERNELLES ──────────────────────────────
  {
    id:       'p-07',
    name:     'Coffret Lumière — Roses Éternelles Or',
    slug:     'coffret-lumiere',
    price:    11900,
    image:    'https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=600&q=80',
    imageAlt: 'Coffret de roses éternelles dorées',
    badge:    'Exclusif',
    inStock:  true,
    collections: ['roses-eternelles', 'best-sellers', 'coffrets'],
    occasion:    ['saint-valentin', 'anniversaire', 'fete-meres'],
    createdAt:   '2025-01-15',
    sales:       634,
  },
  {
    id:       'p-08',
    name:     'Cadre Floral — 9 Roses Éternelles Roses',
    slug:     'cadre-floral-rose',
    price:    8900,
    image:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    imageAlt: 'Cadre avec 9 roses éternelles roses disposées en grille',
    inStock:  true,
    collections: ['roses-eternelles'],
    occasion:    ['anniversaire', 'saint-valentin', 'mariage'],
    createdAt:   '2025-02-01',
    sales:       389,
  },
  {
    id:       'p-09',
    name:     'Dôme de Verre — Rose Éternelle Unique',
    slug:     'dome-rose-eternelle',
    price:    6900,
    originalPrice: 7900,
    image:    'https://images.unsplash.com/photo-1487530811015-780d31bf58a5?w=600&q=80',
    imageAlt: 'Rose éternelle sous un dôme de verre élégant',
    inStock:  true,
    collections: ['roses-eternelles'],
    occasion:    ['anniversaire', 'saint-valentin'],
    createdAt:   '2025-01-20',
    sales:       712,
  },
  {
    id:       'p-10',
    name:     'Coffret Noir & Or — 3 Roses Éternelles',
    slug:     'coffret-noir-or',
    price:    14900,
    image:    'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80',
    imageAlt: 'Coffret luxueux noir et or avec 3 roses éternelles',
    badge:    'Exclusif',
    inStock:  true,
    collections: ['roses-eternelles', 'coffrets'],
    occasion:    ['saint-valentin', 'anniversaire', 'mariage'],
    createdAt:   '2025-03-01',
    sales:       198,
  },

  // ── COFFRETS ──────────────────────────────────────
  {
    id:       'p-11',
    name:     'Coffret Naissance — Fleurs & Douceurs',
    slug:     'coffret-naissance',
    price:    8900,
    image:    'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80',
    imageAlt: 'Coffret cadeau naissance avec fleurs et douceurs',
    inStock:  true,
    collections: ['coffrets'],
    occasion:    ['remerciements'],
    createdAt:   '2025-02-10',
    sales:       267,
  },
  {
    id:       'p-12',
    name:     'Box Fête des Mères — Premium',
    slug:     'box-fete-meres',
    price:    10900,
    image:    'https://images.unsplash.com/photo-1490750967868-88df5691166b?w=600&q=80',
    imageAlt: 'Box premium pour la fête des mères avec fleurs et soins',
    badge:    'Édition limitée',
    inStock:  true,
    collections: ['coffrets'],
    occasion:    ['fete-meres'],
    createdAt:   '2025-04-01',
    sales:       523,
  },

  // ── ÉVÉNEMENTS ────────────────────────────────────
  {
    id:       'p-13',
    name:     'Collection Mariage — Bouquet de Mariée',
    slug:     'bouquet-mariee',
    price:    18900,
    image:    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
    imageAlt: 'Bouquet de mariée blanc avec pivoines et roses',
    badge:    'Édition limitée',
    inStock:  true,
    collections: ['evenements', 'best-sellers'],
    occasion:    ['mariage'],
    createdAt:   '2025-01-05',
    sales:       156,
  },
  {
    id:       'p-14',
    name:     'Composition Événement — Centre de Table',
    slug:     'centre-table-evenement',
    price:    24900,
    image:    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
    imageAlt: 'Centre de table floral pour événement de luxe',
    inStock:  true,
    collections: ['evenements'],
    occasion:    ['mariage'],
    createdAt:   '2025-02-05',
    sales:       89,
  },
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HELPERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function getProductsByCollection(slug: string): ProductExtended[] {
  return allProducts.filter(p => p.collections.includes(slug))
}

export function getProductBySlug(slug: string): ProductExtended | undefined {
  return allProducts.find(p => p.slug === slug)
}

export type SortOption = 'popularite' | 'nouveautes' | 'prix-asc' | 'prix-desc'

export function sortProducts(products: ProductExtended[], sort: SortOption): ProductExtended[] {
  return [...products].sort((a, b) => {
    switch (sort) {
      case 'popularite':  return b.sales - a.sales
      case 'nouveautes':  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'prix-asc':    return a.price - b.price
      case 'prix-desc':   return b.price - a.price
      default:            return 0
    }
  })
}

export type BudgetOption = 'all' | 'under-50' | '50-100' | 'over-100'

export function filterByBudget(products: ProductExtended[], budget: BudgetOption): ProductExtended[] {
  switch (budget) {
    case 'under-50': return products.filter(p => p.price < 5000)
    case '50-100':   return products.filter(p => p.price >= 5000 && p.price <= 10000)
    case 'over-100': return products.filter(p => p.price > 10000)
    default:         return products
  }
}

export function filterByOccasion(products: ProductExtended[], occasion: string): ProductExtended[] {
  if (!occasion) return products
  return products.filter(p => p.occasion.includes(occasion))
}
