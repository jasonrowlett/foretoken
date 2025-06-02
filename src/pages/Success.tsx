import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const Success = () => {
  const [location] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('session_id');
    setSessionId(id);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-green-900/20 to-green-700/20 rounded-2xl p-8 border border-green-500/50">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Thank you for your subscription! You'll receive a confirmation email shortly with access to your new benefits.
          </p>
          
          {sessionId && (
            <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400">Order ID:</p>
              <p className="text-sm font-mono break-all">{sessionId}</p>
            </div>
          )}
          
          <div className="space-y-3">
            <Button 
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
              onClick={() => window.location.href = '/'}
            >
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
            
            <Button 
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => window.location.href = '/subscribe'}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              View Subscription Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;