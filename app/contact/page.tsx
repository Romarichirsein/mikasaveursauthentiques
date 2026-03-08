import { Metadata } from 'next'
import { ContactWhatsApp } from '@/components/ContactWhatsApp'
import { MapPin, Phone, Mail, Clock, Leaf } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact - Mika Saveur Authentique',
  description: 'Contactez-nous pour toute question ou demande de devis événementiel. Réponse rapide via WhatsApp.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-light pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 lg:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-nunito font-extrabold text-text-dark mb-6">Contactez-nous</h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto text-balance">
            Une question sur nos produits ? Une commande spéciale à prévoir ? Écrivez-nous directement sur WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Informations de contact */}
          <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-sm border border-orange-100 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-50 rounded-full opacity-50 pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-green-50 rounded-full opacity-50 pointer-events-none" />
            
            <h2 className="text-3xl font-nunito font-bold text-text-dark mb-10 relative z-10">Nos coordonnées</h2>
            
            <div className="space-y-8 relative z-10">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-dark text-lg mb-1">Téléphone & WhatsApp</h3>
                  <a href="https://wa.me/237694916971" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 text-lg transition-colors">
                    +237 694 91 69 71
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-dark text-lg mb-1">Notre Atelier</h3>
                  <p className="text-gray-600 text-lg">Boulangerie Essomba<br />Yaoundé, Cameroun</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-dark text-lg mb-1">Horaires d&apos;ouverture</h3>
                  <p className="text-gray-600 text-lg">
                    <span className="font-medium text-text-dark">Lundi - Vendredi :</span> 10h00 - 17h00<br />
                    <span className="font-medium text-text-dark">Week-end :</span> Sur commandes familiales
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-400 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-dark text-lg mb-1">Email</h3>
                  <a href="mailto:michaelleatanga@yahoo.fr" className="text-gray-600 hover:text-orange-500 text-lg transition-colors">
                    michaelleatanga@yahoo.fr
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 relative z-10 flex items-center gap-4">
              <Leaf className="text-green-500 w-10 h-10 shrink-0" />
              <p className="font-nunito text-lg text-text-dark font-medium leading-tight">
                Le goût naturel,<br />
                <span className="text-green-600">la saveur authentique.</span>
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-nunito font-bold text-text-dark mb-8">Envoyez-nous un message</h2>
            <ContactWhatsApp />
          </div>

        </div>
      </div>
    </div>
  )
}
