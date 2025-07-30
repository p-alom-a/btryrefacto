/** @type {import('next').NextConfig} */

// Security Headers pour la production
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'  // Empêche l'intégration dans des iframes (protection clickjacking)
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'  // Empêche le MIME type sniffing
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'  // Contrôle les infos de référent
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'  // Désactive les APIs sensibles
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'  // Protection XSS (legacy mais utile)
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'  // Force HTTPS
  }
]

const nextConfig = {
  trailingSlash: true,
  
  // Configuration production
  compress: true,  // Compression Gzip
  poweredByHeader: false,  // Masque "powered by Next.js"
  generateEtags: false,  // Désactive ETags pour performance
  
  // Optimisations images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // Cache images 1 an
  },
  
  // Security Headers
  async headers() {
    return [
      {
        // Applique les headers à toutes les routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  
  // Configuration expérimentale pour les performances
  experimental: {
    scrollRestoration: true,
  }
}

module.exports = nextConfig