'use client'

/*
  FILTER BAR — TA FLEUR

  Directeur artistique :
  Barre sticky horizontale après le hero.
  Fond blanc, border-b beige. Sobre, fonctionnel, élégant.
  Mobile : bouton "Filtrer" qui ouvre un bottom drawer.

  3 filtres :
  - Tri (dropdown) : Popularité | Nouveautés | Prix ↑ | Prix ↓
  - Occasion (pills) : Anniversaire | Saint-Valentin | Fête des mères | Mariage | Remerciements
  - Budget (pills) : < 50€ | 50-100€ | > 100€

  Impact UX :
  → Filtres visibles = moins de friction pour affiner la recherche
  → Compteur "X résultat(s)" = feedback immédiat après filtre
  → Pills > checkboxes : plus rapide à cliquer, visuellement plus clair
*/

import { useState } from 'react'
import { AdjustmentsHorizontalIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { SortOption, BudgetOption } from '@/lib/data/products'
import { EASE_LUXURY } from '@/lib/animations'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   OPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popularite', label: 'Popularité' },
  { value: 'nouveautes', label: 'Nouveautés' },
  { value: 'prix-asc',   label: 'Prix croissant' },
  { value: 'prix-desc',  label: 'Prix décroissant' },
]

const budgetOptions: { value: BudgetOption; label: string }[] = [
  { value: 'all',      label: 'Tous les budgets' },
  { value: 'under-50', label: '< 50€' },
  { value: '50-100',   label: '50 – 100€' },
  { value: 'over-100', label: '> 100€' },
]

