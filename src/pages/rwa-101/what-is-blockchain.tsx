import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Link } from "wouter";

export default function WhatIsBlockchain() {
  return (
    <div className="bg-gray-950 min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/library">
            <Button 
              variant="outline" 
              className="neon-glow border-gray-400 text-gray-300 hover:bg-purple-400 hover:text-black hover:border-purple-400 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-purple-400 text-black">RWA 101</Badge>
            <Badge variant="outline" className="border-purple-400 text-purple-400">Beginner's Guide</Badge>
          </div>
          
          <h1 className="font-notable text-4xl md:text-5xl text-white mb-6">
            What is the Blockchain? A Beginner's Guide for Curious Investors
          </h1>

          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Jason Rowlett</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>3 min read</span>
            </div>
            <span>Mar 31</span>
          </div>
        </div>

        {/* Article Content */}
        <Card className="data-card">
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-invert max-w-none">
              <div className="mb-8">
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you've been hearing the buzz around blockchain, cryptocurrencies, and tokenized assets, but still feel unsure what it all means—you're not alone. While the headlines might suggest it's all about Bitcoin and crypto hype, the truth is that blockchain technology has real-world applications that could reshape traditional finance, especially through tokenization.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  In this guide, we'll break down what blockchain is, how it works, and why it's gaining attention from investors like you who understand the basics of finance but want to explore this new frontier with clarity—not confusion.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">What Is the Blockchain?</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  At its simplest, blockchain is a digital ledger—a way of recording information so that it's secure, transparent, and decentralized.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Think of it like a shared spreadsheet that isn't stored on any one computer. Instead, it's distributed across thousands of computers (called nodes) around the world. Every time a new transaction or record is added, all copies of the spreadsheet update together.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Each "block" contains a list of transactions. Once a block is full, it gets added to the "chain" in a linear, chronological order. Hence, blockchain.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Key Features of Blockchain</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Immutable</h3>
                      <p className="text-gray-300 leading-relaxed">Once data is added to the blockchain, it can't be changed without the consensus of the network. This means records are tamper-proof.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌐</span>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Decentralized</h3>
                      <p className="text-gray-300 leading-relaxed">No single institution or person controls the blockchain. It's run by a network of independent participants, making it more secure than centralized databases.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Transparent</h3>
                      <p className="text-gray-300 leading-relaxed">Anyone can view the public ledger and verify transactions. This openness builds trust.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Efficient</h3>
                      <p className="text-gray-300 leading-relaxed">Blockchain can automate and streamline processes that typically require middlemen, paperwork, and time—like settlements in real estate or finance.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Blockchain vs. Cryptocurrency</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Let's clear something up: Blockchain is the technology. Cryptocurrency is just one use case.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Bitcoin and Ethereum are powered by blockchain, but so are many other systems that have nothing to do with currency speculation.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Just as the internet enables everything from email to Netflix, blockchain enables everything from cryptocurrencies to tokenized real-world assets.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">What is Tokenization?</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Now that you understand the foundation, here's where it gets interesting for investors: Tokenization is the process of representing ownership of a real-world asset (like gold, real estate, or U.S. Treasury bonds) as a digital token on a blockchain.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  These tokenized assets can be bought, sold, and traded more efficiently—often with fewer fees, greater transparency, and faster settlement times.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Examples of Tokenized Assets:</h2>
                <ul className="text-gray-300 leading-relaxed space-y-2 list-disc pl-6">
                  <li><strong>Gold</strong> → Digital gold tokens (e.g. XAUT, PAXG)</li>
                  <li><strong>Real Estate</strong> → Shares of a property represented on blockchain</li>
                  <li><strong>Treasuries</strong> → Tokenized government bonds like ONDO or USYC</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Why Should Traditional Investors Care?</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you're already familiar with stocks, ETFs, or REITs, the concept of fractional ownership isn't new. Tokenization takes that idea further—allowing you to own smaller pieces of traditionally illiquid assets and trade them 24/7.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">Here's why it matters:</p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Increased Liquidity</h3>
                      <p className="text-gray-300 leading-relaxed">Assets that were once hard to trade (like commercial property or fine art) can now be divided into digital tokens and exchanged more easily.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Greater Access</h3>
                      <p className="text-gray-300 leading-relaxed">Tokenization can democratize investment opportunities, making high-value assets available to a broader group of investors.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🧮</span>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Better Transparency and Auditability</h3>
                      <p className="text-gray-300 leading-relaxed">Blockchain-based systems let you see where your money is going and track the history of an asset—instantly.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">What's the Catch?</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Like any emerging technology, blockchain and tokenization come with risks:
                </p>
                <ul className="text-gray-300 leading-relaxed space-y-2 list-disc pl-6 mb-4">
                  <li>Regulatory uncertainty (governments are still catching up)</li>
                  <li>Technology complexity (there's a learning curve)</li>
                  <li>Market volatility (especially with cryptocurrencies)</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  However, you don't need to be a crypto believer to appreciate blockchain's potential. Many institutions—including BlackRock, JPMorgan, and Goldman Sachs—are already exploring tokenized assets as the next evolution of finance.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Final Thoughts: Blockchain is Bigger Than Bitcoin</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You don't have to be a tech enthusiast to recognize the long-term potential of blockchain.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you're curious about how blockchain works, or intrigued by tokenized assets, you're actually ahead of the curve. This technology could make markets more efficient, transparent, and inclusive—and understanding it now gives you a strategic edge.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  As with any investment trend, knowledge is power. Keep learning, ask questions, and remember: blockchain isn't just about digital coins—it's about changing how value moves in the 21st century.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <Link href="/library">
            <Button 
              variant="outline" 
              className="neon-glow border-gray-400 text-gray-300 hover:bg-purple-400 hover:text-black hover:border-purple-400 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <Badge className="bg-purple-400 text-black">RWA 101</Badge>
            <span className="text-gray-400">2 of 6</span>
          </div>
        </div>
      </div>
    </div>
  );
}