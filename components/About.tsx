'use client'

import { createFadeInAnimation, createStaggeredAnimation, useGSAP } from '@/hooks/useGSAP'

export default function About() {
  // Animation du texte principal
  useGSAP(createFadeInAnimation('.corps1.c-apropos'), [])
  
  // Animation des cartes une par une avec stagger
  useGSAP(createStaggeredAnimation('.subcontainer-apropos', 0.3), [])

  return (
    <section className="apropos" id="about">
      <div className="entete-apropos-container">
        <h2 className="corps1 c-apropos">
          <span className="emphasis">
            <span className="logo-typo">btry</span> est un bureau d'études
          </span> spécialisé dans la <span className="emphasis">sécurité incendie</span> 
          (ERP, IGH, ICPE), <span className="emphasis">l'exploitation </span>et <span className="emphasis">l'optimisation des bâtiments</span>,
          qui vous apporte son expertise et ses compétences acquises 
          au cours de <span className="emphasis">20 années d'expérience</span>.
        </h2>
      </div>

      <div className="container-full-cardapropos">
        <div className="container-apropos">
          <div className="subcontainer-apropos">
            <div className="container-subtile-apropos">
              <div className="octagon">
                <h4 className="number-apropos">01</h4>
              </div>
              <h3 className="subtitle-apropos">
                Un accompagnement <br />sur-mesure pour tous vos projets
              </h3>
            </div>
            <p className="paragraphe-apropos">
              Que vous soyez maître d'ouvrage du secteur public, privé ou maître d'œuvre,
              nous vous accompagnerons dans tous vos projets de construction, d'extension ou de rénovation mais aussi de gestion de bâtiments existants,
              afin de vous guider sereinement sur les choix les plus judicieux tant en terme de sécurité incendie qu'en terme d'économie budgétaire.
            </p>
          </div>

          <div className="subcontainer-apropos">
            <div className="container-subtile-apropos">
              <div className="octagon">
                <h4 className="number-apropos">02</h4>
              </div>
              <h3 className="subtitle-apropos">Une équipe expérimentée</h3>
            </div>
            <p className="paragraphe-apropos">
              En plus des connaissances théoriques, les collaborateurs de btry possèdent une grande expérience de terrain leur permettant de vous 
              accompagner avec pragmatisme. La connaissance parfaite du territoire ultra-marin et de ses acteurs leur confère une grande légitimité dans les dossiers atypiques.
            </p>
          </div>

          <div className="subcontainer-apropos">
            <div className="container-subtile-apropos">
              <div className="octagon">
                <h4 className="number-apropos">03</h4>
              </div>
              <h3 className="subtitle-apropos">
                Un regard d'expert, <br />un esprit de terrain
              </h3>
            </div>
            <p className="paragraphe-apropos">
              Les collaborateurs btry interviennent également comme sapeur-pompier volontaire et chargé de sécurité leur donnant 
              un regard opérationnel et facilitant les échanges avec les services publiques.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}