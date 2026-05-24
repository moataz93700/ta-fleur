'use client'

/*
  RELATED PRODUCTS — TA FLEUR

  Cross-sell : 4 produits de la même collection.
  Stagger animé au scroll.
  Impact conversion : +15% de panier moyen (cross-sell bien placé).
*/

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ProductCard from '@/components/ui/ProductCard'
import type { ProductExtended } from '@/lib/data/products'
import { fadeUp, scaleUp, staggerContainer, sectionHeader } from '@/lib/animations'

interface RelatedProductsProps {
  products:         ProductExtended[]
  collectionName:   string
  collectionSlug:   string
}

export default function RelatedProducts({
  products,
  collectionName,
  collectionSlug,
}: RelatedProductsProps) {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: gridRef,   inView: gridInView   } = useInView({ triggerOnce: true, threshold: 0.05 })

  if (products.length === 0) return null

  return (
    <section
      aria-label="Produits similaires"
      className="section-padding bg-ta-beige-light"
    >
      <div className="container-ta">

        {/* En-tête */}
        <motion.div
          ref={headerRef}
          variants={sectionHeader}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <motion.p variants={fadeUp} className="section-label text-ta-gold mb-3">
              Vous aimerez aussi
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-2xl lg:text-3xl font-semibold text-ta-black tracking-tight"
            >
              De la collection{' '}
              <span className="italic text-ta-rose-deep">{collectionName}</span>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href={`/collections/${collectionSlug}`}
              className="font-display text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-ta-black hover:text-ta-rose-deep transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              Voir tout <span className="text-ta-rose-pastel">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Grille */}
        <motion.div
          ref={gridRef}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {products.slice(0, 4).map(product => (
            <motion.div key={product.id} variants={scaleUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
