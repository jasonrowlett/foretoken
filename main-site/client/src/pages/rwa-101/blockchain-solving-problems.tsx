import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Link } from "wouter";

export default function BlockchainSolvingProblems() {
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
            <Badge variant="outline" className="border-purple-400 text-purple-400">Problem Solving</Badge>
          </div>
          
          <h1 className="font-notable text-4xl md:text-5xl text-white mb-6">
            How Blockchain Solves Real Problems in Asset Ownership and Transfer
          </h1>

          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Jason Rowlett</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>2 min read</span>
            </div>
            <span>Apr 3</span>
          </div>
        </div>

        {/* Article Content */}
        <Card className="data-card">
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-invert max-w-none">
              <div className="mb-8">
                <p className="text-gray-300 leading-relaxed mb-4">
                  In recent years, blockchain technology has emerged as a powerful tool for revolutionizing asset ownership and transfer. By providing decentralized, transparent, and secure systems for managing assets, blockchain addresses long-standing issues related to ownership, settlement, and accessibility.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Three key innovations that showcase the potential of blockchain in asset management are fractional ownership, 24/7 settlement, and global access.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Fractional Asset Ownership on the Blockchain</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  One of the most groundbreaking ways blockchain is transforming asset ownership is through fractionalization. Traditionally, purchasing high-value assets like real estate, art, or precious metals required significant upfront capital. With blockchain, assets can be tokenized, allowing ownership to be split into smaller, tradable units or fractions.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  These fractions are represented by tokens on the blockchain, enabling individuals to invest in assets they could otherwise never afford. This democratizes access to high-value markets, creating a more inclusive financial system.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  By breaking down expensive assets into smaller parts, blockchain also makes it easier to diversify investments. Investors can hold a share of multiple assets across various sectors, further spreading risk and improving liquidity in traditionally illiquid markets.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">24/7 Settlement</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Blockchain's ability to enable 24/7 settlement is another game-changing feature. Traditional financial systems are limited by business hours, holidays, and weekends, which can create delays in asset transfers, particularly across different time zones.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Blockchain eliminates these restrictions by automating transactions through smart contracts, ensuring they are processed instantly at any time of the day or night. This round-the-clock functionality is particularly advantageous in the fast-paced world of global finance, where asset owners need to react quickly to market movements.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  It also ensures greater efficiency, reducing the dependency on intermediaries, like banks and brokers, who typically handle transaction settlements during business hours.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Global Access</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Another significant problem blockchain addresses is the limited accessibility to traditional financial systems. For many people, especially in developing countries, access to markets and asset ownership has been out of reach due to geographical, financial, or regulatory barriers. Blockchain offers a global, permissionless system, allowing anyone with internet access to engage in the transfer and ownership of assets.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Through blockchain, cross-border transactions become easier, faster, and cheaper. The technology removes intermediaries, which traditionally charge high fees for international transfers, and ensures that all parties involved are treated fairly, with no central authority controlling the process.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Blockchain allows people to own and transfer assets anywhere in the world, further connecting global markets.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Blockchain Solving Real Asset Ownership Problems</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Blockchain technology is solving real, pressing problems in asset ownership and transfer. By enabling fractional ownership, providing 24/7 settlement, and offering global access, blockchain is transforming the way we think about assets.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  As this technology continues to evolve, we can expect even more innovative solutions that will make asset ownership more accessible, secure, and efficient.
                </p>
              </div>

              {/* Key Benefits Summary */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Key Benefits Summary</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🔀</div>
                    <h4 className="font-bold text-purple-400 mb-2">Fractional Ownership</h4>
                    <p className="text-gray-300 text-sm">Access high-value assets with smaller investments</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⏰</div>
                    <h4 className="font-bold text-purple-400 mb-2">24/7 Settlement</h4>
                    <p className="text-gray-300 text-sm">Instant processing without business hour limitations</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🌍</div>
                    <h4 className="font-bold text-purple-400 mb-2">Global Access</h4>
                    <p className="text-gray-300 text-sm">Permissionless system connecting worldwide markets</p>
                  </div>
                </div>
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
            <span className="text-gray-400">5 of 6</span>
          </div>
        </div>
      </div>
    </div>
  );
}