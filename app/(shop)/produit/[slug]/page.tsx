/*
  PAGE PRODUIT — TA FLEUR
  Route dynamique : /produit/[slug]

  Layout 2 colonnes (desktop) :
  - Colonne gauche 55% : ProductGallery
  - Colonne droite 45% : ProductInfo + ProductActions + ProductTrust

  En bas pleine largeur : RelatedProducts
*/

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allProducts, getProductBySlug } from '@/lib/data/products'
import { getCollection } from '@/lib/data/collections'
import { formatPrice } from '@/lib/utils'
import ProductGallery      from '@/components/product/ProductGallery'
import ProductInfo         from '@/components/product/ProductInfo'
import ProductActions      from '@/components/product/ProductActions'
import ProductTrust        from '@/components/product/ProductTrust'
import RelatedProducts     from '@/components/product/RelatedProducts'
import JsonLd, { buildProductSchema, buildBreadcrumbSchema } from '@/components/ui/JsonLd'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PARAMÈTRES STATIQUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function generateStaticParams() {
  return allProducts.map(p => ({ slug: p.slug }))
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   METADATA DYNAMIQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}

  return {
    title:       `${product.name} — TA FLEUR`,
    description: `${product.name}. ${formatPrice(product.price)}. Livraison express 24h. Fraîcheur garantie.`,
    openGraph: {
      title:       product.name,
      description: `${formatPrice(product.price)} · Livraison 24h · Fraîcheur garantie`,
      images:      [{ url: product.image, alt: product.imageAlt ?? product.name }],
    },
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HELPER : images galerie simulées
   En prod = vrais assets Shopify
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildGallery(product: ReturnType<typeof getProductBySlug>) {
  if (!product) return []
  const isLocal = product.image.startsWith('/')
  const base    = product.image.split('?')[0]
  /* Images locales : même image pour toutes les vues (pas de query params CDN) */
  if (isLocal) {
    return [
      { src: base, alt: product.imageAlt ?? product.name },
      { src: base, alt: `${product.name} — vue détail` },
      { src: base, alt: `${product.name} — composition` },
      { src: base, alt: `${product.name} — emballage TA FLEUR` },
    ]
  }
  return [
    { src: `${base}?w=800&q=85`,          alt: product.imageAlt ?? product.name },
    { src: `${base}?w=800&q=85&crop=entropy`, alt: `${product.name} — vue 2` },
    { src: `${base}?w=800&q=80`,          alt: `${product.name} — détail` },
    { src: `${base}?w=600&q=85`,          alt: `${product.name} — emballage` },
  ]
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  /* Collection principale du produit */
  const primaryCollectionSlug = product.collections.find(c =>
    !['best-sellers'].includes(c)
  ) ?? product.collections[0]

  const collection = getCollection(primaryCollectionSlug)
  const collectionName = collection?.name ?? 'Collection'
  const images = buildGallery(product)

  /* Produits liés : même collection, pas le produit courant */
  const related = allProducts
    .filter(p => p.id !== product.id && p.collections.includes(primaryCollectionSlug))
    .sort((a, b) => b.sales - a.sales)

  /* Structured data */
  const productSchema   = buildProductSchema({
    name:        product.name,
    description: `${product.name}. ${formatPrice(product.price)}. Livraison express 24h. Fraîcheur garantie.`,
    image:       product.image,
    price:       product.price,
    slug:        product.slug,
    inStock:     product.inStock,
  })
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Accueil',         href: '/' },
    { name: collectionName,    href: `/collections/${primaryCollectionSlug}` },
    { name: product.name,      href: `/produit/${product.slug}` },
  ])

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── Section principale ── */}
      <div className="bg-white">
        <div className="container-ta py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-16 items-start">

            {/* Colonne gauche : galerie */}
            <div className="lg:sticky lg:top-[100px]">
              <ProductGallery images={images} name={product.name} />
            </div>

            {/* Colonne droite : info + actions */}
            <div>
              <ProductInfo
                product={product}
                collectionName={collectionName}
                collectionSlug={primaryCollectionSlug}
              />

              <ProductActions
                productId={product.id}
                productName={product.name}
                productSlug={product.slug}
                productPrice={product.price}
                productImage={product.image}
                productImageAlt={product.imageAlt ?? product.name}
                inStock={product.inStock}
                roseOptions={product.roseOptions}
              />

              <ProductTrust />
            </div>
          </div>
        </div>
      </div>

      {/* ── Produits liés ── */}
      <RelatedProducts
        products={related}
        collectionName={collectionName}
        collectionSlug={primaryCollectionSlug}
      />
    </>
  )
}
