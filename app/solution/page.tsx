import type { Metadata } from 'next'
import '../../styles/solution.css'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Missions from '@/components/Missions'
import LinkedIn from '@/components/LinkedIn'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: 'BTRY Solutions | Expert Sécurité Incendie & Audit Bâtiments - Bureau d\'Études SSI',
  description: 'Bureau d\'études spécialisé sécurité incendie : audit, diagnostic, SSI, coordination pour ERP/IGH/ICPE. +20 ans d\'expertise technique. ✅ Devis gratuit sous 48h',
  keywords: 'bureau études sécurité incendie, audit bâtiment, diagnostic SSI, coordination sécurité, ERP IGH ICPE, assistance maîtrise ouvrage, exploitation bâtiments, expert sécurité incendie',
  authors: [{ name: 'BTRY Solutions' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'BTRY Solutions - Expert Sécurité Incendie & Bureau d\'Études SSI',
    description: 'Bureau d\'études spécialisé en sécurité incendie : audit, diagnostic, coordination SSI pour ERP/IGH/ICPE. +20 ans d\'expertise. Devis gratuit.',
    url: 'https://www.btry.fr/solution',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.btry.fr/images/coverPicture.webp',
        width: 1200,
        height: 630,
        alt: 'BTRY Solutions - Expert en sécurité incendie et bureau d\'études SSI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTRY Solutions - Expert Sécurité Incendie & Bureau d\'Études',
    description: 'Bureau d\'études SSI : audit, diagnostic, coordination sécurité incendie. +20 ans expertise ERP/IGH/ICPE. Devis gratuit.',
  },
}

export default function Solution() {
  return (
    <div className="solution-page">
      <main>
        <Hero />
        <About />
        <Missions />
        <LinkedIn />
        <Contact />
      </main>
    </div>
  )
}