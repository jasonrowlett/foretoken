import { Link } from "wouter";
import { TrendingUp, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white">Tokenized Insight.</span>
              <br />
              <span className="text-purple-500">Real-World Impact.</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Used by investors, founders, and researchers seeking clarity on tokenized real-world assets (RWA).
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/rwa101"
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Learn the Basics
              </Link>
              <Link
                href="/subscribe"
                className="border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Subscribe for Updates
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>



      {/* Quick Access Cards */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link href="/rwa101">
              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:transform hover:scale-105 cursor-pointer">
                <div className="text-purple-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">RWA 101</h3>
                <p className="text-gray-300">Learn the fundamentals of tokenized Real World Assets with our comprehensive beginner's guide.</p>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/glossary">
              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:transform hover:scale-105 cursor-pointer">
                <div className="text-purple-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">Glossary</h3>
                <p className="text-gray-300">Master the terminology with our comprehensive glossary of crypto and RWA terms and definitions.</p>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/library">
              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:transform hover:scale-105 cursor-pointer">
                <div className="text-purple-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">Spotlight Articles</h3>
                <p className="text-gray-300">Explore in-depth analysis and research on the latest trends in tokenized asset markets.</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Newsletter Signup Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="bg-gradient-to-r from-purple-900/20 to-purple-600/20 rounded-3xl p-8 md:p-12 border border-purple-500/30">
          <div className="text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Stay Ahead of the Curve
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Get weekly insights on tokenized assets, market analysis, and regulatory updates delivered straight to your inbox. Join thousands of investors and professionals who trust Foretoken for the latest in RWA trends.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <a
                href="https://foretoken.beehiiv.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 w-full sm:w-auto text-center"
              >
                <em>Newsletter</em>: Subscribe
              </a>
              <div className="text-gray-400 text-sm">
                Free • Weekly • Unsubscribe anytime
              </div>
            </motion.div>
            <motion.div 
              className="mt-6 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Join 10,000+ subscribers getting actionable RWA insights
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
