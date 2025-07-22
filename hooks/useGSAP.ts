'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useGSAP = (animation: () => (() => void) | void, deps: any[] = []) => {
  const cleanup = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Call animation function and store cleanup
    const cleanupFn = animation()
    cleanup.current = cleanupFn || null

    return () => {
      // Clean up previous animation
      if (cleanup.current) {
        cleanup.current()
      }
      // Refresh ScrollTrigger
      ScrollTrigger.refresh()
    }
  }, deps)

  useEffect(() => {
    return () => {
      // Clean up on unmount
      if (cleanup.current) {
        cleanup.current()
      }
    }
  }, [])
}

// Simple fade in animation utility
export const createFadeInAnimation = (selector: string, delay: number = 0) => {
  return () => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    gsap.fromTo(elements, 
      { 
        opacity: 0,
        y: 30 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elements[0],
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === elements[0]) {
          trigger.kill()
        }
      })
    }
  }
}

// Staggered animation for multiple elements
export const createStaggeredAnimation = (selector: string, staggerDelay: number = 0.2) => {
  return () => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    gsap.fromTo(elements, 
      { 
        opacity: 0,
        y: 40,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: staggerDelay,
        scrollTrigger: {
          trigger: elements[0].parentElement,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === elements[0]?.parentElement) {
          trigger.kill()
        }
      })
    }
  }
}