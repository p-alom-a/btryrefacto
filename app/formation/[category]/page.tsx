'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CoursesList from '../components/CoursesList';
import { getCategoryHeroImage, getCategoryColors } from '../config/imageBank';


export default function CategoryPage() {
  const params = useParams();
  let category = params.category as string;
  
  // Rediriger VAE vers bilan-competences pour regrouper les deux
  if (category === 'vae') {
    category = 'bilan-competences';
  }

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'prevention-risques':
        return 'Prévention des risques et formations spécifiques';
      case 'bilan-competences':
        return 'Bilan de compétences & VAE';
      case 'vae':
        return 'VAE';
      case 'formation-continue':
        return 'Formation continue';
      default:
        return 'Formations';
    }
  };

  const categories = [
    { key: 'prevention-risques', label: 'Prévention des risques' },
    { key: 'formation-continue', label: 'Formation continue' },
    { key: 'bilan-competences', label: 'Bilan & VAE' }
  ];

  const isActiveCategory = (catKey: string) => {
    return category === catKey || (catKey === 'bilan-competences' && (category === 'bilan-competences' || category === 'vae'));
  };


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-12">

        {/* Onglets de navigation avec bouton retour - Style Apple discret - Caché sur mobile */}
        <div className="hidden md:flex items-center justify-between mt-4 mb-12 md:mb-20">
          <div className="flex items-center space-x-4">
            {/* Bouton retour */}
            <Link 
              href="/formation#formations"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#002768] transition-all duration-200"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            
            {/* Onglets */}
            <div className="flex space-x-1">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={`/formation/${cat.key}`}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm
                  ${isActiveCategory(cat.key)
                    ? 'text-[#002768] font-semibold'
                    : 'text-gray-500 hover:text-[#002768] hover:bg-white/40'
                  }
                `}
                style={isActiveCategory(cat.key) ? {
                  backgroundColor: getCategoryColors(category).secondary + '30',
                  border: `1px solid ${getCategoryColors(category).primary}20`
                } : {}}
              >
                {cat.label}
              </Link>
            ))}
            </div>
          </div>
        </div>


        {/* Hero Section - Style Apple moderne */}
        <div className="relative mb-12 md:mb-16">
          <div className="text-center space-y-6 md:space-y-8">
            {/* Icône centrée avec effet glassmorphism */}
            <div className="flex justify-center">
              <div 
                className="relative p-4 md:p-6 rounded-2xl md:rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${getCategoryColors(category).secondary}40, ${getCategoryColors(category).primary}20)`,
                }}
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
                  <Image
                    src={getCategoryHeroImage(category)}
                    alt={`Hero image pour ${getCategoryTitle(category)}`}
                    fill
                    sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Titre avec typographie Apple */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#002768] leading-[1.1] tracking-tight font-primary max-w-4xl mx-auto px-4">
                {getCategoryTitle(category)}
              </h1>
            </div>
          </div>
        </div>
        
        <CoursesList category={category} />
      </div>
    </div>
  );
}