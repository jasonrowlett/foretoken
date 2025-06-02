import { ShieldCheck, GraduationCap, Rocket, Mail } from "lucide-react";
import { SiLinkedin, SiX, SiTelegram, SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";

const About = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About</h1>
          <p className="text-xl text-gray-300">Learn more about Foretoken and our mission</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* About Foretoken */}
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-purple-500">About Foretoken</h2>
            <div className="space-y-6 text-gray-300">
              <p className="leading-relaxed">
                Foretoken is a digital intelligence platform that helps investors understand the future of finance through the lens of tokenized real-world assets (RWAs). Our mission is to bridge the gap between traditional investment markets and the emerging blockchain economy by providing education, insights, and real-time data tools that compare tokenized assets—like tokenized gold or U.S. treasuries—to their conventional counterparts.
              </p>
              <p className="leading-relaxed">
                Whether you're a crypto-native user or a traditional investor exploring digital assets for the first time, Foretoken offers the research, analysis, and guidance you need to make informed decisions in an increasingly complex financial landscape.
              </p>
              <p className="leading-relaxed">
                Through in-depth articles, data visualizations, proprietary methodologies, and the Concourse dashboard, Foretoken delivers accessible, trustworthy knowledge to empower smarter decisions. We believe that tokenization is not just a trend—it's a structural shift in capital markets. Our goal is to help you stay ahead of that shift with clarity, confidence, and conviction.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-500 mb-2">{currentYear}</div>
                  <div className="text-sm text-gray-400">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-500 mb-2">1000+</div>
                  <div className="text-sm text-gray-400">Subscribers</div>
                </div>
              </div>
            </div>
          </div>

          {/* About Foretoken's Founder */}
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-purple-500">About Foretoken's Founder</h2>
            <img 
              src="/attached_assets/CryptoAI_CON_Lisbon_Nov_2024.png" 
              alt="Jason Rowlett speaking at CryptoAI:CON in Lisbon" 
              className="w-48 h-48 rounded-xl object-cover mx-auto mb-6" 
            />
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Jason Rowlett is a veteran journalist, podcaster, and the founder of Foretoken, a market data platform that gives users insight into the dual price action of tokenized RWAs and their traditional asset counterparts. Before launching Foretoken in 2023, he covered the crypto markets and has interviewed dozens of top founders and thought-leaders in the blockchain industry at events such as Bitcoin Amsterdam, Consensus, DcentalCon, and more.
              </p>
              <p className="leading-relaxed">
                Jason has spoken at events in Europe such as CryptoAI:CON in Lisbon and Web3 Amsterdam. writes the Foretoken Newsletter, produces the Foretoken Podcast, and consults clients on crypto regulations such as MiCA and DORA. Having travelled extensively throughout Europe while in college, he studied History, English and Italian Literature before receiving his Bachelor's degree in Broadcasting from Western Kentucky University. He lives in Austin, Texas.
              </p>
              <p className="leading-relaxed">
                <Link href="/speaker-booking" className="text-purple-500 hover:text-purple-400 transition-colors underline">Book Jason to speak</Link> at your next event or select one of our <Link href="/consulting" className="text-purple-500 hover:text-purple-400 transition-colors underline">Consulting Services</Link>.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="https://linkedin.com/in/jasonrowlett" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400 transition-colors">
                  <SiLinkedin className="w-6 h-6" />
                </a>
                <a href="https://x.com/jasonrowlett" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400 transition-colors">
                  <SiX className="w-6 h-6" />
                </a>
                <a href="https://t.me/jasonrowlett" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400 transition-colors">
                  <SiTelegram className="w-6 h-6" />
                </a>
                <a href="https://wa.me/15125952647" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400 transition-colors">
                  <SiWhatsapp className="w-6 h-6" />
                </a>
                <a href="mailto:jason@foretoken.co" className="text-purple-500 hover:text-purple-400 transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-gray-300">We believe in open, honest communication about both opportunities and risks in tokenized finance.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Education</h3>
              <p className="text-gray-300">Empowering investors through comprehensive education and accessible resources.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-300">Staying at the forefront of technological developments in tokenized assets and DeFi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
