/*
  LOADING STATE — COLLECTION
  Skeleton screen pendant le chargement (ISR / RSC fallback).
  Maintient la structure visuelle pour éviter le layout shift.
*/

export default function CollectionLoading() {
  return (
    <div className="bg-white">
      {/* Hero skeleton */}
      <div className="relative h-[380px] lg:h-[480px] bg-ta-beige-medium animate-pulse" />

      <div className="container-ta py-10">
        {/* Filter bar skeleton */}
        <div className="h-14 rounded-2xl bg-ta-beige-light animate-pulse mb-8" />

        {/* Product grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[4/5] rounded-xl bg-ta-beige-medium animate-pulse" style={{ animationDelay: `${i * 60}ms` }} />
              <div className="h-4 rounded bg-ta-beige-medium animate-pulse w-3/4" style={{ animationDelay: `${i * 60 + 100}ms` }} />
              <div className="h-3 rounded bg-ta-beige-medium animate-pulse w-1/3" style={{ animationDelay: `${i * 60 + 150}ms` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
