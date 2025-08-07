'use client'

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export type Course = {
  id: number;
  titre: string;
  code_formation?: string;

  // Champs communs
  taux_reussite?: number | string;
  taux_satisfaction?: number | string;
  prerequis?: string;
  modalites_evaluation?: string | string[];
  delai_acces?: string;
  delais_acces?: string;
  pdf_path?: string;
  created_at?: string;
  updated_at?: string;

  // Formation Continue
  niveau_qualification?: string;
  code_rncp?: string;
  modalite?: string;
  duree_centre?: number;
  duree_entreprise?: number;
  objectifs_generaux?: string;
  objectifs_specifiques?: string[];
  blocs?: any;
  missions?: string[];
  moyens_pedagogiques?: string[];
  outils_numeriques?: string[];
  modalite_validation?: string;
  modalites_acces?: string;
  accessibilite_handicap?: boolean;
  taux_insertion?: number;
  public?: string[];
  accompagnement?: string;
  remediation?: string[];

  // Prévention
  duree_jours?: number;
  personnes_concernees?: string;
  niveau_prerequis?: string;
  objectifs_pedagogiques?: string;
  animation?: string;
  pedagogie?: string;
  documents_delivres?: string;
  nombre_stagiaires_min?: number;
  nombre_stagiaires_max?: number;
  programme_theorique?: string;
  programme_pratique?: string;

  // Bilan de compétences
  duree_heures?: number;
  objectifs?: string;
  public_concerne?: string;
  qualification_intervenants?: string;
  duree?: string;
  effectifs?: string;
  phase_preliminaire?: string;
  phase_investigation?: string;
  phase_conclusion?: string;
  suivi_6_mois?: string;
  materiel_necessaire?: string;
  tarif?: number;

  // VAE
  duree_totale_heures?: number;
  types_diplomes?: string;
  diplomes_specifiques?: string;
  format_intra?: boolean;
  format_inter?: boolean;
  format_individuel?: boolean;
  format_groupe?: boolean;
  modalites_presentiel?: boolean;
  modalites_distance?: boolean;
  modalites_mixte?: boolean;
  numero_habilitation?: string;
  code_cpf?: string;
  code_rncp_vae?: string;
  objectif_1_description?: string;
  objectif_2_description?: string;
  objectif_3_description?: string;
  objectif_4_description?: string;
  objectif_5_description?: string;
  objectif_6_description?: string;
  objectif_7_description?: string;
  objectif_8_description?: string;
  financement_cpf?: boolean;
  financement_france_travail?: boolean;
  intervenant_nom?: string;
  consultant_nom?: string;
  consultant_email?: string;
  consultant_telephone?: string;
  tarif_vae?: number;
  tarif_type?: string;
};

// Types pour spécialiser par catégorie (conservés de useCourseDetails)
export type FormationContinueCourse = Course & {
  niveau_qualification?: string;
  code_rncp?: string;
  modalite?: string;
  duree_centre?: number;
  duree_entreprise?: number;
  objectifs_generaux?: string;
  objectifs_specifiques?: string[];
  blocs?: any;
  missions?: string[];
  moyens_pedagogiques?: string[];
  outils_numeriques?: string[];
  modalite_validation?: string;
  modalites_acces?: string;
  accessibilite_handicap?: boolean;
  taux_insertion?: number;
  public?: string[];
  accompagnement?: string;
  remediation?: string[];
  categorie?: string;
};

export type PreventionCourse = Course & {
  duree_jours?: number;
  personnes_concernees?: string;
  niveau_prerequis?: string;
  objectifs_pedagogiques?: string;
  animation?: string;
  pedagogie?: string;
  documents_delivres?: string;
  nombre_stagiaires_min?: number;
  nombre_stagiaires_max?: number;
  programme_theorique?: string;
  programme_pratique?: string;
};

export type BilanCompetenceCourse = Course & {
  duree_heures?: number;
  objectifs?: string;
  public_concerne?: string;
  qualification_intervenants?: string;
  duree?: string;
  effectifs?: string;
  phase_preliminaire?: string;
  phase_investigation?: string;
  phase_conclusion?: string;
  suivi_6_mois?: string;
  materiel_necessaire?: string;
  tarif?: number;
};

