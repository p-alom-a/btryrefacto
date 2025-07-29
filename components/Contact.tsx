'use client'

import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'
import { User, Mail, Phone, MessageSquare, Send } from 'lucide-react'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FormData {
  name: string
  companyName: string
  email: string
  phone: string
  service: string
  message: string
}

// Composant Modal propre avec Portal
function ContactModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isSubmitting, 
  submitStatus, 
  register, 
  handleSubmit, 
  errors 
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FormData) => void
  isSubmitting: boolean
  submitStatus: 'idle' | 'success' | 'error'
  register: any
  handleSubmit: any
  errors: any
}) {
  if (!isOpen) return null

  const modalContent = (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .contact-modal-content {
            padding: 2rem !important;
            font-size: 0.9rem;
          }
          .contact-modal-title {
            font-size: 1.5rem !important;
          }
          .contact-modal-subtitle {
            font-size: 1rem !important;
          }
          .contact-modal-label {
            font-size: 0.8rem !important;
          }
          .contact-modal-input {
            font-size: 0.9rem !important;
            padding: 0.65rem 1rem !important;
          }
          .contact-modal-input-icon {
            padding-left: 2.3rem !important;
          }
          .contact-modal-button {
            padding: 0.75rem 1rem !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
      <div 
        className="modal-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}
        onClick={onClose}
      >
        <div 
          className="modal-content contact-modal-content"
          style={{
            backgroundColor: 'white',
            borderRadius: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #f3f4f6',
            padding: '3rem',
            maxWidth: '700px',
            width: '95%',
            maxHeight: '95vh',
            overflow: 'auto',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span 
            className="close-popup"
            onClick={onClose}
            style={{
              position: 'absolute',
              right: '1.5rem',
              top: '1.5rem',
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: '#9ca3af',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#6b7280'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#9ca3af'}
          >
            &times;
          </span>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="contact-modal-title" style={{ 
              fontSize: '1.875rem', 
              fontWeight: '300', 
              color: '#111827', 
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              Être rappelé
            </h2>
            <p className="contact-modal-subtitle" style={{ 
              fontSize: '1.125rem', 
              color: '#4b5563', 
              fontWeight: '300',
              margin: '0'
            }}>
              Indiquez vos coordonnées, nous vous rappellerons dans les plus brefs délais.
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label className="contact-modal-label" style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '0.5rem' 
              }}>
                Nom et prénom
              </label>
              <div style={{ position: 'relative' }}>
                <User style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#9ca3af', 
                  width: '1.25rem', 
                  height: '1.25rem' 
                }} />
                <input
                  type="text"
                  className="contact-modal-input contact-modal-input-icon"
                  {...register('name', { required: 'Ce champ est requis' })}
                  style={{
                    width: '100%',
                    paddingLeft: '2.5rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    transition: 'all 0.2s',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="Votre nom et prénom"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              {errors.name && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.name.message}</span>}
            </div>

            <div>
              <label className="contact-modal-label" style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '0.5rem' 
              }}>
                Nom de l'entreprise
              </label>
              <input
                type="text"
                {...register('companyName')}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  transition: 'all 0.2s',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                placeholder="Nom de votre entreprise"
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label className="contact-modal-label" style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '0.5rem' 
              }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#9ca3af', 
                  width: '1.25rem', 
                  height: '1.25rem' 
                }} />
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Ce champ est requis',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email invalide'
                    }
                  })}
                  className="contact-modal-input contact-modal-input-icon"
                  style={{
                    width: '100%',
                    paddingLeft: '2.5rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    transition: 'all 0.2s',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="votre.email@exemple.com"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              {errors.email && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.email.message}</span>}
            </div>

            <div>
              <label className="contact-modal-label" style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '0.5rem' 
              }}>
                Téléphone
              </label>
              <div style={{ position: 'relative' }}>
                <Phone style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#9ca3af', 
                  width: '1.25rem', 
                  height: '1.25rem' 
                }} />
                <input
                  type="tel"
                  {...register('phone', { required: 'Ce champ est requis' })}
                  className="contact-modal-input contact-modal-input-icon"
                  style={{
                    width: '100%',
                    paddingLeft: '2.5rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    transition: 'all 0.2s',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="06 12 34 56 78"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone.message}</span>}
            </div>

            <div>
              <label className="contact-modal-label" style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '0.5rem' 
              }}>
                Service souhaité
              </label>
              <select
                {...register('service', { required: 'Ce champ est requis' })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  transition: 'all 0.2s',
                  fontSize: '1rem',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Sélectionnez un service</option>
                <option value="assistance-exploitation">Assistance à exploitation</option>
                <option value="amo-technique">Assistance à maîtrise d'ouvrage technique</option>
                <option value="audit-diagnostic">Audit et diagnostic</option>
                <option value="coordination-ssi">Coordination SSI</option>
                <option value="delegation-responsabilites">Délégation des responsabilités</option>
                <option value="autre">Autre</option>
              </select>
              {errors.service && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.service.message}</span>}
            </div>

            <div>
              <label className="contact-modal-label" style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '0.5rem' 
              }}>
                Message (optionnel)
              </label>
              <div style={{ position: 'relative' }}>
                <MessageSquare style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '1rem', 
                  color: '#9ca3af', 
                  width: '1.25rem', 
                  height: '1.25rem' 
                }} />
                <textarea
                  {...register('message')}
                  rows={4}
                  style={{
                    width: '100%',
                    paddingLeft: '2.5rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    transition: 'all 0.2s',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                  placeholder="Décrivez votre besoin..."
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {submitStatus === 'success' && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '0.75rem'
              }}>
                <p style={{
                  color: '#166534',
                  fontSize: '0.875rem',
                  margin: '0'
                }}>
                  ✅ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '0.75rem'
              }}>
                <p style={{
                  color: '#dc2626',
                  fontSize: '0.875rem',
                  margin: '0'
                }}>
                  ❌ Une erreur s'est produite. Veuillez vérifier les champs requis et réessayer.
                </p>
              </div>
            )}

            {submitStatus !== 'success' && (
              <button
                type="submit"
                className="contact-modal-button"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontWeight: '500',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  backgroundColor: isSubmitting ? '#9ca3af' : '#1e3a8a',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    (e.target as HTMLElement).style.backgroundColor = '#1e40af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    (e.target as HTMLElement).style.backgroundColor = '#1e3a8a';
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      border: '2px solid #ffffff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '0.5rem'
                    }}></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer votre demande
                    <Send style={{ 
                      marginLeft: '0.5rem', 
                      width: '1.25rem', 
                      height: '1.25rem',
                      transition: 'transform 0.2s'
                    }} />
                  </>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  )

  // Portal vers document.body
  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null
}

