import { Link } from "wouter";
import { RiTwitterXFill, RiLinkedinFill, RiTelegramFill } from "react-icons/ri";
import { Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-purple-500 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-white mb-4">Foretoken</div>
            <p className="text-gray-300 mb-4">Built for clarity in tokenized finance.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link href="/rwa101" className="text-gray-300 hover:text-purple-400 transition-colors">RWA 101</Link></li>
              <li><Link href="/library" className="text-gray-300 hover:text-purple-400 transition-colors">Library</Link></li>
              <li><Link href="/podcast" className="text-gray-300 hover:text-purple-400 transition-colors">Podcasts</Link></li>
              <li><Link href="/glossary" className="text-gray-300 hover:text-purple-400 transition-colors">Glossary</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/subscribe" className="text-gray-300 hover:text-purple-400 transition-colors">Subscribe</Link></li>
              <li><a href="https://foretoken.beehiiv.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition-colors">Newsletter</a></li>
              <li><a href="https://foretoken.gumroad.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition-colors">eBooks</a></li>
              <li><Link href="/connect/speaker-booking" className="text-gray-300 hover:text-purple-400 transition-colors">Speaker Book</Link></li>
              <li><Link href="/connect/consulting" className="text-gray-300 hover:text-purple-400 transition-colors">Consulting</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex items-center space-x-6">
              <a 
                href="https://x.com/foretokenrwa" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Follow us on X (Twitter)"
              >
                <RiTwitterXFill className="w-7 h-7" />
              </a>
              <a 
                href="https://www.linkedin.com/company/foretokenrwa" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Connect on LinkedIn"
              >
                <RiLinkedinFill className="w-7 h-7" />
              </a>
              <a 
                href="https://foretoken.beehiiv.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Subscribe to our newsletter"
              >
                <Mail className="w-7 h-7" />
              </a>
              <a
                href="https://t.me/foretokenalerts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Join our Telegram channel"
              >
                <RiTelegramFill className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Legal Links */}
        <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} Foretoken. All rights reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm">
            <Link href="/terms-of-service" className="text-gray-400 hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/advertising-policy" className="text-gray-400 hover:text-purple-400 transition-colors">
              Advertising Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
