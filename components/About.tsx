'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return

    // Configuration
    const CONFIG = {
      animations: {
        easing: {
          smooth: "power2.out"
        }
      }
    }

    // Animation "À propos" - Apparition fluide et progressive
    gsap.set(".corps1.c-apropos", { opacity: 1, y: 0 }) // Visible par défaut
    
    // Animation subtile et professionnelle du texte "À propos"
    gsap.fromTo(".corps1.c-apropos", 
      { 
        opacity: 0,
        y: 20
      },
      {
        scrollTrigger: {
          trigger: ".corps1.c-apropos",
          start: "top 75%",
          toggleActions: "play none none none",
          markers: false
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: CONFIG.animations.easing.smooth
      }
    )

    // Animation des cartes complètes - Une après l'autre
    gsap.set(".subcontainer-apropos", { opacity: 1, y: 0, scale: 1 }) // Visibles par défaut
    
    // Animation de chaque carte complète (carte + octogone) une après l'autre
    gsap.fromTo(".subcontainer-apropos", 
      { 
        opacity: 0, 
        y: 30, 
        scale: 0.95 
      },
      {
        scrollTrigger: {
          trigger: ".container-apropos",
          start: "top 70%",
          toggleActions: "play none none none",
          markers: false
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: CONFIG.animations.easing.smooth,
        stagger: 0.2 // Animation en cascade
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isMounted])
  return (
    <section className="apropos" id="about">
      <div className="entete-apropos-container">
        <h2 className="corps1 c-apropos">
          <span className="emphasis">
            <span className="logo-typo">btry</span> est un bureau d'études
          </span> spécialisé dans la <span className="emphasis">sécurité incendie</span> 
          (ERP, IGH, ICPE), <span className="emphasis">l'exploitation </span>et <span className="emphasis">l'optimisation des bâtiments</span>,
          qui vous apporte son expertise et ses compétences acquises 
          au cours de <span className="emphasis">20 années d'expérience</span>.
        </h2>
      </div>

      <div className="container-full-cardapropos">
        <div className="container-apropos">
          <div className="subcontainer-apropos">
            <div className="container-subtile-apropos">
              <div className="octagon">
                <h4 className="number-apropos">01</h4>
              </div>
              <h3 className="subtitle-apropos">
                Un accompagnement <br />sur-mesure pour tous vos projets
              </h3>
            </div>
            <p className="paragraphe-apropos">
              Que vous soyez maître d'ouvrage du secteur public, privé ou maître d'œuvre,
              nous vous accompagnerons dans tous vos projets de construction, d'extension ou de rénovation mais aussi de gestion de bâtiments existants,
              afin de vous guider sereinement sur les choix les plus judicieux tant en terme de sécurité incendie qu'en terme d'économie budgétaire.
            </p>
          </div>

          <div className="subcontainer-apropos">
            <div className="container-subtile-apropos">
              <div className="octagon">
                <h4 className="number-apropos">02</h4>
              </div>
              <h3 className="subtitle-apropos">Une équipe expérimentée</h3>
            </div>
            <p className="paragraphe-apropos">
              En plus des connaissances théoriques, les collaborateurs de btry possèdent une grande expérience de terrain leur permettant de vous 
              accompagner avec pragmatisme. La connaissance parfaite du territoire ultra-marin et de ses acteurs leur confère une grande légitimité dans les dossiers atypiques.
            </p>
          </div>

          <div className="subcontainer-apropos">
            <div className="container-subtile-apropos">
              <div className="octagon">
                <h4 className="number-apropos">03</h4>
              </div>
              <h3 className="subtitle-apropos">
                Un regard d'expert, <br />un esprit de terrain
              </h3>
            </div>
            <p className="paragraphe-apropos">
              Les collaborateurs btry interviennent également comme sapeur-pompier volontaire et chargé de sécurité leur donnant 
              un regard opérationnel et facilitant les échanges avec les services publiques.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}