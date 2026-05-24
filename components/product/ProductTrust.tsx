/*
  PRODUCT TRUST — TA FLEUR
  3 garanties visuelles sous le CTA.
  Server Component — pas de state.
*/

const trustItems = [
  {
    emoji: '🌿',
    title: 'Fraîcheur 48h garantie',
    desc:  'Ou remplacement immédiat',
  },
  {
    emoji: '📦',
    title: 'Emballage premium',
    desc:  'Protégé pour la livraison',
  },
  {
    emoji: '💳',
    title: 'Paiement sécurisé',
    desc:  'SSL 256-bit · Aucune donnée stockée',
  },
]

export default function ProductTrust() {
  return (
    <div className="mt-6 pt-5 border-t border-ta-beige-medium">
      <div className="grid grid-cols-3 gap-3">
        {trustItems.map(({ emoji, title, desc }) => (
          <div key={title} className="flex flex-col items-center text-center gap-1.5">
            <span className="text-xl">{emoji}</span>
            <p className="font-display text-[0.55rem] font-bold tracking-[0.1em] uppercase text-ta-black leading-snug">
              {title}
            </p>
            <p className="font-sans text-[0.6rem] font-light text-ta-gray-400 leading-snug hidden sm:block">
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Moyens de paiement */}
      <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
        <span className="font-display text-[0.5rem] font-light tracking-[0.1em] uppercase text-ta-gray-300 mr-1">
          Paiements acceptés :
        </span>
        {['Visa', 'MC', 'PayPal', 'Apple Pay', 'Google Pay'].map(label => (
          <div
            key={label}
            className="h-6 px-2 flex items-center rounded bg-ta-beige-light border border-ta-beige-medium"
          >
            <span className="font-display text-[0.5rem] font-bold text-ta-gray-400 whitespace-nowrap">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
