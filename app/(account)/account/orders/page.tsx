'use client'

/*
  PAGE COMMANDES — TA FLEUR
  Affiche les commandes (mock data — à connecter Shopify Orders API en prod).
*/

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBagIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '@/lib/utils'

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay } },
})

/* Mock orders — remplacer par Shopify API */
const MOCK_ORDERS = [
  {
    id: '#TA-2025-0042',
    date: '12 avril 2025',
    status: 'Livré',
    statusColor: 'text-green-600 bg-green-50',
    items: [{ name: 'Princesse Fuchsia — 20 roses', price: 8900 }],
    total: 8900,
  },
  {
    id: '#TA-2025-0031',
    date: '28 mars 2025',
    status: 'Livré',
    statusColor: 'text-green-600 bg-green-50',
    items: [{ name: 'Velours Rouge — 10 roses', price: 5400 }],
    total: 5400,
  },
  {
    id: '#TA-2025-0018',
    date: '14 février 2025',
    status: 'Livré',
    statusColor: 'text-green-600 bg-green-50',
    items: [
      { name: 'Azur Impérial — 30 roses', price: 13900 },
      { name: 'Coffret Lumière — Roses Éternelles Or', price: 11900 },
    ],
    total: 25800,
  },
]

export default function OrdersPage() {
  return (
    <motion.div initial="hidden" animate="visible" className="space-y-6">

      <motion.div variants={fadeUp(0)}>
        <p className="font-display text-[0.52rem] tracking-[0.25em] uppercase text-ta-gold mb-1">Mon compte</p>
        <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-ta-black">Mes commandes</h1>
      </motion.div>

      {MOCK_ORDERS.length === 0 ? (
        <motion.div variants={fadeUp(0.08)}
          className="bg-white rounded-2xl p-12 shadow-sm text-center">
          <ShoppingBagIcon className="w-12 h-12 text-ta-beige-medium mx-auto mb-4" />
          <h2 className="font-serif text-xl font-semibold text-ta-black mb-2">Aucune commande</h2>
          <p className="font-sans text-sm text-ta-gray-400 mb-6">
            Vous n&apos;avez pas encore passé de commande.
          </p>
          <Link href="/collections/bouquets"
            className="inline-flex h-11 items-center px-8 rounded-full font-display text-[0.58rem] font-semibold tracking-[0.18em] uppercase text-white transition-all hover:-translate-y-0.5"
            style={{ background: '#D4748C' }}>
            Découvrir nos bouquets
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {MOCK_ORDERS.map((order, i) => (
            <motion.div key={order.id} variants={fadeUp(0.06 * (i + 1))}
              className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-serif text-base font-semibold text-ta-black">{order.id}</p>
                  <p className="font-sans text-xs text-ta-gray-400 mt-0.5">{order.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full font-display text-[0.5rem] font-bold tracking-[0.12em] uppercase ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <p className="font-sans text-sm text-ta-gray-500">{item.name}</p>
                    <p className="font-sans text-sm font-medium text-ta-black">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-ta-beige-light">
                <div>
                  <span className="font-display text-[0.5rem] tracking-[0.15em] uppercase text-ta-gray-300">Total </span>
                  <span className="font-serif text-base font-semibold text-ta-black ml-1">{formatPrice(order.total)}</span>
                </div>
                <button className="flex items-center gap-1 font-display text-[0.52rem] tracking-[0.12em] uppercase text-ta-gold hover:text-ta-gold-medium transition-colors">
                  Détails <ChevronRightIcon className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </motion.div>
  )
}
