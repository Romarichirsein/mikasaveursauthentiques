# Mika Saveur Authentique - Site E-commerce WhatsApp

Ce projet est un catalogue en ligne avec prise de commande directe via WhatsApp, propulsé par Next.js 14, Tailwind CSS, GSAP et Sanity CMS.

## Démarrage rapide

1. **Installer les dépendances**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configuration de Sanity**
   Le CMS Sanity est intégré directement dans le projet.
   - Accédez au studio local via: \`http://localhost:3000/studio\`
   - Vous devrez créer un projet sur [sanity.io](https://www.sanity.io) et récupérer votre `projectId` et `dataset`.
   - Ajoutez ces variables dans un fichier `.env.local` à la racine :
     \`\`\`env
     NEXT_PUBLIC_SANITY_PROJECT_ID="votre_project_id"
     NEXT_PUBLIC_SANITY_DATASET="production"
     \`\`\`

3. **Lancer le serveur de développement**
   \`\`\`bash
   npm run dev
   \`\`\`

## Migration des images vers Sanity

Les images locales existantes dans `/public/produit/` (ou ailleurs) doivent être migrées manuellement vers le Studio Sanity pour bénéficier du redimensionnement automatique (`urlForImage`).

**Procédure :**
1. Ouvrez le Studio Sanity (`/studio`).
2. Pour chaque produit existant, créez un nouveau document "Produit" dans le CMS.
3. Remplissez les informations (Nom, Prix, Catégorie).
4. **Glissez-déposez** l'image correspondante dans le champ "Image" du produit.
5. Sanity s'occupera d'héberger l'image et Next.js la redimensionnera parfaitement sur le site à la taille uniforme (aspect-ratio 1/1).

## Architecture

- **`/app`** : Routes Next.js (Accueil, Catalogue, Commande, Contact)
- **`/components`** : Composants React réutilisables (ProductCard, CartTable, etc.)
- **`/sanity`** : Configuration et schémas du CMS Sanity
- **`/hooks/useCart.ts`** : Gestionnaire d'état du panier (Zustand)
- **`/lib/whatsapp.ts`** : Logique de formatage des messages WhatsApp
- **`/lib/gsap.ts`** : Configuration centrale des animations GSAP

## Technologies
- **Next.js 14** (App Router)
- **Sanity v3** (CMS Headless)
- **Zustand** (State management)
- **GSAP + ScrollTrigger** (Animations au scroll)
- **Tailwind CSS** (Styling)
- **Lucide React** (Icônes)
