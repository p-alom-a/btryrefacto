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
│   └── globals.css        # Styles CSS
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

Le projet utilise les Web Vitals de Next.js pour surveiller les performances et l'expérience utilisateur.