'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CoursesList from '../components/CoursesList';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'prevention-risques':
        return 'Prévention des risques';
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Bouton retour */}
        <div className="mb-8">
          <Link 
            href="/formation#formations"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux formations
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            {getCategoryTitle(category)}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez notre sélection de cours dans cette catégorie
          </p>
        </div>
        
        <CoursesList category={category} />
      </div>
    </div>
  );
}