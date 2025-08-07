'use client'

// Fonction pour télécharger un PDF via son URL publique
export const downloadCoursePdf = async (
  pdfPath: string | undefined,
  courseTitle: string
): Promise<void> => {
  if (!pdfPath) {
    throw new Error('Aucun fichier PDF n\'est disponible pour ce cours.');
  }

  try {
    // Construire l'URL publique du PDF avec l'URL hardcodée
    const pdfUrl = `https://qwltdtzpxxzpuaneuhzj.supabase.co/storage/v1/object/public/course-pdfs/${pdfPath}`;
    
    console.log('Téléchargement du PDF depuis:', pdfUrl);

    // Télécharger le fichier
    const response = await fetch(pdfUrl);
    
    if (!response.ok) {
      console.error('Erreur réponse:', response.status, response.statusText);
      throw new Error(`Impossible de télécharger le fichier (${response.status})`);
    }

    // Obtenir le blob du fichier
    const blob = await response.blob();
    
    // Créer un nom de fichier propre
    const fileName = `${courseTitle.slice(0, 50).trim()}.pdf`;
    
    // Déclencher le téléchargement
    downloadFile(blob, fileName);

  } catch (error) {
    console.error('Erreur lors du téléchargement du PDF:', error);
    throw error;
  }
};

// Fonction utilitaire pour déclencher le téléchargement dans le navigateur
const downloadFile = (blob: Blob, fileName: string): void => {
  // Créer une URL pour le blob
  const url = window.URL.createObjectURL(blob);
  
  // Créer un élément <a> temporaire pour déclencher le téléchargement
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  
  // Ajouter l'élément au DOM, cliquer dessus, puis le supprimer
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Libérer l'URL de l'objet
  window.URL.revokeObjectURL(url);
};