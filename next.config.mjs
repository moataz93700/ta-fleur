/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
    PERFORMANCE — TA FLEUR
    Objectif : LCP < 2.5s, FID < 100ms, CLS < 0.1 (Core Web Vitals Green)
  */

  // Supprime l'en-tête "X-Powered-By: Next.js" (légère réduction d'infos exposées)
  poweredByHeader: false,

  // Images optimisées (AVIF prioritaire sur WebP — 50% plus léger)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats:     ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
    // Qualité par défaut — bon équilibre poids/rendu floral
    qualities:   [75, 85],
    minimumCacheTTL: 86400, // 24h en prod
  },

  // Compression Brotli/Gzip automatique
  compress: true,

  // Experimental : optimisation packages (tree-shake Framer Motion)
  experimental: {
    optimizePackageImports: ['framer-motion', '@heroicons/react'],
  },

  // Headers de sécurité + cache statique
  async headers() {
    return [
      /* ── Sécurité — toutes les routes ── */
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',         value: 'DENY' },
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=()' },
          {
            key:   'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      /* ── Cache immutable — assets statiques Next.js ── */
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      /* ── Cache images optimisées ── */
      {
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      /* ── Cache assets publics ── */
      {
        source: '/brand/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
