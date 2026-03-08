'use client'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { buildOrderMessage, openWhatsApp } from '@/lib/whatsapp'
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CartTable() {
  const { items, updateQty, remove, total, clear } = useCart()
  const [name, setName] = useState('')
  const [quartier, setQuartier] = useState('')
  const [heure, setHeure] = useState('')

  const handleOrder = () => {
    if (!name || !quartier) return alert('Veuillez renseigner votre nom et quartier pour la livraison.')
    const message = buildOrderMessage(items, { name, quartier, heure })
    openWhatsApp(message)
    // Optionnel: clear() après commande
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <p className="text-2xl font-nunito font-bold text-text-dark mb-4">Votre panier est vide</p>
        <p className="text-text-muted mb-8 max-w-md mx-auto">Découvrez nos jus pressés à froid et nos repas authentiques. Il y en a pour tous les goûts !</p>
        <Link href="/catalogue" className="btn-primary inline-flex gap-2 items-center text-lg px-10">
          Voir le menu <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl md:text-5xl font-nunito font-extrabold mb-10 text-center text-text-dark">Ma Commande</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        
        {/* Colonne Liste Produits */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 sm:p-4 overflow-hidden">
            
            {/* Table Header (Desktop) */}
            <div className="hidden sm:grid grid-cols-[3fr,1fr,auto] gap-4 mb-4 pb-2 border-b border-gray-100 text-sm font-semibold text-text-muted px-4">
              <div>Produit</div>
              <div className="text-center">Quantité</div>
              <div className="text-right">Total</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[1fr,auto] sm:grid-cols-[3fr,1fr,auto] gap-4 items-center bg-gray-50/50 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  
                  <div className="font-medium text-text-dark">
                    <span className="block mb-1">{item.name}</span>
                    <span className="text-sm text-green-600">{item.price.toLocaleString('fr-FR')} FCFA</span>
                  </div>

                  <div className="flex items-center justify-center gap-3 bg-white p-1 rounded-full border border-gray-200 shadow-sm sm:w-min justify-self-start sm:justify-self-center">
                    <button 
                      onClick={() => updateQty(item.id, item.quantity - 1)} 
                      className="w-8 h-8 rounded-full hover:bg-orange-100 text-gray-500 hover:text-orange-600 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-bold text-text-dark">{item.quantity}</span>
                    <button 
                      onClick={() => updateQty(item.id, item.quantity + 1)} 
                      className="w-8 h-8 rounded-full hover:bg-green-100 text-gray-500 hover:text-green-600 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right font-bold text-text-dark flex items-center gap-4 justify-self-end">
                    <span className="hidden sm:inline">{(item.price * item.quantity).toLocaleString('fr-FR')} FCFA</span>
                    <button 
                      onClick={() => remove(item.id)} 
                      className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                      title="Retirer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 px-4">
              <div className="flex justify-between items-end pb-4">
                <span className="text-gray-500 font-medium">Total produits</span>
                <span className="text-3xl font-extrabold text-green-dark">{total().toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>

          </div>
          
          <div className="flex justify-between items-center px-4">
            <button onClick={clear} className="text-red-500 hover:text-red-700 font-medium text-sm underline underline-offset-4">
              Vider le panier
            </button>
            <Link href="/catalogue" className="text-green-600 hover:text-green-800 font-medium font-nunito text-lg">
              ↑ Ajouter d'autres produits
            </Link>
          </div>
        </div>

        {/* Colonne Formulaire & CTA */}
        <div className="bg-white rounded-3xl shadow-lg shadow-orange-500/5 p-6 md:p-8 h-fit border border-orange-100 sticky top-28">
          <h2 className="text-2xl font-nunito font-bold text-text-dark mb-6">Informations de Livraison</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Nom complet <span className="text-orange-500">*</span></label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Marie Dupont" className="input-field shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Quartier (Yaoundé) <span className="text-orange-500">*</span></label>
              <input value={quartier} onChange={e => setQuartier(e.target.value)} placeholder="Ex: Bastos, Biyem-Assi" className="input-field shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Heure souhaitée <span className="text-gray-400 font-normal">(Optionnel)</span></label>
              <input value={heure} onChange={e => setHeure(e.target.value)} placeholder="Ex: 12h30 ou Dès que possible" className="input-field shadow-sm" />
            </div>
          </div>

          <button onClick={handleOrder} className="wa-btn-full mt-8 text-xl shadow-green-500/20 shadow-xl group">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            Valider sur WhatsApp
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            Le paiement se fera à la livraison ou via Mobile Money lors de la confirmation sur WhatsApp.
          </p>
        </div>

      </div>
    </div>
  )
}
