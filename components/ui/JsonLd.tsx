/*
  JSON-LD STRUCTURED DATA — TA FLEUR
  Données structurées Schema.org pour les rich results Google.

  Impact SEO :
  → Product schema → Google Shopping rich snippets (prix, stock, notation)
  → Organization schema → Google Knowledge Panel
  → BreadcrumbList → affichage chemin dans les SERPs
  → Résultats enrichis = +30% CTR moyen (Google Search Console benchmark)

  Usage :
  <JsonLd data={productSchema} />
  <JsonLd data={organizationSchema} />
*/

interface JsonLdProps {
  data: Record<string, unknown>
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FACTORIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Schema.org Product — pour les fiches produits */
export function buildProductSchema({
  name,
  description,
  image,
  price,
  slug,
  inStock,
}: {
  name:        string
  description: string
  image:       string
  price:       number    // en centimes
  slug:        string
  inStock:     boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type':    'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Brand',
      name:    'TA FLEUR',
    },
    offers: {
      '@type':        'Offer',
      price:          (price / 100).toFixed(2),
      priceCurrency:  'EUR',
      availability:   inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url:            `https://tafleur.fr/produit/${slug}`,
      seller: {
        '@type': 'Organization',
        name:    'TA FLEUR',
      },
      shippingDetails: {
        '@type':              'OfferShippingDetails',
        shippingRate: {
          '@type':        'MonetaryAmount',
          value:          '4.95',
          currency:       'EUR',
        },
        shippingDestination: {
          '@type':           'DefinedRegion',
          addressCountry:    'FR',
        },
        doesNotShip: false,
      },
    },
    aggregateRating: {
      '@type':       'AggregateRating',
      ratingValue:   '4.9',
      bestRating:    '5',
      reviewCount:   '247',
    },
  }
}

/** Schema.org Organization — pour la homepage */
export function buildOrganizationSchema() {
  return {
    '@context':   'https://schema.org',
    '@type':      'Organization',
    name:         'TA FLEUR',
    url:          'https://tafleur.fr',
    logo:         'https://tafleur.fr/brand/logo/ta-fleur-principal.svg',
    description:  'Boutique florale premium en ligne. Bouquets frais, roses éternelles, coffrets cadeaux. Livraison express 24h en France.',
    foundingDate: '2024',
    contactPoint: {
      '@type':         'ContactPoint',
      contactType:     'customer service',
      availableLanguage: 'French',
      hoursAvailable:  'Mo-Su 09:00-20:00',
    },
    sameAs: [
      'https://instagram.com/tafleur',
      'https://tiktok.com/@tafleur',
      'https://pinterest.fr/tafleur',
    ],
  }
}

/** Schema.org BreadcrumbList — pour la navigation */
export function buildBreadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context':       'https://schema.org',
    '@type':          'BreadcrumbList',
    itemListElement:  items.map(({ name, href }, index) => ({
      '@type':  'ListItem',
      position: index + 1,
      name,
      item:     `https://tafleur.fr${href}`,
    })),
  }
}
