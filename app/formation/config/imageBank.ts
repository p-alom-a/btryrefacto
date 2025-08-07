// Configuration des images pour les formations
export interface CategoryConfig {
  default: string;
  'hero-image': string;
  colors: {
    primary: string;
    secondary: string;
  };
  [subcategory: string]: string[] | string | { primary: string; secondary: string };
}

export interface ImageBank {
  [category: string]: CategoryConfig;
}

export const imageBank: ImageBank = {
  'prevention-risques': {
    'habilitation-electrique': [
      '/images/formation/prevention/habilitation-electrique/habilitation-6.jpg',
    ],
    'securite-incendie': [
      '/images/formation/prevention/securite-incendie/securite-2.png',
    ],
    'sst': [
      '/images/formation/prevention/sst/sst-1.jpg',
    ],
    'hero-image': '/images/picto-categorie/preventionrisques.png',
    colors: {
      primary: '#E0484A',
      secondary: '#F2B8B9'
    },
    default: '/images/formation/hero-preventionrisques.png' // Image actuelle en fallback
  },
  'bilan-competences': {
    'bilan': [
      // À remplir après upload des images
      // '/images/formation/bilan-competences/bilan-1.jpg',
    ],
    'vae': [
      // À remplir après upload des images
      // '/images/formation/bilan-competences/vae-1.jpg',
    ],
    'hero-image': '/images/picto-categorie/bilanC_Vae.png',
    colors: {
      primary: '#918ADD',
      secondary: '#C9B8F0'
    },
    default: '/images/formation/hero-bilancompet.png' // Image actuelle en fallback
  },
  'formation-continue': {
    'management': [
      // À remplir après upload des images
      // '/images/formation/formation-continue/management-1.jpg',
    ],
    'bureautique': [
      // À remplir après upload des images
      // '/images/formation/formation-continue/bureautique-1.jpg',
    ],
    'digital': [
      // À remplir après upload des images
      // '/images/formation/formation-continue/digital-1.jpg',
    ],
    'hero-image': '/images/picto-categorie/formationContinue.png',
    colors: {
      primary: '#2DB9CF',
      secondary: '#B8E6F0'
    },
    default: '/images/formation/hero-formation%20continue.png' // Image actuelle en fallback
  }
};

// Index pour éviter les répétitions
let imageIndex = 0;

// Fonction utilitaire pour déterminer la sous-catégorie d'un cours
export function getCourseSubcategory(category: string, courseTitle: string): string {
  const title = courseTitle.toLowerCase();
  
  if (category === 'prevention-risques') {
    if (title.includes('habilitation') || title.includes('électrique') || title.includes('electrique')) {
      return 'habilitation-electrique';
    }
    if (title.includes('incendie') || title.includes('feu') || title.includes('évacuation')) {
      return 'securite-incendie';
    }
    if (title.includes('sst') || title.includes('secours') || title.includes('premiers')) {
      return 'sst';
    }
  }
  
  if (category === 'bilan-competences') {
    if (title.includes('vae') || title.includes('validation')) {
      return 'vae';
    }
    if (title.includes('bilan') || title.includes('compétence')) {
      return 'bilan';
    }
  }
  
  if (category === 'formation-continue') {
    if (title.includes('management') || title.includes('manager') || title.includes('équipe')) {
      return 'management';
    }
    if (title.includes('bureautique') || title.includes('office') || title.includes('excel') || title.includes('word')) {
      return 'bureautique';
    }
    if (title.includes('digital') || title.includes('numérique') || title.includes('informatique')) {
      return 'digital';
    }
  }
  
  return 'autres';
}

// Fonction pour sélectionner une image basée sur le titre du cours
export function getImageForCourse(category: string, courseTitle: string, courseId?: string): string {
  const categoryImages = imageBank[category];
  
  if (!categoryImages) {
    return '/images/formation/illustration-hero.png'; // Fallback général
  }

  const subcategory = getCourseSubcategory(category, courseTitle);
  
  // Si on a trouvé une sous-catégorie avec des images
  if (subcategory !== 'autres') {
    const images = categoryImages[subcategory];
    if (images && Array.isArray(images) && images.length > 0) {
      const index = courseId ? 
        parseInt(courseId.toString().slice(-1)) % images.length : 
        (imageIndex++) % images.length;
      return images[index];
    }
  }
  
  // Retourne l'image par défaut de la catégorie
  return categoryImages.default;
}

// Fonction pour obtenir l'image hero d'une catégorie
export function getCategoryHeroImage(category: string): string {
  const categoryImages = imageBank[category];
  const heroImage = categoryImages?.['hero-image'];
  return (heroImage && typeof heroImage === 'string') ? heroImage : '/images/picto-categorie/preventionrisques.png';
}

// Fonction pour obtenir les couleurs d'une catégorie
export function getCategoryColors(category: string): { primary: string; secondary: string } {
  const categoryImages = imageBank[category];
  return categoryImages?.colors || { primary: '#E0484A', secondary: '#F2B8B9' };
}