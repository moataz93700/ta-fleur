/*
  LOADING STATE — PRODUIT
  Skeleton screen pendant le chargement.
  Layout 2 colonnes : galerie + infos.
*/

export default function ProductLoading() {
  return (
    <div className="bg-white">
      <div className="container-ta py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-16">

          {/* Galerie skeleton */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-2xl bg-ta-beige-medium animate-pulse" />
            <div className="grid grid-cols-4 gap-2.5">
              {[0,1,2,3].map(i => (
                <div key={i} className="aspect-square rounded-xl bg-ta-beige-medium animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
              ))}
            </div>
          </div>

          {/* Infos skeleton */}
          <div className="space-y-5">
            <div className="h-3 w-24 rounded bg-ta-beige-medium animate-pulse" />
            <div className="h-8 rounded bg-ta-beige-medium animate-pulse w-4/5" />
            <div className="h-6 rounded bg-ta-beige-medium animate-pulse w-1/3" />
            <div className="space-y-2 pt-2">
              <div className="h-3 rounded bg-ta-beige-medium animate-pulse" />
              <div className="h-3 rounded bg-ta-beige-medium animate-pulse w-5/6" />
              <div className="h-3 rounded bg-ta-beige-medium animate-pulse w-4/6" />
            </div>
            <div className="h-24 rounded-xl bg-ta-beige-light animate-pulse" />
            <div className="h-14 rounded-full bg-ta-rose-pastel/30 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
