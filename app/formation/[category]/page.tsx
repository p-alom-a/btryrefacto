'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CoursesList from '../components/CoursesList';
import { getCategoryHeroImage } from '../config/imageBank';


export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

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
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">

        {/* Onglets de navigation */}
        <div className="flex justify-end mb-6">
          <div className="flex bg-gray-50/80 rounded-lg p-1 border border-gray-200/50">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={`/formation/${cat.key}`}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  isActiveCategory(cat.key)
                    ? 'bg-white text-[#002768] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Hero Section avec image */}
        <div className="relative mb-10 overflow-hidden rounded-[20px] bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center min-h-[200px] p-2 lg:p-4">
            {/* Contenu texte */}
            <div className="order-2 lg:order-1 space-y-4">
              <div className="space-y-3">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-[#002768] leading-tight font-primary">
                  {getCategoryTitle(category)}
                </h1>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed font-primary">
                  Développez vos compétences avec nos formations professionnelles spécialisées
                </p>
              </div>
            </div>
            
            {/* Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/3] w-full max-w-md mx-auto lg:max-w-none">
                <Image
                  src={getCategoryHeroImage(category)}
                  alt={`Hero image pour ${getCategoryTitle(category)}`}
                  fill
                  className="object-cover rounded-xl shadow-xl"
                  priority
                />
                {/* Overlay décoratif */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-200/30 rounded-full blur-lg hidden lg:block"></div>
            </div>
          </div>
        </div>
        
        <CoursesList category={category} />
      </div>
    </div>
  );
}