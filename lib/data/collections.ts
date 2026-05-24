/*
  MÉTADONNÉES COLLECTIONS — TA FLEUR
  Source de vérité pour les pages /collections/[slug].
*/

export interface CollectionMeta {
  slug:        string
  name:        string
  tagline:     string
  description: string
  image:       string
  imageAlt:    string
  seoTitle:    string
  seoDesc:     string
}

export const collections: Record<string, CollectionMeta> = {
  'bouquets': {
    slug:        'bouquets',
    name:        'Bouquets frais',
    tagline:     'Préparés le matin même',
    description: 'Des compositions florales fraîches, créées chaque matin par nos fleuristes. Roses, pivoines, tulipes, renoncules — choisies pour leur qualité et leur beauté.',
    image:       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    imageAlt:    'Bouquets de fleurs fraîches TA FLEUR',
    seoTitle:    'Bouquets de fleurs frais — Livraison 24h',
    seoDesc:     'Découvrez nos bouquets de fleurs fraîches préparés chaque matin. Roses, pivoines, tulipes. Livraison express 24h en France.',
  },
  'roses-eternelles': {
    slug:        'roses-eternelles',
    name:        'Roses éternelles',
    tagline:     'La beauté pour toujours',
    description: 'Des roses préservées selon une technique artisanale qui leur permet de conserver leur beauté pendant plus d\'un an. Pas d\'arrosage, pas de maintenance.',
    image:       'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=1200&q=85',
    imageAlt:    'Roses éternelles TA FLEUR dans leurs coffrets élégants',
    seoTitle:    'Roses éternelles — Coffrets & Cadeaux luxe',
    seoDesc:     'Roses préservées qui durent plus d\'1 an. Coffrets luxe, cadres floraux, dômes de verre. Le cadeau qui dure.',
  },
  'coffrets': {
    slug:        'coffrets',
    name:        'Coffrets cadeaux',
    tagline:     'L\'art d\'offrir',
    description: 'Des cadeaux pensés dans leurs moindres détails : fleurs fraîches, roses éternelles, douceurs artisanales. Chaque coffret est emballé avec soin.',
    image:       'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=85',
    imageAlt:    'Coffrets cadeaux floraux TA FLEUR',
    seoTitle:    'Coffrets cadeaux fleuris — Livraison express',
    seoDesc:     'Offrez un coffret fleuri TA FLEUR. Anniversaire, naissance, fête des mères. Emballage luxe, livraison soignée.',
  },
  'evenements': {
    slug:        'evenements',
    name:        'Événements & Mariages',
    tagline:     'Sur mesure pour vos grands jours',
    description: 'Bouquets de mariée, décorations de table, arches florales — notre équipe crée des compositions uniques pour rendre vos événements inoubliables.',
    image:       'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85',
    imageAlt:    'Décoration florale de mariage TA FLEUR',
    seoTitle:    'Fleurs pour mariages & événements — Sur mesure',
    seoDesc:     'Bouquets de mariée, décorations florales, centres de table. TA FLEUR habille vos événements avec élégance.',
  },
  'best-sellers': {
    slug:        'best-sellers',
    name:        'Best-Sellers',
    tagline:     'Les préférés de nos clientes',
    description: 'Notre sélection des bouquets et coffrets les plus aimés. Ces créations ont été choisies par des milliers de clientes satisfaites.',
    image:       'https://images.unsplash.com/photo-1490750967868-88df5691166b?w=1200&q=85',
    imageAlt:    'Best-sellers TA FLEUR — Bouquets les plus populaires',
    seoTitle:    'Best-Sellers TA FLEUR — Nos fleurs les plus offertes',
    seoDesc:     'Découvrez les bouquets et coffrets préférés de nos clientes. Fraîcheur garantie, livraison 24h.',
  },
}

export function getCollection(slug: string): CollectionMeta | undefined {
  return collections[slug]
}

export const collectionSlugs = Object.keys(collections)
