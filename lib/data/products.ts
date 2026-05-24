/*
  DONNÉES PRODUITS — TA FLEUR
  Mock data prête à être remplacée par Shopify Storefront API.
  Structure calquée sur les types Shopify pour faciliter la migration.
*/

import type { Product } from '@/components/ui/ProductCard'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   OPTION ROSES — sélecteur quantité
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export interface RoseOption {
  count:     10 | 20 | 30 | 40 | 50 | 100
  extraCost: number   // centimes additionnels par rapport au prix de base
  label:     string   // ex : "10 roses"
}

export const DEFAULT_ROSE_OPTIONS: RoseOption[] = [
  { count: 10,  extraCost: 0,     label: '10 roses' },
  { count: 20,  extraCost: 4000,  label: '20 roses' },
  { count: 30,  extraCost: 8000,  label: '30 roses' },
  { count: 40,  extraCost: 12000, label: '40 roses' },
  { count: 50,  extraCost: 16000, label: '50 roses' },
  { count: 100, extraCost: 35000, label: '100 roses' },
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TYPE ÉTENDU (metadata collection)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export interface ProductExtended extends Product {
  collections:      string[]   // slugs de collections
  occasion:         string[]   // 'anniversaire' | 'mariage' | 'saint-valentin' | 'fete-meres' | 'remerciements'
  createdAt:        string     // ISO date → tri "Nouveautés"
  sales:            number     // → tri "Popularité"
  roseOptions?:     RoseOption[] // présent = fiche produit avec sélecteur roses
  description?:     string       // description courte premium
  descriptionLong?: string       // description longue émotionnelle
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CATALOGUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const allProducts: ProductExtended[] = [
  // ── BOUQUETS SIGNATURE TA FLEUR ───────────────────
  {
    id:          'p-01',
    name:        'Princesse Fuchsia',
    slug:        'princesse-fuchsia',
    price:       4900,
    image:       '/products/princesse-fuchsia.png',
    imageAlt:    'Bouquet de roses fuchsia avec tiara dorée, gypsophile perlé et ruban noir TA FLEUR',
    badge:       'Bestseller',
    inStock:     true,
    collections: ['bouquets', 'best-sellers'],
    occasion:    ['saint-valentin', 'anniversaire', 'fete-meres'],
    createdAt:   '2025-01-10',
    sales:       1247,
    roseOptions: DEFAULT_ROSE_OPTIONS,
    description: 'Roses fuchsia intenses, tiara royale, gypsophile perlé. Un bouquet qui déclare votre amour avec audace.',
    descriptionLong: `La Princesse Fuchsia est une déclaration d'amour qui ne murmure pas — elle éclate. Des roses fuchsia d'une intensité rare, sélectionnées à l'aube pour leur éclat vibrant, disposées en dôme parfait. Une tiara dorée trône en leur cœur, symbole de royauté et d'affection absolue. Le gypsophile perlé encadre chaque rose comme un écrin de lumière. L'emballage noir TA FLEUR crée un contraste saisissant — l'obscurité qui sublime la lumière. Ce bouquet ne s'offre pas : il se dédie.`,
  },
  {
    id:          'p-02',
    name:        'Velours Rouge',
    slug:        'velours-rouge',
    price:       5400,
    image:       '/products/velours-rouge.png',
    imageAlt:    'Bouquet de roses rouge profond avec lettre diamant, tiara et ruban bordeaux TA FLEUR',
    badge:       'Exclusif',
    inStock:     true,
    collections: ['bouquets', 'best-sellers'],
    occasion:    ['saint-valentin', 'anniversaire'],
    createdAt:   '2025-01-08',
    sales:       986,
    roseOptions: DEFAULT_ROSE_OPTIONS,
    description: 'Roses rouge profond, lettre en cristaux, tiara royale. La déclaration d\'amour la plus puissante qui soit.',
    descriptionLong: `Le Velours Rouge n'est pas un bouquet. C'est une confession. Des roses rouge sang, choisies pour leur velours et leur profondeur, portent en leur centre une lettre personnalisable ornée de cristaux scintillants — votre initiale, immortalisée dans l'écrin de l'amour. La tiara dorée couronne cet hommage floral. Le ruban bordeaux noue le tout avec une élégance dramatique. Chaque pétale dit ce que les mots n'osent pas dire. Offrez le Velours Rouge, et rien d'autre ne sera nécessaire.`,
  },
  {
    id:          'p-03',
    name:        'Azur Impérial',
    slug:        'azur-imperial',
    price:       5900,
    image:       '/products/azur-imperial.png',
    imageAlt:    'Bouquet de roses bleu royal avec lettre T en roses blanches, perles et ruban saphir TA FLEUR',
    badge:       'Exclusif',
    inStock:     true,
    collections: ['bouquets', 'roses-eternelles'],
    occasion:    ['anniversaire', 'saint-valentin', 'remerciements'],
    createdAt:   '2025-02-01',
    sales:       734,
    roseOptions: DEFAULT_ROSE_OPTIONS,
    description: 'Roses bleu royal, lettre personnalisée en roses blanches, perles nacré. Unique au monde.',
    descriptionLong: `L'Azur Impérial est une pièce unique. Ces roses bleu royal — une teinte que la nature n'ose pas — sont l'expression d'une affection qui sort de l'ordinaire. Au cœur du bouquet, votre lettre personnalisée formée de roses blanches perlées se détache comme un message secret. Des perles dorées ponctuent l'ensemble, créant un dialogue entre le bleu profond et l'éclat nacré. Le ruban saphir noue cette œuvre florale avec la gravité d'un serment. Pour ceux qui n'offrent jamais ce que tout le monde offre.`,
  },
  {
    id:          'p-04',
    name:        'Reine Blanche',
    slug:        'reine-blanche',
    price:       4900,
    image:       '/products/reine-blanche.png',
    imageAlt:    'Bouquet de roses blanches pures avec tiara dorée, tulle nacré et ruban blanc TA FLEUR',
    badge:       'Nouveau',
    inStock:     true,
    collections: ['bouquets', 'best-sellers'],
    occasion:    ['mariage', 'anniversaire', 'fete-meres', 'remerciements'],
    createdAt:   '2025-04-10',
    sales:       612,
    roseOptions: DEFAULT_ROSE_OPTIONS,
    description: 'Roses blanches immaculées, tiara dorée, voile de tulle nacré. Pureté et grâce absolues.',
    descriptionLong: `La Reine Blanche est la pureté rendue visible. Des roses d'un blanc immaculé, chaque pétale comme une page vierge sur laquelle une émotion nouvelle s'écrit. Une tiara dorée se pose délicatement en leur sommet — couronne silencieuse d'une reine sereine. Le voile de tulle nacré enveloppe l'ensemble comme un nuage, doux et éthéré. Le ruban blanc satiné boucle cette composition avec la simplicité du sublime. Pour les moments où seul le blanc dit la vérité : mariages, naissances, gratitude pure, amour inconditionnel.`,
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
