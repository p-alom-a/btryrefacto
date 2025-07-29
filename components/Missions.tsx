'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { createStaggeredAnimation, useGSAP } from '@/hooks/useGSAP'

// Composant Modal avec Portal pour overlay plein écran
function MissionsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  const modalContent = (
    <div 
      className="modal-overlay missions-modal-overlay"
      onClick={onClose}
    >
      <div 
        className="modal-content missions-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="topmodal-missions">
          <h2>Nos solutions assistance à exploitation</h2>
          <span className="close" onClick={onClose}>&times;</span>
        </div>
        <div className="container-solutions">
          <div className="bloc">
            <img
              src="/images/charge_affaire.webp"
              alt="chargé d'affaire Btry dirigeant la mise en conformité SSI et la gestion des risques incendie"
              className="img-solutions"
            />
            <h2><span className="number-mission">01.</span>Libérez-vous de vos contraintes techniques avec btry.</h2>
            <p>Un chargé d'affaires dédié pilote vos vérifications, vos maintenances, vos contrats de services et vos plans d'actions selon vos besoins.
              <br />Vous disposez de reporting simples et clairs
              Nous vous proposons des axes d'amélioration et d'optimisation
              <br />Nous préparons vos commissions de sécurité</p>
          </div>

          <div className="bloc">
            <img
              src="/images/des%20solutions%20sur%20mesure-2.webp"
              alt="solutions sur mesure pour répondre aux besoins spécifiques"
              className="img-solutions"
            />
            <h2><span className="number-mission">02.</span>Des solutions sur-mesure pour répondre à vos besoins spécifiques</h2>
            <p>Registre de sécurité, mise à jour et reconstitution de dossier SSI, notice de sécurité incendie, suivi de travaux d'aménagement, mise en place de vos contrats de vérifications, mise en place de vos contrats de maintenance, étude de faisabilité travaux, assistance achat matériel de sécurité, formation, audit d'installation technique, 
              mise à jour plans d'intervention et d'évacuation et d'autres services.</p>
          </div>

          <div className="bloc">
            <img
              src="/images/pompier-3.webp"
              alt="pompiers utilise la fiche d'intervention rapide SSI incendie"
              className="img-solutions"
            />
            <h2>
              <span className="number-mission">03.</span>Facilitez l'intervention des secours dans votre établissement avec la FIRE <sup><Image src="/images/logo_fire-3.webp" alt="Icone" width={19} height={19} style={{display: 'inline'}} /></sup>
            </h2>
            <p>Développée par le SDIS 76, la Fiche d'Intervention Rapide Etablissement (FIRE) permet aux sapeurs-pompiers d'identifier rapidement vos points sensibles pour intervenir efficacement et en sécurité.
              <br />La FIRE est stockées dans un dispositif la protégeant des intempéries et facilement identifiable pour les sapeurs-pompiers. 
              <br />La FIRE est aussi complétée par un QR code donnant accès simplement à plus d'informations pour la chaine de commandement. 
              Donnez ainsi aux secours tous le moyens de protéger les occupants et vos biens.</p>
          </div>
        </div>
      </div>
    </div>
  )

  // Portal vers document.body
  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null
}

