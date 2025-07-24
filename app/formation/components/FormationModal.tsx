'use client'

import React from 'react';
import { X, Clock, Users, Award } from 'lucide-react';

interface Course {
  id: number;
  titre: string;
  description?: string;
  duree?: string;
  participants_max?: number;
  niveau?: string;
  type?: string;
}

interface FormationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  courses: Course[];
  loading: boolean;
}

const FormationModal: React.FC<FormationModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  courses, 
  loading 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
              <span className="ml-3 text-gray-600">Chargement des cours...</span>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucun cours disponible pour cette formation.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 mb-6">
                Découvrez l'ensemble des cours disponibles pour cette formation :
              </p>
              
              <div className="grid gap-4">
                {courses.map((course, index) => (
                  <div 
                    key={course.id || index}
                    className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {course.titre}
                          {course.type && (
                            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {course.type}
                            </span>
                          )}
                        </h3>
                        
                        {course.description && (
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {course.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          {course.duree && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {course.duree}
                            </div>
                          )}
                          
                          {course.participants_max && (
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              Max {course.participants_max} participants
                            </div>
                          )}
                          
                          {course.niveau && (
                            <div className="flex items-center">
                              <Award className="w-4 h-4 mr-1" />
                              Niveau {course.niveau}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {courses.length} cours disponible{courses.length > 1 ? 's' : ''}
            </p>
            <button
              onClick={onClose}
              className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationModal;