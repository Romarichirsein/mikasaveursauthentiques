'use client'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { orderProduct } from '@/lib/whatsapp'
import { urlForImage } from '@/sanity/lib/image'

interface ProductCardProps {
  product: {
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
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const add = useCart(state => state.add)

  const handleAdd = () => {
    add({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image ? urlForImage(product.image)?.url() : undefined
    })
  }

  const imageUrl = product.image ? urlForImage(product.image)?.url() : '/placeholder.jpg'

  return (
    <div className="product-card group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image container - Aspect ratio 1/1 STRICT */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
        <Image
          src={imageUrl || '/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {product.badge && (
          <div className="absolute top-3 left-3 bg-gradient-brand text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
            {product.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="font-nunito font-bold text-lg text-text-dark leading-tight mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="mt-auto mb-4">
          <span className="text-xl font-extrabold text-green-600 block">{product.price.toLocaleString('fr-FR')} FCFA</span>
        </div>

        <div className="grid grid-cols-[1fr,auto] gap-2 mt-auto">
          <button 
            onClick={() => orderProduct({ name: product.name, price: product.price })}
            className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20BA5C] text-white font-bold py-2.5 px-3 rounded-xl text-sm sm:text-base transition-all shadow hover:shadow-md h-11"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            <span className="hidden sm:inline">Commander</span>
            <span className="sm:hidden">Cmdr</span>
          </button>
          
          <button 
            onClick={handleAdd}
            className="flex items-center justify-center bg-orange-100 hover:bg-orange-500 text-orange-500 hover:text-white transition-colors rounded-xl w-11 h-11 border border-orange-200"
            title="Ajouter au panier"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
