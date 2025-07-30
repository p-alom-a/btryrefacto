'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface FormationHeaderProps {
  isScrolled?: boolean
}

export default function FormationHeader({ isScrolled = false }: FormationHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`
      flex items-center justify-between w-full mx-auto box-border text-white
      px-[50px] py-0 mt-14 max-md:px-8 max-md:mt-8
      ${isScrolled ? 'scrolled' : ''}
    `}>
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/formation" className="block">
          <Image
            src="/images/formation/logo-formation.jpg"
            alt="btry logo"
            width={120}
            height={60}
            className="w-auto h-7 max-w-full object-contain md:h-8 lg:h-12"
          />
        </Link>
      </div>

      {/* Navigation Desktop */}
      <nav className="flex items-center" style={{ gap: '3em' }}>
        <ul className="flex flex-row text-black list-none m-0 p-0 font-heading text-[17px] font-bold max-md:hidden" style={{ gap: '3em' }}>
          <li style={{ marginRight: '20px' }}>
            <a 
              href="#about" 
              className="text-black no-underline hover:font-bold transition-all duration-200"
            >
              À propos
            </a>
          </li>
          
          <li className="relative group" style={{ marginRight: '20px' }}>
            <a 
              href="#formations" 
              className="text-black no-underline hover:font-bold transition-all duration-200"
            >
              Nos formations
            </a>
            {/* Dropdown */}
            <div className="
              hidden absolute bg-[#f9f9f9] min-w-[160px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)] z-10 top-full left-0
              group-hover:block
            ">
              <a 
                href="#prevention-risques" 
                className="text-black no-underline block px-4 py-3 hover:bg-[#ddd] transition-colors"
              >
                Prévention des risques et formations spécifiques
              </a>
              <a 
                href="#bilan-competences" 
                className="text-black no-underline block px-4 py-3 hover:bg-[#ddd] transition-colors"
              >
                Bilan de compétences et VAE
              </a>
              <a 
                href="#formation-continue" 
                className="text-black no-underline block px-4 py-3 hover:bg-[#ddd] transition-colors"
              >
                Formation continue
              </a>
            </div>
          </li>

          <li className="max-md:block hidden" style={{ marginRight: '20px' }}>
            <a 
              href="#contact" 
              className="text-black no-underline hover:font-bold transition-all duration-200"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Contact Button Desktop */}
        <a 
          href="#contact"
          className="cursor-pointer bg-blue-900 border-none rounded-[13px] px-6 py-[10px] text-white font-bold text-[17px] no-underline font-heading hover:bg-blue-800 transition-colors duration-200 max-md:hidden inline-block"
        >
          Contact
        </a>
      </nav>

      {/* Burger Menu Mobile */}
      <div 
        className={`hidden flex-col cursor-pointer gap-1 max-md:flex ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span className="w-6 h-[3px] bg-blue-900 transition-all duration-300"></span>
        <span className="w-6 h-[3px] bg-blue-900 transition-all duration-300"></span>
        <span className="w-6 h-[3px] bg-blue-900 transition-all duration-300"></span>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="max-md:fixed max-md:inset-0 max-md:bg-black max-md:bg-opacity-50 max-md:z-40 hidden" 
             onClick={() => setIsMenuOpen(false)} />
      )}
    </header>
  )
}