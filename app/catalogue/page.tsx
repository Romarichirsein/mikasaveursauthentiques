import { client } from '@/sanity/lib/client'
import CatalogueClient from './CatalogueClient'

export const revalidate = 60 // ISR revalidation every 60s

const DATA_QUERY = `{
  "categories": *[_type == "category"] | order(order asc) {
    _id,
    name,
    slug
  },
  "products": *[_type == "product"] | order(order asc) {
    _id,
    name,
    price,
    image,
    badge,
    "categoryId": category->_id
  }
}`

export default async function CataloguePage() {
  const { categories, products } = await client.fetch(DATA_QUERY)

  return <CatalogueClient initialCategories={categories} initialProducts={products} />
}
