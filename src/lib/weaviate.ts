import weaviate, { WeaviateClient } from 'weaviate-client';
import { Document } from '@langchain/core/documents';

interface WeaviateQueryResult {
  uuid: string;
  properties: {
    content?: string;
    text?: string;
    [key: string]: unknown;
  };
  metadata?: {
    score?: number;
    distance?: number;
  };
}

class WeaviateService {
  private client!: WeaviateClient;
  private collectionName = 'Innovites';

  constructor() {
    // We'll use Weaviate's built-in text2vec-openai for embeddings
    // This requires the collection to be configured with the appropriate vectorizer
  }

  async initialize() {
    if (!this.client) {
      const weaviateUrl = process.env.WEAVIATE_URL;
      const weaviateApiKey = process.env.WEAVIATE_API_KEY;
      
      if (!weaviateUrl || !weaviateApiKey) {
        throw new Error('Missing Weaviate configuration. Please set WEAVIATE_URL and WEAVIATE_API_KEY in .env.local');
      }

      // Ensure URL has proper protocol
      const clusterUrl = weaviateUrl.startsWith('http') ? weaviateUrl : `https://${weaviateUrl}`;
      
      this.client = await weaviate.connectToWeaviateCloud(
        clusterUrl,
        {
          authCredentials: new weaviate.ApiKey(weaviateApiKey),
        }
      );
    }
    return this.client;
  }

  async isReady(): Promise<boolean> {
    if (!this.client) {
      await this.initialize();
    }
    return await this.client.isReady();
  }

  async searchDocuments(query: string, limit: number = 3): Promise<Document[]> {
    if (!this.client) {
      await this.initialize();
    }

    try {
      const collection = this.client.collections.get(this.collectionName);
      
      // Use Weaviate's built-in text search with nearText
      const result = await collection.query.nearText(query, {
        limit,
        returnMetadata: ['score', 'distance'],
      });

      // Convert to Document format
      const documents: Document[] = result.objects.map((obj: WeaviateQueryResult) => ({
        pageContent: obj.properties.content || obj.properties.text || '',
        metadata: {
          id: obj.uuid,
          score: obj.metadata?.score || 0,
          distance: obj.metadata?.distance || 0,
          ...obj.properties
        }
      }));

      return documents;
    } catch (error) {
      console.error('Error searching documents:', error);
      return [];
    }
  }

  async addDocument(content: string, metadata: Record<string, unknown> = {}): Promise<boolean> {
    if (!this.client) {
      await this.initialize();
    }

    try {
      const collection = this.client.collections.get(this.collectionName);
      
      // Add to Weaviate - let Weaviate handle the embedding with its built-in vectorizer
      await collection.data.insert({
        content,
        ...metadata,
      });

      return true;
    } catch (error) {
      console.error('Error adding document:', error);
      return false;
    }
  }
}

export default WeaviateService;
