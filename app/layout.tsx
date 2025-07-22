import type { Metadata } from 'next'
import { Inter, Comfortaa } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-primary'
})

const jura = localFont({
  src: [
    {
      path: './fonts/Jura-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Jura-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Jura-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Jura-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Jura-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
  fallback: ['Helvetica Neue', 'Helvetica', 'sans-serif']
})

const comfortaa = Comfortaa({ 
  subsets: ['latin'],
  variable: '--font-logo'
})

export const metadata: Metadata = {
  title: 'BTRY Solutions | Sécurité Incendie & Bâtiments - SSI ERP',
  description: 'Expert sécurité incendie depuis 20 ans. Audit, diagnostic, SSI, exploitation ERP/IGH/ICPE. Métropole & Outre-Mer. ✅ Devis gratuit',
  keywords: 'sécurité incendie, gestion des bâtiments, bureau d\'études, ERP, IGH, ICPE, audit batiment, diagnostic batiment, assistance à maîtrise d\'ouvrage, exploitation bâtiments, SSI incendie',
  authors: [{ name: 'Btry Solutions' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'BTRY Solutions - Expert Sécurité Incendie & Bâtiments',
    description: 'Expert sécurité incendie depuis 20 ans. Services SSI, audit, diagnostic pour ERP/IGH/ICPE. Métropole & Outre-Mer. Devis gratuit sous 48h.',
    url: 'https://www.btry.fr',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.btry.fr/images/coverPicture.webp',
        width: 1200,
        height: 630,
        alt: 'BTRY Solutions - Expert en sécurité incendie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTRY Solutions - Expert Sécurité Incendie & Bâtiments',
    description: 'Expert sécurité incendie depuis 20 ans. Services SSI, audit, diagnostic. Métropole & Outre-Mer. Devis gratuit.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jura.variable} ${comfortaa.variable}`}>
      <head>
        <link rel="icon" href="/images/fav.ico" type="image/x-icon" />
        <link rel="canonical" href="https://www.btry.fr/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BTRY Solutions",
              "alternateName": "btry",
              "url": "https://www.btry.fr",
              "logo": "https://www.btry.fr/images/btry-logo-2.png",
              "description": "Bureau d'études spécialisé en sécurité incendie, exploitation et optimisation des bâtiments. Expert ERP, IGH, ICPE depuis 20 ans.",
              "telephone": "+33684145398",
              "email": "contact@btry.fr",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR",
                "addressRegion": "France Métropole et Outre-Mer"
              },
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "France"
                },
                {
                  "@type": "Place", 
                  "name": "Outre-Mer français"
                }
              ],
              "foundingDate": "2003",
              "numberOfEmployees": "5-10",
              "sameAs": [
                "https://www.linkedin.com/company/btry-solutions/",
                "https://wa.me/594694257718"
              ],
              "serviceType": [
                "Sécurité incendie",
                "Bureau d'études",
                "Assistance à maîtrise d'ouvrage",
                "Audit et diagnostic bâtiments",
                "Coordination SSI",
                "Exploitation ERP"
              ],
              "priceRange": "Sur devis",
              "paymentAccepted": "Virement, Chèque",
              "currenciesAccepted": "EUR"
            })
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}