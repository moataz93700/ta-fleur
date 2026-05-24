'use client'

/*
  PRODUCT GRID — TA FLEUR

  Grille responsive animée.
  Stagger au montage et re-stagger quand les filtres changent.
  État vide élégant si aucun résultat.
*/

import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '@/components/ui/ProductCard'
import type { ProductExtended } from '@/lib/data/products'
import { scaleUp, staggerContainer } from '@/lib/animations'

interface ProductGridProps {
  products: ProductExtended[]
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-ta-beige-light flex items-center justify-center text-2xl mb-4">
        🌸
      </div>
      <h3 className="font-serif text-xl font-semibold text-ta-black mb-2">
        Aucun produit trouvé
      </h3>
      <p className="font-sans text-sm font-light text-ta-gray-400 max-w-xs">
        Essayez d&apos;élargir vos filtres ou consultez toutes nos collections.
      </p>
    </div>
  )
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="container-ta py-10 lg:py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={products.map(p => p.id).join(',')}
          variants={staggerContainer(0.06)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {products.length === 0
            ? <EmptyState />
            : products.map((product, i) => (
                <motion.div key={product.id} variants={scaleUp}>
                  <ProductCard product={product} priority={i < 4} />
                </motion.div>
              ))
          }
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
