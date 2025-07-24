import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useFormations = () => {
  const [preventionRisques, setPreventionRisques] = useState([]);
  const [formationContinue, setFormationContinue] = useState([]);
  const [vaeEtBilan, setVaeEtBilan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        setLoading(true);
        
        // Récupérer tous les cours depuis la table courses
        const { data: allCourses, error: coursesError } = await supabase
          .from('courses')
          .select(`
            id,
            titre,
            categorie,
            niveau_qualification,
            duree_centre,
            duree_entreprise,
            objectifs_generaux,
            objectifs_specifiques,
            modalite,
            code_rncp,
            public,
            prerequis
          `)
          .order('titre');

        if (coursesError) throw coursesError;

        // Séparer par catégorie en fonction de la logique métier
        const preventionCourses = (allCourses || []).filter(course => 
          course.categorie === 'Prévention des risques' ||
          (course.titre && (
            course.titre.toLowerCase().includes('sst') ||
            course.titre.toLowerCase().includes('secours') ||
            course.titre.toLowerCase().includes('sécurité') ||
            course.titre.toLowerCase().includes('prévention') ||
            course.titre.toLowerCase().includes('gestes') ||
            course.titre.toLowerCase().includes('postures')
          ))
        );

        const vaeEtBilanCourses = (allCourses || []).filter(course => 
          course.categorie === 'VAE' ||
          course.categorie === 'Bilan de compétences' ||
          (course.titre && (
            course.titre.toLowerCase().includes('vae') ||
            course.titre.toLowerCase().includes('validation') ||
            course.titre.toLowerCase().includes('acquis') ||
            course.titre.toLowerCase().includes('bilan') ||
            course.titre.toLowerCase().includes('compétences')
          ))
        ).map(course => ({
          ...course,
          type: course.categorie === 'VAE' ? 'VAE' : 
                course.categorie === 'Bilan de compétences' ? 'Bilan de compétences' :
                course.titre.toLowerCase().includes('vae') ? 'VAE' : 'Bilan de compétences'
        }));

        const formationContinueCourses = (allCourses || []).filter(course => 
          course.categorie === 'Formation continue' || 
          (!preventionCourses.find(p => p.id === course.id) && 
           !vaeEtBilanCourses.find(v => v.id === course.id))
        );

        setPreventionRisques(preventionCourses);
        setFormationContinue(formationContinueCourses);
        setVaeEtBilan(vaeEtBilanCourses);

      } catch (err) {
        console.error('Erreur lors de la récupération des formations:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, []);

  const formatDuration = (dureeCenter, dureeEntreprise) => {
    const parts = [];
    if (dureeCenter && dureeCenter > 0) {
      parts.push(`${dureeCenter}h en centre`);
    }
    if (dureeEntreprise && dureeEntreprise > 0) {
      parts.push(`${dureeEntreprise}h en entreprise`);
    }
    return parts.length > 0 ? parts.join(' + ') : null;
  };

  // Enrichir les données avec des informations formatées
  const enrichCourseData = (courses) => {
    return courses.map(course => ({
      ...course,
      duree: formatDuration(course.duree_centre, course.duree_entreprise),
      description: course.objectifs_generaux || 'Formation professionnelle spécialisée',
      niveau: course.niveau_qualification,
      participants_max: null, // Pas d'info sur le max de participants dans la DB actuelle
    }));
  };

  return {
    preventionRisques: enrichCourseData(preventionRisques),
    formationContinue: enrichCourseData(formationContinue),
    vaeEtBilan: enrichCourseData(vaeEtBilan),
    loading,
    error
  };
};