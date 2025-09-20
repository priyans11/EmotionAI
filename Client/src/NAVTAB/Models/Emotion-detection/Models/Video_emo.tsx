import React from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const VideoEmotion: React.FC = () => {
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
              <span>Video-Based Emotion Detection</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight relative group">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Video Emotion Detection
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
              Computer vision-powered emotion recognition analyzing facial expressions, micro-expressions, and body language. 
              Perfect for therapy sessions and social skill training for autism support.
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
              <h2 className="text-2xl font-light mb-6 text-cyan-300">Try Video Emotion Detection</h2>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-full h-64 mx-auto mb-4 bg-gradient-to-br from-gray-900/30 to-gray-800/30 rounded-xl flex items-center justify-center border border-white/10">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-cyan-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-400">Upload video or start camera feed</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02]">
                    Upload Video
                  </button>
                  <button className="px-6 py-3 bg-transparent border border-cyan-400/50 text-cyan-300 font-medium rounded-lg hover:bg-cyan-400/10 transition-all duration-300">
                    Start Camera
                  </button>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h3 className="text-lg font-medium text-gray-300 mb-3">Real-time Emotion Analysis:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Detected Emotions:</h4>
                      <div className="text-gray-500">Upload video to see results...</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Confidence Scores:</h4>
                      <div className="text-gray-500">Analysis pending...</div>
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
            icon="👁️"
            title="Facial Expression Analysis"
            description="Advanced computer vision detecting micro-expressions and emotional states."
          />
          <FeatureCard
            icon="🎯"
            title="96.5% Accuracy"
            description="Industry-leading precision in video-based emotion detection."
          />
          <FeatureCard
            icon="📱"
            title="Real-time Processing"
            description="85ms latency for live video streams and instant emotion feedback."
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

export default VideoEmotion;
