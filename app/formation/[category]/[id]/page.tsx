'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CourseDetails from '../../components/CourseDetails';

export default function CourseDetailPage() {
  const params = useParams();
  const category = params.category as string;
  const id = params.id as string;

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'prevention-risques':
        return 'Prévention des risques et formations spécifiques';
      case 'bilan-competences':
        return 'Bilan de compétences';
      case 'vae':
        return 'VAE';
      case 'formation-continue':
        return 'Formation continue';
      default:
        return 'Formations';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/formation" className="hover:text-blue-600 transition-colors">
              Formations
            </Link>
            <span>/</span>
            <Link 
              href={`/formation/${category}`} 
              className="hover:text-blue-600 transition-colors"
            >
              {getCategoryTitle(category)}
            </Link>
            <span>/</span>
            <span className="text-gray-900">Détails du cours</span>
          </nav>
          
          <Link 
            href={`/formation/${category}`}
            className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Link>
        </div>

        {/* Course details */}
        <CourseDetails category={category} courseId={id} />
      </div>
    </div>
  );
}