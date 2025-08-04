'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
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


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-12">

        {/* Hero Section avec image */}
        <div className="relative mb-16 overflow-hidden rounded-[20px] bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] p-8 lg:p-12">
            {/* Contenu texte */}
            <div className="order-2 lg:order-1 space-y-6">
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#002768] leading-tight font-primary">
                  {getCategoryTitle(category)}
                </h1>
                <p className="text-gray-600 text-lg lg:text-xl leading-relaxed font-primary">
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