'use client'

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { useFormations } from '../../../hooks/useFormations';
import FormationModal from './FormationModal';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<{
    type: string;
    title: string;
    courses: any[];
  } | null>(null);

  const { preventionRisques, formationContinue, vaeEtBilan, loading } = useFormations();

  const formations = [
    {
      title: "Prévention des risques",
      description: "Formations en sécurité, gestes et postures, premiers secours pour assurer la protection au travail.",
      image: "/images/formation/preventionrisques.png",
      tags: ["SST", "Gestes & Postures"]
    },
    {
      title: "Bilan de compétences et VAE",
      description: "Accompagnement personnalisé pour valoriser votre expérience et valider vos acquis professionnels.",
      image: "/images/formation/bilanC_Vae.png",
      tags: ["Reconversion", "Évolution pro"]
    },
    {
      title: "Formation continue",
      description: "Actions de perfectionnement professionnel pour développer vos compétences tout au long de votre carrière.",
      image: "/images/formation/formationContinue.png",
      tags: ["Management", "Bureautique"]
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const openFormationModal = (formationType: string) => {
    let courses: any[] = [];
    let title = '';

    switch (formationType) {
      case 'prevention-risques':
        courses = preventionRisques;
        title = 'Prévention des risques';
        break;
      case 'bilan-competences':
        courses = vaeEtBilan;
        title = 'Bilan de compétences et VAE';
        break;
      case 'formation-continue':
        courses = formationContinue;
        title = 'Formation continue';
        break;
    }

    setSelectedFormation({
      type: formationType,
      title,
      courses
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFormation(null);
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
              <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight">
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
                    <button 
                      onClick={() => openFormationModal(index === 0 ? 'prevention-risques' : index === 1 ? 'bilan-competences' : 'formation-continue')}
                      className="group inline-flex items-center text-blue-900 font-medium hover:text-blue-800 transition-colors text-lg"
                    >
                      En voir plus
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:hidden space-y-6 w-full px-8">
              {formations.map((formation, index) => (
                <div 
                  key={`mobile-${index}`}
                  ref={el => { mobileCardsRef.current[index] = el; }}
                  className="fade-in-up bg-blue-50 rounded-2xl overflow-hidden"
                >
                  <button 
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-8 text-left"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-28 h-28 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={formation.image} 
                          alt={`${formation.title} icon`}
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 pr-4">
                        {formation.title === "Bilan de compétences et VAE" ? (
                          <>Bilan de compétences<br />et VAE</>
                        ) : (
                          formation.title
                        )}
                      </h3>
                    </div>
                    {openAccordion === index ? (
                      <Minus className="w-6 h-6 text-gray-600 flex-shrink-0" />
                    ) : (
                      <Plus className="w-6 h-6 text-gray-600 flex-shrink-0" />
                    )}
                  </button>
                  
                  <div className={`accordion-content ${openAccordion === index ? 'open' : ''}`}>
                    <div className="px-8 pb-8">
                      <p className="text-gray-600 leading-relaxed text-base mb-6">
                        {formation.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-6">
                        {formation.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button 
                        onClick={() => openFormationModal(index === 0 ? 'prevention-risques' : index === 1 ? 'bilan-competences' : 'formation-continue')}
                        className="group inline-flex items-center text-blue-900 font-medium hover:text-blue-800 transition-colors text-lg"
                      >
                        En voir plus
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
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
              <div className="text-right">
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

      {selectedFormation && (
        <FormationModal
          isOpen={modalOpen}
          onClose={closeModal}
          title={selectedFormation.title}
          courses={selectedFormation.courses}
          loading={loading}
        />
      )}
    </>
  );
};

export default FormationsSection;