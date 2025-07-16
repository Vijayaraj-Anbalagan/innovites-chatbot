# InnoVites Chatbot with LangGraph & Weaviate RAG System

This project implements a sophisticated chatbot system using LangGraph for decision-making, Azure OpenAI for LLM capabilities, and Weaviate for knowledge storage and retrieval.

## Architecture Overview

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

## Features

### 🧠 **Intelligent Query Classification**
- **General Questions**: Routed to direct LLM calls
- **Company-Specific**: Routed to RAG pipeline with Weaviate knowledge base
- **Automatic Decision Making**: LangGraph determines the best response path

### 🔍 **Advanced RAG Pipeline**
- **Vector Search**: Semantic similarity search in Weaviate
- **Top-K Retrieval**: Gets most relevant documents (default: 3)
- **Context-Aware Responses**: Uses retrieved knowledge for accurate answers

### 🎯 **Smart Response Generation**
- **Knowledge-Based**: For InnoVites, products, and industry questions
- **Fallback Handling**: Graceful error management
- **Professional Persona**: Maintains Innov AI character

## Setup Instructions

### 1. Environment Configuration

Your `.env.local` file should contain:

```bash
# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o

# Weaviate Configuration
WEAVIATE_URL=your-weaviate-url
WEAVIATE_API_KEY=your-weaviate-key
```

### 2. Weaviate Setup

Your Weaviate collection should be configured as:
- **Collection Name**: `Innovites`
- **Vectorizer**: `text2vec-weaviate`
- **Model**: `Snowflake/snowflake-arctic-embed-l-v2.0`
- **Dimensions**: `1024`

### 3. Upload Knowledge Base

```bash
# Install dependencies
npm install

# Run the document upload script
npm run upload-docs
```

### 4. Test the System

```bash
# Start development server
npm run dev

# Test queries:
# - "What is the weather?" (should route to general)
# - "What is CableERP?" (should route to RAG)
# - "Tell me about InnoVites" (should route to RAG)
```

## System Components

### 📊 **LangGraph Workflow**

1. **Classifier Node**: Determines query type using LLM classification
2. **Router**: Directs to appropriate processing path
3. **Retriever Node**: Searches Weaviate for relevant documents
4. **Generator Node**: Creates response using retrieved context
5. **Direct LLM Node**: Handles general queries

### 🗃️ **Weaviate Integration**

- **Semantic Search**: Vector-based similarity matching
- **Metadata Filtering**: Categorized document storage
- **Scalable Storage**: Cloud-based vector database
- **Real-time Retrieval**: Fast query processing

### 🤖 **AI Response Generation**

- **Context-Aware**: Uses retrieved documents for accurate answers
- **Fallback Responses**: Handles missing information gracefully
- **Professional Tone**: Maintains InnoVites branding
- **Error Handling**: Robust error management

## Usage Examples

### General Query Example
```
User: "What is the weather today?"
→ Classifier: "general"
→ Route: Direct LLM
→ Response: General weather information + suggestion to contact for InnoVites questions
```

### Company Query Example
```
User: "What is CableERP?"
→ Classifier: "company"
→ Route: RAG Pipeline
→ Weaviate: Search for CableERP documents
→ Context: Retrieved relevant documents
→ Response: Detailed CableERP information from knowledge base
```

## Customization

### Adding New Documents
1. Use the upload script: `scripts/upload-documents.ts`
2. Add documents with proper metadata
3. Restart the application

### Modifying Classification Logic
- Edit `src/lib/langgraph.ts`
- Update the classification prompt
- Adjust routing logic

### Enhancing RAG Pipeline
- Modify retrieval parameters
- Add document filtering
- Implement re-ranking

## Performance Optimizations

- **Singleton Pattern**: Reuses LangGraph instance
- **Caching**: Potential for response caching
- **Batch Processing**: Efficient document uploads
- **Error Recovery**: Graceful degradation

## Monitoring & Debugging

- **Console Logging**: Detailed execution traces
- **Error Handling**: Comprehensive error catching
- **Performance Metrics**: Response time tracking
- **Query Classification**: Decision path visibility

## Security Considerations

- **Environment Variables**: Secure credential storage
- **API Key Management**: Proper key rotation
- **Input Validation**: Query sanitization
- **Rate Limiting**: Prevent abuse

## Future Enhancements

- **Conversation Memory**: Multi-turn conversations
- **Advanced Filtering**: Metadata-based retrieval
- **Analytics Dashboard**: Usage monitoring
- **A/B Testing**: Response quality optimization

## Troubleshooting

### Common Issues

1. **Weaviate Connection**: Check URL and API key
2. **Azure OpenAI**: Verify endpoint and deployment
3. **Classification Errors**: Review query classification logic
4. **Empty Responses**: Ensure documents are uploaded

### Debug Commands

```bash
# Check Weaviate connectivity
npm run test-weaviate

# Verify environment variables
npm run check-env

# Test classification
npm run test-classification
```

This system provides a robust, scalable solution for intelligent chatbot interactions with both general knowledge and company-specific expertise.
