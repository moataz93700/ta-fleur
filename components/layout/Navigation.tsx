/*
  NAVIGATION DESKTOP — TA FLEUR

  Directeur artistique :
  4 catégories maximales. Montserrat 11px, tracking 0.15em, uppercase.
  L'underline animé depuis le centre (scaleX 0→1) — signature micro-interaction luxe.
  Pas de mega-menu à cette étape. Simplicité = luxe.

  Impact branding :
  La navigation minimaliste communique confiance en la marque.
  Si tu as besoin de 12 catégories, tes produits ne sont pas clairs.
  TA FLEUR = 4 univers distincts, nets, désirables.
*/

import Link from 'next/link'

const navLinks = [
  { label: 'Bouquets',          href: '/collections/bouquets' },
  { label: 'Roses Éternelles',  href: '/collections/roses-eternelles' },
  { label: 'Coffrets',          href: '/collections/coffrets' },
  { label: 'Événements',        href: '/collections/evenements' },
]

interface NavigationProps {
  variant?: 'dark' | 'white'
}

export default function Navigation({ variant = 'dark' }: NavigationProps) {
  const textColor =
    variant === 'white'
      ? 'text-white/80 hover:text-white'
      : 'text-ta-black/75 hover:text-ta-black'

  const lineColor =
    variant === 'white'
      ? 'bg-white'
      : 'bg-ta-black'

  return (
    <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-8">
      {navLinks.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={[
            'group relative pb-0.5',
            'font-display text-[0.65rem] font-medium tracking-[0.15em] uppercase',
            'transition-colors duration-200',
            textColor,
          ].join(' ')}
        >
          {label}

          {/* Underline animé — scaleX center */}
          <span
            className={[
              'absolute bottom-0 left-0 w-full h-px origin-center',
              'scale-x-0 group-hover:scale-x-100',
              'transition-transform duration-300 ease-luxury',
              lineColor,
            ].join(' ')}
          />
        </Link>
      ))}
    </nav>
  )
}

export { navLinks }
