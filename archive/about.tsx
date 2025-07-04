import profileImage from "/attached_assets/Prinsengracht_profile(1)_1751045076966.png";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-notable text-white mb-4">
            About <span className="text-purple-400">Foretoken</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-silver-400 mx-auto"></div>
        </div>

        {/* About Foretoken Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-notable text-purple-400 mb-8">
              About Foretoken
            </h2>
            <div className="space-y-6 text-gray-300 font-inter text-lg leading-relaxed">
              <p>
                Foretoken is a digital intelligence platform that helps investors understand the
                future of finance through the lens of tokenized real-world assets (RWAs). Our
                mission is to bridge the gap between traditional investment markets and the
                emerging blockchain economy by providing education, insights, and real-time data
                tools that compare tokenized assets—like tokenized gold or U.S. treasuries—to
                their conventional counterparts. Whether you're a crypto-native user or a
                traditional investor, Foretoken helps you assess risk, value, and opportunity in this
                growing market.
              </p>
              <p>
                Through in-depth articles, data visualizations, proprietary methodologies, and the
                Concourse dashboard, Foretoken delivers accessible, trustworthy knowledge to
                empower smarter decisions. We believe that tokenization is not just a trend—it's a
                structural shift in capital markets. Our goal is to help you stay ahead of that shift
                with clarity, confidence, and conviction.
              </p>
            </div>
          </div>
        </div>

        {/* About Founder Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-notable text-purple-400 mb-12 text-center">
              About Foretoken's Founder
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Profile Image */}
              <div className="order-2 md:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-silver-400/20 rounded-2xl blur-xl"></div>
                  <img
                    src={profileImage}
                    alt="Jason Rowlett, Founder of Foretoken"
                    className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-gray-700"
                  />
                </div>
              </div>

              {/* Founder Bio */}
              <div className="order-1 md:order-2">
                <h3 className="text-2xl md:text-3xl font-notable text-white mb-6">
                  Jason Rowlett
                </h3>
                <div className="space-y-6 text-gray-300 font-inter text-lg leading-relaxed">
                  <p>
                    Jason Rowlett is a veteran journalist, podcaster, and the founder of Foretoken, a
                    market data platform that gives users insight into the dual price action of
                    tokenized RWAs and their traditional asset counterparts.
                  </p>
                  <p>
                    For the last five years he has been covering the crypto markets and has
                    interviewed dozens of top founders and thought-leaders in the blockchain industry
                    at events such as Bitcoin Amsterdam, Consensus, DcentalCon, and more.
                  </p>
                  <p>
                    Jason has spoken at events in Europe such as CryptoAI:CON in Lisbon and Web3
                    Amsterdam. writes the Foretoken Newsletter, produces the Foretoken Podcast,
                    and consults clients on crypto regulations such as MiCA and DORA.
                  </p>
                  <p>
                    Having travelled extensively throughout Europe while in college, he studied
                    History, English and Italian Literature before receiving his Bachelor's degree in
                    Broadcasting from Western Kentucky University. He lives in Austin, Texas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-900/30 to-gray-900/30 backdrop-blur-sm border border-purple-400/30 rounded-xl p-8">
            <h3 className="text-2xl md:text-3xl font-notable text-white mb-4">
              Ready to Explore Tokenized Assets?
            </h3>
            <p className="text-gray-300 font-inter text-lg mb-6">
              Join thousands of investors who trust Foretoken for RWA market intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/subscribe"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                Subscribe to Newsletter
              </a>
              <a
                href="/connect"
                className="px-8 py-3 border border-purple-400 text-purple-400 hover:bg-purple-400/10 font-medium rounded-lg transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}