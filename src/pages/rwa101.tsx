// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RWA101 from "./pages/RWA101";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rwa101" element={<RWA101 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

// components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black border-b border-purple-500 py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-white text-xl font-bold">
        Foretoken
      </Link>
      <div className="space-x-4">
        <Link to="/rwa101" className="text-purple-400 hover:text-white transition">
          RWA 101
        </Link>
        <span className="text-gray-600">Concourse (Coming Soon)</span>
        <span className="text-gray-600">Podcast</span>
        <span className="text-gray-600">Library</span>
        <span className="bg-purple-600 text-white px-3 py-1 rounded-md">Subscribe</span>
      </div>
    </nav>
  );
};

export default Navbar;

// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-purple-500 text-center text-gray-400 py-4 text-sm">
      <p>© {new Date().getFullYear()} Foretoken. Built for clarity in tokenized finance.</p>
      <p>Follow us on X, LinkedIn, or reach out at contact@foretoken.co</p>
    </footer>
  );
};

export default Footer;

// pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center text-center py-24 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Tokenized Insight. Real-World Impact.
      </h1>
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-8">
        Foretoken helps you understand the performance and stability of tokenized real-world assets (RWAs) versus their traditional counterparts. Welcome to the future of finance.
      </p>
      <div className="space-x-4">
        <Link
          to="/rwa101"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md text-lg"
        >
          Learn the Basics
        </Link>
        <span className="bg-gray-700 text-gray-400 px-6 py-3 rounded-md text-lg">
          View Dashboard (Coming Soon)
        </span>
      </div>
    </main>
  );
};

export default Home;

// pages/RWA101.tsx
import React from "react";

const RWA101: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-400 mb-8">RWA 101</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-white">What Are Real-World Assets (RWAs)?</h2>
        <p className="text-gray-300">
          Real-world assets refer to tangible or financial assets that exist outside the blockchain, such as real estate, commodities, bonds, and equities. Tokenizing these assets means creating a digital representation of them on a blockchain.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-white">Why Tokenize RWAs?</h2>
        <p className="text-gray-300">
          Tokenization offers increased liquidity, fractional ownership, 24/7 trading, and programmable compliance. It bridges traditional finance with decentralized infrastructure.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-white">Benefits for Investors</h2>
        <p className="text-gray-300">
          Investors gain access to traditionally illiquid markets, enjoy faster settlement times, and benefit from global accessibility with lower barriers to entry.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-white">Risks and Considerations</h2>
        <p className="text-gray-300">
          Regulatory uncertainty, smart contract risks, and custodial concerns are still challenges in this emerging market. Due diligence is essential.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2 text-white">Foretoken’s Role</h2>
        <p className="text-gray-300">
          Foretoken offers data clarity and real-time insights on tokenized vs. traditional asset performance. We equip investors with comparisons that inform smarter decisions.
        </p>
      </section>
    </div>
  );
};

export default RWA101;
