const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'z36tzt5d',
  dataset: 'production',
  apiVersion: '2024-03-07',
  token: 'sk2luM80kr9QflUFdUk34U1YmMqtorOBXcJ43WGsRIMB3uxcWPGAAwI3n96FmpIJSeqtblu1wNONutu6RjlL8psfTMEPpHn4xDoPuCJnI7SAWFhGqU9uVvK898FC2viO1ck0q6IzLWqMYFHEtGyaiua3JFPiT1axfPCUklmOBmutiWPjz9Qu',
  useCdn: false,
});

async function cleanup() {
  try {
    const products = await client.fetch('*[_type == "product"]');
    console.log(`Total produits avant nettoyage : ${products.length}`);

    const seenNames = new Set();
    const toDelete = [];

    for (const p of products) {
      if (seenNames.has(p.name) || p.name === 'TEST_AGENT') {
        toDelete.push(p._id);
      } else {
        seenNames.add(p.name);
      }
    }

    console.log(`Nombre de doublons à supprimer : ${toDelete.length}`);

    for (const id of toDelete) {
      await client.delete(id);
      console.log(`Supprimé : ${id}`);
    }

    console.log("Nettoyage terminé !");
  } catch (error) {
    console.error("Erreur nettoyage:", error.message);
  }
}

cleanup();
