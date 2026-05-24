'use client'

/*
  REVIEWS — TA FLEUR (ANIMÉE)
  Note globale fadeUp, puis 3 cartes en stagger.
*/

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, scaleUp, staggerContainer, sectionHeader } from '@/lib/animations'

interface Review {
  id:       string
  name:     string
  city:     string
  rating:   number
  date:     string
  text:     string
  product:  string
  initials: string
  bgColor:  string
}

const reviews: Review[] = [
  {
    id:       'r1',
    name:     'Camille D.',
    city:     'Paris',
    rating:   5,
    date:     'Il y a 3 jours',
    text:     'Absolument magnifique. Les roses étaient fraîches et bien présentées — exactement comme sur les photos. Ma mère a pleuré de joie. Je recommande les yeux fermés.',
    product:  'Bouquet Romance',
    initials: 'CD',
    bgColor:  'bg-ta-rose-pastel',
  },
  {
    id:       'r2',
    name:     'Sophia M.',
    city:     'Lyon',
    rating:   5,
    date:     'Il y a 1 semaine',
    text:     'Livraison à l\'heure, emballage soigné avec un petit mot manuscrit. Le coffret roses éternelles est encore plus beau en vrai. Un luxe accessible, je reviendrai !',
    product:  'Coffret Lumière',
    initials: 'SM',
    bgColor:  'bg-ta-gold/20',
  },
  {
    id:       'r3',
    name:     'Inès L.',
    city:     'Bordeaux',
    rating:   5,
    date:     'Il y a 2 semaines',
    text:     'Commandé un vendredi soir, livré le lendemain matin avant 10h. Les tulipes étaient fraîches et parfaites pour mon mariage. Service client ultra réactif. Merci TA FLEUR !',
    product:  'Bouquet Douceur',
    initials: 'IL',
    bgColor:  'bg-ta-beige-medium',
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} étoiles sur 5`}>
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
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="bg-white rounded-2xl p-6 lg:p-7 shadow-card flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <span className="font-display text-[0.55rem] font-light tracking-[0.1em] uppercase text-ta-gray-300">
          {review.date}
        </span>
      </div>
      <p className="font-sans text-sm font-light text-ta-gray-500 leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="font-display text-[0.55rem] font-medium tracking-[0.1em] uppercase text-ta-rose-deep bg-ta-beige-light px-3 py-1.5 rounded-full self-start">
        {review.product}
      </p>
      <div className="flex items-center gap-3 pt-1 border-t border-ta-beige-medium">
        <div className={['w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0', review.bgColor].join(' ')}>
          <span className="font-display text-[0.6rem] font-bold text-ta-black/70">{review.initials}</span>
        </div>
        <div>
          <p className="font-display text-xs font-semibold text-ta-black tracking-wide">{review.name}</p>
          <p className="font-display text-[0.55rem] font-light tracking-[0.1em] uppercase text-ta-gray-300">
            {review.city} · Achat vérifié ✓
          </p>
        </div>
      </div>
    </article>
  )
}

export default function Reviews() {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: gridRef,   inView: gridInView   } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section aria-label="Avis de nos clientes" className="section-padding bg-ta-beige-light">
      <div className="container-ta">

        <motion.div
          ref={headerRef}
          variants={sectionHeader}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="text-center mb-10 lg:mb-12"
        >
          <motion.p variants={fadeUp} className="section-label text-ta-gold mb-3">Témoignages</motion.p>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl lg:text-4xl font-semibold text-ta-black tracking-tight mb-4">
            Ce que disent nos clientes
          </motion.h2>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5 shadow-card">
            <Stars rating={5} />
            <span className="font-serif text-sm font-semibold text-ta-black">4.9 / 5</span>
            <span className="w-px h-4 bg-ta-beige-medium" />
            <span className="font-display text-[0.55rem] font-medium tracking-[0.1em] uppercase text-ta-gray-400">
              Basé sur +2 400 avis
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          ref={gridRef}
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
        >
          {reviews.map(review => (
            <motion.div key={review.id} variants={scaleUp} className="flex">
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
