import { Link } from "wouter";
import { BookOpen, Search, Lightbulb, ArrowRight, GraduationCap, FileText } from "lucide-react";

const Library = () => {
  const spotlightArticles = [
    {
      id: 1,
      title: "PAXG vs Physical Gold: A Double Pedigree Snapshot",
      summary: "Gold-backed tokens are the most familiar gateway for traditional investors. PAXG is one of the most trusted in the space. But how does it really compare to physical gold?",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      alt: "Gold bars and precious metals",
      link: "/library/paxg-vs-gold"
    },
    {
      id: 2,
      title: "Real Estate Tokenization: Market Overview 2024",
      summary: "An comprehensive analysis of the current real estate tokenization market, including key players, regulatory developments, and investment opportunities.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      alt: "Modern city skyline financial district",
      link: "#"
    },
    {
      id: 3,
      title: "The Rise of Tokenized Art Markets",
      summary: "Exploring how blockchain technology is revolutionizing art investment through fractional ownership and increased market accessibility.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      alt: "Modern art gallery with abstract paintings",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Library</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Our comprehensive educational library is designed to bridge the knowledge gap between traditional and tokenized finance. Whether you're new to RWAs or an experienced investor, we provide the resources you need to make informed decisions in the evolving world of digital assets.
            </p>
            <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/20 rounded-2xl p-6 border border-purple-500/30">
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Our Mission:</strong> Helping investors bridge the gap between traditional and tokenized finance through clear, accessible education and analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* RWA 101 Card */}
          <Link href="/rwa101">
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:transform hover:scale-105 cursor-pointer">
              <div className="text-purple-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">RWA 101</h3>
              <p className="text-gray-300 mb-4">
                Start your journey with our comprehensive guide to Real World Assets. Learn the fundamentals of tokenization, benefits, risks, and how RWAs are reshaping finance.
              </p>
              <div className="text-purple-500 font-semibold flex items-center">
                Start Learning <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* Glossary Card */}
          <Link href="/glossary">
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:transform hover:scale-105 cursor-pointer">
              <div className="text-purple-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">Glossary</h3>
              <p className="text-gray-300 mb-4">
                Master the terminology with our comprehensive glossary of crypto and RWA terms. From basic blockchain concepts to advanced tokenization strategies.
              </p>
              <div className="text-purple-500 font-semibold flex items-center">
                Browse Terms <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* Spotlight Articles Card */}
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700">
            <div className="text-purple-500 mb-4">
              <Lightbulb className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Spotlight Articles</h3>
            <p className="text-gray-300 mb-4">
              In-depth analysis and research on the latest trends, market developments, and investment opportunities in tokenized assets.
            </p>
            <div className="text-purple-500 font-semibold flex items-center">
              Featured Below <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>

        {/* Spotlight Articles Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <Lightbulb className="w-8 h-8 text-purple-500 mr-3" />
            <h2 className="text-3xl font-bold">Spotlight Articles</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spotlightArticles.map((article) => (
              <Link href={article.link} key={article.id}>
                <article className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:transform hover:scale-105 cursor-pointer">
                  <img 
                    src={article.image} 
                    alt={article.alt}
                    className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300" 
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="text-purple-500 hover:text-purple-400 font-semibold transition-colors flex items-center">
                      {article.link === "#" ? "Coming Soon" : "Read Article"} <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/20 rounded-2xl p-8 border border-purple-500/30">
          <div className="text-center">
            <FileText className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Want More Resources?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive research, market analysis, and educational content delivered directly to your inbox.
            </p>
            <Link
              href="/subscribe"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;