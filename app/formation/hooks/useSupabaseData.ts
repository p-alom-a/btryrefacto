'use client'

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

// Sélecteurs de champs pour chaque table
const FIELD_SELECTORS = {
  formation_continue_courses: `
    id, titre, code_formation, niveau_qualification, code_rncp, modalite,
    duree_centre, duree_entreprise, objectifs_generaux, objectifs_specifiques,
    blocs, missions, moyens_pedagogiques, outils_numeriques, modalites_evaluation,
    modalite_validation, modalites_acces, delai_acces, accessibilite_handicap,
    taux_reussite, taux_satisfaction, taux_insertion, public, prerequis,
    accompagnement, remediation, pdf_path, created_at, updated_at
  `,
  prevention_courses: `
    id, titre, code_formation, duree_jours, personnes_concernees,
    niveau_prerequis, objectifs_pedagogiques, animation, pedagogie,
    modalites_evaluation, documents_delivres, nombre_stagiaires_min,
    nombre_stagiaires_max, programme_theorique, programme_pratique,
    taux_reussite, taux_satisfaction, pdf_path, created_at, updated_at
  `,
  bilan_competence_courses: `
    id, titre, code_formation, objectifs, public_concerne, prerequis,
    qualification_intervenants, duree_heures, moyens_pedagogiques,
    duree, effectifs, phase_preliminaire, phase_investigation,
    phase_conclusion, suivi_6_mois, modalites_evaluation,
    materiel_necessaire, delais_acces, accessibilite_handicap,
    taux_reussite, taux_satisfaction, tarif, pdf_path, created_at, updated_at
  `,
  vae_courses: `
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
  `
};

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
  source?: 'bilan' | 'vae';

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

// Helper function to handle bilan-competences/VAE combination logic
const handleBilanCompetencesQuery = async (
  isDetailMode: boolean,
  courseId?: string,
  preferredSource?: 'bilan' | 'vae'
): Promise<any> => {
  if (isDetailMode && courseId) {
    const id = parseInt(courseId);
    
    // Query order based on preferredSource if provided to avoid ID collisions
    const tryBilanFirst = preferredSource !== 'vae';

    if (tryBilanFirst) {
      try {
        const { data: bilanData, error: bilanError } = await supabase
          .from('bilan_competence_courses')
          .select('*')
          .eq('id', id)
          .single();

        if (!bilanError && bilanData) {
          return { data: { ...bilanData, source: 'bilan' as const }, error: null };
        }
      } catch (err) {
        // ignore, fallback to VAE
      }

      const { data: vaeData, error: vaeErr } = await supabase
        .from('vae_courses')
        .select('*')
        .eq('id', id)
        .single();
      return { data: vaeData ? { ...vaeData, source: 'vae' as const } : null, error: vaeErr };
    } else {
      try {
        const { data: vaeData, error: vaeError } = await supabase
          .from('vae_courses')
          .select('*')
          .eq('id', id)
          .single();

        if (!vaeError && vaeData) {
          return { data: { ...vaeData, source: 'vae' as const }, error: null };
        }
      } catch (err) {
        // ignore, fallback to bilan
      }

      const { data: bilanData2, error: bilanErr2 } = await supabase
        .from('bilan_competence_courses')
        .select('*')
        .eq('id', id)
        .single();
      return { data: bilanData2 ? { ...bilanData2, source: 'bilan' as const } : null, error: bilanErr2 };
    }
  } else {
    // List mode: combine both tables
    try {
      const [bilanResult, vaeResult] = await Promise.all([
        supabase
          .from('bilan_competence_courses')
          .select('*')
          .order('titre'),
        supabase
          .from('vae_courses')
          .select('*')
          .order('titre')
      ]);

      if (bilanResult.error) {
        console.error('Erreur bilan_competence_courses:', bilanResult.error);
      }
      if (vaeResult.error) {
        console.error('Erreur vae_courses:', vaeResult.error);
      }

      const combinedCourses = [
        ...((bilanResult.data || []).map((c: any) => ({ ...c, source: 'bilan' as const }))),
        ...((vaeResult.data || []).map((c: any) => ({ ...c, source: 'vae' as const })))
      ].sort((a: any, b: any) => a.titre.localeCompare(b.titre));

      console.log('Bilan courses:', bilanResult.data?.length || 0);
      console.log('VAE courses:', vaeResult.data?.length || 0);
      console.log('Combined courses:', combinedCourses.length);

      return { data: combinedCourses, error: null, isListMode: true };
    } catch (err) {
      console.error('Erreur lors de la combinaison:', err);
      throw err;
    }
  }
};

export const useSupabaseData = (category: string, courseId?: string, detailSource?: 'bilan' | 'vae') => {
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
        const isDetailMode = !!courseId;

        if (isDetailMode) {
          // Mode détail : récupérer un cours spécifique
          const id = parseInt(courseId);
          if (isNaN(id)) {
            throw new Error('ID de cours invalide');
          }
        }

        // Handle bilan-competences special case with combined logic
        if (category === 'bilan-competences') {
          console.log('🔍 Fetching bilan-competences data...', { isDetailMode, courseId });
          const result = await handleBilanCompetencesQuery(isDetailMode, courseId, detailSource);
          
          if (result.isListMode) {
            console.log('✅ Setting combined courses:', result.data.length);
            setCourses(result.data as unknown as Course[]);
            return;
          } else {
            const { data, error } = result;
            if (error) {
              if (error.code === 'PGRST116' && isDetailMode) {
                throw new Error('Cours non trouvé');
              }
              throw error;
            }
            setCourse(data as unknown as CourseDetail);
            return;
          }
        }

        // Handle standard categories
        const tableMap: Record<string, string> = {
          'formation-continue': 'formation_continue_courses',
          'prevention-risques': 'prevention_courses',
          'vae': 'vae_courses'
        };

        const tableName = tableMap[category];
        if (!tableName) {
          throw new Error('Catégorie non reconnue');
        }

        const selectorKey = tableName as keyof typeof FIELD_SELECTORS;
        const selectFields = FIELD_SELECTORS[selectorKey];

        query = supabase
          .from(tableName)
          .select(selectFields);
        
        if (isDetailMode) {
          query = query.eq('id', parseInt(courseId!)).single();
        } else {
          query = query.order('titre');
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