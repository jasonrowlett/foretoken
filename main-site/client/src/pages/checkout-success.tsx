import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function CheckoutSuccess() {
  useEffect(() => {
    // Clear any loading states or redirect tracking
    window.history.replaceState({}, '', '/checkout-success');
  }, []);

  return (
    <div className="bg-black min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <Card className="data-card glow-effect">
            <CardContent className="p-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="text-white" size={32} />
                </div>
              </div>
              
              <h1 className="font-notable text-4xl text-white mb-4">
                PAYMENT SUCCESSFUL
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Welcome to Foretoken! Your subscription has been activated successfully.
              </p>
              
              <div className="space-y-4 text-left max-w-md mx-auto mb-8">
                <div className="flex items-center gap-3">
                  <Check className="text-green-400" size={16} />
                  <span className="text-gray-300">Subscription activated</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-green-400" size={16} />
                  <span className="text-gray-300">Access to premium content unlocked</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-green-400" size={16} />
                  <span className="text-gray-300">Welcome email sent to your inbox</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <Link to="/">
                  <Button className="neon-glow bg-purple-400 text-black hover:bg-purple-300 transition-all duration-300 font-medium">
                    Explore Premium Content
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
                
                <div>
                  <Link to="/library">
                    <Button 
                      variant="outline" 
                      className="neon-glow border border-gray-400 text-gray-300 hover:bg-gray-300 hover:text-black transition-all duration-300"
                    >
                      Browse Research Library
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}