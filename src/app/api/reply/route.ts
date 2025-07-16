import { NextRequest, NextResponse } from 'next/server';
import InnovAILangGraph from '@/lib/langgraph';

let langGraphInstance: InnovAILangGraph | null = null;

function getLangGraphInstance() {
  if (!langGraphInstance) {
    langGraphInstance = new InnovAILangGraph();
  }
  return langGraphInstance;
}

export async function POST(request: NextRequest) {
  try {
    const { message, isFirstMessage } = await request.json();

    // If it's the first message, return the welcome message
    if (isFirstMessage) {
      return NextResponse.json({
        message: "Hello! I'm Innov AI. How may I help you today?",
        success: true
      });
    }

    // Validate environment variables
    const requiredEnvVars = [
      'AZURE_OPENAI_ENDPOINT',
      'AZURE_OPENAI_API_KEY',
      'AZURE_OPENAI_DEPLOYMENT_NAME',
      'WEAVIATE_URL',
      'WEAVIATE_API_KEY'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }

    // Process the query through LangGraph
    const langGraph = getLangGraphInstance();
    const response = await langGraph.processQuery(message);

    return NextResponse.json({
      message: response,
      success: true
    });

  } catch (error) {
    console.error('Error in chatbot API:', error);
    return NextResponse.json({
      message: 'I apologize, but I encountered an issue. Please contact our customer care team at info@innovites.com for assistance.',
      success: false
    }, { status: 500 });
  }
}
