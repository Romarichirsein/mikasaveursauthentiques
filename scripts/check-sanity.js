const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'z36tzt5d',
  dataset: 'production',
  apiVersion: '2024-03-07',
  useCdn: false,
});

async function check() {
  try {
    const products = await client.fetch('*[_type == "product"]');
    console.log('--- PRODUITS TROUVÉS ---');
    console.log(`Nombre total : ${products.length}`);
    if (products.length > 0) {
      products.forEach(p => console.log(`- ${p.name} (${p.price} FCFA)`));
    }
    
    const categories = await client.fetch('*[_type == "category"]');
    console.log('\n--- CATÉGORIES TROUVÉES ---');
    console.log(`Nombre total : ${categories.length}`);
  } catch (error) {
    console.error('ERREUR:', error.message);
  }
}

check();
