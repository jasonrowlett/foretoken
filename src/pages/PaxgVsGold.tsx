import { Link } from "wouter";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

const PaxgVsGold = () => {
  return (
    <motion.div 
      className="min-h-screen bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link href="/library" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Library
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            PAXG vs Physical Gold: A Double Pedigree Snapshot
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>January 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>4 min read</span>
            </div>
          </div>
          
          <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-700/50">
            <h2 className="text-xl font-semibold mb-3 text-purple-300">Why This Matters</h2>
            <p className="text-gray-300 leading-relaxed">
              Gold-backed tokens are the most familiar gateway for traditional investors. PAXG is one of the most trusted in the space. But how does it really compare to physical gold?
            </p>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.article 
          className="prose prose-lg prose-invert max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-6 text-white">Traditional Gold Overview</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <ul className="space-y-3 text-gray-300">
                  <li><strong>Asset:</strong> Physical gold (spot price)</li>
                  <li><strong>Use Case:</strong> Store of value, inflation hedge, sovereign reserves</li>
                  <li><strong>Volume:</strong> ~$140B daily global trade volume</li>
                  <li><strong>Market Cap:</strong> Estimated $12 trillion</li>
                  <li><strong>Volatility (30D):</strong> ~1.5%</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-white">PAXG Overview</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <ul className="space-y-3 text-gray-300">
                  <li><strong>Issuer:</strong> Paxos Trust Company (regulated in NY)</li>
                  <li><strong>Peg:</strong> 1 PAXG = 1 fine troy ounce of gold</li>
                  <li><strong>Market Cap:</strong> ~$430M</li>
                  <li><strong>Volume (24h):</strong> ~$10M</li>
                  <li><strong>Volatility (30D):</strong> ~1.8%</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-white">Comparative Snapshot</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-600">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-600 p-4 text-left">Metric</th>
                      <th className="border border-gray-600 p-4 text-left">Physical Gold</th>
                      <th className="border border-gray-600 p-4 text-left">PAXG Token</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr>
                      <td className="border border-gray-600 p-4 font-medium">Market Cap</td>
                      <td className="border border-gray-600 p-4">$12T</td>
                      <td className="border border-gray-600 p-4">$430M</td>
                    </tr>
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 p-4 font-medium">24H Volume</td>
                      <td className="border border-gray-600 p-4">~$140B</td>
                      <td className="border border-gray-600 p-4">~$10M</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-4 font-medium">30D Volatility</td>
                      <td className="border border-gray-600 p-4">~1.5%</td>
                      <td className="border border-gray-600 p-4">~1.8%</td>
                    </tr>
                    <tr className="bg-gray-900/30">
                      <td className="border border-gray-600 p-4 font-medium">Trad Pedigree Score</td>
                      <td className="border border-gray-600 p-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-purple-400">🟣🟣🟣🟣🟣</span>
                        </div>
                      </td>
                      <td className="border border-gray-600 p-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-purple-400">🟣🟣🟣</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-4 font-medium">Token Pedigree Score</td>
                      <td className="border border-gray-600 p-4 text-gray-500">–</td>
                      <td className="border border-gray-600 p-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-purple-400">🟣🟣🟣🟣</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-white">Double Pedigree Insight</h2>
              <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-700/50">
                <p className="text-gray-300 leading-relaxed">
                  Physical gold remains unmatched in legacy trust, but PAXG is proving itself as the most transparent, audited, and legally compliant of the gold token options. For digital-native investors who want on-chain gold exposure, <strong className="text-purple-300">PAXG leads the pack</strong>—especially for short-term liquidity.
                </p>
              </div>
            </section>

            <section className="border-t border-gray-700 pt-8">
              <div className="text-center">
                <p className="text-gray-400 mb-4">
                  📩 <em>Subscribe for more spotlights like this at <Link href="/subscribe" className="text-purple-400 hover:text-purple-300 underline">Foretoken.co/subscribe</Link>.</em>
                </p>
              </div>
            </section>
          </div>
        </motion.article>

        {/* Back to Library CTA */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            href="/library" 
            className="inline-flex items-center bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PaxgVsGold;