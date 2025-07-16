import { Annotation, StateGraph, START, END } from '@langchain/langgraph';
import { BaseMessage, HumanMessage, AIMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { Document as LangChainDocument } from '@langchain/core/documents';
import { z } from 'zod';
import WeaviateService from './weaviate';

// Define the state annotation
const GraphState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
  query: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => '',
  }),
  queryType: Annotation<'general' | 'company' | 'unknown'>({
    reducer: (x, y) => y ?? x,
    default: () => 'unknown',
  }),
  documents: Annotation<LangChainDocument[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  needsRetrieval: Annotation<boolean>({
    reducer: (x, y) => y ?? x,
    default: () => false,
  }),
  finalResponse: Annotation<BaseMessage | null>({
    reducer: (x, y) => y ?? x,
    default: () => null,
  }),
});

type GraphStateType = typeof GraphState.State;

class InnovAILangGraph {
  private weaviateService: WeaviateService;
  private llm: ChatOpenAI;
  private classificationLLM: ChatOpenAI;
  private app: unknown = null; // Will be set in setupWorkflow

  constructor() {
    this.weaviateService = new WeaviateService();
    
    // Validate required environment variables
    const requiredEnvVars = [
      'AZURE_OPENAI_ENDPOINT',
      'AZURE_OPENAI_API_KEY',
      'AZURE_OPENAI_DEPLOYMENT_NAME'
    ];
    
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }

    // Set OPENAI_API_KEY for LangChain compatibility
    if (!process.env.OPENAI_API_KEY) {
      process.env.OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
    }

