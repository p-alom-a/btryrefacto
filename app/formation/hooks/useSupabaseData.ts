'use client'

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export type Course = {
  id: number;
  titre: string;
  niveau_qualification?: string;
  duree_centre?: string;
  duree_entreprise?: string;
  duree_jours?: number;
  duree_heures?: number;
  duree_totale_heures?: number;
};

export const useSupabaseData = (category: string) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        let query;
        let selectFields = 'titre, id';

        switch (category) {
          case 'formation-continue':
            selectFields = 'titre, id, niveau_qualification, duree_centre, duree_entreprise';
            query = supabase
              .from('formation_continue_courses')
              .select(selectFields)
              .order('titre');
            break;

          case 'prevention-risques':
            selectFields = 'titre, id, duree_jours';
            query = supabase
              .from('prevention_courses')
              .select(selectFields)
              .order('titre');
            break;

          case 'bilan-competences':
            selectFields = 'titre, id, duree_heures';
            query = supabase
              .from('bilan_competence_courses')
              .select(selectFields)
              .order('titre');
            break;

          case 'vae':
            selectFields = 'titre, id, duree_totale_heures';
            query = supabase
              .from('vae_courses')
              .select(selectFields)
              .order('titre');
            break;

          default:
            throw new Error('Catégorie non reconnue');
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setCourses((data as unknown as Course[]) || []);
      } catch (err) {
        console.error('Erreur lors de la récupération des cours:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCourses();
    }
  }, [category]);

  return { courses, loading, error };
};