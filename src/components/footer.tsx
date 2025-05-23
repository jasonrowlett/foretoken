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
