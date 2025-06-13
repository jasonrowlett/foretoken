import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/podcast", label: "Podcasts" },
    { path: "/subscribe", label: "Subscribe" },
  ];

  const libraryItems = [
    { path: "/library", label: "Library Home" },
    { path: "/rwa101", label: "RWA 101" },
    { path: "/glossary", label: "Glossary" },
    { path: "https://foretoken.gumroad.com/", label: "eBooks", external: true },
  ];

  const connectItems = [
    { path: "/connect/speaker-booking", label: "Speaker Booking" },
    { path: "/connect/consulting", label: "Consulting" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black border-b-2 border-purple-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/assets/foretoken_logo_websafe.png" 
                alt="Foretoken Logo" 
                className="w-10 h-10 object-cover rounded-full"
              />
              <span className="text-2xl font-bold text-white">Foretoken</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* Home */}
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  location === "/"
                    ? "text-white"
                    : "text-gray-300 hover:text-purple-400"
                }`}
              >
                Home
              </Link>
              
              {/* About */}
              <Link
                href="/about"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  location === "/about"
                    ? "text-white"
                    : "text-gray-300 hover:text-purple-400"
                }`}
              >
                About
              </Link>
              
              {/* Library Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center whitespace-nowrap ${
                    libraryItems.some(item => location === item.path)
                      ? "text-white"
                      : "text-gray-300 hover:text-purple-400"
                  }`}>
                    Library
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black border-gray-700">
                  {libraryItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      {item.external ? (
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full cursor-pointer whitespace-nowrap text-gray-300 hover:text-purple-400"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.path}
                          className={`w-full cursor-pointer whitespace-nowrap ${
                            location === item.path
                              ? "text-white bg-purple-500/20"
                              : "text-gray-300 hover:text-purple-400"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Newsletter */}
              <a
                href="https://foretoken.beehiiv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap text-gray-300 hover:text-purple-400"
              >
                Newsletter
              </a>
              
              {/* Podcast */}
              <Link
                href="/podcast"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  location === "/podcast"
                    ? "text-white"
                    : "text-gray-300 hover:text-purple-400"
                }`}
              >
                Podcasts
              </Link>

              {/* Concourse */}
              <Link
                href="/concourse"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  location === "/concourse"
                    ? "text-white"
                    : "text-gray-300 hover:text-purple-400"
                }`}
              >
                Concourse
              </Link>

              {/* Subscribe */}
              <Link
                href="/subscribe"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  location === "/subscribe"
                    ? "text-white"
                    : "text-gray-300 hover:text-purple-400"
                }`}
              >
                Subscribe
              </Link>

              {/* Connect Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center whitespace-nowrap ${
                    connectItems.some(item => location === item.path) || location === "/connect"
                      ? "text-white"
                      : "text-gray-300 hover:text-purple-400"
                  }`}>
                    Connect
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black border-gray-700">
                  {connectItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link
                        href={item.path}
                        className={`w-full cursor-pointer whitespace-nowrap ${
                          location === item.path
                            ? "text-white bg-purple-500/20"
                            : "text-gray-300 hover:text-purple-400"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sign In Link */}
              <Link
                href="/signin"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap flex items-center ${
                  location === "/signin"
                    ? "text-white"
                    : "text-gray-300 hover:text-purple-400"
                }`}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium ${
                  location === item.path
                    ? "text-white"
                    : "text-gray-300 hover:text-purple-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Library Section */}
            <div className="border-t border-gray-700 pt-2 mt-2">
              <div className="px-3 py-2 text-base font-medium text-purple-500">
                Library
              </div>
              {libraryItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-6 py-2 text-base font-medium ${
                    location === item.path
                      ? "text-white"
                      : "text-gray-300 hover:text-purple-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Mobile Sign In */}
            <div className="border-t border-gray-700 pt-2 mt-2">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium flex items-center ${
                  location === "/signin"
                    ? "text-white"
                    : "text-gray-300 hover:text-purple-400"
                }`}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
