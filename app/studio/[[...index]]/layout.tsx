import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio',
  description: 'Contenu site Mika Saveur Authentique',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
