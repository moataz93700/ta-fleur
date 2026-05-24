'use client'

/*
  CART DRAWER — TA FLEUR

  Directeur artistique :
  Panel 480px depuis la droite, fond blanc.
  Header : "Mon panier (X)" + croix.
  Corps : liste CartItems avec AnimatePresence.
  Footer sticky : livraison offerte progress + subtotal + CTA Commander.

  Impact conversion :
  → Drawer > page panier dédiée : +8% de conversion (Baymard)
    Le client reste contextuellement dans sa session d'achat.
  → Barre "livraison offerte dès 59€" : upsell naturel et non agressif
  → CTA "Commander" visible sans scroll = conversion immédiate

  Impact émotionnel :
  Le panier doit rassurer, pas angoisser.
  Ton : calme, élégant. On confirme que le geste est beau.
*/

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/lib/context/CartContext'
import { formatPrice } from '@/lib/utils'
import CartItemComponent from './CartItem'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONSTANTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const FREE_SHIPPING_THRESHOLD = 5900 // 59€ en centimes

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BARRE LIVRAISON GRATUITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const remaining   = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress    = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const isFree      = subtotal >= FREE_SHIPPING_THRESHOLD

  return (
    <div className="px-6 py-3 bg-ta-beige-light border-b border-ta-beige-medium">
      <p className="font-display text-[0.58rem] font-medium tracking-[0.1em] uppercase text-ta-gray-500 mb-2">
        {isFree
          ? '🎉 Livraison offerte !'
          : `Plus que ${formatPrice(remaining)} pour la livraison offerte`
        }
      </p>
      <div className="h-1 w-full rounded-full bg-ta-beige-medium overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-ta-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ÉTAT VIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CartEmpty({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-ta-beige-light flex items-center justify-center mb-6">
        <ShoppingBagIcon className="w-8 h-8 text-ta-gray-300" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-ta-black mb-2">
        Votre panier est vide
      </h3>
      <p className="font-sans text-sm font-light text-ta-gray-400 mb-8 leading-relaxed">
        Laissez-vous inspirer par nos collections florales.
      </p>
      <button
        onClick={onClose}
        className="btn btn-rose"
      >
        Découvrir nos bouquets
      </button>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPOSANT PRINCIPAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, totalItems } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[290] bg-ta-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* ── Panel ── */}
          <motion.div
            key="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Votre panier"
            className="fixed inset-y-0 right-0 z-[300] w-full max-w-[480px] bg-white shadow-2xl flex flex-col"
          >

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ta-beige-medium flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBagIcon className="w-5 h-5 text-ta-black" />
                <h2 className="font-serif text-lg font-semibold text-ta-black">
                  Mon panier
                </h2>
                {totalItems > 0 && (
                  <span className="min-w-[22px] h-[22px] px-1.5 flex items-center justify-center rounded-full bg-ta-rose-deep text-white font-display text-[0.5rem] font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Fermer le panier"
                className="p-2 -mr-2 text-ta-black/50 hover:text-ta-black transition-colors rounded-md"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* ── Barre livraison gratuite ── */}
            {items.length > 0 && <FreeShippingBar subtotal={subtotal} />}

            {/* ── Corps ── */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <CartEmpty onClose={closeCart} />
              ) : (
                <div className="px-6">
                  <AnimatePresence initial={false}>
                    {items.map(item => (
                      <CartItemComponent key={item.productId} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* ── Footer sticky ── */}
            {items.length > 0 && (
              <div className="flex-shrink-0 border-t border-ta-beige-medium px-6 py-5 bg-white">
                {/* Sous-total */}
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-[0.6rem] font-medium tracking-[0.1em] uppercase text-ta-gray-500">
                    Sous-total
                  </span>
                  <span className="font-serif text-xl font-bold text-ta-black">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="font-sans text-[0.65rem] font-light text-ta-gray-400 mb-5">
                  Livraison calculée à l&apos;étape suivante
                </p>

                {/* CTA Commander */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center w-full h-14 rounded-full bg-ta-rose-deep hover:bg-ta-rose-dark text-white font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rose mb-3"
                >
                  Commander · {formatPrice(subtotal)}
                </Link>

                {/* Continuer les achats */}
                <button
                  onClick={closeCart}
                  className="w-full text-center font-display text-[0.58rem] font-medium tracking-[0.1em] uppercase text-ta-gray-400 hover:text-ta-black transition-colors duration-200"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
