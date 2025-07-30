'use client'

import { useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@/hooks/useGSAP'

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Animation d'entrée du hero
  useGSAP(() => {
    // Les états initiaux sont définis en CSS
    // Timeline fluide
    const tl = gsap.timeline({ delay: 0.3 })
    
    tl.to(".logo-btry-solution", { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power1.out"
      })
      .to(".paragraphe-accroche-hero", { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power1.out"
      }, "-=0.6")
      .to(".etiquette", { 
        opacity: 1, 
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power1.out"
      }, "-=0.4")
      .to(".img-hero", { 
        opacity: 1, 
        y: 0,
        duration: 1, 
        ease: "power1.out"
      }, "-=0.6")

    return () => tl.kill()
  }, [])

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
        <div className={`burger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu-homepage">
          <div className="mobile-menu-content">
            {/* Header du menu */}
            <div className="mobile-menu-header">
              <Image
                src="/images/btry-logo-2-2.png"
                alt="btry logo"
                width={80}
                height={40}
                className="mobile-menu-logo"
              />
              <button 
                className="mobile-menu-close"
                onClick={toggleMenu}
              >
                ×
              </button>
            </div>
            
            {/* Navigation */}
            <nav className="mobile-menu-nav">
              <ul className="mobile-menu-list">
                <li className="mobile-menu-item">
                  <a 
                    href="#about" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                  >
                    À propos
                  </a>
                </li>
                <li className="mobile-menu-item">
                  <a 
                    href="#mssns" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('mssns'); }}
                  >
                    Nos missions
                  </a>
                  <ul className="mobile-submenu">
                    <li>
                      <a 
                        href="#assistance-aexploitation" 
                        onClick={(e) => { e.preventDefault(); scrollToSection('assistance-aexploitation'); }}
                      >
                        Assistance à exploitation
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#AMO" 
                        onClick={(e) => { e.preventDefault(); scrollToSection('AMO'); }}
                      >
                        Assistance à maîtrise d'ouvrage technique
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#audit-diagno" 
                        onClick={(e) => { e.preventDefault(); scrollToSection('audit-diagno'); }}
                      >
                        Audit et diagnostic
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#coordination-ssi" 
                        onClick={(e) => { e.preventDefault(); scrollToSection('coordination-ssi'); }}
                      >
                        Coordination SSI
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#delegationresponsabilites" 
                        onClick={(e) => { e.preventDefault(); scrollToSection('delegationresponsabilites'); }}
                      >
                        Délégation des responsabilités
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="mobile-menu-item">
                  <a 
                    href="#cntct" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('cntct'); }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
            
            {/* Footer du menu */}
            <div className="mobile-menu-footer">
              <div className="mobile-menu-footer-text">
                BTRY Solutions © 2025
              </div>
            </div>
          </div>
        </div>
      )}


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