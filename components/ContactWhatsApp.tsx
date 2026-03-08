'use client'
import { useState } from 'react'
import { buildContactMessage, openWhatsApp } from '@/lib/whatsapp'
import { SendIcon } from 'lucide-react'

export function ContactWhatsApp() {
  const [form, setForm] = useState({ name: '', quartier: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    openWhatsApp(buildContactMessage(form))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg w-full bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Votre Nom <span className="text-orange-500">*</span></label>
        <input 
          required 
          placeholder="Ex: Paul" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          className="input-field" 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Votre Quartier</label>
        <input 
          placeholder="Si demande de livraison..." 
          value={form.quartier} 
          onChange={e => setForm({...form, quartier: e.target.value})} 
          className="input-field" 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Message <span className="text-orange-500">*</span></label>
        <textarea 
          required 
          rows={5} 
          placeholder="Posez votre question ou détaillez votre demande de devis événementiel..." 
          value={form.message} 
          onChange={e => setForm({...form, message: e.target.value})} 
          className="input-field resize-none" 
        />
      </div>

      <button type="submit" className="wa-btn-full group mt-6 shadow-green-500/20 shadow-lg">
        Envoyer via WhatsApp
        <SendIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
      
    </form>
  )
}
