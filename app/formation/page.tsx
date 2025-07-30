import type { Metadata } from 'next'
import FormationHero from './components/FormationHero'
import AboutSection from './components/AboutSection'
import FormationsSection from './components/FormationsSection'
import ContactSection from './components/ContactSection'

export const metadata: Metadata = {
  title: 'BTRY Formation | Organisme de Formation Professionnelle Certifié Qualiopi',
  description: 'Formations professionnelles certifiantes : prévention des risques, bilan de compétences, VAE, formation continue. Titres RNCP reconnus État. ✅ Financement CPF possible',
  keywords: 'formation professionnelle, organisme formation, certification Qualiopi, prévention risques, bilan compétences, VAE, formation continue, titre RNCP, CPF, financement formation',
  authors: [{ name: 'BTRY Formation' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'BTRY Formation - Formations Professionnelles Certifiantes Qualiopi',
    description: 'Organisme de formation certifié Qualiopi : prévention des risques, bilan de compétences, VAE. Titres RNCP reconnus par l\'État. Financement CPF.',
    url: 'https://www.btry.fr/formation',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.btry.fr/images/formation/illustration-apropos.jpg',
        width: 1200,
        height: 630,
        alt: 'BTRY Formation - Organisme de formation professionnelle certifié',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTRY Formation - Formations Professionnelles Certifiantes',
    description: 'Organisme certifié Qualiopi : formations prévention des risques, bilan compétences, VAE. Financement CPF possible.',
  },
}

export default function Formation() {
  return (
    <>
      <FormationHero />
      <main>
        <AboutSection />
        <FormationsSection />
        <ContactSection />
      </main>
    </>
  )
}