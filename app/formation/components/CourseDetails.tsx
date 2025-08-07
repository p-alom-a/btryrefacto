'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Award, BookOpen, AlertCircle, Download } from 'lucide-react';
import { useSupabaseData, FormationContinueCourse, PreventionCourse, BilanCompetenceCourse, VaeCourse } from '../hooks/useSupabaseData';
import { getImageForCourse } from '../config/imageBank';
import { downloadCoursePdf } from '../utils/pdfDownload';

interface CourseDetailsProps {
  category: string;
  courseId: string;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ category, courseId }) => {
  const { course, loading, error } = useSupabaseData(category, courseId);
  const [downloadLoading, setDownloadLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-gray-600">Chargement des détails du cours...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-red-800 mb-2">Erreur</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Cours non trouvé</p>
      </div>
    );
  }

  const handleDownloadPdf = async () => {
    if (!course) return;
    
    setDownloadLoading(true);
    try {
      await downloadCoursePdf(course.pdf_path, course.titre);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Erreur lors du téléchargement du PDF. Veuillez réessayer ou contacter le support.');
    } finally {
      setDownloadLoading(false);
    }
  };

  const renderFormationContinue = (course: FormationContinueCourse) => (
    <div className="space-y-8">
      {/* En-tête avec image */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Image header */}
        <div className="relative h-64 w-full">
          <Image
            src={getImageForCourse(category, course.titre, course.id.toString())}
            alt={course.titre}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-8 right-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.titre}</h1>
          </div>
        </div>
        
        {/* Informations */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {course.niveau_qualification && (
              <div className="flex items-center">
                <Award className="w-4 h-4 text-blue-600 mr-2" />
                <span>{course.niveau_qualification}</span>
              </div>
            )}
            {course.code_rncp && (
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
                <span>Code RNCP: {course.code_rncp}</span>
              </div>
            )}
            {course.modalite && (
              <div className="flex items-center">
                <Users className="w-4 h-4 text-blue-600 mr-2" />
                <span>{course.modalite}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Durée */}
      {(course.duree_centre || course.duree_entreprise) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            Durée de formation
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {course.duree_centre && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">En centre</h3>
                <p className="text-gray-700">{course.duree_centre}</p>
              </div>
            )}
            {course.duree_entreprise && (
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">En entreprise</h3>
                <p className="text-gray-700">{course.duree_entreprise}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Objectifs */}
      {(course.objectifs_generaux || course.objectifs_specifiques) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Objectifs</h2>
          {course.objectifs_generaux && (
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Objectifs généraux</h3>
              <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.objectifs_generaux }} />
            </div>
          )}
          {course.objectifs_specifiques && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Objectifs spécifiques</h3>
              <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.objectifs_specifiques }} />
            </div>
          )}
        </div>
      )}

      {/* Public et prérequis */}
      {(course.public || course.prerequis) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Public et prérequis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {course.public && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Public concerné</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.public }} />
              </div>
            )}
            {course.prerequis && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Prérequis</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.prerequis }} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pédagogie */}
      {(course.moyens_pedagogiques || course.outils_numeriques || course.modalites_evaluation) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Méthodes pédagogiques</h2>
          <div className="space-y-4">
            {course.moyens_pedagogiques && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Moyens pédagogiques</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.moyens_pedagogiques }} />
              </div>
            )}
            {course.outils_numeriques && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Outils numériques</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.outils_numeriques }} />
              </div>
            )}
            {course.modalites_evaluation && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Modalités d'évaluation</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.modalites_evaluation }} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Statistiques */}
      {(course.taux_reussite !== undefined || course.taux_satisfaction !== undefined || course.taux_insertion) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistiques</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {course.taux_reussite !== undefined && (
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(!course.taux_reussite || parseFloat(String(course.taux_reussite)) === 0) ? "(en cours)" : course.taux_reussite}
                </div>
                <div className="text-sm text-gray-600">Taux de réussite</div>
              </div>
            )}
            {course.taux_satisfaction !== undefined && (
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {(!course.taux_satisfaction || parseFloat(String(course.taux_satisfaction)) === 0) ? "(en cours)" : course.taux_satisfaction}
                </div>
                <div className="text-sm text-gray-600">Taux de satisfaction</div>
              </div>
            )}
            {course.taux_insertion !== undefined && (
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {(!course.taux_insertion || parseFloat(String(course.taux_insertion)) === 0) ? "(en cours)" : course.taux_insertion}
                </div>
                <div className="text-sm text-gray-600">Taux d'insertion</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderPrevention = (course: PreventionCourse) => (
    <div className="space-y-8">
      {/* En-tête avec image */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Image header */}
        <div className="relative h-64 w-full">
          <Image
            src={getImageForCourse(category, course.titre, course.id.toString())}
            alt={course.titre}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-8 right-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.titre}</h1>
          </div>
        </div>
        
        {/* Informations */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {course.code_formation && (
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
                <span>Code: {course.code_formation}</span>
              </div>
            )}
            {course.duree_jours && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-blue-600 mr-2" />
                <span>{course.duree_jours} jour{course.duree_jours > 1 ? 's' : ''}</span>
              </div>
            )}
            {(course.nombre_stagiaires_min || course.nombre_stagiaires_max) && (
              <div className="flex items-center">
                <Users className="w-4 h-4 text-blue-600 mr-2" />
                <span>
                  {course.nombre_stagiaires_min && course.nombre_stagiaires_max 
                    ? `${course.nombre_stagiaires_min}-${course.nombre_stagiaires_max} stagiaires`
                    : course.nombre_stagiaires_min 
                      ? `Min. ${course.nombre_stagiaires_min} stagiaires`
                      : course.nombre_stagiaires_max 
                        ? `Max. ${course.nombre_stagiaires_max} stagiaires`
                        : 'Non spécifié'
                  }
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Public concerné */}
      {course.personnes_concernees && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Public concerné</h2>
          <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.personnes_concernees }} />
        </div>
      )}

      {/* Objectifs pédagogiques */}
      {course.objectifs_pedagogiques && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Objectifs pédagogiques</h2>
          <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.objectifs_pedagogiques }} />
        </div>
      )}

      {/* Programme */}
      {(course.programme_theorique || course.programme_pratique) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Programme</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {course.programme_theorique && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Partie théorique</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.programme_theorique }} />
              </div>
            )}
            {course.programme_pratique && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Partie pratique</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.programme_pratique }} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Documents délivrés */}
      {course.documents_delivres && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents délivrés</h2>
          <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.documents_delivres }} />
        </div>
      )}

      {/* Statistiques */}
      {(course.taux_reussite !== undefined || course.taux_satisfaction !== undefined) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistiques</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {course.taux_reussite !== undefined && (
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(!course.taux_reussite || parseFloat(String(course.taux_reussite)) === 0) ? "(en cours)" : course.taux_reussite}
                </div>
                <div className="text-sm text-gray-600">Taux de réussite</div>
              </div>
            )}
            {course.taux_satisfaction !== undefined && (
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {(!course.taux_satisfaction || parseFloat(String(course.taux_satisfaction)) === 0) ? "(en cours)" : course.taux_satisfaction}
                </div>
                <div className="text-sm text-gray-600">Taux de satisfaction</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderBilanCompetence = (course: BilanCompetenceCourse) => (
    <div className="space-y-8">
      {/* En-tête avec image */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Image header */}
        <div className="relative h-64 w-full">
          <Image
            src={getImageForCourse(category, course.titre, course.id.toString())}
            alt={course.titre}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-8 right-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.titre}</h1>
          </div>
        </div>
        
        {/* Informations */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
          {course.duree_heures && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-blue-600 mr-2" />
              <span>{course.duree_heures} heures</span>
            </div>
          )}
          {course.effectifs && (
            <div className="flex items-center">
              <Users className="w-4 h-4 text-blue-600 mr-2" />
              <span>{course.effectifs}</span>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Objectifs */}
      {course.objectifs && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Objectifs</h2>
          <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.objectifs }} />
        </div>
      )}

      {/* Les 3 phases */}
      {(course.phase_preliminaire || course.phase_investigation || course.phase_conclusion) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Déroulement en 3 phases</h2>
          <div className="space-y-6">
            {course.phase_preliminaire && (
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-900 mb-2">Phase préliminaire</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.phase_preliminaire }} />
              </div>
            )}
            {course.phase_investigation && (
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-900 mb-2">Phase d'investigation</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.phase_investigation }} />
              </div>
            )}
            {course.phase_conclusion && (
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-gray-900 mb-2">Phase de conclusion</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.phase_conclusion }} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Public et prérequis */}
      {(course.public_concerne || course.prerequis) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Public et prérequis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {course.public_concerne && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Public concerné</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.public_concerne }} />
              </div>
            )}
            {course.prerequis && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Prérequis</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.prerequis }} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Statistiques */}
      {(course.taux_reussite !== undefined || course.taux_satisfaction !== undefined) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistiques</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {course.taux_reussite !== undefined && (
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(!course.taux_reussite || parseFloat(String(course.taux_reussite)) === 0) ? "(en cours)" : course.taux_reussite}
                </div>
                <div className="text-sm text-gray-600">Taux de réussite</div>
              </div>
            )}
            {course.taux_satisfaction !== undefined && (
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {(!course.taux_satisfaction || parseFloat(String(course.taux_satisfaction)) === 0) ? "(en cours)" : course.taux_satisfaction}
                </div>
                <div className="text-sm text-gray-600">Taux de satisfaction</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderVae = (course: VaeCourse) => (
    <div className="space-y-8">
      {/* En-tête avec image */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Image header */}
        <div className="relative h-64 w-full">
          <Image
            src={getImageForCourse(category, course.titre, course.id.toString())}
            alt={course.titre}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-8 right-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.titre}</h1>
          </div>
        </div>
        
        {/* Informations */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
          {course.duree_totale_heures && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-blue-600 mr-2" />
              <span>{course.duree_totale_heures} heures</span>
            </div>
          )}
          {course.modalites && (
            <div className="flex items-center">
              <Users className="w-4 h-4 text-blue-600 mr-2" />
              <span>{course.modalites}</span>
            </div>
          )}
          {course.types_diplomes && (
            <div className="flex items-center">
              <Award className="w-4 h-4 text-blue-600 mr-2" />
              <span>{course.types_diplomes}</span>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Objectifs */}
      {course.objectifs && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Objectifs</h2>
          <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.objectifs }} />
        </div>
      )}

      {/* Étapes */}
      {course.etapes && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Étapes du processus VAE</h2>
          <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.etapes }} />
        </div>
      )}

      {/* Contenu dynamique pour les autres champs VAE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations complémentaires</h2>
        <div className="grid gap-4">
          {Object.entries(course).map(([key, value]) => {
            if (key === 'id' || key === 'titre' || key === 'created_at' || key === 'updated_at' || !value) return null;
            return (
              <div key={key} className="border-b border-gray-100 pb-2">
                <dt className="font-medium text-gray-900 capitalize">{key.replace(/_/g, ' ')}</dt>
                <dd className="text-gray-700 mt-1">
                  {typeof value === 'string' && value.length > 100 ? (
                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: value }} />
                  ) : (
                    String(value)
                  )}
                </dd>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistiques */}
      {(course.taux_reussite !== undefined || course.taux_satisfaction !== undefined) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistiques</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {course.taux_reussite !== undefined && (
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(!course.taux_reussite || parseFloat(String(course.taux_reussite)) === 0) ? "(en cours)" : course.taux_reussite}
                </div>
                <div className="text-sm text-gray-600">Taux de réussite</div>
              </div>
            )}
            {course.taux_satisfaction !== undefined && (
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {(!course.taux_satisfaction || parseFloat(String(course.taux_satisfaction)) === 0) ? "(en cours)" : course.taux_satisfaction}
                </div>
                <div className="text-sm text-gray-600">Taux de satisfaction</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderCourseDetails = () => {
    switch (category) {
      case 'formation-continue':
        return renderFormationContinue(course as FormationContinueCourse);
      case 'prevention-risques':
        return renderPrevention(course as PreventionCourse);
      case 'bilan-competences':
        return renderBilanCompetence(course as BilanCompetenceCourse);
      case 'vae':
        return renderVae(course as VaeCourse);
      default:
        return <div>Type de formation non supporté</div>;
    }
  };

  return (
    <div>
      {renderCourseDetails()}
      
      {/* Action buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <Link href="/formation#contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block text-center">
          Contact
        </Link>
        <button 
          onClick={handleDownloadPdf}
          disabled={downloadLoading || !course.pdf_path}
          className={`px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2 ${
            course.pdf_path 
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          title={!course.pdf_path ? 'Aucun PDF disponible pour ce cours' : ''}
        >
          {downloadLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              <span>Téléchargement...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Télécharger la fiche</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;