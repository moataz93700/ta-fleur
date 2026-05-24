'use client'

/*
  USP BAND — TA FLEUR (ANIMÉE)
  Stagger des 4 items à l'entrée dans le viewport.
*/

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  TruckIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline'
import { fadeUp, staggerContainer } from '@/lib/animations'

const usps = [
  {
    icon:  TruckIcon,
    title: 'Livraison express',
    desc:  'Offerte dès 59€ · 24h en France métropolitaine',
  },
  {
    icon:  SparklesIcon,
    title: 'Fraîcheur garantie',
    desc:  'Bouquets préparés le matin de la livraison',
  },
  {
    icon:  ShieldCheckIcon,
    title: 'Paiement sécurisé',
    desc:  'CB, PayPal, Apple Pay & Google Pay',
  },
  {
    icon:  ChatBubbleOvalLeftEllipsisIcon,
    title: 'Service client 7j/7',
    desc:  'Une question ? On vous répond en moins d\'1h',
  },
]

export default function USPBand() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      aria-label="Nos engagements"
      className="bg-white border-y border-ta-beige-medium"
    >
      <div className="container-ta py-8 lg:py-10">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-ta-beige-medium"
        >
          {usps.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex flex-col items-center text-center px-6 py-4 lg:py-0 gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-ta-beige-light flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-ta-rose-deep" />
              </div>
              <div>
                <p className="font-display text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ta-black mb-1">
                  {title}
                </p>
                <p className="font-sans text-[0.7rem] font-light text-ta-gray-400 leading-relaxed hidden sm:block">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