export type VaeCourse = Course & {
  duree_totale_heures?: number;
  types_diplomes?: string;
  diplomes_specifiques?: string;
  format_intra?: boolean;
  format_inter?: boolean;
  format_individuel?: boolean;
  format_groupe?: boolean;
  modalites_presentiel?: boolean;
  modalites_distance?: boolean;
  modalites_mixte?: boolean;
  numero_habilitation?: string;
  code_cpf?: string;
  code_rncp_vae?: string;
  [key: string]: any; // Pour les champs dynamiques VAE
};

export type CourseDetail = FormationContinueCourse | PreventionCourse | BilanCompetenceCourse | VaeCourse;

export const useSupabaseData = (category: string, courseId?: string) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let query;
        let selectFields = '';
        const isDetailMode = !!courseId;

        if (isDetailMode) {
          // Mode détail : récupérer un cours spécifique
          const id = parseInt(courseId);
          if (isNaN(id)) {
            throw new Error('ID de cours invalide');
          }
        }

        switch (category) {
          case 'formation-continue':
            selectFields = `
              id, titre, code_formation, niveau_qualification, code_rncp, modalite,
              duree_centre, duree_entreprise, objectifs_generaux, objectifs_specifiques,
              blocs, missions, moyens_pedagogiques, outils_numeriques, modalites_evaluation,
              modalite_validation, modalites_acces, delai_acces, accessibilite_handicap,
              taux_reussite, taux_satisfaction, taux_insertion, public, prerequis,
              accompagnement, remediation, pdf_path, created_at, updated_at
            `;
            query = supabase
              .from('formation_continue_courses')
              .select(selectFields);
            
            if (isDetailMode) {
              query = query.eq('id', parseInt(courseId)).single();
            } else {
              query = query.order('titre');
            }
            break;

          case 'prevention-risques':
            selectFields = `
              id, titre, code_formation, duree_jours, personnes_concernees,
              niveau_prerequis, objectifs_pedagogiques, animation, pedagogie,
              modalites_evaluation, documents_delivres, nombre_stagiaires_min,
              nombre_stagiaires_max, programme_theorique, programme_pratique,
              taux_reussite, taux_satisfaction, pdf_path, created_at, updated_at
            `;
            query = supabase
              .from('prevention_courses')
              .select(selectFields);
            
            if (isDetailMode) {
              query = query.eq('id', parseInt(courseId)).single();
            } else {
              query = query.order('titre');
            }
            break;

          case 'bilan-competences':
            // Regrouper les cours de bilan de compétences ET VAE
            if (isDetailMode) {
              // En mode détail, essayer d'abord bilan_competence_courses puis vae_courses
              const id = parseInt(courseId);
              
              const bilanSelectFields = `
                id, titre, code_formation, objectifs, public_concerne, prerequis,
                qualification_intervenants, duree_heures, moyens_pedagogiques,
                duree, effectifs, phase_preliminaire, phase_investigation,
                phase_conclusion, suivi_6_mois, modalites_evaluation,
                materiel_necessaire, delais_acces, accessibilite_handicap,
                taux_reussite, taux_satisfaction, tarif, pdf_path, created_at, updated_at
              `;
              
              try {
                const { data: bilanData, error: bilanError } = await supabase
                  .from('bilan_competence_courses')
                  .select(bilanSelectFields)
                  .eq('id', id)
                  .single();

                if (!bilanError && bilanData) {
                  // Cours trouvé dans bilan_competence_courses, utiliser le flux normal
                  query = supabase
                    .from('bilan_competence_courses')
                    .select(bilanSelectFields)
                    .eq('id', id)
                    .single();
                  break;
                }
              } catch (err) {
                // Pas trouvé dans bilan_competence_courses, essayer vae_courses
              }

              // Si pas trouvé dans bilan_competence_courses, essayer vae_courses
              const vaeSelectFields = `
                id, titre, code_formation, types_diplomes, diplomes_specifiques,
                format_intra, format_inter, format_individuel, format_groupe,
                modalites_presentiel, modalites_distance, modalites_mixte,
                numero_habilitation, code_cpf, code_rncp, duree_totale_heures,
                public_concerne, objectif_1_description, objectif_2_description,
                objectif_3_description, objectif_4_description, objectif_5_description,
                objectif_6_description, objectif_7_description, objectif_8_description,
                delais_acces, financement_cpf, financement_france_travail,
                financement_france_vae, intervenant_nom, consultant_nom,
                consultant_email, consultant_telephone, tarif, tarif_type,
                taux_reussite, taux_satisfaction, pdf_path, created_at, updated_at
              `;
              
              query = supabase
                .from('vae_courses')
                .select(vaeSelectFields)
                .eq('id', id)
                .single();
                
            } else {
              // En mode liste, récupérer les deux tables et les combiner
              try {
                const bilanSelectFields = `
                  id, titre, code_formation, objectifs, public_concerne, prerequis,
                  qualification_intervenants, duree_heures, moyens_pedagogiques,
                  duree, effectifs, phase_preliminaire, phase_investigation,
                  phase_conclusion, suivi_6_mois, modalites_evaluation,
                  materiel_necessaire, delais_acces, accessibilite_handicap,
                  taux_reussite, taux_satisfaction, tarif, pdf_path, created_at, updated_at
                `;

                const vaeSelectFields = `
                  id, titre, code_formation, types_diplomes, diplomes_specifiques,
                  format_intra, format_inter, format_individuel, format_groupe,
                  modalites_presentiel, modalites_distance, modalites_mixte,
                  numero_habilitation, code_cpf, code_rncp, duree_totale_heures,
                  public_concerne, objectif_1_description, objectif_2_description,
                  objectif_3_description, objectif_4_description, objectif_5_description,
                  objectif_6_description, objectif_7_description, objectif_8_description,
                  delais_acces, financement_cpf, financement_france_travail,
                  financement_france_vae, intervenant_nom, consultant_nom,
                  consultant_email, consultant_telephone, tarif, tarif_type,
                  taux_reussite, taux_satisfaction, pdf_path, created_at, updated_at
                `;

                // Récupérer les cours de bilan de compétences
                const { data: bilanData, error: bilanError } = await supabase
                  .from('bilan_competence_courses')
                  .select(bilanSelectFields)
                  .order('titre');

                // Récupérer les cours VAE
                const { data: vaeData, error: vaeError } = await supabase
                  .from('vae_courses')
                  .select(vaeSelectFields)
                  .order('titre');

                if (bilanError) {
                  console.error('Erreur bilan_competence_courses:', bilanError);
                }
                if (vaeError) {
                  console.error('Erreur vae_courses:', vaeError);
                }

                // Même si une des deux requêtes échoue, on combine ce qu'on peut récupérer
                const combinedCourses = [
                  ...(bilanData || []),
                  ...(vaeData || [])
                ].sort((a, b) => a.titre.localeCompare(b.titre));

                console.log('Bilan courses:', bilanData?.length || 0);
                console.log('VAE courses:', vaeData?.length || 0);
                console.log('Combined courses:', combinedCourses.length);

                setCourses(combinedCourses as unknown as Course[]);
                return; // Sortir de fetchData ici car on a terminé
              } catch (err) {
                console.error('Erreur lors de la combinaison:', err);
                throw err;
              }
            }
            break;

          case 'vae':
            selectFields = `
              id, titre, code_formation, types_diplomes, diplomes_specifiques,
              format_intra, format_inter, format_individuel, format_groupe,
              modalites_presentiel, modalites_distance, modalites_mixte,
              numero_habilitation, code_cpf, code_rncp, duree_totale_heures,
              public_concerne, objectif_1_description, objectif_2_description,
              objectif_3_description, objectif_4_description, objectif_5_description,
              objectif_6_description, objectif_7_description, objectif_8_description,
              delais_acces, financement_cpf, financement_france_travail,
              financement_france_vae, intervenant_nom, consultant_nom,
              consultant_email, consultant_telephone, tarif, tarif_type,
              taux_reussite, taux_satisfaction, pdf_path, created_at, updated_at
            `;
            query = supabase
              .from('vae_courses')
              .select(selectFields);
            
            if (isDetailMode) {
              query = query.eq('id', parseInt(courseId)).single();
            } else {
              query = query.order('titre');
            }
            break;

          default:
            throw new Error('Catégorie non reconnue');
        }

        const { data, error } = await query;

        if (error) {
          if (error.code === 'PGRST116' && isDetailMode) {
            throw new Error('Cours non trouvé');
          }
          throw error;
        }

        if (isDetailMode) {
          setCourse(data as unknown as CourseDetail);
        } else {
          setCourses((data as unknown as Course[]) || []);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des cours:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchData();
    }
  }, [category, courseId]);

  return { courses, course, loading, error };
};