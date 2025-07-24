'use client'

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export type FormationContinueCourse = {
  id: number;
  titre: string;
  niveau_qualification?: string;
  code_rncp?: string;
  modalite?: string;
  duree_centre?: string;
  duree_entreprise?: string;
  objectifs_generaux?: string;
  objectifs_specifiques?: string;
  blocs?: string;
  objectifs_entreprise?: string;
  missions?: string;
  moyens_pedagogiques?: string;
  outils_numeriques?: string;
  modalites_evaluation?: string;
  modalite_validation?: string;
  modalites_acces?: string;
  delai_acces?: string;
  accessibilite_handicap?: string;
  taux_reussite?: string;
  taux_satisfaction?: string;
  taux_insertion?: string;
  public?: string;
  prerequis?: string;
  accompagnement?: string;
  remediation?: string;
  created_at?: string;
  updated_at?: string;
  categorie?: string;
};

export type PreventionCourse = {
  id: number;
  titre: string;
  code_formation?: string;
  duree_jours?: number;
  personnes_concernees?: string;
  niveau_prerequis?: string;
  objectifs_pedagogiques?: string;
  animation?: string;
  pedagogie?: string;
  modalites_evaluation?: string;
  documents_delivres?: string;
  nombre_stagiaires_min?: number;
  nombre_stagiaires_max?: number;
  programme_theorique?: string;
  programme_pratique?: string;
  created_at?: string;
  updated_at?: string;
};

export type BilanCompetenceCourse = {
  id: number;
  titre: string;
  objectifs?: string;
  public_concerne?: string;
  prerequis?: string;
  qualification_intervenants?: string;
  duree_heures?: number;
  moyens_pedagogiques?: string;
  duree?: string;
  effectifs?: string;
  phase_preliminaire?: string;
  phase_investigation?: string;
  phase_conclusion?: string;
  suivi_6_mois?: string;
  modalites_evaluation?: string;
  materiel_necessaire?: string;
  delais_acces?: string;
  accessibilite_handicap?: string;
  taux_reussite?: string;
  taux_satisfaction?: string;
  tarif?: string;
  created_at?: string;
  updated_at?: string;
};

export type VaeCourse = {
  id: number;
  titre: string;
  [key: string]: any; // VAE a beaucoup de colonnes, on utilise un type flexible
};

export type CourseDetail = FormationContinueCourse | PreventionCourse | BilanCompetenceCourse | VaeCourse;

export const useCourseDetails = (category: string, courseId: string) => {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        let query;
        const id = parseInt(courseId);

        if (isNaN(id)) {
          throw new Error('ID de cours invalide');
        }

        switch (category) {
          case 'formation-continue':
            query = supabase
              .from('formation_continue_courses')
              .select(`
                id, titre, niveau_qualification, code_rncp, modalite, 
                duree_centre, duree_entreprise, objectifs_generaux, 
                objectifs_specifiques, blocs, objectifs_entreprise,
                missions, moyens_pedagogiques, outils_numeriques,
                modalites_evaluation, modalite_validation, modalites_acces,
                delai_acces, accessibilite_handicap, taux_reussite,
                taux_satisfaction, taux_insertion, public, prerequis,
                accompagnement, remediation, created_at, updated_at, categorie
              `)
              .eq('id', id)
              .single();
            break;

          case 'prevention-risques':
            query = supabase
              .from('prevention_courses')
              .select(`
                id, titre, code_formation, duree_jours, personnes_concernees,
                niveau_prerequis, objectifs_pedagogiques, animation, pedagogie,
                modalites_evaluation, documents_delivres, nombre_stagiaires_min,
                nombre_stagiaires_max, programme_theorique, programme_pratique,
                created_at, updated_at
              `)
              .eq('id', id)
              .single();
            break;

          case 'bilan-competences':
            query = supabase
              .from('bilan_competence_courses')
              .select(`
                id, titre, objectifs, public_concerne, prerequis,
                qualification_intervenants, duree_heures, moyens_pedagogiques,
                duree, effectifs, phase_preliminaire, phase_investigation,
                phase_conclusion, suivi_6_mois, modalites_evaluation,
                materiel_necessaire, delais_acces, accessibilite_handicap,
                taux_reussite, taux_satisfaction, tarif, created_at, updated_at
              `)
              .eq('id', id)
              .single();
            break;

          case 'vae':
            query = supabase
              .from('vae_courses')
              .select('*')
              .eq('id', id)
              .single();
            break;

          default:
            throw new Error('Catégorie non reconnue');
        }

        const { data, error } = await query;

        if (error) {
          if (error.code === 'PGRST116') {
            throw new Error('Cours non trouvé');
          }
          throw error;
        }

        setCourse(data);
      } catch (err) {
        console.error('Erreur lors de la récupération du cours:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    if (category && courseId) {
      fetchCourseDetails();
    }
  }, [category, courseId]);

  return { course, loading, error };
};