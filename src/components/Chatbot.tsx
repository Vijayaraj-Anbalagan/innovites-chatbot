'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, Bot } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

const quickQuestions = [
    "Your services?",
    "Contact support?",
    "Your products?",
    "Business hours?",
    "Local support?",
    "Pricing?",
    "Your clients?",
    "Microsoft partner?",
    "Your team?",
];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send API request for welcome message
      const fetchWelcomeMessage = async () => {
        try {
          const response = await fetch('/api/reply', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: '',
              isFirstMessage: true
            }),
          });

          const data = await response.json();
          
          const welcomeMessage: Message = {
            id: Date.now().toString(),
            text: data.message,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        } catch (error) {
          console.error('Error fetching welcome message:', error);
          // Fallback welcome message
          const welcomeMessage: Message = {
            id: Date.now().toString(),
            text: "Hello! I'm Innov AI. How may I help you today?",
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        }
      };

      fetchWelcomeMessage();
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowQuickQuestions(false);
    setIsTyping(true);

    try {
      const response = await fetch('/api/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          isFirstMessage: false
        }),
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I encountered an issue. Please contact our customer care team at info@innovites.com for assistance.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const toggleChatbot = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300); // Match the animation duration
    } else {
      setIsOpen(true);
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg max-w-[80%]">
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Chat Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChatbot}
          className={`
            bg-white shadow-lg hover:shadow-xl 
            rounded-full px-4 py-3 flex items-center space-x-3
            transition-all duration-300 transform hover:scale-105
            border border-gray-200
            ${isOpen ? 'hidden' : 'block'}
          `}
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <Image 
              src="/logoshort.png" 
              alt="InnoVites Logo" 
              width={32} 
              height={32} 
              className="w-8 h-8"
            />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">Hi! I&apos;m Innov AI</p>
            <p className="text-xs text-gray-600">Let me help you. Click here to talk with me</p>
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col transition-all duration-300 ${
          isClosing ? 'animate-slideDown opacity-0 scale-95' : 'animate-slideUp opacity-100 scale-100'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <Image 
                  src="/logoshort.png" 
                  alt="InnoVites Logo" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8"
                />
              </div>
              <div>
                <h3 className="text-white font-semibold">Innov AI</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-gray-300 text-sm">Online</p>
                </div>
              </div>
            </div>
            <button
              onClick={toggleChatbot}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] p-3 rounded-lg
                    ${message.sender === 'user' 
                      ? 'bg-orange-400 text-black rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }
                  `}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-[10px] mt-1 ${message.sender === 'user' ? 'text-orange-800' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions - Moved above input */}
          {showQuickQuestions && messages.length === 1 && (
            <div className="px-4 pb-2 border-t border-gray-100">
              <p className="text-sm text-gray-600 font-medium mb-2 mt-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-1 bg-gray-50 hover:bg-orange-50 rounded-full text-xs transition-colors border border-gray-200 hover:border-orange-200 text-gray-900"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-900 text-sm"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 bg-orange-400 hover:bg-orange-500 disabled:bg-gray-400 text-black rounded-full flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
