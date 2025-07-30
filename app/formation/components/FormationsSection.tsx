'use client'

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

const styles = `
  .fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .fade-in-up.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }
  
  .accordion-content.open {
    max-height: 250px;
  }
`;

const FormationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimated = useRef(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const formations = [
    {
      title: "Prévention des risques et formations spécifiques",
      description: "Formations en sécurité, gestes et postures, premiers secours pour assurer la protection au travail.",
      image: "/images/formation/preventionrisques.png",
      tags: ["Prévention", "Habilitation"],
      slug: "prevention-risques"
    },
    {
      title: "Bilan de compétences et VAE",
      description: "Accompagnement personnalisé pour valoriser votre expérience et valider vos acquis professionnels.",
      image: "/images/formation/bilanC_Vae.png",
      tags: ["Reconversion", "Évolution pro"],
      slug: "bilan-competences"
    },
    {
      title: "Formation continue",
      description: "Actions de perfectionnement professionnel pour développer vos compétences tout au long de votre carrière.",
      image: "/images/formation/formationContinue.png",
      tags: ["Management", "Bureautique"],
      slug: "formation-continue"
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateElements();
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const animateElements = () => {
      if (titleRef.current) {
        setTimeout(() => titleRef.current?.classList.add('animate'), 100);
      }
      
      desktopCardsRef.current.forEach((card, index) => {
        if (card) {
          setTimeout(() => card.classList.add('animate'), 300 + (index * 150));
        }
      });
      
      mobileCardsRef.current.forEach((card, index) => {
        if (card) {
          setTimeout(() => card.classList.add('animate'), 300 + (index * 150));
        }
      });
    };

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section id="formations" ref={sectionRef} className="py-12 bg-white overflow-hidden">
        <div className="w-full px-4 lg:px-8">
          <div className="w-full">
            
            <div ref={titleRef} className="fade-in-up text-center mb-20 px-8">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight">
                Nos <span className="text-blue-900 font-normal">formations</span>
              </h2>
            </div>

            <div className="hidden lg:grid lg:grid-cols-3 gap-8 w-full px-8">
              {formations.map((formation, index) => (
                <div 
                  key={`desktop-${index}`}
                  id={index === 0 ? 'prevention-risques' : index === 1 ? 'bilan-competences' : 'formation-continue'}
                  ref={el => { desktopCardsRef.current[index] = el; }}
                  className="fade-in-up bg-blue-50 rounded-2xl p-12 hover:shadow-lg transition-all duration-300 flex flex-col h-full w-full"
                >
                  <div className="w-full flex justify-center mb-8">
                    <img 
                      src={formation.image} 
                      alt={`${formation.title} icon`}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center leading-tight">
                    {formation.title === "Bilan de compétences et VAE" ? (
                      <>Bilan de compétences<br />et VAE</>
                    ) : (
                      formation.title
                    )}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-8 text-base flex-grow text-center">
                    {formation.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8 justify-center">
                    {formation.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto flex justify-center">
                    <Link 
                      href={`/formation/${formation.slug}`}
                      className="group inline-flex items-center text-blue-900 font-medium hover:text-blue-800 transition-colors text-lg"
                    >
                      En voir plus
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 w-full px-4">
              {formations.map((formation, index) => (
                <div 
                  key={`mobile-${index}`}
                  ref={el => { mobileCardsRef.current[index] = el; }}
                  className="fade-in-up bg-blue-50 rounded-2xl p-6 flex flex-col h-full"
                >
                  <div className="w-full flex justify-center mb-4">
                    <img 
                      src={formation.image} 
                      alt={`${formation.title} icon`}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center leading-tight">
                    {formation.title === "Bilan de compétences et VAE" ? (
                      <>Bilan de compétences<br />et VAE</>
                    ) : (
                      formation.title
                    )}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm flex-grow text-center">
                    {formation.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {formation.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto flex justify-center">
                    <Link 
                      href={`/formation/${formation.slug}`}
                      className="group inline-flex items-center text-blue-900 font-medium hover:text-blue-800 transition-colors text-sm"
                    >
                      En voir plus
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 lg:p-24">
            <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
              <div className="text-left md:text-right">
                <h3 className="text-2xl font-medium text-gray-900 leading-tight">
                  L'ensemble de nos formations sont accessibles aux personnes en situation d'handicap.
                </h3>
              </div>
              <div>
                <p className="text-gray-600 leading-relaxed mb-6 text-base">
                  Afin de garantir une formation de qualité, nous vous invitons à nous informer en amont. 
                  Nous vous rappelons également que pour les formations dans vos locaux, l'accessibilité de 
                  ceux-ci reste à votre charge.
                </p>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                  Consulter notre règlement
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormationsSection;