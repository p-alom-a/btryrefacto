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
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[10000] md:hidden">
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header du menu */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <Image
                  src="/images/formation/logo-formation.jpg"
                  alt="btry formation logo"
                  width={80}
                  height={40}
                  className="h-8 w-auto"
                />
                <button 
                  className="text-2xl text-gray-600 hover:text-gray-800 transition-colors"
                  onClick={toggleMenu}
                >
                  ×
                </button>
              </div>
              
              {/* Navigation */}
              <nav className="flex-1 p-6">
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="#about" 
                      className="block py-4 px-4 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                    >
                      À propos
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#formations" 
                      className="block py-4 px-4 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      onClick={(e) => { e.preventDefault(); scrollToSection('formations'); }}
                    >
                      Nos formations
                    </a>
                    <ul className="ml-4 mt-2 space-y-1">
                      <li>
                        <Link
                          href="/formation/prevention-risques"
                          className="block py-2 px-4 text-sm text-gray-500 hover:text-blue-800 hover:bg-blue-25 rounded transition-all duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Prévention des risques et formations spécifiques
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/formation/bilan-competences"
                          className="block py-2 px-4 text-sm text-gray-500 hover:text-blue-800 hover:bg-blue-25 rounded transition-all duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Bilan de compétences et VAE
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/formation/formation-continue"
                          className="block py-2 px-4 text-sm text-gray-500 hover:text-blue-800 hover:bg-blue-25 rounded transition-all duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Formation continue
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a 
                      href="#contact" 
                      className="block py-4 px-4 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
              
              {/* Footer du menu */}
              <div className="p-6 border-t border-gray-100">
                <div className="text-xs text-gray-400 text-center">
                  BTRY Formations © 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}