import { Metadata } from 'next'
import { CartTable } from '@/components/CartTable'

export const metadata: Metadata = {
  title: 'Ma Commande - Mika Saveur Authentique',
  description: 'Validez votre panier et envoyez votre commande via WhatsApp à Mika Saveurs Authentiques.',
}

export default function CommandePage() {
  return (
    <div className="min-h-screen bg-bg-light pt-24 pb-20">
      <CartTable />
    </div>
  )
}
