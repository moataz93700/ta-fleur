/*
  PAGE COLLECTION — TA FLEUR
  Route dynamique : /collections/[slug]

  Architecture Next.js 14 App Router :
  - generateStaticParams → pré-rendu de toutes les collections
  - generateMetadata → SEO dynamique par collection
  - Server Component → données chargées côté serveur
  - CollectionContent (Client) → gestion des filtres interactifs
*/

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCollection, collectionSlugs } from '@/lib/data/collections'
import { getProductsByCollection } from '@/lib/data/products'
import CollectionHero    from '@/components/collections/CollectionHero'
import CollectionContent from '@/components/collections/CollectionContent'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PARAMÈTRES STATIQUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function generateStaticParams() {
  return collectionSlugs.map(slug => ({ slug }))
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   METADATA DYNAMIQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const collection = getCollection(params.slug)
  if (!collection) return {}

  return {
    title:       collection.seoTitle,
    description: collection.seoDesc,
    openGraph: {
      title:       collection.seoTitle,
      description: collection.seoDesc,
      images:      [{ url: collection.image, alt: collection.imageAlt }],
    },
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CollectionPage({
  params,
}: {
  params: { slug: string }
}) {
  const collection = getCollection(params.slug)
  if (!collection) notFound()

  const products = getProductsByCollection(params.slug)

  return (
    <>
      <CollectionHero collection={collection} productCount={products.length} />
      <CollectionContent products={products} />
    </>
  )
}
