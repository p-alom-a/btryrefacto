document.addEventListener('DOMContentLoaded', () => {

  // Initialiser EmailJS et la pop-up
  emailjs.init("NZbqzwiz5fJ-SMmvu");

  // Configuration centralisée
  const CONFIG = {
    breakpoints: {
      mobile: 768
    },
    animations: {
      duration: {
        fast: 0.3,
        normal: 0.8,
        slow: 1.2,
        extraSlow: 1.8
      },
      easing: {
        smooth: "power2.out",
        sharp: "power2.in",
        elastic: "back.out(1.7)"
      }
    },
    colors: {
      primary: "#002768",
      white: "rgb(255,255,255)"
    }
  };

  // Fonctions factory pour animations réutilisables
  const AnimationFactory = {
    // Animation hover standard pour boutons
    createHoverAnimation: (selector, options = {}) => {
      document.querySelectorAll(selector).forEach(element => {
        element.addEventListener('mouseenter', () => {
          gsap.to(element, { 
            scale: options.scale || 1.05, 
            duration: CONFIG.animations.duration.fast, 
            ease: CONFIG.animations.easing.smooth,
            ...options.enter
          });
        });
        
        element.addEventListener('mouseleave', () => {
          gsap.to(element, { 
            scale: 1, 
            duration: CONFIG.animations.duration.fast, 
            ease: CONFIG.animations.easing.smooth,
            ...options.leave
          });
        });
        
        if (options.includeClick) {
          element.addEventListener('mousedown', () => {
            gsap.to(element, { scale: 0.95, duration: 0.1, ease: CONFIG.animations.easing.smooth });
          });
          
          element.addEventListener('mouseup', () => {
            gsap.to(element, { scale: options.scale || 1.05, duration: 0.1, ease: CONFIG.animations.easing.smooth });
          });
        }
      });
    },

    // Animation modal standard
    createModalAnimation: (modal, content, onComplete) => {
      const showModal = () => {
        modal.style.display = 'flex';
        modal.classList.add('show');
        
        gsap.fromTo(content, 
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: CONFIG.animations.easing.elastic }
        );
      };

      const hideModal = () => {
        gsap.to(content, {
          scale: 0.8,
          opacity: 0,
          duration: CONFIG.animations.duration.fast,
          ease: CONFIG.animations.easing.sharp,
          onComplete: () => {
            modal.style.display = 'none';
            modal.classList.remove('show');
            if (onComplete) onComplete();
          }
        });
      };

      return { showModal, hideModal };
    }
  };

  const sendResultsButton = document.getElementById('sendResultsButton');
  const loadingSpinner = document.getElementById('loadingSpinner');

  if (sendResultsButton) {
      sendResultsButton.addEventListener('click', (event) => {
          event.preventDefault();

          const name = document.getElementById('name').value.trim();
          const phoneNumber = document.getElementById('phoneNumber').value.trim();
          const phoneRegex = /^[0-9]{10}$/;

          // Validation des champs obligatoires
          if (name === '') {
              alert("Le champ 'Nom et prénom' est obligatoire.");
              return;
          }

          if (!phoneRegex.test(phoneNumber)) {
              alert("Veuillez entrer un numéro de téléphone valide à 10 chiffres.");
              return;
          }

          loadingSpinner.style.display = 'block';

          const templateParams = {
              name: name,
              companyName: document.getElementById('companyName').value,
              phoneNumber: phoneNumber,
              services: Array.from(document.querySelectorAll('input[name="services"]:checked'))
                  .map(checkbox => checkbox.value).join(', '),
              other: document.getElementById('other').value
          };

          emailjs.send('service_dqeyz9v', 'template_hbjf066', templateParams)
              .then(function(response) {
                  console.log('SUCCESS!', response.status, response.text);
                  alert("Votre demande a bien été envoyée.");
                  document.getElementById('popupForm').style.display = 'none';
              }, function(error) {
                  console.error('FAILED...', error);
                  alert("Une erreur s'est produite.");
              })
              .finally(() => {
                  loadingSpinner.style.display = 'none';
              });
      });
  }

  // Fonction pour gérer la pop-up contact
  const popupForm = document.getElementById('popupForm');
  const btnAppel = document.querySelector('.btn-appel');
  const closePopup = document.querySelector('.close-popup');

  if (btnAppel && popupForm && closePopup) {
      btnAppel.addEventListener('click', () => {
          popupForm.style.display = 'flex';
      });

      closePopup.addEventListener('click', () => {
          popupForm.style.display = 'none';
      });

      window.addEventListener('click', (event) => {
          if (event.target === popupForm) {
              popupForm.style.display = 'none';
          }
      });
  }

  // Toggle du menu burger
  const burgerMenu = document.querySelector('.burger-menu');
  const navList = document.querySelector('.nav-list');
  const dropdownContent = document.querySelector('.dropdown-content');

  burgerMenu.addEventListener('click', () => {
      navList.classList.toggle('active');
      burgerMenu.classList.toggle('open');

      if (burgerMenu.classList.contains('open')) {
          dropdownContent.style.display = 'none';
      } else {
          dropdownContent.style.display = '';
      }
  });

  // JavaScript pour gérer l'accordéon avec animations améliorées
  function openAccordion(sectionId) {
      const accordionItem = document.querySelector(`#${sectionId} .accordion-content`);
      const accordionButton = document.querySelector(`#${sectionId} .accordion-button`);

      if (accordionItem && accordionButton && !accordionItem.classList.contains('active')) {
          accordionItem.classList.add('active');
          accordionButton.classList.add('active');
          accordionItem.style.maxHeight = `${accordionItem.scrollHeight}px`;
          
          // Animation GSAP pour l'ouverture
          gsap.fromTo(accordionItem.querySelector('p'), 
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
          );
          
          ScrollTrigger.refresh();
      }
  }

  document.querySelectorAll('.accordion-header').forEach((header) => {
      header.addEventListener('click', () => {
          const accordionItem = header.parentElement;
          const button = header.querySelector('.accordion-button');
          const content = accordionItem.querySelector('.accordion-content');
          const contentText = content.querySelector('p');

          button.classList.toggle('active');
          content.classList.toggle('active');

          if (content.classList.contains('active')) {
              content.style.maxHeight = `${content.scrollHeight}px`;
              // Animation d'ouverture
              gsap.fromTo(contentText, 
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
              );
          } else {
              content.style.maxHeight = '0';
              // Animation de fermeture
              gsap.to(contentText, { opacity: 0, y: -10, duration: 0.3, ease: "power2.in" });
          }

          setTimeout(() => {
              ScrollTrigger.refresh();
          }, 300);
      });
  });

  document.querySelectorAll('.dropdown-content a').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.querySelector(`#${targetId}`);

          if (targetElement) {
              gsap.to(window, {
                  scrollTo: {
                      y: targetElement,
                      offsetY: 200,
                      autoKill: false
                  },
                  duration: CONFIG.animations.duration.extraSlow,
                  ease: "power2.inOut"
              });

              setTimeout(() => {
                  openAccordion(targetId);
                  setTimeout(() => {
                      ScrollTrigger.refresh();
                  }, 300);
              }, 300);
          }
      });
  });

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Animation d'entrée du Hero - Élégante et professionnelle
  gsap.set(".logo-btry-solution", { opacity: 0, y: 20 });
  gsap.set(".paragraphe-accroche-hero", { opacity: 0, y: 10 });
  gsap.set(".etiquette", { opacity: 0 });
  gsap.set(".img-hero", { opacity: 0 });

  const heroTimeline = gsap.timeline({ delay: 0.2 });
  
        heroTimeline
      .to(".logo-btry-solution", { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: CONFIG.animations.easing.smooth 
      })
      .to(".paragraphe-accroche-hero", { 
        opacity: 1, 
        y: 0, 
        duration: CONFIG.animations.duration.normal, 
        ease: CONFIG.animations.easing.smooth 
      }, "-=0.3")
      .to(".etiquette", { 
        opacity: 1, 
        duration: CONFIG.animations.duration.normal,
        stagger: 0.15,
        ease: CONFIG.animations.easing.smooth 
      }, "-=0.4")
      .to(".img-hero", { 
        opacity: 1, 
        duration: CONFIG.animations.duration.slow, 
        ease: CONFIG.animations.easing.smooth 
      }, "-=0.6");

  // Animation des sections au scroll
  const sections = gsap.utils.toArray('.subcontainer-apropos');
  sections.forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      duration: 1,
      ease: CONFIG.animations.easing.smooth,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Animation de la section missions
  const missionItems = gsap.utils.toArray('.accordion-item');
  missionItems.forEach((item) => {
    gsap.from(item, {
      opacity: 0,
      duration: CONFIG.animations.duration.normal,
      ease: CONFIG.animations.easing.smooth,
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Parallax subtil sur l'image hero (désactivé en mobile)
  if (window.innerWidth > CONFIG.breakpoints.mobile) {
      gsap.to(".img-hero", {
          scrollTrigger: {
              trigger: ".hero",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              markers: false
          },
          y: -50,
          ease: "none"
      });
  }

  // Transition hero vers "À propos" - Fluide et naturelle (désactivé en mobile)
  if (window.innerWidth > CONFIG.breakpoints.mobile) {
      gsap.to(".img-hero, .etiquette, .paragraphe-accroche-hero", {
          scrollTrigger: {
              trigger: ".top",
              start: "bottom 60%",
              end: "bottom 40%",
              scrub: 1,
              markers: false,
              onEnter: () => {
                  gsap.to(".img-hero", { opacity: 0, duration: 1.2, ease: "power2.out" });
                  gsap.to(".etiquette", { opacity: 0, y: -20, duration: 1, ease: "power2.out" });
                  gsap.to(".paragraphe-accroche-hero", { opacity: 0, y: -15, duration: 1.1, ease: "power2.out" });
              },
              onLeaveBack: () => {
                  gsap.to(".img-hero", { opacity: 1, duration: 1.2, ease: "power2.out" });
                  gsap.to(".etiquette", { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
                  gsap.to(".paragraphe-accroche-hero", { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" });
              }
          }
      });
  }



  // Animation "À propos" - Apparition fluide et progressive
  gsap.set(".corps1.c-apropos", { opacity: 1, y: 0 }); // Visible par défaut
  
  // Animation subtile et professionnelle du texte "À propos"
  gsap.fromTo(".corps1.c-apropos", 
    { 
      opacity: 0,
      y: 20
    },
    {
      scrollTrigger: {
        trigger: ".corps1.c-apropos",
        start: "top 75%",
        toggleActions: "play none none none",
        markers: false
      },
      opacity: 1,
      y: 0,
      duration: CONFIG.animations.duration.slow,
      ease: CONFIG.animations.easing.smooth
    }
  );

  // Animation des cartes complètes - Une après l'autre
  gsap.set(".subcontainer-apropos", { opacity: 1, y: 0, scale: 1 }); // Visibles par défaut
  
  // Animation de chaque carte complète (carte + octogone) une après l'autre
  gsap.fromTo(".subcontainer-apropos", 
    { 
      opacity: 0, 
      y: 30, 
      scale: 0.95 
    },
    {
      scrollTrigger: {
        trigger: ".container-apropos",
        start: "top 70%",
        toggleActions: "play none none none",
        markers: false
      },
      opacity: 1,
      y: 0,
      scale: 1,
      duration: CONFIG.animations.duration.normal,
      ease: CONFIG.animations.easing.smooth,
      stagger: 0.3 // 0.3s entre chaque carte complète
    }
  );



  // BG Contact avec animation améliorée
  if (window.innerWidth > CONFIG.breakpoints.mobile) {
      // État initial des éléments de contact
      gsap.set(".contact-heading, .btn-formulaire-contact .btn-mail, .btn-formulaire-contact .btn-appel, .contact-image, .contact-detail-container", {
          opacity: 0
      });
      
      // État initial du border-right (invisible)
      gsap.set(".left-contact-container", {
          borderRightWidth: "0px"
      });
      
        gsap.to("body", {
            scrollTrigger: {
                trigger: ".linkedin-posts",
                start: "bottom+=600 bottom",
                end: "bottom+=800 bottom",
                scrub: 0.8,
                markers: false,
                invalidateOnRefresh: true,
                onEnter: () => {
                    // Timeline principale pour synchroniser toutes les animations
                    const mainTimeline = gsap.timeline();
                    
                    mainTimeline
                        // Changement de couleur du fond et fade out de LinkedIn ensemble
                        .to(["body", ".linkedin-posts"], { 
                            backgroundColor: CONFIG.colors.primary, 
                            opacity: (i) => i === 0 ? 1 : 0,
                            duration: 0.6, 
                            ease: CONFIG.animations.easing.smooth
                        })
                        // Tous les éléments apparaissent ensemble après le changement de BG
                        .to([".contact-heading", ".contact-detail-container", ".btn-formulaire-contact .btn-mail", ".btn-formulaire-contact .btn-appel", ".contact-image"], { 
                            opacity: 1, 
                            y: 0,
                            scale: 1,
                            duration: 1.2, 
                            ease: "power2.out" 
                        }, "-=0.1")
                        // Animation du border-right en même temps
                        .to(".left-contact-container", {
                            borderRightWidth: "2px",
                            duration: 1.2,
                            ease: "power2.out"
                        }, "-=1.2");
                },
                onLeaveBack: () => {
                    // Timeline pour le retour - plus fluide
                    const reverseTimeline = gsap.timeline();
                    
                    reverseTimeline
                        // Tous les éléments disparaissent ensemble
                        .to([".contact-heading", ".contact-detail-container", ".btn-formulaire-contact .btn-mail", ".btn-formulaire-contact .btn-appel", ".contact-image"], { 
                            opacity: 0,
                            y: 10,
                            scale: 0.98,
                            duration: 1, 
                            ease: "power2.in"
                        })
                        // Animation du border-right disparaît en même temps
                        .to(".left-contact-container", {
                            borderRightWidth: "0px",
                            duration: 1,
                            ease: "power2.in"
                        }, "-=1")
                        // Changement de couleur et réapparition de LinkedIn ensemble
                        .to(["body", ".linkedin-posts"], { 
                            backgroundColor: CONFIG.colors.white, 
                            opacity: (i) => i === 0 ? 1 : 1,
                            duration: 0.6, 
                            ease: CONFIG.animations.easing.smooth 
                        }, "-=0.3");
                }
            }
        });
  } else {
      // Sur mobile, applique un fond bleu à la section contact et rend les boutons visibles
      const contactSection = document.querySelector('.contact');
      contactSection.style.backgroundColor = CONFIG.colors.primary;
      
      // Rendre les boutons et l'image visibles par défaut
      gsap.set(".btn-formulaire-contact .btn-mail, .btn-formulaire-contact .btn-appel, .contact-image, .contact-detail-container", {
          opacity: 1,
          y: 0
      });
      
      // Garder le border normal sur mobile
      gsap.set(".left-contact-container", {
          borderRightWidth: "2px"
      });
  }

  // Micro-interactions pour les boutons
  AnimationFactory.createHoverAnimation('.btn-mail, .btn-appel, .btn-missions-savoir', {
    includeClick: true
  });

  // Animation des icônes d'accordéon au hover
  AnimationFactory.createHoverAnimation('.accordion-title img', {
    scale: 1.1,
    enter: { rotation: 5 },
    leave: { rotation: 0 }
  });

  // Animation de navigation smooth avec indicateur de progression
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #6FC6FF, ${CONFIG.colors.primary});
      z-index: 9999;
      transition: width 0.3s ease;
  `;
  document.body.appendChild(progressBar);

  gsap.to(progressBar, {
      scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          onUpdate: (self) => {
              progressBar.style.width = (self.progress * 100) + '%';
          }
      }
  });

  // MODAL MISSION avec animation améliorée
  const btnSavoir = document.querySelector('.btn-missions-savoir');
  const modal = document.getElementById('modale-mission');
  const closeModal = document.querySelector('.close');
  const modalContent = modal.querySelector('.modal-content');

  const modalAnimation = AnimationFactory.createModalAnimation(modal, modalContent, () => {
    // Animation des blocs en cascade lors de l'ouverture
    gsap.from('.bloc', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: CONFIG.animations.easing.smooth,
      stagger: 0.1,
      delay: 0.2
    });
  });

  btnSavoir.addEventListener('click', modalAnimation.showModal);
  closeModal.addEventListener('click', modalAnimation.hideModal);
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modalAnimation.hideModal();
    }
  });

  // ANIMATIONS LINKEDIN SECTION - OPTIMISÉES POUR FLUIDITÉ
  // Forcer la visibilité de tous les éléments LinkedIn pour éviter les problèmes
  gsap.set(".linkedin-post, .titre-section-linkedin, .subtitle-linkedin, .linkedin-follow-btn", { 
      opacity: 1, 
      y: 0, 
      scale: 1 
  });

  // Animation séquentielle des éléments header de la section LinkedIn
  let linkedinTl = gsap.timeline({
      scrollTrigger: {
          trigger: ".linkedin-posts",
          start: "top 95%",
          toggleActions: "play none none none"
      }
  });

  linkedinTl
      .from(".titre-section-linkedin", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out"
      })
      .from(".subtitle-linkedin", {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: "power2.out"
      }, "-=0.3")
      .from(".linkedin-follow-btn", {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "power2.out"
      }, "-=0.2");

  // Animation des posts LinkedIn
  gsap.from(".linkedin-post", {
      scrollTrigger: {
          trigger: ".posts-grid",
          start: "top 95%",
          toggleActions: "play none none none"
      },
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2
  });

  // Micro-interactions pour les posts LinkedIn
  AnimationFactory.createHoverAnimation('.linkedin-post', {
    scale: 1.02,
    enter: { y: -8 },
    leave: { y: 0 },
    includeClick: true
  });

  // Animation des éléments secondaires plus subtile
  gsap.from(".company-logo", {
      scrollTrigger: {
          trigger: ".posts-grid",
          start: "top 90%",
          toggleActions: "play none none none"
      },
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      delay: 0.3
  });

  gsap.from(".engagement-stats span", {
      scrollTrigger: {
          trigger: ".posts-grid",
          start: "top 85%",
          toggleActions: "play none none none"
      },
      opacity: 0,
      y: 8,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.05,
      delay: 0.4
  });

  // Autoplay de la vidéo LinkedIn quand elle entre dans le viewport (avec protection plein écran)
  const linkedinVideo = document.querySelector('.post-video');
  if (linkedinVideo) {
      // S'assurer que la vidéo ne va pas en plein écran sur mobile
      linkedinVideo.setAttribute('playsinline', '');
      linkedinVideo.setAttribute('webkit-playsinline', '');
      
      // Empêcher que les clics sur la vidéo ouvrent LinkedIn
      linkedinVideo.addEventListener('click', (e) => {
          e.stopPropagation();
      });
      
      // Empêcher que les clics sur le container vidéo ouvrent LinkedIn
      const videoContainer = document.querySelector('.post-video-container');
      if (videoContainer) {
          videoContainer.addEventListener('click', (e) => {
              e.stopPropagation();
          });
      }
      
      ScrollTrigger.create({
          trigger: ".featured-post",
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
              linkedinVideo.play().catch(e => {
                  console.log('Autoplay failed:', e);
              });
          },
          onLeave: () => {
              linkedinVideo.pause();
          },
          onEnterBack: () => {
              linkedinVideo.play().catch(e => {
                  console.log('Autoplay failed:', e);
              });
          },
          onLeaveBack: () => {
              linkedinVideo.pause();
          }
      });
  }

  // Gestion mobile optimisée pour le carousel LinkedIn
  if (window.innerWidth <= CONFIG.breakpoints.mobile) {
      // Rafraîchir ScrollTrigger pour mobile
      ScrollTrigger.refresh();
      
      // Désactiver le smooth scroll natif en mobile pour éviter les conflits
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Centrage automatique du carousel sur le post featured avec délai
      setTimeout(() => {
          const postsGrid = document.querySelector('.posts-grid');
          const featuredPost = document.querySelector('.featured-post');
          
          if (postsGrid && featuredPost) {
              // Calculer la position pour centrer le featured post
              const scrollPosition = featuredPost.offsetLeft - (postsGrid.clientWidth / 2) + (featuredPost.clientWidth / 2);
              
              // Défilement fluide vers le featured post
              postsGrid.scrollTo({
                  left: scrollPosition,
                  behavior: 'smooth'
              });
          }
      }, 1200); // Délai réduit pour meilleure réactivité
  }
});
