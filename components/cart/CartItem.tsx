'use client'

/*
  CART ITEM — TA FLEUR

  Directeur artistique :
  Thumbnail 72×72 arrondi. Nom produit en Playfair compact.
  Quantité inline (−/+). Suppression : croix discrète.
  Message en italique Poppins sous le nom.

  Impact UX :
  → Modifier la quantité DANS le panier = moins de retours en arrière
  → Message visible = rappel de l'émotion = confirmation de l'achat
  → Suppression non-destructive : animation de sortie douce
*/

import Image from 'next/image'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/utils'
import { useCart, type CartItem as CartItemType } from '@/lib/context/CartContext'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQty, removeItem } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 py-4 border-b border-ta-beige-medium last:border-0"
    >
      {/* Thumbnail */}
      <div className="relative w-[72px] h-[72px] flex-shrink-0 rounded-xl overflow-hidden bg-ta-beige-light">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="72px"
          className="object-cover"
        />
      </div>

      {/* Infos */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-sm font-semibold text-ta-black leading-snug line-clamp-2">
            {item.name}
          </h3>
          <button
            onClick={() => removeItem(item.productId)}
            aria-label={`Supprimer ${item.name}`}
            className="flex-shrink-0 p-1 -mt-0.5 -mr-1 text-ta-gray-300 hover:text-ta-black transition-colors duration-200 rounded-md"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Option roses */}
        {item.variantLabel && (
          <p className="mt-0.5 font-display text-[0.52rem] font-semibold tracking-[0.12em] uppercase text-ta-gold">
            ✦ {item.variantLabel}
          </p>
        )}

        {/* Message */}
        {item.message && (
          <p className="mt-1 font-sans text-[0.65rem] font-light italic text-ta-gray-400 line-clamp-1">
            &ldquo;{item.message}&rdquo;
          </p>
        )}

        {/* Prix + Quantité */}
        <div className="mt-2.5 flex items-center justify-between">
          <span className="font-serif text-sm font-bold text-ta-black">
            {formatPrice(item.price * item.quantity)}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQty(item.productId, item.quantity - 1)}
              aria-label="Diminuer la quantité"
              className="w-6 h-6 rounded-full border border-ta-beige-medium flex items-center justify-center text-ta-black/60 hover:text-ta-black hover:border-ta-black transition-all duration-200 disabled:opacity-30"
              disabled={item.quantity <= 1}
            >
              <MinusIcon className="w-2.5 h-2.5" />
            </button>
            <span className="font-display text-xs font-semibold text-ta-black w-4 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQty(item.productId, item.quantity + 1)}
              aria-label="Augmenter la quantité"
              disabled={item.quantity >= 10}
              className="w-6 h-6 rounded-full border border-ta-beige-medium flex items-center justify-center text-ta-black/60 hover:text-ta-black hover:border-ta-black transition-all duration-200 disabled:opacity-30"
            >
              <PlusIcon className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
