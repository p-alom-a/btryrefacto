'use client'

import '../../styles/solution.css'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Missions from '@/components/Missions'
import LinkedIn from '@/components/LinkedIn'
import Contact from '@/components/Contact'

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