export default function Contact() {
  const [showPopup, setShowPopup] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const contactRef = useRef<HTMLElement>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  // Animation simple d'apparition du contenu
  useGSAP(() => {
    const contactSection = document.querySelector('.contact') as HTMLElement
    const leftContainer = document.querySelector('.left-contact-container') as HTMLElement
    const contactElements = document.querySelectorAll('.contact-heading, .btn-formulaire-contact .btn-mail, .btn-formulaire-contact .btn-appel, .contact-image, .contact-detail-container')
    
    // Détection mobile
    const isMobile = window.innerWidth <= 768
    
    if (!contactSection) return

    // Mobile : Pas d'animation
    if (isMobile) {
      gsap.set(contactElements, { opacity: 1, y: 0, scale: 1 })
      return
    }

    // Desktop : Animation simple d'apparition
    gsap.set(contactElements, { opacity: 0, y: 30, scale: 0.95 })
    if (leftContainer) {
      gsap.set(leftContainer, { borderRightWidth: "0px", borderRightStyle: "solid", borderRightColor: "white" })
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: contactSection,
        start: "top 60%",
        toggleActions: "play none none reverse",
      }
    })
    .to(contactElements, { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      duration: 1, 
      ease: "power2.out", 
      stagger: 0.1 
    })
    .to(leftContainer, { 
      borderRightWidth: "2px", 
      duration: 0.8, 
      ease: "power2.out" 
    }, "-=0.5")

  }, [])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact-homepage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          setShowPopup(false)
          setSubmitStatus('idle')
          reset()
        }, 2000)
      } else {
        setSubmitStatus('error')
        const errorData = await response.json()
        console.error('Erreur lors de l\'envoi:', errorData.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Erreur lors de l\'envoi:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <section ref={contactRef} className="contact" id="cntct">
        <div className="contact-content">
          <div className="left-contact-container">
            <h4 className="contact-heading">Besoin d'expertise pour sécuriser et optimiser vos bâtiments ?</h4>
            <div className="btn-formulaire-contact">
              <a href="mailto:contact@btry.fr" className="btn-mail">Nous écrire</a>
              <button 
                className="btn-appel" 
                onClick={() => {
                  console.log('Bouton cliqué!')
                  setShowPopup(true)
                }}
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                Être rappelé
              </button>
            </div>
          </div>
          <div className="right-contact-container">
            <div className="contact-image-container">
              <Image
                src="/images/worldmap.webp"
                alt="Mapmonde BTRY"
                width={400}
                height={270}
                className="contact-image"
              />
            </div>
            <div className="contact-detail-container">
              <p className="subtitle-apropos whitefont">Bureau Métropole / Outre-Mer</p>
              <div className="contact-details">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined">call</span>
                  <p style={{ margin: 0 }}>+33(0)684145398</p>
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
                    width={160}
                    height={44}
                    className="whatsapp-icon"
                  />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Modal avec React Portal pour overlay plein écran */}
        <ContactModal
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      </section>
    </>
  )
}