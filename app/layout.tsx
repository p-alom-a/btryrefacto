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
  title: 'btry solutions | Bureau d\'Études en Sécurité Incendie et Optimisation des Bâtiments - France Métropole et Outre-Mer-SSI',
  description: 'Btry Solutions est un bureau d\'étude spécialisé dans la sécurité incendie, l\'exploitation et l\'optimisation des bâtiments. - Audit diagnostic batiments - SSI incendie - ERP',
  keywords: 'sécurité incendie, gestion des bâtiments, bureau d\'études, ERP, IGH, ICPE, audit batiment, diagnostic batiment, assistance à maîtrise d\'ouvrage, exploitation bâtiments, SSI incendie',
  authors: [{ name: 'Btry Solutions' }],
  openGraph: {
    title: 'Btry Solutions - Sécurité incendie et gestion des bâtiments',
    description: 'Expert en sécurité incendie (ERP, IGH, ICPE, SSI incendie) avec plus de 20 ans d\'expérience. Nous offrons des services sur-mesure pour vos projets de construction, d\'extension, ou de gestion de bâtiments.',
    url: 'https://www.btry.fr',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'btry Solutions - Sécurité incendie et gestion des bâtiments- SSI incendie',
    description: 'Découvrez nos services spécialisés dans la sécurité incendie et l\'optimisation des bâtiments. SSI',
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
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}