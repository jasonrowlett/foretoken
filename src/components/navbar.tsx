import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User, LogOut, LogIn, ChevronDown } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import logoImg from "@assets/neon-logo-1_1751042774945.png";

export default function Navbar() {
  const [location] = useLocation();
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Logout failed");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      // Clear user cache
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      // Redirect to home
      setLocation("/");
    },
    onError: (error: any) => {
      toast({
        title: "Logout Failed",
        description: error.message || "Failed to logout",
        variant: "destructive",
      });
    },
  });

  const isActive = (path: string) => {
    return location === path;
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/library", label: "Library" },
    { path: "/podcasts", label: "Podcasts" },
  ];

  const connectDropdownItems = [
    { path: "/about", label: "About" },
    { path: "/connect", label: "Contact Form" },
    { path: "/connect#consulting", label: "Consulting" },
    { path: "/connect#speaker-booking", label: "Speaker Booking" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src={logoImg} 
                alt="Foretoken" 
                className="h-10 w-auto"
              />
              <span className="font-notable text-2xl text-white leading-none">FORETOKEN</span>
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Desktop Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`neon-glow font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-purple-400"
                    : "text-white hover:text-purple-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Connect Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`neon-glow font-medium transition-all duration-300 flex items-center space-x-1 ${
                    location.includes('/about') || location.includes('/connect') 
                      ? "text-purple-400" 
                      : "text-white hover:text-purple-400"
                  }`}
                >
                  <span>Connect</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700">
                {connectDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      href={item.path}
                      className="text-white hover:bg-gray-800 cursor-pointer w-full"
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
          </div>

          {/* Right Side - Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Authentication */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-purple-400 flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-700">
                  <DropdownMenuItem 
                    className="text-white hover:bg-gray-800 cursor-pointer"
                    onClick={() => setLocation("/welcome")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-white hover:bg-gray-800 cursor-pointer"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:text-purple-400">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link href="/subscribe">
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-purple-400"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`font-medium transition-colors duration-300 ${
                    isActive(link.path)
                      ? "text-purple-400"
                      : "text-white hover:text-purple-400"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Connect Items */}
              <div className="border-t border-gray-700 pt-4">
                <div className="text-purple-400 font-medium mb-3">Connect</div>
                {connectDropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="block text-white hover:text-purple-400 font-medium transition-colors duration-300 pl-4 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              {/* Mobile Authentication */}
              {isAuthenticated ? (
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="h-4 w-4 text-purple-400" />
                    <span className="text-white font-medium">{user?.username}</span>
                  </div>
                  <div className="space-y-2">
                    <Link href="/welcome" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-white hover:bg-gray-800 justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full text-white hover:bg-gray-800 justify-start"
                      onClick={() => {
                        logoutMutation.mutate();
                        setMobileMenuOpen(false);
                      }}
                      disabled={logoutMutation.isPending}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {logoutMutation.isPending ? "Logging out..." : "Logout"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-700 pt-4 space-y-2">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-white hover:bg-gray-800 justify-start">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/subscribe" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
