'use client'

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Award, BookOpen, Filter, X } from 'lucide-react';
import { useSupabaseData, Course } from '../hooks/useSupabaseData';
import { getImageForCourse, getCourseSubcategory } from '../config/imageBank';

interface CoursesListProps {
  category: string;
}

const CoursesList: React.FC<CoursesListProps> = ({ category }) => {
  const { courses, loading, error } = useSupabaseData(category);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');


  // Générer les filtres disponibles basés sur les cours
  const availableFilters = useMemo(() => {
    const subcategoryCounts = new Map<string, number>();
    
    // Calculer les compteurs en une seule passe
    courses.forEach(course => {
      const subcategory = getCourseSubcategory(category, course.titre);
      subcategoryCounts.set(subcategory, (subcategoryCounts.get(subcategory) || 0) + 1);
    });

    const filterLabels: { [key: string]: string } = {
      'habilitation-electrique': 'Habilitation électrique',
      'securite-incendie': 'Sécurité incendie',
      'sst': 'SST - Premiers secours',
      'vae': 'VAE',
      'bilan': 'Bilan de compétences',
      'management': 'Management',
      'bureautique': 'Bureautique',
      'digital': 'Digital & Numérique',
      'autres': 'Autres formations'
    };

    return Array.from(subcategoryCounts.entries())
      .filter(([subcategory]) => subcategory !== 'autres' || subcategoryCounts.size === 1)
      .map(([subcategory, count]) => ({
        value: subcategory,
        label: filterLabels[subcategory] || subcategory,
        count
      }))
      .sort((a, b) => b.count - a.count);
  }, [courses, category]);

  // Filtrer les cours avec cache des sous-catégories
  const filteredCourses = useMemo(() => {
    if (selectedFilter === 'all') return courses;
    
    // Cache des sous-catégories pour éviter les recalculs
    const courseSubcategories = new Map<number, string>();
    
    return courses.filter(course => {
      if (!courseSubcategories.has(course.id)) {
        courseSubcategories.set(course.id, getCourseSubcategory(category, course.titre));
      }
      return courseSubcategories.get(course.id) === selectedFilter;
    });
  }, [courses, selectedFilter, category]);

  const getDurationInfo = (course: Course) => {
    if (course.duree_jours) {
      return `${course.duree_jours} jour${course.duree_jours > 1 ? 's' : ''}`;
    }
    if (course.duree_heures) {
      return `${course.duree_heures} heure${course.duree_heures > 1 ? 's' : ''}`;
    }
    if (course.duree_totale_heures) {
      return `${course.duree_totale_heures} heure${course.duree_totale_heures > 1 ? 's' : ''}`;
    }
    if (course.duree_centre || course.duree_entreprise) {
      const parts = [];
      if (course.duree_centre) parts.push(`Centre: ${course.duree_centre}`);
      if (course.duree_entreprise) parts.push(`Entreprise: ${course.duree_entreprise}`);
      return parts.join(' | ');
    }
    return 'Durée à définir';
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'prevention-risques':
        return <Clock className="w-6 h-6 text-blue-600" />;
      case 'bilan-competences':
      case 'vae':
        return <Award className="w-6 h-6 text-blue-600" />;
      case 'formation-continue':
        return <BookOpen className="w-6 h-6 text-blue-600" />;
      default:
        return <BookOpen className="w-6 h-6 text-blue-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-gray-600">Chargement des cours...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium">Erreur lors du chargement</p>
        <p className="text-red-500 text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-medium text-lg">Aucun cours disponible</p>
        <p className="text-gray-500 text-sm mt-2">
          Les cours pour cette catégorie seront bientôt disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Filtres */}
      {availableFilters.length > 1 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filtrer par spécialité</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === 'all'
                  ? 'bg-[#002768] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toutes ({courses.length})
            </button>
            
            {availableFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedFilter === filter.value
                    ? 'bg-[#002768] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
                {selectedFilter === filter.value && (
                  <X className="w-3 h-3" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Résultats */}
      {filteredCourses.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium text-lg">Aucun cours dans cette spécialité</p>
          <p className="text-gray-500 text-sm mt-2">
            Essayez un autre filtre ou consultez toutes les formations.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
        <Link
          key={course.id}
          href={`/formation/${category}/${course.id}`}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:scale-[1.02] block max-w-none"
        >
          {/* Image du cours */}
          <div className="relative h-56 sm:h-64 md:h-56 lg:h-60 w-full">
            <Image
              src={getImageForCourse(category, course.titre, course.id.toString())}
              alt={course.titre}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl md:text-xl lg:text-xl font-semibold text-gray-900 mb-4 leading-tight hover:text-blue-600 transition-colors">
              {course.titre}
            </h3>

            <div className="space-y-4">
              <div className="flex items-center text-base text-gray-600">
                <Clock className="w-5 h-5 mr-3 text-gray-400" />
                <span>{getDurationInfo(course)}</span>
              </div>

              {course.niveau_qualification && (
                <div className="flex items-center text-base text-gray-600">
                  <Award className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{course.niveau_qualification}</span>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="w-full bg-blue-50 text-blue-700 px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-100 transition-colors text-center">
                En savoir plus
              </div>
            </div>
          </div>
        </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesList;