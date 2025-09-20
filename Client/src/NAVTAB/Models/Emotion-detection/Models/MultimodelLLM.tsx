import React from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const MultimodalLLM: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="h-20 w-full"></div>
      
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 -top-10 -bottom-10 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>Multimodal LLM Emotion AI</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight relative group">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Multimodal LLM Emotion AI
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
              Advanced large language model enhanced with multimodal capabilities for comprehensive emotion detection. 
              Combines text, audio, and visual inputs with conversational AI for autism support applications.
            </p>
          </div>
        </div>

        {/* Model Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl border border-white/10 p-1">
            <GlowingEffect
              spread={80}
              glow={true}
              disabled={false}
              proximity={100}
              inactiveZone={0.01}
              borderWidth={2}
            />
            
            <div className="relative rounded-2xl bg-black backdrop-blur-sm p-8 border border-white/5">
              <h2 className="text-2xl font-light mb-6 text-cyan-300">Interactive Multimodal Emotion Analysis</h2>
              
              <div className="space-y-6">
                {/* Input Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                    <svg className="w-8 h-8 text-cyan-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className="text-sm text-gray-300">Text Input</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                    <svg className="w-8 h-8 text-cyan-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    <p className="text-sm text-gray-300">Audio Input</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                    <svg className="w-8 h-8 text-cyan-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-300">Visual Input</p>
                  </div>
                </div>

                {/* Chat Interface */}
                <div className="space-y-4">
                  <div className="h-64 bg-white/5 rounded-lg border border-white/10 p-4 overflow-y-auto">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                          <span className="text-xs text-cyan-300">AI</span>
                        </div>
                        <div className="flex-1 p-3 bg-cyan-500/10 rounded-lg border border-cyan-400/20">
                          <p className="text-gray-300">Hello! I'm your multimodal emotion AI assistant. I can analyze emotions from text, audio, images, or video. How can I help you today?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      placeholder="Type your message or describe your emotion analysis needs..."
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
                      Send
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h3 className="text-lg font-medium text-gray-300 mb-3">Comprehensive Analysis Results:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Emotional State:</h4>
                      <div className="text-gray-500">Start conversation to see analysis...</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Confidence & Context:</h4>
                      <div className="text-gray-500">Multimodal analysis pending...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon="🧠"
            title="Advanced LLM"
            description="Large language model with specialized emotion understanding and autism support."
          />
          <FeatureCard
            icon="🎯"
            title="97.1% Accuracy"
            description="Highest accuracy through multimodal input fusion and context awareness."
          />
          <FeatureCard
            icon="💬"
            title="Conversational AI"
            description="Interactive emotion coaching with real-time feedback and personalized responses."
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default MultimodalLLM;
