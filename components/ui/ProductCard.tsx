'use client'

/*
  PRODUCT CARD — TA FLEUR

  Impact conversion :
  → Badge "Bestseller" / "Nouveau" → désirabilité + urgence
  → Wishlist visible → réduction friction (mémoriser sans acheter)
  → Prix barré → perception de valeur améliorée
  → Bouton "Ajouter" au hover desktop → progression naturelle

  Impact émotionnel :
  La carte produit est la première impression du produit.
  Elle doit donner envie AVANT que l'utilisateur clique.
  Chaque détail compte : ombre, arrondi, transition de l'image.

  Impact branding :
  Cohérence parfaite avec la charte : beige, rose, or, Playfair.
*/

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { cn, formatPrice } from '@/lib/utils'
import { EASE_LUXURY } from '@/lib/animations'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TYPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export interface Product {
  id:             string
  name:           string
  slug:           string
  price:          number
  originalPrice?: number
  image:          string
  imageAlt?:      string
  badge?:         'Nouveau' | 'Bestseller' | 'Exclusif' | 'Édition limitée'
  badgeColor?:    'rose' | 'gold' | 'black'
  inStock:        boolean
}

interface ProductCardProps {
  product:     Product
  isWishlisted?: boolean
  onWishlist?:   (id: string) => void
  className?:    string
  priority?:     boolean  // pour les images au-dessus de la fold
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BADGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const badgeColors = {
  rose:  'bg-ta-rose-deep text-white',
  gold:  'bg-ta-gold text-white',
  black: 'bg-ta-black text-white',
}

function ProductBadge({ label, color = 'rose' }: { label: string; color?: 'rose' | 'gold' | 'black' }) {
  return (
    <span className={cn(
      'absolute top-3 left-3 z-10',
      'px-2.5 py-1 rounded-full',
      'font-display text-[0.5rem] font-bold tracking-[0.15em] uppercase',
      badgeColors[color],
    )}>
      {label}
    </span>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPOSANT PRINCIPAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ProductCard({
  product,
  isWishlisted: isWishlistedProp = false,
  onWishlist,
  className,
  priority = false,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(isWishlistedProp)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  function handleWishlist() {
    setIsWishlisted(w => !w)
    onWishlist?.(product.id)
  }

  return (
    <motion.article
      className={cn('group relative', className)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: EASE_LUXURY }}
    >

      {/* ── Zone image ── */}
      <div className="relative overflow-hidden rounded-xl bg-ta-beige-light aspect-[4/5] transition-shadow duration-500 ease-luxury group-hover:shadow-card-hover">

        {/* Badge */}
        {product.badge && (
          <ProductBadge
            label={product.badge}
            color={
              product.badge === 'Bestseller' ? 'rose'
              : product.badge === 'Exclusif' ? 'gold'
              : product.badge === 'Édition limitée' ? 'black'
              : 'rose'
            }
          />
        )}

        {/* Wishlist */}
        <motion.button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-ta-black/60 hover:text-ta-rose-deep transition-colors duration-200"
        >
          <motion.span
            key={isWishlisted ? 'solid' : 'outline'}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: EASE_LUXURY }}
          >
            {isWishlisted
              ? <HeartSolid className="w-4 h-4 text-ta-rose-deep" />
              : <HeartIcon className="w-4 h-4" />
            }
          </motion.span>
        </motion.button>

        {/* Image */}
        <Link href={`/produit/${product.slug}`} tabIndex={-1} aria-hidden="true">
          <Image
            src={product.image}
            alt={product.imageAlt ?? product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
            priority={priority}
          />
        </Link>

        {/* Bouton Ajouter au panier — hover desktop */}
        {product.inStock && (
          <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-luxury px-4 pb-4">
            <button
              aria-label={`Ajouter ${product.name} au panier`}
              className="w-full h-10 rounded-full bg-ta-black/90 backdrop-blur-sm hover:bg-ta-rose-deep text-white font-display text-[0.55rem] font-semibold tracking-[0.15em] uppercase transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingBagIcon className="w-3.5 h-3.5" />
              Ajouter au panier
            </button>
          </div>
        )}

        {/* Rupture de stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
            <span className="font-display text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ta-black/50 bg-white px-3 py-1.5 rounded-full">
              Épuisé
            </span>
          </div>
        )}
      </div>

      {/* ── Infos produit ── */}
      <div className="mt-3 px-0.5">
        <Link href={`/produit/${product.slug}`}>
          <h3 className="font-serif text-sm font-semibold text-ta-black leading-snug hover:text-ta-rose-deep transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-sans text-sm font-medium text-ta-black">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="font-sans text-xs font-light text-ta-gray-300 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="font-display text-[0.5rem] font-bold text-ta-rose-deep tracking-wide">
                −{discount}%
              </span>
            </>
          )}
        </div>
      </div>

    </motion.article>
  )
}
