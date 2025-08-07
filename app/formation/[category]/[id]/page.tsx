'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CourseDetails from '../../components/CourseDetails';

export default function CourseDetailPage() {
  const params = useParams();
  let category = params.category as string;
  const id = params.id as string;
  
  // Rediriger VAE vers bilan-competences pour regrouper les deux
  if (category === 'vae') {
    category = 'bilan-competences';
  }

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
        {/* Navigation simple */}
        <div className="mb-8">
          <Link 
            href={`/formation/${category}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
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