'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function LinkedIn() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const openLinkedInPost = (url: string) => {
    window.open(url, '_blank')
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay failed, user interaction required
          })
        } else {
          video.pause()
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5
    })

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // États initiaux - s'assurer que les éléments sont visibles par défaut
    gsap.set(".titre-section-linkedin, .subtitle-linkedin, .linkedin-follow-btn, .linkedin-post", { opacity: 1 })

    // LinkedIn section animations - reproduction exacte
    let linkedinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".linkedin-posts",
        start: "top 95%",
        toggleActions: "play none none none"
      }
    })

    linkedinTl
      .fromTo(".titre-section-linkedin", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
      .fromTo(".subtitle-linkedin", 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 
        "-=0.3"
      )
      .fromTo(".linkedin-follow-btn", 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 
        "-=0.2"
      )

    // Posts animation - reproduction exacte
    gsap.fromTo(".linkedin-post", 
      { opacity: 0, y: 20 },
      {
        scrollTrigger: {
          trigger: ".posts-grid",
          start: "top 95%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section className="linkedin-posts" id="linkedin">
      <div className="linkedin-container">
        <div className="linkedin-header">
          <h3 className="titre-section-linkedin">ACTUALITÉS</h3>
          <p className="subtitle-linkedin">Suivez nos dernières actualités et projets</p>
          <a 
            href="https://www.linkedin.com/company/btry-solutions/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="linkedin-follow-btn"
          >
            Suivre sur LinkedIn
          </a>
        </div>

        <div className="posts-grid">
          {/* Post 1 - Guyane Afterwork */}
          <article 
            className="linkedin-post" 
            onClick={() => openLinkedInPost('https://www.linkedin.com/feed/update/urn:li:activity:7334290219107594243/')}
            style={{ cursor: 'pointer' }}
          >
            <div className="post-header">
              <div className="post-profile">
                <div className="company-logo">
                  <Image
                    src="/images/btry-logo-2.png"
                    alt="BTRY Logo"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="company-info">
                  <h4>btry solution</h4>
                  <p>31 abonnés</p>
                  <span className="post-time">• il y a 1 mois</span>
                </div>
              </div>
            </div>
            <div className="post-content">
              <p>📍Guyane 🇬🇫 : Afterwork le 12 juin 2025 sur le thème de la Prévention et Gestion des Risques. Un moment unique pour échanger entre professionnels (bureaux d'études, promoteurs, architectes, exploitants responsables sécurité…)</p>
              <p>🔥Lors de cet événement, venez découvrir BatiFire : la solution pour faciliter l'intervention des secours ! 🚨</p>
            </div>
            <div className="post-engagement">
              <div className="engagement-stats">
                <span>👍 10</span>
                <span>💬 2 commentaires</span>
              </div>
            </div>
          </article>

          {/* Post principal au centre */}
          <article 
            className="linkedin-post featured-post" 
            onClick={() => openLinkedInPost('https://www.linkedin.com/company/btry-solutions/')}
            style={{ cursor: 'pointer' }}
          >
            <div className="post-header">
              <div className="post-profile">
                <div className="company-logo">
                  <Image
                    src="/images/btry-logo-2.png"
                    alt="BTRY Logo"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="company-info">
                  <h4>btry solution</h4>
                  <p>31 abonnés</p>
                  <span className="post-time">• Épinglé</span>
                </div>
              </div>
            </div>
            
            <div className="post-video-container">
              <video 
                ref={videoRef}
                className="post-video" 
                controls 
                preload="metadata" 
                muted 
                loop 
                playsInline
              >
                <source src="/images/videoLinkedin.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
            
            <div className="post-content">
              <h3 className="post-title">BTRY Solution</h3>
              <p className="post-subtitle">Bureau d'études spécialisé en sécurité incendie et optimisation des bâtiments</p>
              
              <div className="post-features">
                <span className="feature-tag">ERP • IGH • ICPE</span>
                <span className="feature-tag">SSI incendie</span>
                <span className="feature-tag">AMO technique</span>
              </div>
            </div>
            
            <div className="post-engagement">
              <div className="engagement-stats">
                <span>👍 25</span>
                <span>💬 5 commentaires</span>
              </div>
            </div>
          </article>

          {/* Post 2 - Plans de bâtiments */}
          <article 
            className="linkedin-post" 
            onClick={() => openLinkedInPost('https://www.linkedin.com/feed/update/urn:li:activity:7327344594050846720/')}
            style={{ cursor: 'pointer' }}
          >
            <div className="post-header">
              <div className="post-profile">
                <div className="company-logo">
                  <Image
                    src="/images/btry-logo-2.png"
                    alt="BTRY Logo"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="company-info">
                  <h4>btry solution</h4>
                  <p>31 abonnés</p>
                  <span className="post-time">• il y a 1 mois</span>
                </div>
              </div>
            </div>
            
            <div className="post-image-container">
              <Image
                src="/images/buildvision.png"
                alt="BTRY BuildVision"
                width={300}
                height={200}
                className="post-image"
              />
            </div>
            
            <div className="post-content">
              <h3 className="post-title-normal">btry buildvision</h3>
              
              <p>📁 Vous disposez de plans de vos bâtiments ?<br />
              Pourquoi ne pas les utiliser pour préparer vos interventions, organiser vos consignes et procédures...</p>

              <p>💡 Btry, donne du volume à votre plan et y intègre les données que vous souhaitez 🛠️</p>
            </div>
            <div className="post-engagement">
              <div className="engagement-stats">
                <span>👍 5</span>
                <span>💬 1 commentaire</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}