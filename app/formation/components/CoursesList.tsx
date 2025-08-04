'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Award, BookOpen } from 'lucide-react';
import { useSupabaseData, Course } from '../hooks/useSupabaseData';
import { getImageForCourse } from '../config/imageBank';

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
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
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
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-md">
              {getIcon(category)}
            </div>
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
  );
};

export default CoursesList;