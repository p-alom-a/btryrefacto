'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'

interface FormData {
  name: string
  companyName: string
  email: string
  phone: string
  service: string
  message: string
}

export default function Contact() {
  const [showPopup, setShowPopup] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const contactRef = useRef<HTMLElement>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  useEffect(() => {
    const linkedinSection = document.querySelector('.linkedin-posts')
    if (!linkedinSection) return

    // État initial : masquer tous les éléments de contact (comme dans GSAP)
    const contactElements = document.querySelectorAll('.contact-heading, .btn-formulaire-contact .btn-mail, .btn-formulaire-contact .btn-appel, .contact-image, .contact-detail-container')
    contactElements.forEach(el => {
      const element = el as HTMLElement
      element.style.opacity = '0'
      element.style.transform = 'translateY(10px) scale(0.98)'
    })

    // État initial du border-right
    const leftContainer = document.querySelector('.left-contact-container') as HTMLElement
    if (leftContainer) {
      leftContainer.style.borderRightWidth = '0px'
      leftContainer.style.borderRightStyle = 'solid'
      leftContainer.style.borderRightColor = 'white'
    }

    let hasTriggered = false

    const handleScroll = () => {
      const linkedinRect = linkedinSection.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Reproduction exacte: start: "bottom+=600 bottom"
      // Cela signifie : quand le bottom de linkedin-posts est à 600px sous le bottom du viewport
      const triggerStart = linkedinRect.bottom <= (viewportHeight - 600)
      const triggerEnd = linkedinRect.bottom <= (viewportHeight - 800)
      
      if (triggerStart && !hasTriggered) {
        hasTriggered = true
        
        // Animation onEnter - reproduction exacte du timeline GSAP
        // 1. Background body + LinkedIn fade out
        document.body.style.transition = 'background-color 0.6s ease'
        document.body.style.backgroundColor = '#002768'
        
        const linkedinEl = linkedinSection as HTMLElement
        linkedinEl.style.transition = 'opacity 0.6s ease'
        linkedinEl.style.opacity = '0'
        
        // 2. Contact elements appear (avec délai de -0.1s comme dans GSAP)
        setTimeout(() => {
          contactElements.forEach(el => {
            const element = el as HTMLElement
            element.style.transition = 'all 1.2s ease'
            element.style.opacity = '1'
            element.style.transform = 'translateY(0) scale(1)'
          })
          
          // 3. Border-right animation
          if (leftContainer) {
            leftContainer.style.transition = 'border-right-width 1.2s ease'
            leftContainer.style.borderRightWidth = '2px'
          }
        }, 500) // Équivalent de "-=0.1" dans le timeline
        
      } else if (!triggerStart && hasTriggered) {
        hasTriggered = false
        
        // Animation onLeaveBack - reproduction exacte
        contactElements.forEach(el => {
          const element = el as HTMLElement
          element.style.transition = 'all 1s ease'
          element.style.opacity = '0'
          element.style.transform = 'translateY(10px) scale(0.98)'
        })
        
        if (leftContainer) {
          leftContainer.style.transition = 'border-right-width 1s ease'
          leftContainer.style.borderRightWidth = '0px'
        }
        
        setTimeout(() => {
          document.body.style.backgroundColor = '#ffffff'
          const linkedinEl = linkedinSection as HTMLElement
          linkedinEl.style.opacity = '1'
        }, 500)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.backgroundColor = '#ffffff'
    }
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        data as unknown as Record<string, unknown>,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      )
      setSubmitSuccess(true)
      reset()
      setTimeout(() => {
        setShowPopup(false)
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      console.error('Error sending email:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={contactRef} className="contact" id="cntct">
      <div className="contact-content">
        <div className="left-contact-container">
          <h4 className="contact-heading">Besoin d'expertise pour sécuriser et optimiser vos bâtiments ?</h4>
          <div className="btn-formulaire-contact">
            <a href="mailto:contact@btry.fr" className="btn-mail">Nous écrire</a>
            <button className="btn-appel" onClick={() => setShowPopup(true)}>Être rappelé</button>
          </div>
        </div>
        <div className="right-contact-container">
          <div className="contact-image-container">
            <Image
              src="/images/worldmap.webp"
              alt="Mapmonde BTRY"
              width={300}
              height={200}
              className="contact-image"
            />
          </div>
          <div className="contact-detail-container">
            <p className="subtitle-apropos whitefont">Bureau Métropole / Outre-Mer</p>
            <div className="contact-details">
              <span className="material-symbols-outlined">call</span>
              <p>+33(0)684145398</p>
              <span className="material-symbols-outlined">alternate_email</span>
              <p>contact@btry.fr</p>
            </div>
            <a 
              aria-label="Chat on WhatsApp" 
              href="https://wa.me/594694257718"
              className="test-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/WhatsAppButtonWhiteSmall.png"
                alt="Chat on WhatsApp"
                width={150}
                height={40}
                className="whatsapp-icon"
              />
            </a>
          </div>
        </div>

        {/* Popup Form */}
        {showPopup && (
          <div className="popup-form-container">
            <div className="popup-content">
              <span className="close-popup" onClick={() => setShowPopup(false)}>&times;</span>
              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '2em' }}>
                  <h3>Merci pour votre message !</h3>
                  <p>Nous vous recontacterons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                  <p className="form-description">
                    Indiquez vos coordonnées, nous vous rappellerons dans les plus brefs délais.
                  </p>
                  
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Nom et prénom</label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Ce champ est requis' })}
                      placeholder="Entrez votre nom"
                      className="form-input"
                    />
                    {errors.name && <span style={{ color: 'red', fontSize: '0.8em' }}>{errors.name.message}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="companyName" className="form-label">Nom de l'entreprise</label>
                    <input
                      type="text"
                      id="companyName"
                      {...register('companyName')}
                      placeholder="Entrez le nom de votre entreprise"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'Ce champ est requis',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email invalide'
                        }
                      })}
                      placeholder="Entrez votre email"
                      className="form-input"
                    />
                    {errors.email && <span style={{ color: 'red', fontSize: '0.8em' }}>{errors.email.message}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone', { required: 'Ce champ est requis' })}
                      placeholder="Entrez votre numéro de téléphone"
                      className="form-input"
                    />
                    {errors.phone && <span style={{ color: 'red', fontSize: '0.8em' }}>{errors.phone.message}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="service" className="form-label">Service souhaité</label>
                    <select
                      id="service"
                      {...register('service', { required: 'Ce champ est requis' })}
                      className="form-select"
                    >
                      <option value="">Sélectionnez un service</option>
                      <option value="assistance-exploitation">Assistance à exploitation</option>
                      <option value="amo-technique">Assistance à maîtrise d'ouvrage technique</option>
                      <option value="audit-diagnostic">Audit et diagnostic</option>
                      <option value="coordination-ssi">Coordination SSI</option>
                      <option value="delegation-responsabilites">Délégation des responsabilités</option>
                      <option value="autre">Autre</option>
                    </select>
                    {errors.service && <span style={{ color: 'red', fontSize: '0.8em' }}>{errors.service.message}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      {...register('message')}
                      placeholder="Décrivez votre besoin..."
                      className="form-textarea"
                      rows={4}
                    />
                  </div>

                  <button
                    type="submit"
                    className="form-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}