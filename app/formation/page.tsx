'use client'

import FormationHero from './components/FormationHero'
import AboutSection from './components/AboutSection'
import FormationsSection from './components/FormationsSection'
import ContactSection from './components/ContactSection'

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