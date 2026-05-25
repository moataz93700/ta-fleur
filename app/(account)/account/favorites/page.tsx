'use client'

/*
  PAGE FAVORIS — TA FLEUR
  Affiche les produits mis en favoris via FavoritesContext.
*/

import Link from 'next/link'
import { motion } from 'framer-motion'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useFavorites } from '@/lib/context/FavoritesContext'
import { allProducts } from '@/lib/data/products'
import ProductCard from '@/components/ui/ProductCard'

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay } },
})

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites()
  const favoriteProducts = allProducts.filter(p => favorites.includes(p.id))

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-6">

      <motion.div variants={fadeUp(0)}>
        <p className="font-display text-[0.52rem] tracking-[0.25em] uppercase text-ta-gold mb-1">Mon compte</p>
        <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-ta-black">
          Mes favoris
          {favoriteProducts.length > 0 && (
            <span className="ml-3 font-sans text-base font-normal text-ta-gray-400">
              ({favoriteProducts.length})
            </span>
          )}
        </h1>
      </motion.div>

      {favoriteProducts.length === 0 ? (
        <motion.div variants={fadeUp(0.08)} className="bg-white rounded-2xl p-12 shadow-sm text-center">
          <HeartIcon className="w-12 h-12 text-ta-beige-medium mx-auto mb-4" />
          <h2 className="font-serif text-xl font-semibold text-ta-black mb-2">Aucun favori</h2>
          <p className="font-sans text-sm text-ta-gray-400 mb-6">
            Cliquez sur le ♡ sur les produits pour les ajouter à vos favoris.
          </p>
          <Link href="/collections/bouquets"
            className="inline-flex h-11 items-center px-8 rounded-full font-display text-[0.58rem] font-semibold tracking-[0.18em] uppercase text-white transition-all hover:-translate-y-0.5"
            style={{ background: '#D4748C' }}>
            Découvrir nos bouquets
          </Link>
        </motion.div>
      ) : (
        <motion.div variants={fadeUp(0.08)}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {favoriteProducts.map((product, i) => (
            <motion.div key={product.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}>
              <ProductCard
                product={product}
                isWishlisted
                onWishlist={toggleFavorite}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

    </motion.div>
  )
}
