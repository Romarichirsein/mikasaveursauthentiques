'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { CategoryFilter } from '@/components/CategoryFilter'
import { gsap } from '@/lib/gsap'

interface AppCategory {
  _id: string
  name: string
  slug: { current: string }
}

interface AppProduct {
  _id: string
  name: string
  price: number
    image: {
      asset: {
        _ref: string;
        _type: 'reference';
      };
    }

  badge?: string
  categoryId?: string
}

interface CatalogueClientProps {
  initialCategories: AppCategory[]
  initialProducts: AppProduct[]
}

export default function CatalogueClient({ initialCategories, initialProducts }: CatalogueClientProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  
  const filteredProducts = useMemo(() => {
    if (!activeCategoryId) return initialProducts
    return initialProducts.filter(p => p.categoryId === activeCategoryId)
  }, [activeCategoryId, initialProducts])

  // GSAP Animations
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Animation grille de produits
      const cards = gsap.utils.toArray<HTMLElement>('.product-card')
      if (cards.length > 0) {
        gsap.killTweensOf(cards) // Clean up any active tweens on cards
        gsap.fromTo(cards, 
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.2)',
            stagger: 0.08,
            onComplete: () => ScrollTrigger.refresh()
          }
        )
      }
    })

    return () => ctx.revert()
  }, [filteredProducts]) // Re-run when products change (filtering)

  return (
    <div className="min-h-screen bg-bg-light pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-nunito font-extrabold text-text-dark mb-6">Notre Catalogue</h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto text-balance">
            Découvrez l&apos;ensemble de nos jus pressés à froid et nos plats faits maison.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-16 pb-4 overflow-x-auto hide-scrollbar">
          <CategoryFilter 
            active={activeCategoryId === null} 
            label="Tout" 
            onClick={() => setActiveCategoryId(null)} 
          />
          {initialCategories.map(cat => (
            <CategoryFilter 
              key={cat._id}
              active={activeCategoryId === cat._id}
              label={cat.name}
              onClick={() => setActiveCategoryId(cat._id)}
            />
          ))}
        </div>

        {/* Grille Produits */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 mt-8">
            <p className="text-xl text-gray-500 font-medium">Aucun produit dans cette catégorie pour le moment.</p>
            <button 
              onClick={() => setActiveCategoryId(null)}
              className="mt-6 text-green-600 font-bold hover:underline"
            >
              Voir tout le catalogue
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
