import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import DataVisualization from "./data-visualization";

export default function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-16">
        {/* Financial data background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-6 gap-4 h-full p-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="terminal-border rounded p-4"></div>
            ))}
          </div>
        </div>

        <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-8 md:py-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Hero Content */}
            <div className="flex flex-col items-start text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-300">
                Bringing Transparency to Tokenized Assets
              </h1>

              <p className="text-lg text-gray-400 mt-2 leading-relaxed max-w-xl">
                Your definitive source for real-world asset tokenization news, analysis, and market intelligence. From infrastructure to compliance, we decode the future of digital assets.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <button className="neon-glow bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                  Explore Markets
                </button>
                <Link href="/library">
                  <button className="neon-glow border border-white px-6 py-3 rounded-lg font-semibold text-white hover:bg-white hover:text-black transition-all duration-300">
                    Start Learning
                  </button>
                </Link>
              </div>
            </div>

            {/* Data Cards - Only the three top cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {/* Market Cap */}
              <div className="data-card rounded-lg p-4 lg:p-6 glow-effect">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-gray-300 font-semibold text-sm lg:text-base">Market Cap</h3>
                  <span className="text-green-400 text-xs lg:text-sm flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    +12.3%
                  </span>
                </div>
                <div className="text-xl lg:text-2xl font-bold text-white">$847.2B</div>
                <div className="text-xs lg:text-sm text-gray-400">Tokenized Assets</div>
              </div>

              {/* Real Estate */}
              <div className="data-card rounded-lg p-4 lg:p-6">
                <div className="text-purple-400 text-sm lg:text-base font-medium mb-2">Real Estate</div>
                <div className="text-xl lg:text-2xl font-bold text-white mb-2">$312.4B</div>
                <div className="text-green-400 text-xs lg:text-sm flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  +8.7%
                </div>
              </div>

              {/* Commodities */}
              <div className="data-card rounded-lg p-4 lg:p-6">
                <div className="text-purple-400 text-sm lg:text-base font-medium mb-2">Commodities</div>
                <div className="text-xl lg:text-2xl font-bold text-white mb-2">$189.1B</div>
                <div className="text-red-400 text-xs lg:text-sm flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  -2.1%
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>


    </>
  );
}
