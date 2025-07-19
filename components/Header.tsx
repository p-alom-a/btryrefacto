'use client'

import { useState } from 'react'
import Image from 'next/image'

interface HeaderProps {
  isScrolled: boolean
}

export default function Header({ isScrolled }: HeaderProps) {
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

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
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
      <div className={`burger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  )
}