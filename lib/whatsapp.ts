const WA_NUMBER = '237694916971' // Sans +

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
