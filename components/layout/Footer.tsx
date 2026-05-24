/*
  FOOTER PREMIUM — TA FLEUR

  Directeur artistique :
  Fond noir (#1A1A1A) — l'obscurité qui valorise la marque.
  Logo blanc centré en haut — signature royale.
  4 colonnes bien espacées, hiérarchie typographique claire.

  Impact branding :
  Un footer travaillé = confiance. Les marques qui bâclent leur footer
  semblent fragiles. TA FLEUR soigne chaque centimètre.

  Impact conversion :
  → Trust signals (paiements, garanties) = réduction des hésitations
  → Newsletter en footer = dernière chance de capturer l'email
  → Liens légaux visibles = conformité RGPD + confiance

  Impact émotionnel :
  Le footer est le "au revoir" de la boutique.
  Il doit laisser un souvenir agréable, pas une urgence.
  Ton : calme, rassurant, élégant.
*/

import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import NewsletterForm from './NewsletterForm'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DONNÉES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const footerLinks = [
  {
    title: 'TA FLEUR',
    links: [
      { label: 'Notre histoire',       href: '/notre-histoire' },
      { label: 'Nos fleuristes',       href: '/fleuristes' },
      { label: 'La promesse qualité',  href: '/promesse' },
      { label: 'Blog floral',          href: '/blog' },
      { label: 'Presse',               href: '/presse' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { label: 'Bouquets frais',        href: '/collections/bouquets' },
      { label: 'Roses éternelles',      href: '/collections/roses-eternelles' },
      { label: 'Coffrets cadeaux',      href: '/collections/coffrets' },
      { label: 'Événements & Mariages', href: '/collections/evenements' },
      { label: 'Best-Sellers',          href: '/collections/best-sellers' },
    ],
  },
  {
    title: 'Aide',
    links: [
      { label: 'FAQ',                   href: '/faq' },
      { label: 'Livraison & délais',    href: '/livraison' },
      { label: 'Retours & échanges',    href: '/retours' },
      { label: 'Personnalisation',      href: '/personnalisation' },
      { label: 'Nous contacter',        href: '/contact' },
    ],
  },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/tafleur',    handle: '@tafleur' },
  { label: 'TikTok',    href: 'https://tiktok.com/@tafleur',      handle: '@tafleur' },
  { label: 'Pinterest', href: 'https://pinterest.fr/tafleur',     handle: 'TA FLEUR' },
]

const legalLinks = [
  { label: 'Mentions légales',          href: '/mentions-legales' },
  { label: 'CGV',                       href: '/cgv' },
  { label: 'Politique de confidentialité', href: '/confidentialite' },
  { label: 'Cookies',                   href: '/cookies' },
]

/* Icônes paiement (SVG inline minimaliste) */
const paymentMethods = [
  { label: 'Visa' },
  { label: 'MC' },
  { label: 'PayPal' },
  { label: 'Apple Pay' },
  { label: 'Google Pay' },
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPOSANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Footer() {
  return (
    <footer className="bg-ta-black text-white" aria-label="Pied de page">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          NEWSLETTER BAND
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-b border-white/[0.08]">
        <div className="container-ta py-12 lg:py-14">
          <div className="max-w-xl mx-auto text-center">

            <p className="section-label text-ta-gold mb-3">Newsletter</p>

            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-white mb-3 tracking-tight">
              Des fleurs dans votre boîte mail
            </h2>

            <p className="font-sans text-sm font-light text-white/50 mb-8 leading-relaxed">
              Recevez nos nouvelles collections, inspirations florales et offres exclusives.<br />
              <span className="text-ta-gold font-medium">−15% sur votre première commande.</span>
            </p>

            <NewsletterForm />

            <p className="font-sans text-[0.65rem] font-light text-white/25 mt-4 tracking-wide">
              Sans spam · Désinscription en 1 clic · RGPD conforme
            </p>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LOGO + COLONNES LIENS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="container-ta pt-14 pb-10">

        {/* Logo centré */}
        <div className="flex justify-center mb-12">
          <Logo variant="white" size="lg" layout="compact" />
        </div>

        {/* Séparateur */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* 3 colonnes + 1 colonne social */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Colonnes de liens */}
          {footerLinks.map(col => (
            <div key={col.title}>
              <h3 className="font-display text-[0.6rem] font-bold tracking-[0.25em] uppercase text-ta-gold mb-5">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-sans text-sm font-light text-white/55 hover:text-white transition-colors duration-200 leading-none"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Colonne Réseaux sociaux */}
          <div>
            <h3 className="font-display text-[0.6rem] font-bold tracking-[0.25em] uppercase text-ta-gold mb-5">
              Suivez-nous
            </h3>
            <ul className="space-y-4">
              {socialLinks.map(({ label, href, handle }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-0.5"
                  >
                    <span className="font-display text-xs font-semibold text-white/80 group-hover:text-white transition-colors duration-200 tracking-wide">
                      {label}
                    </span>
                    <span className="font-sans text-[0.7rem] font-light text-white/35 group-hover:text-ta-gold transition-colors duration-200">
                      {handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Badge TikTok/Instagram */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ta-gold/30 bg-ta-gold/5">
              <span className="w-1.5 h-1.5 rounded-full bg-ta-gold animate-pulse-slow" />
              <span className="font-display text-[0.58rem] font-semibold tracking-[0.15em] uppercase text-ta-gold/80">
                Viral TikTok
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BARRE BASSE : Copyright + Paiements
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-t border-white/[0.06]">
        <div className="container-ta py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Copyright + liens légaux */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5">
              <p className="font-sans text-[0.62rem] font-light text-white/25 tracking-wide">
                © {new Date().getFullYear()} TA FLEUR — Tous droits réservés
              </p>

              <div className="hidden sm:block w-px h-3 bg-white/10" />

              <div className="flex flex-wrap justify-center gap-4">
                {legalLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="font-sans text-[0.6rem] font-light text-white/25 hover:text-white/60 transition-colors tracking-wide"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Moyens de paiement */}
            <div className="flex items-center gap-2">
              {paymentMethods.map(({ label }) => (
                <div
                  key={label}
                  className="h-6 px-2 flex items-center justify-center rounded bg-white/5 border border-white/10"
                >
                  <span className="font-display text-[0.5rem] font-bold text-white/40 tracking-wide whitespace-nowrap">
                    {label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </footer>
  )
}
