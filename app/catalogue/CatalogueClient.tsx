'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, PackageX } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { CategoryFilter } from '@/components/CategoryFilter'

interface Category {
  _id: string
  name: string
  slug: string
}

interface Product {
  _id: string
  name: string
  price: number
  image: any
  badge?: string
  categoryId: string
}

interface CatalogueClientProps {
  initialCategories: Category[]
  initialProducts: Product[]
}

export default function CatalogueClient({ initialCategories, initialProducts }: CatalogueClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.categoryId === activeCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery, initialProducts])

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de la page */}
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-nunito font-extrabold text-text-dark mb-4"
          >
            Notre <span className="text-green-600">Catalogue</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-muted text-lg max-w-2xl mx-auto"
          >
            Découvrez l'ensemble de nos jus pressés à froid et nos plats faits maison. 
            Le goût naturel, la saveur authentique.
          </motion.p>
        </div>

        {/* Barre de recherche et Filtres */}
        <div className="sticky top-24 z-30 mb-10 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            
            {/* Recherche */}
            <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Filtres de Catégories (Desktop) */}
            <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <CategoryFilter 
                  label="Tout voir" 
                  active={activeCategory === 'all'} 
                  onClick={() => setActiveCategory('all')} 
                />
                {initialCategories.map((category) => (
                  <CategoryFilter 
                    key={category._id}
                    label={category.name} 
                    active={activeCategory === category._id} 
                    onClick={() => setActiveCategory(category._id)} 
                  />
                ))}
              </div>
            </div>

            <div className="md:hidden flex items-center gap-2 w-full overflow-x-auto pb-2 no-scrollbar">
               <CategoryFilter 
                  label="Tout" 
                  active={activeCategory === 'all'} 
                  onClick={() => setActiveCategory('all')} 
                />
                {initialCategories.map((category) => (
                  <CategoryFilter 
                    key={category._id}
                    label={category.name} 
                    active={activeCategory === category._id} 
                    onClick={() => setActiveCategory(category._id)} 
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Grille de Produits */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    key={product._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                  <PackageX className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-2">Aucun produit trouvé</h3>
                <p className="text-text-muted max-w-xs">
                  Nous n'avons pas trouvé de produits correspondant à votre recherche ou à cette catégorie.
                </p>
                <button 
                  onClick={() => {
                    setActiveCategory('all')
                    setSearchQuery('')
                  }}
                  className="mt-6 text-green-600 font-bold hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