export default function Missions() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  // Animation des éléments missions un par un au scroll
  useGSAP(createStaggeredAnimation('.accordion-item', 0.2), [])

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <section className="missions" id="mssns">
      <div className="full-container-mission">
        <div className="left-mission">
          <h3 className="titre-section-missions">NOS MISSIONS</h3>
          <Image
            src="/images/hero-img-sc.jpg"
            alt="deux chargés d'affaire Btry en mission SSI dans un ERP en construction pour la sécurité incendie"
            width={400}
            height={300}
            className="img-mission"
          />
        </div>
        <div className="right-mission">
          <div className="accordion">
            {/* Mission 1 */}
            <div className={`accordion-item ${activeAccordion === 'assistance' ? 'active' : ''}`} id="assistance-aexploitation">
              <div className="accordion-header" onClick={() => toggleAccordion('assistance')}>
                <div className="accordion-title">
                  <Image
                    src="/images/picto_assistance_exploitaton.png"
                    alt="icone assistance à exploitation"
                    width={55}
                    height={55}
                  />
                  <h2>Assistance à exploitation</h2>
                </div>
                <button className="accordion-button">
                  <span className="plus-icon">{activeAccordion === 'assistance' ? '−' : '+'}</span>
                </button>
              </div>
              <div className={`accordion-content ${activeAccordion === 'assistance' ? 'active' : ''}`}>
                <p>
                  Service d'aide à la <span className="bold-emphasis">gestion technique des bâtiments</span> vous permet de vous concentrer avec sérénité sur votre activité :
                  btry pilote pour vous les <span className="bold-emphasis">vérifications</span>, les <span className="bold-emphasis">opérations de maintenances</span>, 
                  les <span className="bold-emphasis">commissions de sécurité</span>, les <span className="bold-emphasis">travaux</span> et les <span className="bold-emphasis">aménagements simples</span>.<br />
                  Aussi, les experts btry vous conseillent afin de <span className="bold-emphasis">gérer et d'optimiser l'exploitation de vos bâtiments</span> avec des <span className="bold-emphasis">reporting (KPI)</span> et des <span className="bold-emphasis">plans d'actions simples</span>.
                </p>
                <button className="btn-missions-savoir" onClick={openModal}>
                  Découvrez nos missions
                </button>
              </div>
            </div>

            {/* Mission 2 */}
            <div className={`accordion-item ${activeAccordion === 'AMO' ? 'active' : ''}`} id="AMO">
              <div className="accordion-header" onClick={() => toggleAccordion('AMO')}>
                <div className="accordion-title">
                  <Image
                    src="/images/picto-assistance-maitrise.png"
                    alt="icone assistance à maîtrise d'ouvrage"
                    width={55}
                    height={55}
                  />
                  <h2>Assistance à maîtrise d'ouvrage technique</h2>
                </div>
                <button className="accordion-button">
                  <span className="plus-icon">{activeAccordion === 'AMO' ? '−' : '+'}</span>
                </button>
              </div>
              <div className={`accordion-content ${activeAccordion === 'AMO' ? 'active' : ''}`}>
                <p>
                  La mission <span className="bold-emphasis">AMO sécurité incendie</span> consiste à <span className="bold-emphasis">accompagner techniquement</span> un maître d'ouvrage tout au long 
                  des phases de <span className="bold-emphasis">développement d'un projet immobilier</span>, restructuration ou le maintien opérationnel des installations techniques.<br />
                  Les experts btry vous permettent <span className="bold-emphasis">d'optimiser vos installations</span> et en faciliter ainsi l'exploitation et la pérennité.<br />
                  btry vous assiste également dans la réalisation de vos <span className="bold-emphasis">dossiers d'autorisation</span>, schémas d'organisation de la sécurité, vos <span className="bold-emphasis">cahiers des charges d'exploitation</span>.
                </p>
              </div>
            </div>

            {/* Mission 3 */}
            <div className={`accordion-item ${activeAccordion === 'audit' ? 'active' : ''}`} id="audit-diagno">
              <div className="accordion-header" onClick={() => toggleAccordion('audit')}>
                <div className="accordion-title">
                  <Image
                    src="/images/picto-audit.png"
                    alt="icone audit et diagnostic"
                    width={55}
                    height={55}
                  />
                  <h2>Audit et diagnostic</h2>
                </div>
                <button className="accordion-button">
                  <span className="plus-icon">{activeAccordion === 'audit' ? '−' : '+'}</span>
                </button>
              </div>
              <div className={`accordion-content ${activeAccordion === 'audit' ? 'active' : ''}`}>
                <p>
                  Lors d'un diagnostic, la mission de btry porte sur les <span className="bold-emphasis">bâtiments ou installations techniques existants</span>.<br />
                  Cet état des lieux permet d'<span className="bold-emphasis">évaluer la capacité à recevoir un projet d'extension</span> ou de remise en conformité réglementaire ou normative (études de faisabilité).<br />
                  Cette étape fait partie intégrante d'un <span className="bold-emphasis">schéma directeur</span> visant à élaborer un plan pluriannuel d'amélioration du <span className="bold-emphasis">niveau de sécurité incendie</span>, 
                  permettant ainsi de prioriser certains travaux et de lisser le budget sur les années à venir.
                </p>
              </div>
            </div>

            {/* Mission 4 */}
            <div className={`accordion-item ${activeAccordion === 'coordination' ? 'active' : ''}`} id="coordination-ssi">
              <div className="accordion-header" onClick={() => toggleAccordion('coordination')}>
                <div className="accordion-title">
                  <Image
                    src="/images/picto_flamme.png"
                    alt="icone coordination SSI"
                    width={55}
                    height={55}
                  />
                  <h2>Coordination SSI</h2>
                </div>
                <button className="accordion-button">
                  <span className="plus-icon">{activeAccordion === 'coordination' ? '−' : '+'}</span>
                </button>
              </div>
              <div className={`accordion-content ${activeAccordion === 'coordination' ? 'active' : ''}`}>
                <p>
                  Nous intervenons pour <span className="bold-emphasis">garantir la conformité</span> (avec la norme NFS 61-931) lors d'une nouvelle installation et réalisons des <span className="bold-emphasis">diagnostics approfondis</span> afin de recommander les meilleures solutions pour l'extension ou le remplacement de votre matériel existant.
                </p>
              </div>
            </div>

            {/* Mission 5 */}
            <div className={`accordion-item ${activeAccordion === 'delegation' ? 'active' : ''}`} id="delegationresponsabilites">
              <div className="accordion-header" onClick={() => toggleAccordion('delegation')}>
                <div className="accordion-title">
                  <Image
                    src="/images/picto-delegation-reponsa.png"
                    alt="icone délégation des responsabilités"
                    width={55}
                    height={55}
                  />
                  <h2>Délégation des responsabilités</h2>
                </div>
                <button className="accordion-button">
                  <span className="plus-icon">{activeAccordion === 'delegation' ? '−' : '+'}</span>
                </button>
              </div>
              <div className={`accordion-content ${activeAccordion === 'delegation' ? 'active' : ''}`}>
                <p>
                  En devenant votre <span className="bold-emphasis">principal interlocuteur</span> avec les autorités administratives, btry assure la mission de <span className="bold-emphasis">Responsable Unique de Sécurité (R.U.S.)</span> dans les Établissements Recevant du Public (E.R.P.) et de mandataire de sécurité dans les Immeubles de Grande Hauteur (I.G.H.).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal avec React Portal pour overlay plein écran */}
      <MissionsModal
        isOpen={showModal}
        onClose={closeModal}
      />
    </section>
  )
}