    // LLM for response generation (no tools)
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.AZURE_OPENAI_API_KEY,
      configuration: {
        baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
        defaultQuery: { 'api-version': '2024-02-01' },
        defaultHeaders: {
          'api-key': process.env.AZURE_OPENAI_API_KEY,
        },
      },
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4',
      temperature: 0.7,
    });

    // LLM for classification (with tools)
    this.classificationLLM = new ChatOpenAI({
      openAIApiKey: process.env.AZURE_OPENAI_API_KEY,
      configuration: {
        baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
        defaultQuery: { 'api-version': '2024-02-01' },
        defaultHeaders: {
          'api-key': process.env.AZURE_OPENAI_API_KEY,
        },
      },
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4',
      temperature: 0.7,
    });
    
    this.setupWorkflow();
  }

  private setupWorkflow() {
    const workflow = new StateGraph(GraphState)
      .addNode('classifier', this.classifyQuery.bind(this))
      .addNode('retriever', this.retrieveDocuments.bind(this))
      .addNode('generator', this.generateResponse.bind(this))
      .addNode('directLLM', this.directLLMCall.bind(this));

    // Set up edges
    workflow.addEdge(START, 'classifier');
    
    workflow.addConditionalEdges(
      'classifier',
      this.routeQuery.bind(this),
      {
        general: 'directLLM',
        company: 'retriever',
        unknown: 'directLLM',
      }
    );

    workflow.addEdge('retriever', 'generator');
    workflow.addEdge('generator', END);
    workflow.addEdge('directLLM', END);

    this.app = workflow.compile();
  }

  private async classifyQuery(state: GraphStateType): Promise<Partial<GraphStateType>> {
    console.log('---CLASSIFYING QUERY---');
    
    const query = state.messages[state.messages.length - 1].content as string;
    
    const classificationTool = {
      name: 'classify_query',
      description: 'Classify the user query type',
      schema: z.object({
        queryType: z.enum(['general', 'company']).describe('Query type - general for general questions, company for InnoVites/wire & cable specific questions'),
        reasoning: z.string().describe('Brief reasoning for the classification'),
      })
    };

    const classificationPrompt = ChatPromptTemplate.fromTemplate(`
You are a query classifier for InnoVites, a wire & cable industry software company.

Classify the following query into one of these categories:
- "general": General questions not specifically about InnoVites, wire & cable industry, or our products
- "company": Questions about InnoVites, our products (CableERP, cableCORE MES, cableCORE DDM, cableCRM), wire & cable industry, digital transformation in this industry, or related technical topics

Query: {query}

Examples:
- "What is the weather today?" → general
- "How do I cook pasta?" → general
- "What is InnoVites?" → company
- "Tell me about CableERP" → company
- "How does wire manufacturing work?" → company
- "What are your products?" → company
- "Wire and cable industry trends" → company
- "Microsoft partnership" → company (if about InnoVites' Microsoft partnership)
`);

    const classificationModel = this.classificationLLM.bindTools([classificationTool], {
      tool_choice: classificationTool.name,
    });

    const classificationChain = classificationPrompt.pipe(classificationModel);
    const result = await classificationChain.invoke({ query });

    const toolCall = (result as AIMessage).tool_calls?.[0];
    const queryType = toolCall?.args?.queryType || 'general';
    
    console.log(`Query classified as: ${queryType}`);

    return {
      query,
      queryType,
      messages: [result],
    };
  }

  private routeQuery(state: GraphStateType): string {
    console.log(`---ROUTING TO: ${state.queryType}---`);
    return state.queryType === 'company' ? 'company' : 'general';
  }

  private async retrieveDocuments(state: GraphStateType): Promise<Partial<GraphStateType>> {
    console.log('---RETRIEVING DOCUMENTS---');
    
    try {
      const documents = await this.weaviateService.searchDocuments(state.query, 3);
      console.log(`Retrieved ${documents.length} documents`);
      
      return {
        documents,
        needsRetrieval: true,
      };
    } catch (error) {
      console.error('Error retrieving documents:', error);
      return {
        documents: [],
        needsRetrieval: false,
      };
    }
  }

  private async generateResponse(state: GraphStateType): Promise<Partial<GraphStateType>> {
    console.log('---GENERATING RAG RESPONSE---');
    
    const query = state.query;
    const documents = state.documents;
    
    // Format documents for context
    const context = documents.map((doc, index) => 
      `Document ${index + 1}:\n${doc.pageContent}\n`
    ).join('\n---\n');

    const ragPrompt = ChatPromptTemplate.fromTemplate(`
You are Innov AI, a knowledgeable assistant for InnoVites, a leading strategic partner for digital transformation in the wire and cable industry.

Use the following context to answer the user's question. If the context doesn't contain enough information to answer the question fully, acknowledge this and suggest contacting our customer care team at info@innovites.com.

Context:
{context}

Question: {question}

Guidelines:
- Answer based primarily on the provided context
- Be helpful and professional
- If information is incomplete, be honest about it
- Suggest contacting customer care for detailed technical questions
- Maintain the Innov AI persona - knowledgeable about wire & cable industry
- Keep responses concise but informative
- Provide a direct answer, not a tool call

Answer:
`);

    const response = await ragPrompt.pipe(this.llm).invoke({
      context: context || 'No relevant documents found in knowledge base.',
      question: query,
    });


    // Store the final response in the finalResponse field
    return {
      finalResponse: response,
    };
  }

  private async directLLMCall(state: GraphStateType): Promise<Partial<GraphStateType>> {
    console.log('---DIRECT LLM CALL---');
    
    const query = state.query;
    
    const systemPrompt = `You are Innov AI, a helpful assistant. You can answer general questions, but when asked about InnoVites, wire & cable industry, or related technical topics, politely redirect users to contact our specialized team at info@innovites.com for detailed information.

Keep responses helpful, concise, and friendly. For general questions, provide helpful answers. For company-specific questions, acknowledge the question and suggest contacting our team.

Provide a direct answer, not a tool call.`;

    const directPrompt = ChatPromptTemplate.fromTemplate(`
{system_prompt}

User Question: {question}

Response:
`);

    const response = await directPrompt.pipe(this.llm).invoke({
      system_prompt: systemPrompt,
      question: query,
    });

    // Store the final response in the finalResponse field
    return {
      finalResponse: response,
    };
  }

  async processQuery(query: string): Promise<string> {
    console.log('---STARTING LANGGRAPH PROCESSING---');
    
    if (!this.app) {
      throw new Error('LangGraph workflow not initialized');
    }
    
    const initialState = {
      messages: [new HumanMessage(query)],
      query,
      queryType: 'unknown' as const,
      documents: [],
      needsRetrieval: false,
      finalResponse: null,
    };

    try {
      // @ts-expect-error - Compiled graph type issue
      const result = await this.app.invoke(initialState);
      
      // Get the final response from the dedicated field
      const finalResponse = result.finalResponse;
      
      if (finalResponse && finalResponse.content) {
        const content = finalResponse.content;
        
        // Handle different content types
        if (typeof content === 'string') {
          return content;
        } else if (content && typeof content === 'object' && 'text' in content) {
          return content.text;
        } else if (content && typeof content === 'object' && 'content' in content) {
          return content.content;
        } else {
          console.warn('Unexpected content format:', content);
          return content?.toString() || 'I apologize, but I encountered an issue processing your request.';
        }
      } else {
        console.warn('No final response found in result');
        return 'I apologize, but I encountered an issue processing your request.';
      }
    } catch (error) {
      console.error('Error in LangGraph processing:', error);
      return 'I apologize, but I encountered an issue. Please contact our customer care team at info@innovites.com for assistance.';
    }
  }
}

export default InnovAILangGraph;
