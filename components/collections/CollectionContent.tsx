'use client'

/*
  COLLECTION CONTENT — TA FLEUR
  Client Component : gère l'état des filtres et du tri.
  Reçoit les produits bruts, les filtre/trie côté client.
*/

import { useState, useMemo } from 'react'
import {
  type ProductExtended,
  type SortOption,
  type BudgetOption,
  sortProducts,
  filterByBudget,
  filterByOccasion,
} from '@/lib/data/products'
import FilterBar from './FilterBar'
import ProductGrid from './ProductGrid'

interface CollectionContentProps {
  products: ProductExtended[]
}

export default function CollectionContent({ products }: CollectionContentProps) {
  const [sort,     setSort]     = useState<SortOption>('popularite')
  const [budget,   setBudget]   = useState<BudgetOption>('all')
  const [occasion, setOccasion] = useState<string>('')

  const filtered = useMemo(() => {
    let result = filterByOccasion(products, occasion)
    result     = filterByBudget(result, budget)
    result     = sortProducts(result, sort)
    return result
  }, [products, sort, budget, occasion])

  return (
    <div>
      <FilterBar
        sort={sort}          onSortChange={setSort}
        budget={budget}      onBudgetChange={setBudget}
        occasion={occasion}  onOccasionChange={setOccasion}
        totalCount={products.length}
        filteredCount={filtered.length}
      />
      <ProductGrid products={filtered} />
    </div>
  )
}
