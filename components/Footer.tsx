import Link from 'next/link'
import { Facebook, Instagram, Phone, MapPin, Leaf } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-bg-dark text-white pt-16 pb-8 border-t-4 border-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="text-green-500 w-8 h-8" />
              <div className="flex flex-col">
                <span className="font-nunito font-extrabold text-2xl tracking-tight leading-none text-white">Mika</span>
                <span className="text-xs font-semibold text-green-400 tracking-widest uppercase">Saveurs authentiques</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs mt-4">
              Préparation de plats faits maison et de jus naturels. Le goût naturel, la saveur authentique à Yaoundé.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-nunito font-bold text-lg mb-4 text-green-400">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3 hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Boulangerie Essomba<br/>Yaoundé, Cameroun</span>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <span>+237 694 91 69 71</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 mt-4 leading-relaxed">
                <div className="text-xs">
                  <strong className="text-white block mb-1">Horaires :</strong>
                  Lun-Ven : 10h - 17h<br/>
                  Week-end : Sur commande
                </div>
              </li>
            </ul>
          </div>

          {/* Links & Social */}
          <div>
            <h3 className="font-nunito font-bold text-lg mb-4 text-green-400">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalogue" className="text-gray-300 hover:text-white transition-colors inline-block py-1">Notre Menu</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors inline-block py-1">Nous écrire</Link></li>
            </ul>
            
            <div className="mt-8 flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/237694916971" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366] transition-colors shadow-[0_0_15px_rgba(37,211,102,0.3)]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Mika Saveurs Authentiques. Tous droits réservés.</p>
          <p className="mt-2 md:mt-0">Design & Développement avec ❤️</p>
        </div>
      </div>
    </footer>
  )
}
