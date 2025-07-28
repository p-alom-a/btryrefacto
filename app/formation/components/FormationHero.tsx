'use client'

import { useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@/hooks/useGSAP'

export default function FormationHero() {
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
    gsap.set([".formation-logo-btry", ".formation-paragraphe-hero"], { opacity: 0, y: 30 })
    gsap.set(".formation-etiquette:not(:last-child)", { opacity: 0, scale: 0.9 })
    gsap.set(".formation-etiquette:last-child", { opacity: 0, scale: 0.8, force3D: true })
    gsap.set(".formation-contact-btn", { opacity: 0, scale: 0.8 })
    gsap.set(".formation-img-hero", { opacity: 0, scale: 0.95 })

    // Forcer l'invisibilité du bouton + via CSS aussi
    const plusButton = document.querySelector(".formation-etiquette:last-child") as HTMLElement
    if (plusButton) {
      plusButton.style.opacity = "0"
      plusButton.style.transform = "scale(0.8)"
    }

    // Timeline d'entrée propre
    const tl = gsap.timeline({ delay: 0.3 })
    
    tl.to(".formation-logo-btry", { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power2.out"
      })
      .to(".formation-paragraphe-hero", { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out"
      }, "-=0.5")
      .to(".formation-etiquette:not(:last-child)", { 
        opacity: 1, 
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.4")
      .to(".formation-etiquette:last-child", { 
        opacity: 1, 
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.1")
      .to(".formation-contact-btn", { 
        opacity: 1, 
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .to(".formation-img-hero", { 
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

  return (
    <div className="flex justify-center items-center w-full min-h-screen flex-wrap p-4 rounded-[20px] box-border">
      <div className="flex flex-row justify-center items-center gap-14 w-full pr-0 pl-4 -mt-16">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-8 w-[40rem]">
            <div className="flex flex-row w-auto">
              <Image
                src="/images/formation/logo.png"
                alt="logo btry formations"
                width={200}
                height={80}
                className="formation-logo-btry w-auto h-[8vw] max-w-full object-contain opacity-0"
              />
            </div>
            
            <h1 className="formation-paragraphe-hero font-primary text-[26px] font-light m-0 mt-4 opacity-0">
              Développez vos compétences <br className="hidden sm:inline" />
              avec nos formations professionnelles
            </h1>
            
            <div className="flex flex-row flex-wrap w-[70%]">
              <span className="formation-etiquette rounded-[11px] px-[17px] py-[2px] font-normal text-base no-underline font-primary mr-4 mb-4 border border-[#002768] text-[#002768] max-w-[300px] text-center box-border transition-all duration-300 cursor-pointer relative overflow-hidden opacity-0">
                Prévention des risques et formations spécifiques
              </span>
              <span className="formation-etiquette rounded-[11px] px-[17px] py-[2px] font-normal text-base no-underline font-primary mr-4 mb-4 border border-[#002768] text-[#002768] max-w-[300px] text-center box-border transition-all duration-300 cursor-pointer relative overflow-hidden opacity-0">
                Bilan de compétences
              </span>
              <span className="formation-etiquette rounded-[11px] px-[17px] py-[2px] font-normal text-base no-underline font-primary mr-4 mb-4 border border-[#002768] text-[#002768] max-w-[300px] text-center box-border transition-all duration-300 cursor-pointer relative overflow-hidden opacity-0">
                Formation continue
              </span>
              <span className="formation-etiquette rounded-[11px] px-[17px] py-[2px] font-normal text-base no-underline font-primary mr-4 mb-4 border border-[#002768] text-[#002768] max-w-[300px] text-center box-border transition-all duration-300 cursor-pointer relative overflow-hidden opacity-0">
                VAE
              </span>
              <button 
                className="formation-etiquette rounded-[11px] px-[17px] py-[2px] font-normal text-base no-underline font-primary mr-4 mb-4 bg-[#FAC457] text-[#002768] border-none max-w-[300px] text-center box-border transition-all duration-300 cursor-pointer relative overflow-hidden opacity-0"
                onClick={() => scrollToSection('formations')}
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        <Image
          src="/images/formation/illustration-hero.png"
          alt="Formation professionnelle BTRY"
          width={400}
          height={400}
          className="formation-img-hero w-[37%] h-auto object-cover rounded-[50px_0_50px_0] -mr-4 opacity-0"
          priority
        />
      </div>
    </div>
  )
}