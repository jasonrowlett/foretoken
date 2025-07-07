import { Link } from "wouter";
import { FaXTwitter, FaLinkedin, FaTelegram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-notable text-2xl text-purple-400 mb-4">FORETOKEN</h3>
            <p className="text-gray-400 text-sm mb-4">
              Bringing transparency to tokenized assets through comprehensive market intelligence and analysis.
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/foretokenrwa" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                <FaXTwitter size={20} />
              </a>
              <a href="https://www.linkedin.com/company/foretokenrwa" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="https://t.me/foretokenalerts" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                <FaTelegram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-purple-400 transition-colors">
                  Library
                </Link>
              </li>
              <li>
                <Link href="/podcasts" className="hover:text-purple-400 transition-colors">
                  Podcast
                </Link>
              </li>
              <li>
                <Link href="/connect" className="hover:text-purple-400 transition-colors">
                  Connect
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="hover:text-purple-400 transition-colors">
                  Subscribe
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Market Data</a></li>
              <li>
                <Link href="/connect#consulting" className="hover:text-purple-400 transition-colors">
                  Consulting
                </Link>
              </li>
              <li>
                <Link href="/connect" className="hover:text-purple-400 transition-colors">
                  Speaker Booking
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-purple-400 transition-colors">
                  Educational Guides
                </Link>
              </li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/terms-of-service" className="hover:text-purple-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a></li>
              <li>
                <Link href="/advertising-policy" className="hover:text-purple-400 transition-colors">
                  Advertising Policy
                </Link>
              </li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Foretoken. All rights reserved.</p>
          <p className="text-gray-500 text-xs mt-2 md:mt-0">
            Market data provided by leading exchanges. Not investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
