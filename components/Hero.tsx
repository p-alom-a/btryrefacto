'use client'

import { useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@/hooks/useGSAP'

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation d'entrée simple et propre
  useGSAP(() => {
    // États initiaux - forcer l'invisibilité
    gsap.set([".logo-btry-solution", ".paragraphe-accroche-hero"], { opacity: 0, y: 30 })
    gsap.set(".etiquette:not(:last-child)", { opacity: 0, scale: 0.9 }) // Toutes les étiquettes sauf le +
    gsap.set(".etiquette:last-child", { opacity: 0, scale: 0.8, force3D: true }) // Le bouton + avec force
    gsap.set(".contact-btn", { opacity: 0, scale: 0.8 })
    gsap.set(".img-hero", { opacity: 0, scale: 0.95 })

    // Forcer l'invisibilité du bouton + via CSS aussi
    const plusButton = document.querySelector(".etiquette:last-child") as HTMLElement
    if (plusButton) {
      plusButton.style.opacity = "0"
      plusButton.style.transform = "scale(0.8)"
    }

    // Timeline d'entrée propre
    const tl = gsap.timeline({ delay: 0.3 })
    
    tl.to(".logo-btry-solution", { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power2.out"
      })
      .to(".paragraphe-accroche-hero", { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out"
      }, "-=0.5")
      .to(".etiquette:not(:last-child)", { 
        opacity: 1, 
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.4")
      .to(".etiquette:last-child", { 
        opacity: 1, 
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.1")
      .to(".contact-btn", { 
        opacity: 1, 
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .to(".img-hero", { 
        opacity: 1, 
        scale: 1,
        duration: 1, 
        ease: "power2.out"
      }, "-=0.6")

    setIsMounted(true)

    return () => {
      tl.kill()
    }
  }, [])

  if (!isMounted) {
    return (
      <section className="top">
        <header>
          <div className="logo">
            <Image
              src="/images/btry-logo-2-2.png"
              alt="btry logo"
              width={120}
              height={60}
              className="logo-img"
            />
          </div>
          <nav>
            <ul className="nav-list">
              <li><a href="#about">À propos</a></li>
              <li className="dropdown">
                <a href="#mssns">Nos missions</a>
                <div className="dropdown-content">
                  <a href="#assistance-aexploitation">Assistance à exploitation</a>
                  <a href="#AMO">Assistance à maîtrise d'ouvrage technique</a>
                  <a href="#audit-diagno">Audit et diagnostic</a>
                  <a href="#coordination-ssi">Coordination SSI</a>
                  <a href="#delegationresponsabilites">Délégation des responsabilités</a>
                </div>
              </li>
              <li className="hidden-contact-burger">
                <a href="#cntct">Contact</a>
              </li>
            </ul>
            <button className="contact-btn">Contact</button>
          </nav>
          <div className="burger-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </header>

        <div className="hero">
          <div className="container-hero">
            <div className="accroche-container">
              <div className="text-accroche-container">
                <div className="btrySolution">
                  <Image
                    src="/images/btry_solution-2.png"
                    alt="logo btry solutions"
                    width={200}
                    height={80}
                    className="logo-btry-solution"
                  />
                </div>
                <h1 className="paragraphe-accroche-hero">
                  Optimisez la sécurité incendie <br className="mobile-break" />et 
                  la gestion de vos bâtiments <br className="mobile-break" />avec notre expertise.
                </h1>
                <div className="container-etiquettes-hero">
                  <span className="etiquette">Conception SSI</span>
                  <span className="etiquette">Conformité incendie</span>
                  <span className="etiquette">Solutions techniques</span>
                  <span className="etiquette">Exploitation ERP</span>
                  <span className="etiquette">+</span>
                </div>
              </div>
            </div>
            <Image
              src="/images/coverPicture.webp"
              alt="chargé d'affaire Btry assurant la coordination SSI incendie et la sécurité incendie"
              width={400}
              height={400}
              className="img-hero"
              priority
            />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="top">
      <header>
        <div className="logo">
          <Image
            src="/images/btry-logo-2-2.png"
            alt="btry logo"
            width={120}
            height={60}
            className="logo-img"
          />
        </div>
        <nav>
          <ul className="nav-list">
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>À propos</a></li>
            <li className="dropdown">
              <a href="#mssns" onClick={(e) => { e.preventDefault(); scrollToSection('mssns'); }}>Nos missions</a>
              <div className="dropdown-content">
                <a href="#assistance-aexploitation" onClick={(e) => { e.preventDefault(); scrollToSection('assistance-aexploitation'); }}>Assistance à exploitation</a>
                <a href="#AMO" onClick={(e) => { e.preventDefault(); scrollToSection('AMO'); }}>Assistance à maîtrise d'ouvrage technique</a>
                <a href="#audit-diagno" onClick={(e) => { e.preventDefault(); scrollToSection('audit-diagno'); }}>Audit et diagnostic</a>
                <a href="#coordination-ssi" onClick={(e) => { e.preventDefault(); scrollToSection('coordination-ssi'); }}>Coordination SSI</a>
                <a href="#delegationresponsabilites" onClick={(e) => { e.preventDefault(); scrollToSection('delegationresponsabilites'); }}>Délégation des responsabilités</a>
              </div>
            </li>
            <li className="hidden-contact-burger">
              <a href="#cntct" onClick={(e) => { e.preventDefault(); scrollToSection('cntct'); }}>Contact</a>
            </li>
          </ul>
          <button 
            className="contact-btn"
            onClick={() => scrollToSection('cntct')}
          >
            Contact
          </button>
        </nav>
        <div className="burger-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <div className="hero">
        <div className="container-hero">
          <div className="accroche-container">
            <div className="text-accroche-container">
              <div className="btrySolution">
                <Image
                  src="/images/btry_solution-2.png"
                  alt="logo btry solutions"
                  width={200}
                  height={80}
                  className="logo-btry-solution"
                />
              </div>
              <h1 className="paragraphe-accroche-hero">
                Optimisez la sécurité incendie <br className="mobile-break" />et 
                la gestion de vos bâtiments <br className="mobile-break" />avec notre expertise.
              </h1>
              <div className="container-etiquettes-hero">
                <span className="etiquette">Conception SSI</span>
                <span className="etiquette">Conformité incendie</span>
                <span className="etiquette">Solutions techniques</span>
                <span className="etiquette">Exploitation ERP</span>
                <button 
                  className="etiquette"
                  onClick={() => scrollToSection('mssns')}
                  style={{ cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <Image
            src="/images/coverPicture.webp"
            alt="chargé d'affaire Btry assurant la coordination SSI incendie et la sécurité incendie"
            width={400}
            height={400}
            className="img-hero"
            priority
          />
        </div>
      </div>
    </section>
  )
}