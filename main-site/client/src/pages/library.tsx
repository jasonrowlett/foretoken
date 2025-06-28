import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function Library() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "RWA 101", "Glossary", "Real Estate", "Commodities", "Infrastructure", "Regulation", "Ebooks"];

  const articles = [
    {
      id: 1,
      title: "How to Analyze Tokenized Assets Before You Invest",
      excerpt: "A Foretoken Guide for Traditional Investors in a Digital World. Learn the essential steps to analyzing tokenized assets.",
      category: "RWA 101",
      author: "Jason Rowlett",
      date: "Apr 4",
      featured: true,
      readTime: "3 min read",
      url: "/rwa-101/analyze-tokenized-assets",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 2,
      title: "What is the Blockchain? A Beginner's Guide for Curious Investors",
      excerpt: "Understanding blockchain technology and its real-world applications beyond cryptocurrency.",
      category: "RWA 101",
      author: "Jason Rowlett",
      date: "Mar 31",
      featured: false,
      readTime: "3 min read",
      url: "/rwa-101/what-is-blockchain",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
    },
    {
      id: 3,
      title: "What Is the Double Pedigree Investment Strategy?",
      excerpt: "A new approach to tokenized RWA investing comparing traditional and tokenized assets.",
      category: "RWA 101",
      author: "Jason Rowlett",
      date: "Apr 3",
      featured: false,
      readTime: "4 min read",
      url: "/rwa-101/double-pedigree-strategy",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
    },
    {
      id: 4,
      title: "Smart Contracts: A Traditional Investor's Guide",
      excerpt: "Understanding smart contracts and how they expand investment horizons while reducing friction.",
      category: "RWA 101",
      author: "Jason Rowlett",
      date: "Apr 4",
      featured: false,
      readTime: "3 min read",
      url: "/rwa-101/smart-contracts-guide",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
    },
    {
      id: 5,
      title: "How Blockchain Solves Real Problems in Asset Ownership and Transfer",
      excerpt: "Exploring fractional ownership, 24/7 settlement, and global access through blockchain technology.",
      category: "RWA 101",
      author: "Jason Rowlett",
      date: "Apr 3",
      featured: false,
      readTime: "2 min read",
      url: "/rwa-101/blockchain-solving-problems",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
    },
    {
      id: 6,
      title: "Real-World Assets and Tokenization: A Beginner's Guide",
      excerpt: "Understanding what RWAs are, how tokenization works, and why it's changing investment.",
      category: "RWA 101",
      author: "Jason Rowlett",
      date: "Latest",
      featured: false,
      readTime: "3 min read",
      url: "/rwa-101/rwa-tokenization-guide",
      image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
    },
  ];

  // Gumroad ebooks data - Add your actual Gumroad store products here
  const ebooks = [
    {
      id: 1,
      title: "Real-World Asset Tokenization Guide",
      description: "Complete handbook covering tokenization strategies, regulatory frameworks, and market opportunities.",
      price: "$29.99",
      gumroadUrl: "https://gum.co/your-ebook-1", // Replace with your actual Gumroad link
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
      featured: true
    },
    {
      id: 2,
      title: "Tokenized Real Estate Investment Playbook",
      description: "Strategic insights for investing in tokenized real estate markets with risk management frameworks.",
      price: "$24.99",
      gumroadUrl: "https://gum.co/your-ebook-2", // Replace with your actual Gumroad link
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
      featured: false
    },
    {
      id: 3,
      title: "DeFi and Traditional Finance Convergence",
      description: "Analysis of how decentralized finance is reshaping traditional financial systems and asset management.",
      price: "$19.99",
      gumroadUrl: "https://gum.co/your-ebook-3", // Replace with your actual Gumroad link
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
      featured: false
    }
  ];

  const filteredArticles = activeCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);
  
  const showEbooks = activeCategory === "Ebooks" || activeCategory === "All";
  const featuredEbook = ebooks.find(ebook => ebook.featured);
  const regularEbooks = ebooks.filter(ebook => !ebook.featured);

  return (
    <div className="bg-gray-950 min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="font-notable text-5xl text-white mb-4">RESEARCH LIBRARY</h1>
          <p className="text-xl text-gray-300">Deep analysis, market reports, and educational content</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={`neon-glow font-medium rounded-full ${
                activeCategory === category
                  ? "bg-purple-400 text-black hover:bg-purple-300"
                  : "border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Content Grid */}
        {activeCategory === "Glossary" ? (
          // Glossary Section
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-purple-400" />
              <h2 className="font-notable text-3xl text-white">RWA TOKENIZATION GLOSSARY</h2>
            </div>
            <p className="text-gray-300 text-lg mb-8">Comprehensive definitions of real-world asset tokenization terminology</p>
            
            <Card className="data-card glow-effect max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold text-white mb-4">50+ Essential Terms</h3>
                  <p className="text-gray-300 mb-6">
                    From basic blockchain concepts to advanced tokenization strategies, our glossary covers all the terminology you need to understand the RWA ecosystem.
                  </p>
                  <Link href="/glossary">
                    <Button className="neon-glow bg-purple-400 text-black hover:bg-purple-300 transition-all duration-300 font-medium px-8 py-3">
                      Explore Glossary
                      <BookOpen className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="data-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🔍</div>
                  <h4 className="font-bold text-white mb-2">Search & Filter</h4>
                  <p className="text-gray-400 text-sm">Quickly find definitions with powerful search and category filtering</p>
                </CardContent>
              </Card>
              
              <Card className="data-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">📝</div>
                  <h4 className="font-bold text-white mb-2">Expert Definitions</h4>
                  <p className="text-gray-400 text-sm">Clear, concise explanations written for both beginners and professionals</p>
                </CardContent>
              </Card>
              
              <Card className="data-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🏷️</div>
                  <h4 className="font-bold text-white mb-2">Organized Categories</h4>
                  <p className="text-gray-400 text-sm">Terms grouped by topic: Core, Technology, Finance, Security, and more</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : activeCategory === "Ebooks" ? (
          // Ebook Store Section
          <div className="space-y-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-purple-400" />
                <h2 className="font-notable text-3xl text-white">FORETOKEN EBOOK STORE</h2>
              </div>
              <p className="text-gray-300 text-lg">Professional insights and strategic guides for the tokenization ecosystem</p>
            </div>

            {/* Featured Ebook */}
            {featuredEbook && (
              <Card className="data-card glow-effect overflow-hidden max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-0">
                  <img 
                    src={featuredEbook.image} 
                    alt={featuredEbook.title}
                    className="w-full h-80 md:h-full object-cover"
                  />
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-purple-400 text-black">Featured</Badge>
                      <Badge variant="outline" className="border-purple-400 text-purple-400">Ebook</Badge>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">{featuredEbook.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{featuredEbook.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-400">{featuredEbook.price}</span>
                      <a 
                        href={featuredEbook.gumroadUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button className="neon-glow bg-purple-400 text-black hover:bg-purple-300 transition-all duration-300 font-medium">
                          Buy on Gumroad
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </div>
              </Card>
            )}

            {/* Regular Ebooks Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularEbooks.map((ebook) => (
                <Card key={ebook.id} className="data-card overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <img 
                      src={ebook.image} 
                      alt={ebook.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-purple-400 text-black">Ebook</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-white mb-3">{ebook.title}</h4>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{ebook.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-purple-400">{ebook.price}</span>
                      <a 
                        href={ebook.gumroadUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="neon-glow border-gray-400 text-gray-300 hover:bg-purple-400 hover:text-black hover:border-purple-400 transition-all duration-300"
                        >
                          Buy Now
                          <ExternalLink className="ml-1 w-3 h-3" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Embedded Gumroad Store */}
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <div className="text-center mb-6">
                <h3 className="font-notable text-2xl text-white mb-2">COMPLETE GUMROAD STORE</h3>
                <p className="text-gray-400">Browse our full collection of tokenization resources</p>
              </div>
              <div className="flex justify-center">
                <iframe
                  src="https://gumroad.com/foretoken?embed=true"
                  width="100%"
                  height="600"
                  className="border border-gray-600 rounded-lg"
                  title="Foretoken Gumroad Store"
                />
              </div>
            </div>
          </div>
        ) : (
          // Articles Grid (existing content)
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Article */}
            {featuredArticle && activeCategory !== "Ebooks" && (
              <Link href={featuredArticle.url}>
                <Card className="lg:col-span-2 data-card glow-effect overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-purple-400 text-black">Featured</Badge>
                      <span className="text-gray-400 text-sm">{featuredArticle.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{featuredArticle.title}</h3>
                    <p className="text-gray-300 mb-4">{featuredArticle.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-sm">
                            {featuredArticle.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{featuredArticle.author}</div>
                          <div className="text-gray-400 text-xs flex items-center gap-2">
                            <span>{featuredArticle.date}</span>
                            {featuredArticle.readTime && (
                              <>
                                <span>•</span>
                                <span>{featuredArticle.readTime}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* Article Cards */}
            <div className="space-y-6">
              {filteredArticles.filter(article => !article.featured).map((article) => (
                <Link key={article.id} href={article.url}>
                  <Card className="data-card overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-32 object-cover"
                    />
                    <CardContent className="p-4">
                      <span className="text-purple-400 text-sm font-medium">{article.category}</span>
                      <h4 className="text-white font-bold mb-2">{article.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{article.excerpt}</p>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                        {article.readTime && (
                          <>
                            <span>•</span>
                            <span>{article.readTime}</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeCategory !== "Ebooks" && activeCategory !== "Glossary" && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="neon-glow border-gray-400 text-gray-300 px-8 py-3 font-medium hover:bg-gray-300 hover:text-black transition-all duration-300"
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
