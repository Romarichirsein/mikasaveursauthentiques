const { createClient } = require('next-sanity');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: 'z36tzt5d',
  dataset: 'production',
  apiVersion: '2024-03-07',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const productsDir = path.join(__dirname, '../Produits');

async function migrate() {
  try {
    // 1. Créer ou récupérer la catégorie par défaut
    const categoryDoc = {
      _type: 'category',
      _id: 'cat-traditionnel',
      name: 'Spécialités Traditionnelles',
      slug: { _type: 'slug', current: 'specialites-traditionnelles' }
    };
    await client.createOrReplace(categoryDoc);
    console.log("Catégorie prête.");

    const files = fs.readdirSync(productsDir).filter(f => f.match(/\.(jpeg|jpg|png)$/i));
    
    for (const file of files) {
      const { name, price } = parseFileName(file);
      const filePath = path.join(productsDir, file);
      
      console.log(`Migration : ${name}...`);
      
      // Upload image
      const asset = await client.assets.upload('image', fs.createReadStream(filePath));
      
      const productDoc = {
        _type: 'product',
        name: name,
        slug: { _type: 'slug', current: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') },
        price: price,
        image: { _type: 'image', asset: { _ref: asset._id } },
        category: { _type: 'reference', _ref: 'cat-traditionnel' },
        available: true,
        featured: true // On met en avant pour l'accueil
      };
      
      await client.create(productDoc);
      console.log(`✅ ${name} importé.`);
    }
    console.log("Migration terminée avec succès !");
  } catch (error) {
    console.error("Erreur migration:", error.message);
  }
}

function parseFileName(fileName) {
  const baseName = fileName.replace(/\.[^/.]+$/, "");
  const priceMatch = baseName.match(/(\d+)\s*fcfa/i);
  const price = priceMatch ? parseInt(priceMatch[1]) : 0;
  let name = baseName.replace(/(\d+)\s*fcfa.*/i, "").trim();
  return { name, price };
}

migrate();