const occasionOptions = [
  { value: '',               label: 'Toutes occasions' },
  { value: 'anniversaire',   label: 'Anniversaire' },
  { value: 'saint-valentin', label: 'Saint-Valentin' },
  { value: 'fete-meres',     label: 'Fête des mères' },
  { value: 'mariage',        label: 'Mariage' },
  { value: 'remerciements',  label: 'Remerciements' },
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
interface FilterBarProps {
  sort:              SortOption
  onSortChange:      (v: SortOption) => void
  budget:            BudgetOption
  onBudgetChange:    (v: BudgetOption) => void
  occasion:          string
  onOccasionChange:  (v: string) => void
  totalCount:        number
  filteredCount:     number
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PILL BUTTON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Pill({
  active,
  onClick,
  children,
}: {
  active:   boolean
  onClick:  () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-8 px-4 rounded-full font-display text-[0.58rem] font-semibold tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-200',
        active
          ? 'bg-ta-black text-white'
          : 'bg-ta-beige-light text-ta-gray-500 hover:bg-ta-beige-medium hover:text-ta-black',
      )}
    >
      {children}
    </button>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MOBILE DRAWER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MobileDrawer({
  isOpen, onClose,
  sort, onSortChange,
  budget, onBudgetChange,
  occasion, onOccasionChange,
}: FilterBarProps & { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[400] bg-ta-black/30 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            key="drawer"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: EASE_LUXURY }}
            className="fixed bottom-0 left-0 right-0 z-[410] bg-white rounded-t-2xl shadow-2xl p-6 pb-safe lg:hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-sm font-bold tracking-[0.1em] uppercase text-ta-black">
                Filtrer & Trier
              </h2>
              <button onClick={onClose} className="p-2 -mr-2 text-ta-gray-400 hover:text-ta-black transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Tri */}
              <div>
                <p className="font-display text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ta-gold mb-3">Trier par</p>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map(o => (
                    <Pill key={o.value} active={sort === o.value} onClick={() => onSortChange(o.value)}>
                      {o.label}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <p className="font-display text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ta-gold mb-3">Budget</p>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map(o => (
                    <Pill key={o.value} active={budget === o.value} onClick={() => onBudgetChange(o.value)}>
                      {o.label}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <p className="font-display text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ta-gold mb-3">Occasion</p>
                <div className="flex flex-wrap gap-2">
                  {occasionOptions.map(o => (
                    <Pill key={o.value} active={occasion === o.value} onClick={() => onOccasionChange(o.value)}>
                      {o.label}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-full h-12 rounded-full bg-ta-rose-deep text-white font-display text-[0.65rem] font-semibold tracking-[0.15em] uppercase"
            >
              Voir les résultats
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPOSANT PRINCIPAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function FilterBar(props: FilterBarProps) {
  const {
    sort, onSortChange,
    budget, onBudgetChange,
    occasion, onOccasionChange,
    filteredCount,
  } = props

  const [drawerOpen,  setDrawerOpen]  = useState(false)
  const [sortOpen,    setSortOpen]    = useState(false)

  const hasActiveFilters = budget !== 'all' || occasion !== ''
  const currentSortLabel = sortOptions.find(o => o.value === sort)?.label ?? 'Popularité'

  return (
    <>
      <div className="sticky top-[80px] z-[100] bg-white border-b border-ta-beige-medium shadow-[0_1px_0_rgba(237,227,220,0.8)]">
        <div className="container-ta py-3">
          <div className="flex items-center justify-between gap-4">

            {/* ── Gauche : compteur + filtres occasions (desktop) ── */}
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              {/* Compteur */}
              <span className="font-display text-[0.58rem] font-light tracking-[0.1em] uppercase text-ta-gray-400 whitespace-nowrap flex-shrink-0">
                {filteredCount} résultat{filteredCount > 1 ? 's' : ''}
              </span>
              <span className="w-px h-4 bg-ta-beige-medium flex-shrink-0 hidden sm:block" />

              {/* Occasions (desktop) */}
              <div className="hidden sm:flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {occasionOptions.map(o => (
                  <Pill key={o.value} active={occasion === o.value} onClick={() => onOccasionChange(o.value)}>
                    {o.label}
                  </Pill>
                ))}
              </div>
            </div>

            {/* ── Droite : budget pills + sort dropdown + mobile btn ── */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Budget (desktop) */}
              <div className="hidden lg:flex items-center gap-2">
                {budgetOptions.slice(1).map(o => (
                  <Pill key={o.value} active={budget === o.value} onClick={() => onBudgetChange(o.value)}>
                    {o.label}
                  </Pill>
                ))}
              </div>

              {/* Sort dropdown (desktop) */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setSortOpen(v => !v)}
                  className="h-8 px-4 rounded-full border border-ta-beige-medium hover:border-ta-black flex items-center gap-2 font-display text-[0.58rem] font-semibold tracking-[0.1em] uppercase text-ta-gray-500 hover:text-ta-black transition-all duration-200"
                >
                  {currentSortLabel}
                  <ChevronDownIcon className={cn('w-3 h-3 transition-transform duration-200', sortOpen && 'rotate-180')} />
                </button>

                <AnimatePresence>
                  {sortOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                      <motion.ul
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: EASE_LUXURY }}
                        className="absolute right-0 top-10 z-20 bg-white rounded-xl shadow-card border border-ta-beige-medium py-2 min-w-[160px]"
                      >
                        {sortOptions.map(o => (
                          <li key={o.value}>
                            <button
                              onClick={() => { onSortChange(o.value); setSortOpen(false) }}
                              className={cn(
                                'w-full text-left px-4 py-2.5 font-display text-[0.6rem] font-medium tracking-[0.1em] uppercase transition-colors duration-150',
                                sort === o.value
                                  ? 'text-ta-rose-deep bg-ta-beige-light'
                                  : 'text-ta-gray-500 hover:text-ta-black hover:bg-ta-beige-light',
                              )}
                            >
                              {o.label}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Bouton filtrer (mobile) */}
              <button
                onClick={() => setDrawerOpen(true)}
                className={cn(
                  'sm:hidden h-8 px-4 rounded-full border flex items-center gap-2 font-display text-[0.58rem] font-semibold tracking-[0.1em] uppercase transition-all duration-200',
                  hasActiveFilters
                    ? 'border-ta-rose-deep bg-ta-rose-deep text-white'
                    : 'border-ta-beige-medium text-ta-gray-500',
                )}
              >
                <AdjustmentsHorizontalIcon className="w-3.5 h-3.5" />
                Filtrer
                {hasActiveFilters && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileDrawer
        {...props}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}
