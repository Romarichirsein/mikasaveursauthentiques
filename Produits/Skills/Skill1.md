---
name: whatsapp-cart
description: Implémenter un panier e-commerce léger avec génération de message WhatsApp formaté (facture multi-produits), bouton commande directe 1 produit, et formulaire contact vers WhatsApp. Utiliser ce skill pour tout site sans paiement en ligne où WhatsApp est le canal de commande.
---

# SKILL : Panier WhatsApp — Commande & Facture

## Principe
Pas de paiement en ligne. Le panier génère un message texte formaté (style facture) et ouvre WhatsApp avec ce message pré-rempli via `wa.me`.

## Hook panier (React / Next.js)

```typescript
// hooks/useCart.ts
'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number   // en FCFA
  quantity: number
  image?: string
}

interface CartStore {
  items: CartItem[]
  add: (item: Omit<CartItem, 'quantity'>) => void
  remove: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => set(state => {
        const existing = state.items.find(i => i.id === item.id)
        if (existing) {
          return { items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) }
        }
        return { items: [...state.items, { ...item, quantity: 1 }] }
      }),
      remove: (id) => set(state => ({ items: state.items.filter(i => i.id !== id) })),
      updateQty: (id, qty) => set(state => ({
        items: qty <= 0
          ? state.items.filter(i => i.id !== id)
          : state.items.map(i => i.id === id ? { ...i, quantity: qty } : i)
      })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'mika-cart' }
  )
)
```

## Générateur de message WhatsApp

```typescript
// lib/whatsapp.ts

const WA_NUMBER = '237694916971' // sans +

export function buildOrderMessage(
  items: { name: string; quantity: number; price: number }[],
  customer: { name: string; quartier: string; heure?: string }
): string {
  const lines = items.map(item => {
    const subtotal = (item.price * item.quantity).toLocaleString('fr-FR')
    const unitPrice = item.price.toLocaleString('fr-FR')
    return `• *${item.name}* × ${item.quantity} — ${unitPrice} FCFA × ${item.quantity} = *${subtotal} FCFA*`
  })

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalFormatted = total.toLocaleString('fr-FR')

  const message = [
    '🍊 *Commande Mika Jus Naturel*',
    '━━━━━━━━━━━━━━━━━━━━',
    ...lines,
    '━━━━━━━━━━━━━━━━━━━━',
    `💰 *TOTAL : ${totalFormatted} FCFA*`,
    '',
    `👤 Nom : ${customer.name}`,
    `📍 Quartier : ${customer.quartier}`,
    customer.heure ? `🕐 Heure souhaitée : ${customer.heure}` : '',
    '',
    '_Merci pour votre commande ! 🌿_',
  ].filter(Boolean).join('\n')

  return message
}

export function buildSingleOrderMessage(
  product: { name: string; price: number },
  customer?: { name?: string; quartier?: string }
): string {
  const price = product.price.toLocaleString('fr-FR')
  const message = [
    '🍊 *Commande Mika Jus Naturel*',
    '',
    `Je souhaite commander :`,
    `• *${product.name}* — ${price} FCFA`,
    '',
    customer?.name ? `👤 Nom : ${customer.name}` : '',
    customer?.quartier ? `📍 Quartier : ${customer.quartier}` : '',
    '',
    '_Merci !_ 🌿',
  ].filter(Boolean).join('\n')

  return message
}

export function buildContactMessage(
  data: { name: string; quartier: string; message: string }
): string {
  return [
    '🌿 *Message via site Mika*',
    '',
    `👤 Nom : ${data.name}`,
    `📍 Quartier : ${data.quartier}`,
    '',
    `💬 ${data.message}`,
  ].join('\n')
}

export function openWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message)
  const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

// Shortcut : commande directe 1 produit (sans formulaire)
export function orderProduct(product: { name: string; price: number }): void {
  openWhatsApp(buildSingleOrderMessage(product))
}
```

## Composant CartTable (page /commande)

