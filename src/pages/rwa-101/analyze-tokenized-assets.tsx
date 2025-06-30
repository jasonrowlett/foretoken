import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Link } from "wouter";

export default function AnalyzeTokenizedAssets() {
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
            <Badge variant="outline" className="border-purple-400 text-purple-400">Guide</Badge>
          </div>
          
          <h1 className="font-notable text-4xl md:text-5xl text-white mb-6">
            How to Analyze Tokenized Assets Before You Invest
          </h1>
          
          <p className="text-xl text-gray-300 mb-6">
            A Foretoken Guide for Traditional Investors in a Digital World.
          </p>

          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Jason Rowlett</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>3 min read</span>
            </div>
            <span>Apr 4</span>
          </div>
        </div>

        {/* Article Content */}
        <Card className="data-card">
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-invert max-w-none">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">The Rise of Tokenized Assets</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Tokenized real-world assets (RWAs) have emerged as one of the most exciting intersections of traditional finance and blockchain technology. From tokenized gold and real estate to treasuries and private credit, these digital representations of tangible assets offer new ways to invest with lower barriers, higher liquidity, and 24/7 market access.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  But like any investment, not all tokenized assets are created equal. Savvy investors must learn to assess the fundamentals behind the token—just like they would with stocks, bonds, or commodities.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This guide breaks down the essential steps to analyzing a tokenized asset before you invest.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Understand What's Being Tokenized</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Before diving into on-chain data or market performance, identify the underlying asset.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">Ask:</p>
                <ul className="text-gray-300 leading-relaxed space-y-2 mb-4 list-disc pl-6">
                  <li>Is it a commodity (e.g., gold, oil)?</li>
                  <li>Is it a security (e.g., government bonds, corporate debt)?</li>
                  <li>Is it real estate or infrastructure?</li>
                  <li>Is it something more abstract, like future yield or carbon credits?</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Understanding what's being tokenized is critical to evaluating the risk profile, expected returns, volatility, and legal classification.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Research the Issuer and Custodian</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Who is behind the token?
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You're not just investing in the asset—you're trusting the issuer, the custodian, and the platform.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">Check:</p>
                <ul className="text-gray-300 leading-relaxed space-y-2 mb-4 list-disc pl-6">
                  <li><strong>Issuer credibility:</strong> Are they regulated? Do they have a history in finance or blockchain?</li>
                  <li><strong>Custody details:</strong> Where is the asset stored? Is there an independent auditor?</li>
                  <li><strong>Legal structure:</strong> Is the token a security? Does it comply with MiCA, SEC, or other regulations?</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Review Token Design and Smart Contract Features</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The token itself is software.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">Inspect:</p>
                <ul className="text-gray-300 leading-relaxed space-y-2 mb-4 list-disc pl-6">
                  <li><strong>Smart contract audits:</strong> Has the code been audited by a reputable firm?</li>
                  <li><strong>Redemption mechanism:</strong> Can the token be redeemed for the underlying asset? What are the fees and minimums?</li>
                  <li><strong>Supply mechanics:</strong> Is the supply fixed, elastic, or dynamically minted/burned?</li>
                  <li><strong>Token standards:</strong> Is it ERC-20? Does it use newer standards for compliance or interoperability?</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Smart contract design can impact both security and long-term viability.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Analyze Liquidity and Market Depth</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Even if a token is backed 1:1 with a real asset, it doesn't mean it trades well.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">Look for:</p>
                <ul className="text-gray-300 leading-relaxed space-y-2 mb-4 list-disc pl-6">
                  <li>Daily trading volume</li>
                  <li>Exchange listings (both centralized and decentralized)</li>
                  <li>Bid-ask spreads (tight spreads = healthy liquidity)</li>
                  <li>Whale dominance (do a few wallets control the majority?)</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  A token may look strong on paper but lack enough buyers and sellers to exit efficiently.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Compare Price Stability with the Underlying Asset</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Use tools (like the Foretoken Concourse Dashboard) to compare the token's price movements with its real-world counterpart.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">Check:</p>
                <ul className="text-gray-300 leading-relaxed space-y-2 mb-4 list-disc pl-6">
                  <li><strong>Volatility:</strong> Is the token more volatile than the physical asset?</li>
                  <li><strong>Tracking error:</strong> Does it closely follow the asset's price, or does it deviate often?</li>
                  <li><strong>Events:</strong> Has it ever de-pegged or experienced slippage?</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Reliable tokenized assets should reflect the economic behavior of the underlying asset.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Understand Yield, Incentives, and Risks</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Does the token offer yield? If so, how and why?
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">Assess:</p>
                <ul className="text-gray-300 leading-relaxed space-y-2 mb-4 list-disc pl-6">
                  <li><strong>Staking rewards or yield farming:</strong> Where does the yield come from? Is it sustainable?</li>
                  <li><strong>Fee structure:</strong> Are there transaction fees, redemption fees, or holding costs?</li>
                  <li><strong>Counterparty risk:</strong> What happens if the issuer or custodian fails?</li>
                  <li><strong>Smart contract risk:</strong> Could a bug or exploit impact your holdings?</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Yield can sweeten the deal, but it always comes with added risk. Know your exposure.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Evaluate Regulatory and Jurisdictional Considerations</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Tokenized assets operate in a hybrid space between crypto and traditional finance.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">Research:</p>
                <ul className="text-gray-300 leading-relaxed space-y-2 mb-4 list-disc pl-6">
                  <li>Is the asset registered or exempt under any regulatory framework?</li>
                  <li>Which jurisdiction governs the asset and token?</li>
                  <li>Are there limitations for investors based on geography (e.g., U.S. vs. EU)?</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Investors should be aware of cross-border implications, tax events, and KYC/AML rules.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Follow the Ecosystem and Community</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Just like startups, many tokenized assets live or die by network effects.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">Gauge:</p>
                <ul className="text-gray-300 leading-relaxed space-y-2 mb-4 list-disc pl-6">
                  <li>Partnerships and integrations (e.g., used in DeFi, exchanges, lending platforms)</li>
                  <li>Transparency of updates and audits</li>
                  <li>Community involvement (e.g., GitHub activity, governance forums, Discord groups)</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Assets that grow an active ecosystem are often more resilient and innovative.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Ask Before You Allocate</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Tokenized assets offer exciting new ways to invest—but only if you know what you're getting into.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">Before allocating capital, always ask:</p>
                <ul className="text-gray-300 leading-relaxed space-y-2 mb-4 list-disc pl-6">
                  <li>What exactly is being tokenized?</li>
                  <li>Who is issuing and storing it?</li>
                  <li>How does the token behave in the market?</li>
                  <li>What risks am I taking?</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  By doing your homework up front, you can make informed, confident investment decisions.
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
            <span className="text-gray-400">1 of 6</span>
          </div>
        </div>
      </div>
    </div>
  );
}