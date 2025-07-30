# BTRY Solutions - Next.js Migration

## 🚀 Projet

Migration complète du site web BTRY Solutions (bureau d'études en sécurité incendie) de HTML/Vite vers Next.js 14 avec TypeScript.

## 📋 Fonctionnalités

- **Responsive Design** : Optimisé pour mobile et desktop
- **Navigation smooth** : Défilement fluide entre les sections
- **Accordéon interactif** : Section missions avec animations
- **Modales** : Formulaire de contact et solutions
- **Optimisation images** : Next.js Image component
- **SEO optimisé** : Meta tags et structured data
- **Performance** : Static generation et optimisations Vercel

## 🛠️ Technologies

- **Next.js 14** : Framework React avec App Router
- **TypeScript** : Typage statique pour la robustesse
- **CSS Modules** : Styles composants isolés
- **Tailwind CSS** : Framework CSS utilitaire (approche hybride)
- **Framer Motion** : Animations fluides
- **React Hook Form** : Gestion des formulaires
- **EmailJS** : Envoi de formulaires par email

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start
```

## 🌐 Déploiement

Le projet est configuré pour un déploiement optimal sur Vercel :

1. **Static Export** : Génération statique pour de meilleures performances
2. **Image Optimization** : Optimisation automatique des images
3. **Headers sécurisés** : Configuration de sécurité
4. **Cache optimisé** : Stratégie de cache pour les assets

## 📁 Structure

```
btry-nextjs/
├── app/
│   ├── formation/          # Section Formation (approche hybride)
│   │   ├── components/     # Composants spécifiques
│   │   └── formation.css   # Styles CSS personnalisés
│   ├── layout.tsx          # Layout global
│   ├── page.tsx            # Page d'accueil
│   └── globals.css         # Styles globaux
├── components/
│   ├── Header.tsx          # Navigation
│   ├── Hero.tsx            # Section hero
│   ├── About.tsx           # Section à propos
│   ├── Missions.tsx        # Section missions
│   ├── LinkedIn.tsx        # Section actualités
│   └── Contact.tsx         # Section contact
├── public/
│   └── images/            # Assets images
├── styles/
│   └── homepage.css       # Styles CSS homepage
└── vercel.json            # Configuration Vercel
```

## 🎨 Fonctionnalités Spécifiques

### Navigation
- Menu burger responsive
- Navigation smooth vers les sections
- Dropdown pour les missions

### Missions
- Accordéon interactif
- Modale avec solutions détaillées
- Animations d'ouverture/fermeture

### Contact
- Formulaire de contact avec validation
- Popup de rappel
- Intégration EmailJS

### LinkedIn
- Grille responsive de posts
- Liens vers les publications
- Vidéo intégrée

## 🔧 Configuration

### EmailJS
Remplacez les placeholders dans `components/Contact.tsx` :
```typescript
// À remplacer par vos vraies clés EmailJS
'YOUR_SERVICE_ID'
'YOUR_TEMPLATE_ID'
'YOUR_PUBLIC_KEY'
```

### SEO
Les meta tags sont configurés dans `app/layout.tsx` pour le référencement français.

## 📱 Responsive

Le design est entièrement responsive avec des breakpoints optimisés :
- Mobile : < 768px
- Tablet : 768px - 1024px
- Desktop : > 1024px

## 🔄 Approche Hybride CSS/Tailwind

Le projet utilise une **migration progressive** avec une approche hybride :

### Homepage (CSS pur)
- Utilise des styles CSS traditionnels (`styles/homepage.css`)
- Composants avec classes CSS personnalisées
- Media queries CSS pour le responsive

### Section Formation (Hybride)
- **Structure de base** : Tailwind CSS dans les composants React
- **Responsive mobile** : CSS personnalisé avec `!important` (`app/formation/formation.css`)
- **Pourquoi cette approche ?**
  - Migration progressive de CSS vers Tailwind
  - Contrôle précis sur les breakpoints complexes
  - Cohabitation harmonieuse des deux approches
  - Flexibilité maximale pendant la transition

```tsx
// Exemple d'approche hybride
<div className="flex justify-center items-center w-full formation-hero-container">
  <Image className="formation-logo-btry w-auto h-[8vw] opacity-0" />
</div>
```

```css
/* CSS spécialisé pour mobile */
@media screen and (max-width: 768px) {
  .formation-logo-btry {
    height: 22vw !important;
    margin: 0 auto !important;
  }
  .formation-hero-container {
    flex-direction: column !important;
    margin-top: 8rem !important;
  }
}
```

Cette approche permet une **migration en douceur** tout en conservant la précision des styles CSS pour les cas complexes.

## 🚀 Performance

- **Static Generation** : Pages pré-générées
- **Image Optimization** : Formats WebP automatiques
- **Code Splitting** : Chargement optimisé
- **Lazy Loading** : Images chargées à la demande

## 🔒 Sécurité

- Headers de sécurité configurés
- Validation des formulaires
- Sanitization des données
- HTTPS obligatoire

## 📊 Analyse

Le projet utilise les Web Vitals de Next.js pour surveiller les performances et l'expérience utilisateur.# Force Vercel redeploy - Thu Jul 24 20:16:45 CEST 2025
