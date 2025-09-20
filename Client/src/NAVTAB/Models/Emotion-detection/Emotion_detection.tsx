import React from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';

// Reusable Featured Model Card Component for Emotion Detection Models
interface EmotionModelCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  metrics: {
    accuracy: string;
    latency: string;
    type: string;
  };
  modelPageUrl: string;
}

const EmotionModelCard: React.FC<EmotionModelCardProps> = ({
  title,
  description,
  imageSrc,
  tags,
  metrics,
  modelPageUrl,
}) => {
  return (
    <div className="group relative">
      <div className="relative rounded-3xl border border-white/10 p-1 transition-all duration-500 hover:border-white/20 group-hover:scale-[1.02]">
        <GlowingEffect
          spread={80}
          glow={true}
          disabled={false}
          proximity={100}
          inactiveZone={0.01}
          borderWidth={2}
        />

        <div className="relative h-full rounded-2xl bg-black backdrop-blur-sm p-12 transition-all duration-500 border border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/30 to-gray-800/30 p-4 transition-all duration-500 group-hover:from-gray-900/40 group-hover:to-gray-800/40">
                <img
                  src={imageSrc}
                  alt={title}
                  className="w-full h-auto rounded-xl shadow-2xl transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
              </div>
              <div className="absolute -top-4 -right-4 space-y-2">
                <MetricBadge label="Accuracy" value={metrics.accuracy} color="cyan" />
                <MetricBadge label="Latency" value={metrics.latency} color="blue" />
                <MetricBadge label="Type" value={metrics.type} color="purple" />
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                  {title}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed font-light">
                  {description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <GlowSpan key={index} className="text-cyan-200 text-sm font-medium">
                    {tag}
                  </GlowSpan>
                ))}
              </div>

              <div className="flex gap-4">
                <PremiumButton primary onClick={() => (window.location.href = modelPageUrl)}>
                  Use Model
                </PremiumButton>
                <PremiumButton>Learn More</PremiumButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Emotion Detection Page Component