```tsx
// components/CartTable.tsx
'use client'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { buildOrderMessage, openWhatsApp } from '@/lib/whatsapp'

export function CartTable() {
  const { items, updateQty, remove, total, clear } = useCart()
  const [name, setName] = useState('')
  const [quartier, setQuartier] = useState('')
  const [heure, setHeure] = useState('')

  const handleOrder = () => {
    if (!name || !quartier) return alert('Veuillez renseigner votre nom et quartier')
    const message = buildOrderMessage(items, { name, quartier, heure })
    openWhatsApp(message)
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted">Votre panier est vide</p>
        <a href="/catalogue" className="btn-primary mt-4 inline-block">Voir le catalogue</a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Ma commande</h1>
      
      {/* Tableau facture */}
      <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-orange-400 via-yellow-400 to-green-500 text-white">
            <tr>
              <th className="text-left p-4">Produit</th>
              <th className="text-center p-4">Qté</th>
              <th className="text-right p-4">Prix</th>
              <th className="text-right p-4">Sous-total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center font-bold">−</button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center font-bold">+</button>
                  </div>
                </td>
                <td className="p-4 text-right text-gray-600">{item.price.toLocaleString('fr-FR')} FCFA</td>
                <td className="p-4 text-right font-semibold">
                  {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                  <button onClick={() => remove(item.id)} className="ml-2 text-red-400 hover:text-red-600 text-sm">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 border-t-2 border-gray-200">
              <td colSpan={3} className="p-4 text-right font-bold text-lg">TOTAL :</td>
              <td className="p-4 text-right font-bold text-xl text-green-600">{total().toLocaleString('fr-FR')} FCFA</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Infos livraison */}
      <div className="mt-8 space-y-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom *" className="input-field" />
        <input value={quartier} onChange={e => setQuartier(e.target.value)} placeholder="Votre quartier (ex: Bastos, Biyem-Assi) *" className="input-field" />
        <input value={heure} onChange={e => setHeure(e.target.value)} placeholder="Heure souhaitée (ex: 12h00)" className="input-field" />
      </div>

      {/* CTA */}
      <button onClick={handleOrder} className="mt-6 w-full bg-[#25D366] hover:bg-[#20BA5C] text-white font-bold py-4 px-8 rounded-2xl text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Commander via WhatsApp
      </button>
    </div>
  )
}
```

## Bouton "Commander" direct (1 produit sur carte)

```tsx
// Sur la ProductCard
import { orderProduct } from '@/lib/whatsapp'

<button
  onClick={() => orderProduct({ name: product.name, price: product.price })}
  className="wa-btn-direct"
>
  <WhatsAppIcon /> Commander
</button>
```

## Formulaire contact → WhatsApp

```tsx
// components/ContactWhatsApp.tsx
'use client'
import { useState } from 'react'
import { buildContactMessage, openWhatsApp } from '@/lib/whatsapp'

export function ContactWhatsApp() {
  const [form, setForm] = useState({ name: '', quartier: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    openWhatsApp(buildContactMessage(form))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input required placeholder="Votre nom" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" />
      <input placeholder="Votre quartier" value={form.quartier} onChange={e => setForm({...form, quartier: e.target.value})} className="input-field" />
      <textarea required rows={4} placeholder="Votre message ou question..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="input-field" />
      <button type="submit" className="wa-btn-full">
        Envoyer via WhatsApp 💬
      </button>
    </form>
  )
}
```

## Installation Zustand (pour persistance panier)
```bash
npm install zustand
```

## Checklist
- [ ] `encodeURIComponent()` sur TOUS les messages WhatsApp
- [ ] Lien `wa.me` avec `noopener,noreferrer`
- [ ] Validation nom + quartier avant envoi
- [ ] Panier persisté (`zustand/persist` avec localStorage)
- [ ] Compteur panier visible dans navbar (badge animé)
- [ ] Tester sur mobile (Android Chrome) — c'est le principal cas d'usage
- [ ] Fallback si cart vide : message + lien catalogue