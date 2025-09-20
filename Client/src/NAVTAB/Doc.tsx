import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const Doc: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 -top-10 -bottom-10 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 rounded-full blur-3xl opacity-30"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>Coming Soon</span>
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight relative group">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent transition-all duration-500 group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-purple-300">
                Documentation
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-32 transition-all duration-500"></div>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-6 max-w-3xl mx-auto">
              Comprehensive guides and API references for our AI models
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
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
                
                {/* Under Construction Message */}
                <div className="text-center mb-12">
                  <div className="inline-flex p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-8">
                    <svg className="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    Documentation Coming Soon
                  </h2>
                  
                  <p className="text-xl text-gray-300 leading-relaxed font-light mb-12 max-w-2xl mx-auto">
                    We're working hard to create comprehensive documentation for all our AI models. 
                    This will include detailed API references, usage examples, and best practices.
                  </p>
                </div>

                {/* What to Expect */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-light text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    What to Expect
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-cyan-500/20 rounded-lg mt-1">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">API References</h4>
                        <p className="text-gray-300 text-sm">Complete documentation with endpoints and examples</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg mt-1">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Code Examples</h4>
                        <p className="text-gray-300 text-sm">Ready-to-use snippets in multiple languages</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg mt-1">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Tutorials</h4>
                        <p className="text-gray-300 text-sm">Step-by-step guides for getting started</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg mt-1">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Best Practices</h4>
                        <p className="text-gray-300 text-sm">Optimization tips and guidelines</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <PremiumButton 
                      primary
                      onClick={() => window.location.href = '/services'}
                    >
                      Explore Models
                    </PremiumButton>
                    <PremiumButton onClick={() => window.location.href = '/contact'}>
                      Get Notified
                    </PremiumButton>
                  </div>
                  
                  <p className="text-sm text-gray-400 mt-6">
                    Want to be notified when documentation is ready? Contact us!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Premium Button Component
interface PremiumButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ children, primary = false, onClick }) => {
  const baseClasses = "relative group font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer border rounded-lg overflow-hidden px-6 py-3 text-base";
  const colorClasses = primary
    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-cyan-500/15"
    : "bg-transparent text-gray-300 border-white/20 hover:bg-white/5 hover:border-white/30 hover:text-white";

  return (
    <button className={cn(baseClasses, colorClasses)} onClick={onClick}>
      <span className="relative z-10">{children}</span>
      {primary && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </button>
  );
};

export default Doc;