const EmotionDetection: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <div className="h-20 w-full"></div>

        <div className="container mx-auto px-6 py-20">
          {/* Header Section */}
          <div className="text-center mb-20 relative">
            <div className="absolute inset-0 -top-10 -bottom-10 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 rounded-full blur-3xl opacity-30"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>Advanced Emotion Detection Suite</span>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight relative group">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent transition-all duration-500 group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-purple-300">
                  Emotion Detection Models
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-32 transition-all duration-500"></div>
              </h1>
              <div className="max-w-3xl mx-auto mb-10">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-6">
                  Comprehensive emotion detection solutions powered by cutting-edge AI technology. 
                  Our suite includes text, audio, video, and multimodal models designed for autism support and emotional intelligence.
                </p>
                <p className="text-base text-gray-400 max-w-2xl mx-auto">
                  Choose from our specialized models tailored to different input types and use cases, 
                  each optimized for accuracy, speed, and real-world applications.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <MetricCard 
                  icon={<AccuracyIcon />}
                  value="95%+" 
                  label="Average Accuracy"
                  color="green"
                />
                <MetricCard 
                  icon={<SpeedIcon />}
                  value="<100ms" 
                  label="Response Time"
                  color="blue"
                />
                <MetricCard 
                  icon={<ModelsIcon />}
                  value="5" 
                  label="Model Types"
                  color="purple"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 hover:-translate-y-1 active:translate-y-0"
                  onClick={() => {
                    window.scrollBy({
                      top: window.innerHeight * 0.79,
                      left: 0,
                      behavior: 'smooth'
                    });
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Explore Models Below</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                </button>
                <button className="group px-8 py-4 bg-transparent border-2 border-white/20 text-gray-300 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-white/5 hover:border-white/40 hover:text-white hover:shadow-lg">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Documentation</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Models Section */}
          <div className="max-w-7xl mx-auto">
            <div className="space-y-16">
              {/* Text-based Emotion Detection */}
              <EmotionModelCard
                title="Text Emotion Analysis"
                description="Advanced natural language processing model that analyzes text content to detect emotional states. Perfect for social media monitoring, chat applications, and written communication analysis. Uses transformer-based architecture with fine-tuning for autism support contexts."
                imageSrc="/emotion-detection.png"
                tags={['NLP', 'Text Analysis', 'Sentiment Analysis', 'Real-time Processing']}
                metrics={{
                  accuracy: '94.2%',
                  latency: '45ms',
                  type: 'Text',
                }}
                modelPageUrl="/services/emotion-detection/text"
              />

              {/* Audio-based Emotion Detection */}
              <EmotionModelCard
                title="Audio Emotion Recognition"
                description="State-of-the-art speech emotion recognition system that analyzes vocal patterns, tone, and acoustic features to identify emotional states. Specialized for individuals with autism to better understand emotional cues in verbal communication and social interactions."
                imageSrc="/emotion-detection.png"
                tags={['Speech Processing', 'Audio Analysis', 'Voice Recognition', 'Autism Support']}
                metrics={{
                  accuracy: '91.8%',
                  latency: '120ms',
                  type: 'Audio',
                }}
                modelPageUrl="/services/emotion-detection/audio"
              />

              {/* Video-based Emotion Detection */}
              <EmotionModelCard
                title="Video Emotion Detection"
                description="Computer vision-powered emotion recognition that analyzes facial expressions, micro-expressions, and body language from video streams. Real-time processing capabilities make it ideal for therapy sessions, social skill training, and interactive applications for autism support."
                imageSrc="/emotion-detection.png"
                tags={['Computer Vision', 'Facial Recognition', 'Real-time Video', 'Behavioral Analysis']}
                metrics={{
                  accuracy: '96.5%',
                  latency: '85ms',
                  type: 'Video',
                }}
                modelPageUrl="/services/emotion-detection/video"
              />

              {/* Multimodal LLM-based Emotion Detection */}
              <EmotionModelCard
                title="Multimodal LLM Emotion AI"
                description="Advanced large language model enhanced with multimodal capabilities for emotion detection. Combines text, audio, and visual inputs to provide comprehensive emotional analysis. Features conversational AI capabilities for interactive emotion coaching and autism support applications."
                imageSrc="/emotion-detection.png"
                tags={['Large Language Model', 'Multimodal AI', 'Conversational AI', 'Comprehensive Analysis']}
                metrics={{
                  accuracy: '97.1%',
                  latency: '200ms',
                  type: 'LLM',
                }}
                modelPageUrl="/services/emotion-detection/multimodal-llm"
              />

              {/* Multimodal Deep Learning */}
              <EmotionModelCard
                title="Multimodal Deep Learning"
                description="Cutting-edge deep learning architecture that fuses multiple input modalities (text, audio, video) for superior emotion detection accuracy. Features ensemble learning and attention mechanisms optimized for complex emotional states and autism spectrum disorder support."
                imageSrc="/emotion-detection.png"
                tags={['Deep Learning', 'Multimodal Fusion', 'Ensemble Learning', 'Attention Mechanism']}
                metrics={{
                  accuracy: '98.3%',
                  latency: '150ms',
                  type: 'DL',
                }}
                modelPageUrl="/services/emotion-detection/multimodal-dl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper Components (same as in ServicesTab.tsx)
interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: 'green' | 'blue' | 'purple';
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, color }) => {
  const colorClasses = {
    green: 'bg-green-500/10 border-green-400/20 text-green-300 hover:bg-green-500/20',
    blue: 'bg-blue-500/10 border-blue-400/20 text-blue-300 hover:bg-blue-500/20',
    purple: 'bg-purple-500/10 border-purple-400/20 text-purple-300 hover:bg-purple-500/20'
  };

  return (
    <div className={cn(
      "group flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer",
      colorClasses[color]
    )}>
      <div className="text-xl">{icon}</div>
      <div>
        <div className="text-lg font-bold">{value}</div>
        <div className="text-xs font-medium opacity-80">{label}</div>
      </div>
    </div>
  );
};

interface PremiumButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  small?: boolean;
  onClick?: () => void;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  children, 
  primary = false, 
  small = false, 
  onClick 
}) => {
  const baseClasses = "relative group font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer border rounded-lg overflow-hidden";
  const sizeClasses = small ? "px-5 py-2 text-sm" : "px-6 py-3 text-base";
  const colorClasses = primary 
    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-cyan-500/15"
    : "bg-transparent text-gray-300 border-white/20 hover:bg-white/5 hover:border-white/30 hover:text-white";

  return (
    <button 
      className={cn(baseClasses, sizeClasses, colorClasses)}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      {primary && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </button>
  );
};

interface MetricBadgeProps {
  label: string;
  value: string;
  color: 'cyan' | 'blue' | 'purple';
}

const MetricBadge: React.FC<MetricBadgeProps> = ({ label, value, color }) => {
  const colorClasses = {
    cyan: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-300',
    blue: 'bg-blue-500/20 border-blue-400/30 text-blue-300',
    purple: 'bg-purple-500/20 border-purple-400/30 text-purple-300'
  };

  return (
    <div className={cn("px-3 py-2 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105", colorClasses[color])}>
      <div className="text-xs font-medium">{label}</div>
      <div className="text-sm font-bold">{value}</div>
    </div>
  );
};

interface GlowSpanProps {
  children: React.ReactNode;
  className?: string;
}

const GlowSpan: React.FC<GlowSpanProps> = ({ children, className }) => {
  return (
    <div className="inline-flex px-3 py-1 bg-white/5 border border-white/10 rounded-full relative group cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:scale-105">
      <span className={cn("relative z-10 transition-all duration-300 group-hover:text-white", className)}>
        {children}
      </span>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

// Icon Components
const AccuracyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SpeedIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ModelsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

export default EmotionDetection;
