'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return

    // Configuration
    const CONFIG = {
      breakpoints: {
        mobile: 768
      }
    }

    // États initiaux pour les éléments Hero (comme dans l'original)
    gsap.set(".logo-btry-solution", { opacity: 0, y: 20 })
    gsap.set(".paragraphe-accroche-hero", { opacity: 0, y: 20 })
    gsap.set(".etiquette", { opacity: 0 })
    gsap.set(".img-hero", { opacity: 0 })

    // Animation Hero Timeline - reproduction exacte
    const heroTimeline = gsap.timeline({ delay: 0.2 })
    
    heroTimeline
      .to(".logo-btry-solution", { 
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
      }, "-=0.3")
      .to(".etiquette", { 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.4")
      .to(".img-hero", { 
        opacity: 1, 
        duration: 1.2, 
        ease: "power2.out"
      }, "-=0.6")


    // Scroll-triggered animations for desktop
    if (window.innerWidth > CONFIG.breakpoints.mobile) {
      gsap.to(".img-hero", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: -50,
        ease: "none"
      })

      gsap.to(".img-hero, .etiquette, .paragraphe-accroche-hero", {
        scrollTrigger: {
          trigger: ".top",
          start: "bottom 60%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(".img-hero", { opacity: 0, duration: 1.2, ease: "power2.out" })
            gsap.to(".etiquette", { opacity: 0, y: -20, duration: 1, ease: "power2.out" })
            gsap.to(".paragraphe-accroche-hero", { opacity: 0, y: -15, duration: 1.1, ease: "power2.out" })
          },
          onLeaveBack: () => {
            gsap.to(".img-hero", { opacity: 1, duration: 1.2, ease: "power2.out" })
            gsap.to(".etiquette", { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
            gsap.to(".paragraphe-accroche-hero", { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" })
          }
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isMounted])

  if (!isMounted) {
    return (
      <section className="top">
        <header>
          <div className="logo">
            <Image
              src="/images/btry-logo-2.png"
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
                    src="/images/btry_solution.png"
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
                  <h2 className="etiquette">Conception SSI</h2>
                  <h2 className="etiquette">Conformité incendie</h2>
                  <h2 className="etiquette">Solutions techniques</h2>
                  <h2 className="etiquette">Exploitation ERP</h2>
                  <h2 className="etiquette">+</h2>
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
            src="/images/btry-logo-2.png"
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
                  src="/images/btry_solution.png"
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
                <h2 className="etiquette">Conception SSI</h2>
                <h2 className="etiquette">Conformité incendie</h2>
                <h2 className="etiquette">Solutions techniques</h2>
                <h2 className="etiquette">Exploitation ERP</h2>
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