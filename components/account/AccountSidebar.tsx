'use client'

/*
  SIDEBAR COMPTE — TA FLEUR
  Navigation latérale avec avatar Clerk + liens.
*/

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser, useClerk } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import {
  UserCircleIcon,
  ShoppingBagIcon,
  HeartIcon,
  MapPinIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/account',             label: 'Mon profil',     icon: UserCircleIcon    },
  { href: '/account/orders',      label: 'Mes commandes',  icon: ShoppingBagIcon   },
  { href: '/account/favorites',   label: 'Mes favoris',    icon: HeartIcon         },
  { href: '/account/addresses',   label: 'Mes adresses',   icon: MapPinIcon        },
]

export default function AccountSidebar() {
  const { user }      = useUser()
  const { signOut }   = useClerk()
  const pathname      = usePathname()

  return (
    <aside>
      {/* Avatar + nom */}
      <div className="bg-white rounded-2xl p-6 mb-4 text-center shadow-sm">
        {user?.imageUrl ? (
          <img src={user.imageUrl} alt={user.fullName ?? ''} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover ring-2 ring-ta-rose-medium/30" />
        ) : (
          <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-serif text-xl font-semibold"
            style={{ background: 'linear-gradient(135deg, #D4748C, #E9B2BC)' }}>
            {user?.firstName?.[0] ?? '?'}
          </div>
        )}
        <p className="font-serif text-base font-semibold text-ta-black leading-tight">
          {user?.fullName ?? 'Mon compte'}
        </p>
        <p className="font-sans text-xs text-ta-gray-400 mt-0.5 truncate">
          {user?.primaryEmailAddress?.emailAddress}
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-white rounded-2xl overflow-hidden shadow-sm">
        {NAV_ITEMS.map(({ href, label, icon: Icon }, i) => {
          const active = pathname === href
          return (
            <motion.div key={href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}>
              <Link href={href}
                className={cn(
                  'flex items-center gap-3 px-5 py-3.5 font-display text-[0.58rem] font-medium tracking-[0.12em] uppercase transition-all duration-200 border-l-2',
                  active
                    ? 'text-ta-rose-deep border-ta-rose-deep bg-ta-rose-warm'
                    : 'text-ta-gray-500 border-transparent hover:text-ta-black hover:bg-ta-ivory'
                )}>
                <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-ta-rose-deep' : 'text-ta-gray-300')} />
                {label}
              </Link>
            </motion.div>
          )
        })}

        {/* Déconnexion */}
        <div className="border-t border-ta-beige-light">
          <button
            onClick={() => signOut({ redirectUrl: '/' })}
            className="w-full flex items-center gap-3 px-5 py-3.5 font-display text-[0.58rem] font-medium tracking-[0.12em] uppercase text-ta-gray-400 hover:text-red-500 transition-colors duration-200 border-l-2 border-transparent">
            <ArrowRightStartOnRectangleIcon className="w-4 h-4 flex-shrink-0" />
            Se déconnecter
          </button>
        </div>
      </nav>
    </aside>
  )
}
