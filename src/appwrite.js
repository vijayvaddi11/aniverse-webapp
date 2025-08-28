import { Client, Databases, ID, Query } from 'appwrite';

const ENDPOINT_ENV = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID_ENV = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID_ENV = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID_ENV = import.meta.env.VITE_APPWRITE_COLLECTIONS_ID;

const client = new Client()
  .setEndpoint(ENDPOINT_ENV)
  .setProject(PROJECT_ID_ENV);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, anime) => {
  try {
    // 1. Check if the searchTerm already exists
    const result = await database.listDocuments(
      DATABASE_ID_ENV,
      COLLECTION_ID_ENV,
      [Query.equal('searchTerm', searchTerm)]
    ); 

    if (result.documents.length > 0) {
      // 2. If exists → increment count
      const doc = result.documents[0];

      await database.updateDocument(
        DATABASE_ID_ENV,
        COLLECTION_ID_ENV,
        doc.$id,
        { count: (doc.count || 0) + 1 }
      );
    } else {
      // 3. If new searchTerm → create new document
      await database.createDocument(
        DATABASE_ID_ENV,
        COLLECTION_ID_ENV,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          anime_id: anime.mal_id, 
          poster_url: anime.images?.jpg?.large_image_url,
        }
      );
    }
  } catch (err) {
    console.error('Appwrite error:', err);
  }
};

export const getTrendingAnimes = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID_ENV, COLLECTION_ID_ENV, [
      Query.limit(7),
      Query.orderDesc('count')
    ])
    return result.documents; 

  } catch (error) {
    console.error(error)
  }
}
