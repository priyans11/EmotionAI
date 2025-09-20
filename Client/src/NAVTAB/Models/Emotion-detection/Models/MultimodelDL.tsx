import React from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const MultimodalDL: React.FC = () => {
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
              <span>Multimodal Deep Learning</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight relative group">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Multimodal Deep Learning
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
              Cutting-edge deep learning architecture that fuses multiple input modalities for superior emotion detection. 
              Features ensemble learning and attention mechanisms optimized for autism spectrum disorder support.
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
              <h2 className="text-2xl font-light mb-6 text-cyan-300">Advanced Multimodal Analysis</h2>
              
              <div className="space-y-6">
                {/* Input Modalities */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-400/20 text-center">
                    <svg className="w-8 h-8 text-cyan-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className="text-sm text-cyan-300 font-medium">Text</p>
                    <p className="text-xs text-gray-400">NLP Analysis</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-400/20 text-center">
                    <svg className="w-8 h-8 text-blue-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    <p className="text-sm text-blue-300 font-medium">Audio</p>
                    <p className="text-xs text-gray-400">Speech Processing</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/20 text-center">
                    <svg className="w-8 h-8 text-purple-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-purple-300 font-medium">Video</p>
                    <p className="text-xs text-gray-400">Computer Vision</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-pink-500/10 to-cyan-500/10 rounded-lg border border-pink-400/20 text-center">
                    <svg className="w-8 h-8 text-pink-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p className="text-sm text-pink-300 font-medium">Context</p>
                    <p className="text-xs text-gray-400">Attention Fusion</p>
                  </div>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-cyan-400/50 transition-all duration-300">
                  <div className="space-y-4">
                    <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div>
                      <p className="text-gray-300 mb-2">Upload multiple files for comprehensive analysis</p>
                      <p className="text-sm text-gray-400">Supports text, audio, video, and image files</p>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02]">
                      Select Files
                    </button>
                  </div>
                </div>

                {/* Analysis Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-lg font-medium text-gray-300 mb-3">Ensemble Analysis Results</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Text Modality:</span>
                        <span className="text-cyan-300">Pending</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Audio Modality:</span>
                        <span className="text-blue-300">Pending</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Visual Modality:</span>
                        <span className="text-purple-300">Pending</span>
                      </div>
                      <div className="border-t border-white/10 pt-3 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-300">Fused Result:</span>
                          <span className="text-pink-300">--</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-lg font-medium text-gray-300 mb-3">Attention Weights</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Text Attention</span>
                          <span className="text-cyan-300">--%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Audio Attention</span>
                          <span className="text-blue-300">--%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Visual Attention</span>
                          <span className="text-purple-300">--%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
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
            icon="🔬"
            title="Deep Learning"
            description="Advanced neural architecture with attention mechanisms and ensemble learning."
          />
          <FeatureCard
            icon="🎯"
            title="98.3% Accuracy"
            description="Highest precision through multimodal fusion and sophisticated feature extraction."
          />
          <FeatureCard
            icon="🧩"
            title="Modality Fusion"
            description="Intelligent combination of text, audio, video, and contextual information."
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

export default MultimodalDL;
