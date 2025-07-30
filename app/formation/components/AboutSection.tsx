'use client'

import React, { useEffect, useRef } from 'react';
import { Target, Users, Award, Lightbulb } from 'lucide-react';

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
  
  .fade-in-left {
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .fade-in-left.animate {
    opacity: 1;
    transform: translateX(0);
  }
  
  .fade-in-right {
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .fade-in-right.animate {
    opacity: 1;
    transform: translateX(0);
  }
`;

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<(HTMLDivElement | null)[]>([]);
  const valuesGridRef = useRef<HTMLDivElement>(null);
  const hasAnimatedMain = useRef(false);
  const hasAnimatedValues = useRef(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const mainObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedMain.current) {
          hasAnimatedMain.current = true;
          animateMainElements();
        }
      });
    }, observerOptions);

    const valuesObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedValues.current) {
          hasAnimatedValues.current = true;
          animateValues();
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      mainObserver.observe(sectionRef.current);
    }

    if (valuesGridRef.current) {
      valuesObserver.observe(valuesGridRef.current);
    }

    const animateMainElements = () => {
      if (heroRef.current) {
        setTimeout(() => heroRef.current?.classList.add('animate'), 100);
      }
      if (imageRef.current) {
        setTimeout(() => imageRef.current?.classList.add('animate'), 300);
      }
    };

    const animateValues = () => {
      valuesRef.current.forEach((value, index) => {
        if (value) {
          setTimeout(() => value.classList.add('animate'), index * 200);
        }
      });
    };

    return () => {
      if (sectionRef.current) {
        mainObserver.unobserve(sectionRef.current);
      }
      if (valuesGridRef.current) {
        valuesObserver.unobserve(valuesGridRef.current);
      }
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section id="about" ref={sectionRef} className="py-12 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 lg:p-16">
          
            <div className="grid lg:grid-cols-2 gap-20 items-start mb-20">
              <div ref={heroRef} className="fade-in-left max-w-xl">
                <div className="inline-block bg-blue-50 text-blue-900 px-4 py-2 rounded-full text-sm font-medium mb-16">
                  À propos de btry formation
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light text-gray-900 mb-8 leading-tight">
                  Votre partenaire 
                  <span className="text-blue-900 font-normal"> formation professionnelle</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                  Nous accompagnons jeunes, adultes et entreprises vers la maîtrise des compétences 
                  et l'employabilité durable grâce à des parcours personnalisés et certifiants.
                </p>
              </div>
              
              <div ref={imageRef} className="fade-in-right lg:justify-self-end">
                <div className="about-image-container relative max-w-lg h-full flex items-start">
                  <img 
                    src="/images/formation/illustration-apropos.jpg" 
                    alt="Formation professionnelle" 
                    className="about-image"
                  />
                </div>
              </div>
            </div>

            <div ref={valuesGridRef} className="about-values-grid">
              <div 
                ref={el => { valuesRef.current[0] = el; }}
                className="about-value-card fade-in-up text-center p-6 lg:p-8"
              >
                <div className="about-icon w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 mx-auto">
                  <Target className="w-6 h-6 lg:w-8 lg:h-8 text-blue-900" />
                </div>
                <h3 className="about-title text-sm lg:text-lg font-medium text-gray-900 mb-2 lg:mb-3">Professionnalisme</h3>
                <p className="about-description text-gray-600 text-xs lg:text-sm leading-relaxed">
                  Engagement dans la réussite des parcours
                </p>
              </div>

              <div 
                ref={el => { valuesRef.current[1] = el; }}
                className="about-value-card fade-in-up text-center p-6 lg:p-8"
              >
                <div className="about-icon w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 mx-auto">
                  <Users className="w-6 h-6 lg:w-8 lg:h-8 text-blue-900" />
                </div>
                <h3 className="about-title text-sm lg:text-lg font-medium text-gray-900 mb-2 lg:mb-3">Inclusion</h3>
                <p className="about-description text-gray-600 text-xs lg:text-sm leading-relaxed">
                  Accessibilité et accompagnement pour tous
                </p>
              </div>

              <div 
                ref={el => { valuesRef.current[2] = el; }}
                className="about-value-card fade-in-up text-center p-6 lg:p-8"
              >
                <div className="about-icon w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 mx-auto">
                  <Award className="w-6 h-6 lg:w-8 lg:h-8 text-blue-900" />
                </div>
                <h3 className="about-title text-sm lg:text-lg font-medium text-gray-900 mb-2 lg:mb-3">Certification</h3>
                <p className="about-description text-gray-600 text-xs lg:text-sm leading-relaxed">
                  Titres RNCP reconnus par l'État
                </p>
              </div>

              <div 
                ref={el => { valuesRef.current[3] = el; }}
                className="about-value-card fade-in-up text-center p-6 lg:p-8"
              >
                <div className="about-icon w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 mx-auto">
                  <Lightbulb className="w-6 h-6 lg:w-8 lg:h-8 text-blue-900" />
                </div>
                <h3 className="about-title text-sm lg:text-lg font-medium text-gray-900 mb-2 lg:mb-3">Innovation</h3>
                <p className="about-description text-gray-600 text-xs lg:text-sm leading-relaxed">
                  Pédagogies actives et outils numériques
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;