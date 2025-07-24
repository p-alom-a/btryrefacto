'use client'

import React from 'react';
import { Clock, Award, BookOpen } from 'lucide-react';
import { useSupabaseData, Course } from '../hooks/useSupabaseData';

interface CoursesListProps {
  category: string;
}

const CoursesList: React.FC<CoursesListProps> = ({ category }) => {
  const { courses, loading, error } = useSupabaseData(category);

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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                {course.titre}
              </h3>
            </div>
            <div className="ml-4 flex-shrink-0">
              {getIcon(category)}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              <span>{getDurationInfo(course)}</span>
            </div>

            {course.niveau_qualification && (
              <div className="flex items-center text-sm text-gray-600">
                <Award className="w-4 h-4 mr-2 text-gray-400" />
                <span>{course.niveau_qualification}</span>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <button className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
              En savoir plus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesList;