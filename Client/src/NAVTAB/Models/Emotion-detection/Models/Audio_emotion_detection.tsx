import React from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const AudioEmotionDetection: React.FC = () => {
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
              <span>Audio-Based Emotion Recognition</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight relative group">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Audio Emotion Recognition
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
              State-of-the-art speech emotion recognition analyzing vocal patterns, tone, and acoustic features. 
              Specialized for autism support to better understand emotional cues in verbal communication.
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
              <h2 className="text-2xl font-light mb-6 text-cyan-300">Try Audio Emotion Recognition</h2>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-400/30">
                    <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 mb-4">Upload an audio file or record live</p>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02]">
                    Upload Audio
                  </button>
                  <button className="px-6 py-3 bg-transparent border border-cyan-400/50 text-cyan-300 font-medium rounded-lg hover:bg-cyan-400/10 transition-all duration-300">
                    Record Live
                  </button>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h3 className="text-lg font-medium text-gray-300 mb-3">Emotion Analysis Results:</h3>
                  <div className="text-gray-400">
                    Upload or record audio to see emotion analysis results...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon="🎤"
            title="Voice Pattern Analysis"
            description="Advanced analysis of vocal patterns, pitch, and tone variations."
          />
          <FeatureCard
            icon="🎯"
            title="91.8% Accuracy"
            description="High precision emotion detection optimized for autism support contexts."
          />
          <FeatureCard
            icon="⚡"
            title="Real-time Processing"
            description="120ms latency for live audio processing and instant feedback."
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

export default AudioEmotionDetection;
