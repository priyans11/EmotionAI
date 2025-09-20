import React from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const TextEmotion: React.FC = () => {
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
              <span>Text-Based Emotion Analysis</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight relative group">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Text Emotion Detection
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
              Advanced natural language processing for analyzing emotional content in text. 
              Perfect for social media monitoring, chat applications, and autism support communication.
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
              <h2 className="text-2xl font-light mb-6 text-cyan-300">Try Text Emotion Analysis</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Enter text to analyze:
                  </label>
                  <textarea
                    className="w-full h-32 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
                    placeholder="Type your text here to analyze its emotional content..."
                  />
                </div>
                
                <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02]">
                  Analyze Emotion
                </button>
                
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h3 className="text-lg font-medium text-gray-300 mb-3">Analysis Results:</h3>
                  <div className="text-gray-400">
                    Enter text above to see emotion analysis results...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon="📝"
            title="Real-time Analysis"
            description="Instant emotion detection from text input with millisecond response times."
          />
          <FeatureCard
            icon="🎯"
            title="High Accuracy"
            description="94.2% accuracy rate trained on diverse datasets including autism support contexts."
          />
          <FeatureCard
            icon="🔄"
            title="Multi-language"
            description="Support for multiple languages with context-aware emotion understanding."
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

export default TextEmotion;
