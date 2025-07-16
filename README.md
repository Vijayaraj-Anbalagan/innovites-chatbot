# InnoVites AI Chatbot

A sophisticated Next.js chatbot powered by LangGraph, Azure OpenAI, and Weaviate for intelligent query routing and RAG (Retrieval-Augmented Generation) capabilities.

## 🚀 Overview

This chatbot intelligently routes queries between general conversations and company-specific information retrieval using LangGraph workflows. It features:

- **Intelligent Query Classification**: Automatically categorizes queries as general or company-specific
- **RAG Implementation**: Retrieves relevant documents from Weaviate for company-specific queries
- **Modern UI**: Clean, responsive chat interface with quick question suggestions
- **Azure OpenAI Integration**: Leverages Azure OpenAI for advanced language capabilities
- **Document Management**: Easy document upload and management system

## 🏗️ Architecture

```
User Query → LangGraph Classifier → Decision Router
                                   ↓
                        General Query ← → Company Query
                             ↓              ↓
                      Direct LLM Call → RAG Pipeline
                             ↓              ↓
                        Response      Vector Search (Weaviate)
                                           ↓
                                    Context + LLM → Response
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.1 with React 19
- **Language**: TypeScript
- **AI/ML**: 
  - LangGraph for workflow orchestration
  - Azure OpenAI for language models
  - Weaviate for vector database and semantic search
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Azure OpenAI account and API key
- Weaviate cloud instance or local setup
- TypeScript knowledge

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Vijayaraj-Anbalagan/innovites-chatbot.git
cd innovites-chatbot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:

```env
# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-api-key-here
AZURE_OPENAI_DEPLOYMENT_NAME=your-deployment-name

# Weaviate Configuration
WEAVIATE_URL=https://your-cluster.weaviate.network
WEAVIATE_API_KEY=your-weaviate-api-key

# Optional: For LangChain compatibility
OPENAI_API_KEY=your-azure-openai-api-key
```

4. **Upload sample documents**
```bash
npm run upload-docs
```

5. **Run the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the chatbot in action.

## 🤖 How It Works

### Query Classification Logic

The chatbot uses a sophisticated classification system to determine query types:

```typescript
// Example classifications:
"What is the weather today?" → general
"How do I cook pasta?" → general
"What is InnoVites?" → company
"Tell me about CableERP" → company
"Wire and cable industry trends" → company
```

### LangGraph Workflow

The system implements a state machine with the following nodes:

1. **Classifier Node**: Categorizes incoming queries
2. **Router Node**: Routes to appropriate processing path
3. **Retriever Node**: Fetches relevant documents from Weaviate
4. **Generator Node**: Creates responses using RAG
5. **Direct LLM Node**: Handles general queries without retrieval

### Example Workflow

```typescript
// Company-specific query example
User: "What is CableERP?"
↓
Classifier: "company" (retrieves InnoVites documents)
↓
RAG Response: "CableERP is InnoVites' comprehensive Enterprise Resource Planning solution specifically designed for the wire and cable industry..."

// General query example
User: "What's the weather like?"
↓
Classifier: "general" (direct LLM call)
↓
Direct Response: "I'm a chatbot focused on InnoVites services. For weather information, I'd recommend checking a weather service..."
```

## 📄 Document Upload System

### Using the Upload Script

The project includes a document upload system to populate your knowledge base:

```bash
npm run upload-docs
```

### Adding Custom Documents

Edit `scripts/upload-documents.ts` to add your own documents:

```typescript
const sampleDocuments = [
  {
    content: `Your document content here...`,
    metadata: {
      title: 'Document Title',
      type: 'product_info',
      category: 'erp'
    }
  },
  // Add more documents...
];
```

### Document Structure

Each document should have:
- **content**: The actual text content
- **metadata**: Additional information for better retrieval
  - `title`: Document title
  - `type`: Document type (product_info, company_info, etc.)
  - `category`: Category for organization

## 🔍 Usage Examples

### Basic Chat Interaction

```typescript
// User sends a message
const response = await fetch('/api/reply', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: "What is InnoVites?" })
});

const data = await response.json();
console.log(data.message); // AI response
```

### Quick Questions

The chatbot provides quick question suggestions:

- "Your services?"
- "Contact support?"
- "Your products?"
- "Business hours?"
- "Microsoft partner?"

### Sample Conversations

**Company Query:**
```
User: "Tell me about your products"
Bot: "InnoVites offers comprehensive solutions for the wire and cable industry including CableERP for enterprise resource planning, cableCORE MES for manufacturing execution, and cableCORE DDM for design and data management..."
```

**General Query:**
```
User: "How do I reset my password?"
Bot: "For password reset and technical support, please contact our customer care team at info@innovites.com for assistance."
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `AZURE_OPENAI_ENDPOINT` | Azure OpenAI service endpoint | Yes |
| `AZURE_OPENAI_API_KEY` | Azure OpenAI API key | Yes |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | Deployment name for your model | Yes |
| `WEAVIATE_URL` | Weaviate cluster URL | Yes |
| `WEAVIATE_API_KEY` | Weaviate API key | Yes |

### Weaviate Setup

1. Create a Weaviate cloud instance
2. Configure the collection name (default: "Innovites")
3. Set up text2vec-openai vectorizer for embeddings
4. Update the collection name in `weaviate.ts` if needed

### Azure OpenAI Setup

1. Create an Azure OpenAI resource
2. Deploy a GPT-4 model
3. Get the endpoint and API key
4. Update the deployment name in your environment variables

## 🎨 Customization

### Modifying the UI

Edit `src/components/Chatbot.tsx` to customize:
- Colors and styling
- Quick question suggestions
- Chat behavior
- Animation effects

### Adding New Query Types

Extend the classification system in `src/lib/langgraph.ts`:

```typescript
const queryTypes = z.enum(['general', 'company', 'technical', 'support']);
```

### Custom Prompts

Modify prompts in the LangGraph nodes:
- Classification prompts
- RAG system prompts
- Direct LLM prompts

## 📊 Monitoring and Debugging

### Logging

The system includes comprehensive logging:

```typescript
console.log('---CLASSIFYING QUERY---');
console.log(`Query classified as: ${queryType}`);
console.log('---RETRIEVING DOCUMENTS---');
console.log(`Retrieved ${documents.length} documents`);
```

### Error Handling

Robust error handling with fallback responses:

```typescript
try {
  // Process query
} catch (error) {
  return 'I apologize, but I encountered an issue. Please contact our customer care team at info@innovites.com for assistance.';
}
```

## 📚 API Reference

### POST /api/reply

Process a chat message and return AI response.

**Request:**
```json
{
  "message": "What is InnoVites?",
  "isFirstMessage": false
}
```

**Response:**
```json
{
  "message": "InnoVites is a leading strategic partner for digital transformation in the wire and cable industry...",
  "success": true
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 🔒 Security Considerations

- Store API keys in environment variables
- Implement rate limiting for production
- Add authentication for sensitive endpoints
- Sanitize user inputs
- Use HTTPS in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is private and proprietary to InnoVites.

## 📞 Support

For technical support or questions:
- Email: info@innovites.com
- Documentation: Check the `LANGGRAPH_SETUP.md` file for detailed setup instructions

## 🔄 Recent Updates

- Implemented LangGraph workflow system
- Added Weaviate integration for RAG
- Enhanced query classification
- Improved error handling
- Added document upload system

---

**Built with ❤️ by InnoVites - Your strategic partner for digital transformation in the wire and cable industry.**
