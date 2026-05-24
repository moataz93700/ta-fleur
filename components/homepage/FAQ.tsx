'use client'

/*
  FAQ — TA FLEUR (ANIMÉE)

  Accordéon avec AnimatePresence — hauteur animée en douceur.
  Titre fadeUp, items stagger au scroll.
  Chevron rotatif Framer Motion.
*/

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { fadeUp, scaleUp, staggerContainer, sectionHeader, EASE_LUXURY } from '@/lib/animations'

interface FAQItem {
  id:       string
  question: string
  answer:   string
}

const faqItems: FAQItem[] = [
  {
    id:       'livraison',
    question: 'Quels sont vos délais et zones de livraison ?',
    answer:   'Nous livrons en France métropolitaine en 24h ouvrées. Commandez avant 14h pour une livraison le lendemain. La livraison est offerte dès 59€ d\'achat. Pour Paris et sa petite couronne, nous proposons également une livraison le jour même avant 20h pour les commandes passées avant 11h.',
  },
  {
    id:       'fraicheur',
    question: 'Comment garantissez-vous la fraîcheur des fleurs ?',
    answer:   'Chaque bouquet est préparé le matin de la livraison par nos fleuristes partenaires. Nous travaillons avec des producteurs locaux et européens sélectionnés pour la qualité de leurs fleurs. Si vos fleurs arrivent en mauvais état, nous les remplaçons gratuitement sous 24h — sans question, sans justificatif.',
  },
  {
    id:       'personnalisation',
    question: 'Puis-je personnaliser mon bouquet et ajouter un message ?',
    answer:   'Absolument. Sur chaque fiche produit, vous pouvez choisir vos couleurs préférées, ajouter des fleurs spécifiques, et inclure un message manuscrit offert (jusqu\'à 150 caractères). Pour les événements sur mesure (mariages, corporate), contactez notre équipe créative via la page Événements.',
  },
  {
    id:       'retours',
    question: 'Quelle est votre politique de retour et de remboursement ?',
    answer:   'Les fleurs fraîches sont des produits périssables — nous ne pratiquons pas de retour physique. En revanche, si vous n\'êtes pas satisfaite de votre commande (fleurs abîmées, mauvaise quantité, délai non respecté), contactez-nous dans les 24h avec une photo et nous trouvons une solution : remplacement gratuit, avoir ou remboursement complet.',
  },
  {
    id:       'paiement',
    question: 'Quels modes de paiement acceptez-vous ?',
    answer:   'Nous acceptons toutes les cartes bancaires (Visa, Mastercard, American Express), PayPal, Apple Pay et Google Pay. Le paiement est sécurisé par chiffrement SSL 256 bits. Pour les commandes importantes (événements, mariages), nous proposons également le virement bancaire.',
  },
  {
    id:       'conseils',
    question: 'Je ne suis pas experte en fleurs — comment choisir ?',
    answer:   'Pas de panique ! Notre guide "Choisir le bon bouquet" sur le blog vous accompagne selon l\'occasion et le budget. Vous pouvez aussi utiliser notre module de personnalisation : choisissez une occasion (anniversaire, Saint-Valentin, remerciements…) et nous suggérons le bouquet parfait. Et notre équipe est disponible 7j/7 par chat pour tout conseil.',
  },
]

function FAQItem({ item, isOpen, onToggle }: {
  item:     FAQItem
  isOpen:   boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-ta-beige-medium last:border-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className={cn(
          'font-sans text-sm font-medium leading-snug transition-colors duration-200',
          isOpen ? 'text-ta-rose-deep' : 'text-ta-black group-hover:text-ta-rose-deep',
        )}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE_LUXURY }}
        >
          <ChevronDownIcon className={cn(
            'w-4 h-4 flex-shrink-0 transition-colors duration-200',
            isOpen ? 'text-ta-rose-deep' : 'text-ta-gray-300',
          )} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_LUXURY }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-sans text-sm font-light text-ta-gray-500 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: listRef,   inView: listInView   } = useInView({ triggerOnce: true, threshold: 0.05 })
  const { ref: ctaRef,    inView: ctaInView    } = useInView({ triggerOnce: true, threshold: 0.5 })

  function toggle(id: string) {
    setOpenId(prev => prev === id ? null : id)
  }

  return (
    <section aria-label="Questions fréquentes" className="section-padding bg-ta-beige-light">
      <div className="container-ta">
        <div className="max-w-3xl mx-auto">

          {/* En-tête */}
          <motion.div
            ref={headerRef}
            variants={sectionHeader}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            className="text-center mb-10 lg:mb-12"
          >
            <motion.p variants={fadeUp} className="section-label text-ta-gold mb-3">
              Questions fréquentes
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl lg:text-4xl font-semibold text-ta-black tracking-tight">
              Tout ce que vous voulez savoir
            </motion.h2>
          </motion.div>

          {/* Accordéon */}
          <motion.div
            ref={listRef}
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate={listInView ? 'visible' : 'hidden'}
            className="bg-white rounded-2xl shadow-card px-6 lg:px-8"
          >
            {faqItems.map(item => (
              <motion.div key={item.id} variants={scaleUp}>
                <FAQItem
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA contact */}
          <motion.p
            ref={ctaRef}
            variants={fadeUp}
            initial="hidden"
            animate={ctaInView ? 'visible' : 'hidden'}
            className="mt-8 text-center font-sans text-sm font-light text-ta-gray-400"
          >
            Vous n&apos;avez pas trouvé votre réponse ?{' '}
            <a href="/contact" className="font-medium text-ta-rose-deep hover:underline">
              Contactez-nous
            </a>
            {' '}— on répond en moins d&apos;1h.
          </motion.p>

        </div>
      </div>
    </section>
  )
}
