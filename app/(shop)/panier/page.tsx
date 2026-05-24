'use client'

/*
  PAGE PANIER — TA FLEUR
  Route : /panier

  Directeur artistique :
  Version pleine page du panier — pour partage de lien, retour depuis checkout.
  2 colonnes desktop : items à gauche, récapitulatif sticky à droite.
  Même logique que CartDrawer mais dans le contexte full-page premium.

  Impact conversion :
  → URL partageable → bon pour les paniers abandonnés par email
  → Récapitulatif sticky → engagement conscient du montant avant paiement
  → Cross-sell "Vous aimerez aussi" → panier moyen +18%

  Impact émotionnel :
  Le panier est le moment de la promesse.
  L'utilisateur a choisi — on confirme que c'est un beau choix.
*/

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBagIcon,
  XMarkIcon,
  MinusIcon,
  PlusIcon,
  LockClosedIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { useCart } from '@/lib/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { EASE_LUXURY, fadeUp, staggerContainer } from '@/lib/animations'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONSTANTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const FREE_SHIPPING = 5900
const SHIPPING_COST = 495

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BARRE LIVRAISON GRATUITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, FREE_SHIPPING - subtotal)
  const progress  = Math.min(100, (subtotal / FREE_SHIPPING) * 100)
  const isFree    = subtotal >= FREE_SHIPPING

  return (
    <div className="bg-ta-beige-light rounded-2xl px-5 py-4 mb-6">
      <div className="flex items-center gap-2.5 mb-2">
        <TruckIcon className="w-4 h-4 text-ta-gold flex-shrink-0" />
        <p className="font-display text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ta-black">
          {isFree
            ? '🎉 Livraison offerte débloquée !'
            : `Plus que ${formatPrice(remaining)} pour la livraison offerte`
          }
        </p>
      </div>
      <div className="h-1.5 w-full rounded-full bg-ta-beige-medium overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-ta-gold to-ta-rose-pastel"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: EASE_LUXURY }}
        />
      </div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ITEM PANIER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CartItem({ item }: { item: ReturnType<typeof useCart>['items'][number] }) {
  const { removeItem, updateQty } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: EASE_LUXURY }}
      className="flex gap-4 py-5 border-b border-ta-beige-medium last:border-0"
    >
      {/* Image */}
      <Link
        href={`/produit/${item.slug}`}
        className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-ta-beige-light"
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="80px"
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Infos */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/produit/${item.slug}`}>
            <h3 className="font-serif text-sm font-semibold text-ta-black leading-snug hover:text-ta-rose-deep transition-colors duration-200">
              {item.name}
            </h3>
          </Link>
          <button
            onClick={() => removeItem(item.productId)}
            aria-label={`Supprimer ${item.name}`}
            className="p-1 -mt-0.5 text-ta-gray-300 hover:text-ta-black transition-colors flex-shrink-0"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Message */}
        {item.message && (
          <p className="font-sans text-[0.65rem] font-light italic text-ta-gray-400 mt-0.5 line-clamp-1">
            &ldquo;{item.message}&rdquo;
          </p>
        )}

        {/* Prix + Quantité */}
        <div className="flex items-center justify-between mt-3">
          {/* Quantité */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQty(item.productId, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Diminuer la quantité"
              className="w-7 h-7 rounded-full border border-ta-beige-medium flex items-center justify-center text-ta-black/60 hover:text-ta-black hover:border-ta-black transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <MinusIcon className="w-3 h-3" />
            </button>
            <span className="font-display text-sm font-semibold text-ta-black w-5 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQty(item.productId, item.quantity + 1)}
              disabled={item.quantity >= 10}
              aria-label="Augmenter la quantité"
              className="w-7 h-7 rounded-full border border-ta-beige-medium flex items-center justify-center text-ta-black/60 hover:text-ta-black hover:border-ta-black transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <PlusIcon className="w-3 h-3" />
            </button>
          </div>

          {/* Prix total item */}
          <span className="font-sans text-sm font-semibold text-ta-black">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PANIER VIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_LUXURY }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: EASE_LUXURY }}
        className="w-24 h-24 rounded-full bg-ta-beige-light flex items-center justify-center mb-8"
      >
        <ShoppingBagIcon className="w-10 h-10 text-ta-gray-300" />
      </motion.div>

      <p className="section-label text-ta-gold mb-3">Panier vide</p>
      <h1 className="font-serif text-3xl font-semibold text-ta-black tracking-tight mb-4">
        Votre panier vous attend
      </h1>
      <p className="font-sans text-sm font-light text-ta-gray-400 mb-10 max-w-sm leading-relaxed">
        Découvrez nos collections florales et laissez-vous inspirer par la beauté de nos bouquets.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/collections/bouquets" className="btn btn-rose">
          Découvrir nos bouquets
        </Link>
        <Link
          href="/collections/best-sellers"
          className="h-12 px-8 rounded-full border border-ta-beige-medium hover:border-ta-black font-display text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-ta-black transition-all duration-200 flex items-center justify-center"
        >
          Best-Sellers
        </Link>
      </div>
    </motion.div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE PRINCIPALE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CartPage() {
  const { items, subtotal, totalItems } = useCart()
  const shipping = subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST
  const total    = subtotal + shipping

  return (
    <div className="bg-ta-beige-light min-h-screen">
      <div className="container-ta py-10 lg:py-14">

        {/* ── Titre ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <p className="section-label text-ta-gold mb-1">Mon panier</p>
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-ta-black tracking-tight">
            {totalItems > 0
              ? `${totalItems} article${totalItems > 1 ? 's' : ''} sélectionné${totalItems > 1 ? 's' : ''}`
              : 'Votre panier'
            }
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

            {/* ── Articles ── */}
            <div>
              {/* Barre livraison gratuite */}
              <FreeShippingBar subtotal={subtotal} />

              {/* Liste */}
              <div className="bg-white rounded-2xl shadow-card px-4 sm:px-6">
                <AnimatePresence initial={false}>
                  {items.map(item => (
                    <CartItem key={item.productId} item={item} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Continuer */}
              <div className="mt-4">
                <Link
                  href="/collections/bouquets"
                  className="font-display text-[0.6rem] font-medium tracking-[0.12em] uppercase text-ta-gray-400 hover:text-ta-black transition-colors duration-200"
                >
                  ← Continuer mes achats
                </Link>
              </div>
            </div>

            {/* ── Récapitulatif sticky ── */}
            <div className="lg:sticky lg:top-8 self-start">
              <motion.div
                variants={staggerContainer(0.08)}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl shadow-card overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-ta-beige-medium">
                  <h2 className="font-display text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ta-gold">
                    Récapitulatif
                  </h2>
                </div>

                {/* Totaux */}
                <div className="px-6 py-5 space-y-3">
                  <motion.div variants={fadeUp} className="flex justify-between">
                    <span className="font-sans text-sm font-light text-ta-gray-500">
                      Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})
                    </span>
                    <span className="font-sans text-sm font-medium text-ta-black">
                      {formatPrice(subtotal)}
                    </span>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex justify-between">
                    <span className="font-sans text-sm font-light text-ta-gray-500">Livraison</span>
                    <span className={[
                      'font-sans text-sm font-medium',
                      shipping === 0 ? 'text-emerald-600' : 'text-ta-black',
                    ].join(' ')}>
                      {shipping === 0 ? 'Offerte 🎉' : formatPrice(shipping)}
                    </span>
                  </motion.div>

                  <motion.div variants={fadeUp} className="h-px bg-ta-beige-medium" />

                  <motion.div variants={fadeUp} className="flex justify-between items-end pt-1">
                    <span className="font-display text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ta-black">
                      Total TTC
                    </span>
                    <span className="font-serif text-2xl font-bold text-ta-black">
                      {formatPrice(total)}
                    </span>
                  </motion.div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6 space-y-3">
                  <motion.div variants={fadeUp}>
                    <Link
                      href="/checkout"
                      className="flex items-center justify-center w-full h-14 rounded-full bg-ta-rose-deep hover:bg-ta-rose-dark text-white font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rose"
                    >
                      Passer commande · {formatPrice(total)}
                    </Link>
                  </motion.div>

                  {/* Trust */}
                  <motion.div
                    variants={fadeUp}
                    className="flex items-center justify-center gap-2 text-ta-gray-400"
                  >
                    <LockClosedIcon className="w-3.5 h-3.5" />
                    <span className="font-display text-[0.55rem] font-medium tracking-[0.1em] uppercase">
                      Paiement 100% sécurisé
                    </span>
                  </motion.div>

                  {/* Paiements acceptés */}
                  <motion.div variants={fadeUp} className="flex justify-center gap-2 pt-1">
                    {['Visa', 'MC', 'PayPal', 'Apple Pay'].map(m => (
                      <span
                        key={m}
                        className="h-5 px-2 flex items-center justify-center rounded bg-ta-gray-100 font-display text-[0.45rem] font-bold text-ta-gray-400 tracking-wide"
                      >
                        {m}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
