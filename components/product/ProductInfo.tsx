/*
  PRODUCT INFO — TA FLEUR
  Composant serveur : nom, badge, prix, avis, description.
*/

import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import type { ProductExtended } from '@/lib/data/products'

interface ProductInfoProps {
  product:        ProductExtended
  collectionName: string
  collectionSlug: string
}

const badgeStyles: Record<string, string> = {
  'Nouveau':        'bg-ta-rose-pastel/20 text-ta-rose-deep',
  'Bestseller':     'bg-ta-rose-deep text-white',
  'Exclusif':       'bg-ta-gold/15 text-ta-gold',
  'Édition limitée':'bg-ta-black text-white',
}

/* Étoiles statiques — en production, viendront des avis Shopify/Trustpilot */
function Stars({ rating = 5, count = 0 }: { rating?: number; count?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={i < rating ? 'text-ta-gold' : 'text-ta-beige-medium'}
            width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      {count > 0 && (
        <a href="#avis" className="font-sans text-xs font-light text-ta-gray-400 hover:text-ta-rose-deep transition-colors">
          {count} avis
        </a>
      )}
    </div>
  )
}

export default function ProductInfo({ product, collectionName, collectionSlug }: ProductInfoProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const occasions: Record<string, string> = {
    'anniversaire':   'Anniversaire',
    'saint-valentin': 'Saint-Valentin',
    'fete-meres':     'Fête des mères',
    'mariage':        'Mariage',
    'remerciements':  'Remerciements',
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="mb-4">
        <ol className="flex items-center gap-2">
          {[
            { label: 'Accueil', href: '/' },
            { label: collectionName, href: `/collections/${collectionSlug}` },
          ].map(({ label, href }, i) => (
            <li key={href} className="flex items-center gap-2">
              {i > 0 && <span className="text-ta-gray-300 text-xs">/</span>}
              <Link
                href={href}
                className="font-display text-[0.55rem] font-light tracking-[0.1em] uppercase text-ta-gray-400 hover:text-ta-black transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <span className="text-ta-gray-300 text-xs">/</span>
            <span className="font-display text-[0.55rem] font-medium tracking-[0.1em] uppercase text-ta-black truncate max-w-[180px]">
              {product.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* Badge */}
      {product.badge && (
        <span className={[
          'inline-flex items-center px-3 py-1 rounded-full font-display text-[0.5rem] font-bold tracking-[0.15em] uppercase mb-3',
          badgeStyles[product.badge] ?? 'bg-ta-beige-light text-ta-black',
        ].join(' ')}>
          {product.badge}
        </span>
      )}

      {/* Titre */}
      <h1 className="font-serif text-2xl lg:text-3xl font-bold text-ta-black tracking-tight leading-snug mb-3">
        {product.name}
      </h1>

      {/* Avis */}
      <div className="mb-4">
        <Stars rating={5} count={Math.floor(product.sales * 0.12)} />
      </div>

      {/* Prix */}
      <div className="flex items-end gap-3 mb-5">
        <div>
          {product.roseOptions && (
            <p className="font-display text-[0.52rem] font-medium tracking-[0.12em] uppercase text-ta-gray-400 mb-0.5">
              À partir de
            </p>
          )}
          <span className="font-serif text-3xl font-bold text-ta-black">
            {formatPrice(product.price)}
          </span>
        </div>
        {product.originalPrice && (
          <>
            <span className="font-sans text-base font-light text-ta-gray-300 line-through mb-0.5">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="mb-0.5 px-2 py-0.5 rounded-full bg-ta-rose-deep/10 font-display text-[0.55rem] font-bold text-ta-rose-deep tracking-wide">
              −{discount}%
            </span>
          </>
        )}
      </div>

      {/* Description — utilise la description du produit si disponible */}
      <p className="font-sans text-sm font-light text-ta-gray-500 leading-relaxed mb-5">
        {product.description
          ? product.description
          : 'Une composition florale préparée avec soin le matin de votre livraison. Chaque fleur est sélectionnée pour sa fraîcheur et sa beauté. Emballage premium inclus, message personnalisé offert.'
        }
      </p>

      {/* Occasions */}
      {product.occasion.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="font-display text-[0.55rem] font-medium tracking-[0.1em] uppercase text-ta-gray-400">
            Parfait pour :
          </span>
          {product.occasion.map(o => (
            <span
              key={o}
              className="px-2.5 py-1 rounded-full bg-ta-beige-light font-display text-[0.55rem] font-medium tracking-[0.1em] uppercase text-ta-gray-500"
            >
              {occasions[o] ?? o}
            </span>
          ))}
        </div>
      )}

      {/* Séparateur */}
      <div className="h-px bg-ta-beige-medium mb-5" />
    </div>
  )
}
