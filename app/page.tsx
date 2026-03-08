import { HeroSection } from '@/components/HeroSection'
import { ProductCard } from '@/components/ProductCard'
import { ContactWhatsApp } from '@/components/ContactWhatsApp'
import { Leaf, Award, Clock, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'

// GROQ queries
const FEATURES_QUERY = `*[_type == "product" && featured == true][0...3] | order(order asc) {
  _id,
  name,
  price,
  image,
  badge
}`

export const revalidate = 60 // ISR revalidation every 60s

interface Product {
  _id: string;
  name: string;
  price: number;
  image: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  badge?: string;
}

export default async function Home() {
  const featuredProducts: Product[] = await client.fetch(FEATURES_QUERY)

  return (
    <div>
      <HeroSection />

      {/* Nos Spécialités */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-nunito font-extrabold text-text-dark mb-4">Nos Spécialités</h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">
              Découvrez nos produits les plus appréciés. Toujours frais, toujours naturels.
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="text-gray-500">Boutique en cours de mise à jour. Revenez bientôt !</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/catalogue" className="inline-flex items-center text-green-600 font-bold hover:text-green-700 text-lg group">
              Voir tout le catalogue 
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bande CTA Parallax - Pourquoi Mika */}
      <section className="py-24 bg-bg-dark relative overflow-hidden text-center text-white border-y-8 border-green-500">
        <div className="absolute inset-0 bg-gradient-brand opacity-10" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-nunito font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-brand">
            Commandez maintenant sur WhatsApp
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 text-balance">
            Rapide, simple et direct. Discutez avec nous pour passer votre commande ou personnaliser votre demande événementielle.
          </p>
          <a 
            href="https://wa.me/237694916971" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5C] text-white font-bold py-4 px-10 rounded-full text-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 shadow-[#25D366]/20"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            Discussion directe
          </a>
        </div>
      </section>

      {/* Piliers */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            
            <div className="p-8 rounded-3xl hover:bg-orange-50 transition-colors duration-300">
              <div className="mx-auto w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-nunito font-bold text-text-dark mb-3">100% Naturel</h3>
              <p className="text-text-muted">Des ingrédients soigneusement sélectionnés, sans additifs chimiques pour le vrai goût de la nature.</p>
            </div>

            <div className="p-8 rounded-3xl hover:bg-green-50 transition-colors duration-300">
              <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-nunito font-bold text-text-dark mb-3">Livraison Yaoundé</h3>
              <p className="text-text-muted">Nous livrons dans tous les quartiers de Yaoundé directement à votre porte ou au bureau.</p>
            </div>

            <div className="p-8 rounded-3xl hover:bg-yellow-50 transition-colors duration-300">
              <div className="mx-auto w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-nunito font-bold text-text-dark mb-3">Commande Rapide</h3>
              <p className="text-text-muted">Quelques clics suffisent pour générer votre commande et l&apos;envoyer via WhatsApp instantanément.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Section Contact Rapide */}
      <section className="py-20 md:py-32 bg-orange-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-nunito font-extrabold text-text-dark mb-6">
                Une question ?<br />
                <span className="text-orange-500">Un événement ?</span>
              </h2>
              <p className="text-lg text-text-muted mb-8 text-balance">
                Pour une commande familiale, un mariage ou toute autre cérémonie, n&apos;hésitez pas à nous écrire. Nous vous proposerons un devis personnalisé.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-text-dark">Service sur-mesure</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-text-dark">Présentation soignée</span>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <ContactWhatsApp />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
