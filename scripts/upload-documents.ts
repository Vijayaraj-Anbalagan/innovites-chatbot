import { config } from 'dotenv';
import { join } from 'path';
import WeaviateService from '../src/lib/weaviate';

// Load environment variables from .env.local
config({ path: join(process.cwd(), '.env.local') });

async function uploadDocuments() {
  const weaviateService = new WeaviateService();
  
  console.log('Initializing Weaviate service...');
  const isReady = await weaviateService.isReady();
  
  if (!isReady) {
    console.error('Weaviate service is not ready. Please check your configuration.');
    return;
  }

  console.log('Weaviate service is ready!');

  // Example documents - you can replace these with your actual InnoVites content
  const sampleDocuments = [
    {
      content: `InnoVites is a leading strategic partner for digital transformation in the wire and cable industry. We specialize in providing comprehensive solutions that bridge the wire and cable ecosystem with ERP, MES, and Design and Data Management (DDM) systems.`,
      metadata: {
        title: 'About InnoVites',
        type: 'company_info',
        category: 'general'
      }
    },
    {
      content: `CableERP is InnoVites' comprehensive Enterprise Resource Planning solution specifically designed for the wire and cable industry. It manages everything from resource planning to final delivery with wire & cable specific precision, ensuring smooth and efficient operations.`,
      metadata: {
        title: 'CableERP Overview',
        type: 'product_info',
        category: 'erp'
      }
    },
    {
      content: `cableCORE MES (Manufacturing Execution System) provides real-time shop floor visibility, optimizes production, and scales effortlessly from basic tracking to full IoT integration. It's designed specifically for wire and cable manufacturing processes.`,
      metadata: {
        title: 'cableCORE MES',
        type: 'product_info',
        category: 'mes'
      }
    },
    {
      content: `cableCORE DDM (Design and Data Management) speeds up inquiry-to-quote processes, automates design with AI, and reduces rework for a seamless transition from cable design to engineering. It's ideal for sales and engineering teams.`,
      metadata: {
        title: 'cableCORE DDM',
        type: 'product_info',
        category: 'ddm'
      }
    },
    {
      content: `InnoVites works with Microsoft technologies and is built on the Microsoft Platform. We are proud to be an Independent Software Vendor (ISV) on Microsoft Dynamics 365, but we also believe in open architectures and APIs.`,
      metadata: {
        title: 'Microsoft Partnership',
        type: 'partnership_info',
        category: 'technology'
      }
    }
  ];

  console.log('Starting document upload...');
  
  for (let i = 0; i < sampleDocuments.length; i++) {
    const doc = sampleDocuments[i];
    console.log(`Uploading document ${i + 1}: ${doc.metadata.title}`);
    
    try {
      const success = await weaviateService.addDocument(doc.content, doc.metadata);
      if (success) {
        console.log(`✅ Successfully uploaded: ${doc.metadata.title}`);
      } else {
        console.log(`❌ Failed to upload: ${doc.metadata.title}`);
      }
    } catch (error) {
      console.error(`❌ Error uploading ${doc.metadata.title}:`, error);
    }
  }

  console.log('Document upload completed!');
}

// Run the upload
uploadDocuments().catch(console.error);
