import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/newsletter-signup", {
        email: email
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Newsletter Subscription",
          description: data.message || "Thank you for subscribing to our newsletter!",
        });
        setEmail(""); // Clear the form
      } else {
        throw new Error(data.error || "Subscription failed");
      }
    } catch (error: any) {
      console.error("Newsletter signup error:", error);
      toast({
        title: "Subscription Error",
        description: error.message || "Unable to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStripeCheckout = async (priceId: string) => {
    if (!priceId) {
      toast({
        title: "Error",
        description: "Invalid price selection",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/create-checkout-session", {
        priceId: priceId
      });

      const data = await response.json();
      
      if (data.url) {
        // Show success message and redirect to Stripe checkout
        toast({
          title: "Redirecting to Checkout",
          description: "Taking you to secure payment...",
        });
        
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Error",
        description: "Unable to start checkout process. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
    // Note: Don't set isLoading to false in finally because we're redirecting
  };

  const subscriptionPlans = [
    {
      name: "Basic",
      price: 0,
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { name: "Weekly newsletter", included: true },
        { name: "Public market insights", included: true },
        { name: "Limited access to educational articles", included: true },
        { name: "Premium research reports", included: false },
        { name: "Real-time price data feeds", included: false },
        { name: "Exclusive interviews and webinars", included: false },
      ],
      popular: false,
      buttons: [
        { text: "Get Started", action: () => console.log("Basic plan selected") }
      ]
    },
    {
      name: "Insider",
      price: 9.99,
      monthlyPrice: 9.99,
      yearlyPrice: 107.99,
      features: [
        { name: "Everything in Basic", included: true },
        { name: "Premium research reports", included: true },
        { name: "Real-time price data feeds", included: true },
        { name: "Exclusive interviews and webinars", included: true },
        { name: "Telegram community access", included: true },
        { name: "Early access to upcoming features", included: false },
        { name: "Deeper analysis on token markets", included: false },
      ],
      popular: true,
      stripePrices: {
        monthly: "price_1RdxZZEQSEnAatPzHi8xTC3b",
        yearly: "price_1RdxZZEQSEnAatPzzYA83mdh"
      },
      fallbackUrl: "https://buy.stripe.com/fZu4gz5FCeDF3pe2A004800"
    },
    {
      name: "Pro",
      price: 29.99,
      monthlyPrice: 29.99,
      yearlyPrice: 324.99,
      features: [
        { name: "Everything in Insider", included: true },
        { name: "Early access to upcoming features", included: true },
        { name: "Deeper analysis on token markets", included: true },
        { name: "Quarterly research whitepapers", included: true },
        { name: "Private Q&A sessions", included: true },
      ],
      popular: false,
      stripePrices: {
        monthly: "price_1RdxZZEQSEnAatPzqab2Ph5S",
        yearly: "price_1RdxZaEQSEnAatPz23U3dnNN"
      }
    },
  ];

  return (
    <div className="bg-black min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="font-notable text-5xl text-white mb-4">SUBSCRIBE</h1>
          <p className="text-xl text-gray-300">Join thousands of professionals staying ahead of the tokenization revolution</p>
          
          {/* Success/Cancel Messages */}
          {new URLSearchParams(window.location.search).get('success') && (
            <div className="mt-4 p-4 bg-green-900 border border-green-400 rounded-lg text-green-300">
              Payment successful! Welcome to your new subscription.
            </div>
          )}
          {new URLSearchParams(window.location.search).get('canceled') && (
            <div className="mt-4 p-4 bg-red-900 border border-red-400 rounded-lg text-red-300">
              Payment was canceled. You can try again anytime.
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <Card className="data-card glow-effect mb-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Informed</h3>
            <p className="text-gray-300 mb-6">Get our weekly market analysis and breaking news delivered to your inbox</p>
            <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-gray-900 border-gray-600 text-white focus:border-purple-400"
              />
              <Button 
                type="submit"
                disabled={isLoading || !email}
                className="neon-glow bg-purple-400 text-black hover:bg-purple-300 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`text-center relative ${
                plan.popular 
                  ? "data-card border-2 border-purple-400 glow-effect" 
                  : "data-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                
                {/* Pricing Display */}
                {plan.name === "Basic" ? (
                  <div className="text-4xl font-bold mb-6">
                    <span className="text-gray-300">Free</span>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="text-3xl font-bold mb-2">
                      <span className={plan.popular ? "text-purple-400" : "text-gray-300"}>
                        ${plan.monthlyPrice}
                      </span>
                      <span className="text-lg text-gray-400">/month</span>
                    </div>
                    <div className="text-xl font-semibold">
                      <span className="text-gray-400">or </span>
                      <span className={plan.popular ? "text-purple-300" : "text-gray-300"}>
                        ${plan.yearlyPrice}
                      </span>
                      <span className="text-sm text-gray-400">/year</span>
                    </div>
                  </div>
                )}

                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="text-green-400" size={16} />
                      ) : (
                        <X className="text-gray-600" size={16} />
                      )}
                      <span className={feature.included ? "text-gray-300" : "text-gray-400"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                {plan.name === "Basic" ? (
                  <Button
                    className="w-full neon-glow border border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400 transition-all duration-300 font-medium"
                    variant="outline"
                    onClick={plan.buttons[0].action}
                  >
                    {plan.buttons[0].text}
                  </Button>
                ) : (
                  <div className="space-y-3">
                    {/* Monthly Button */}
                    <Button
                      className={`w-full transition-all duration-300 font-medium rounded-lg ${
                        plan.popular
                          ? "neon-glow bg-purple-400 text-black hover:bg-purple-300"
                          : "neon-glow border border-gray-400 text-gray-300 hover:bg-gray-300 hover:text-black"
                      } ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleStripeCheckout(plan.stripePrices?.monthly || '')}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                          Redirecting...
                        </div>
                      ) : (
                        `Monthly - $${plan.monthlyPrice}`
                      )}
                    </Button>
                    
                    {/* Annual Button */}
                    <Button
                      className={`w-full transition-all duration-300 font-medium rounded-lg ${
                        plan.popular
                          ? "neon-glow bg-purple-500 text-white hover:bg-purple-400"
                          : "neon-glow border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"
                      } ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
                      variant="outline"
                      onClick={() => handleStripeCheckout(plan.stripePrices?.yearly || '')}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                          Redirecting...
                        </div>
                      ) : (
                        `Annual - $${plan.yearlyPrice}`
                      )}
                    </Button>
                    
                    {/* Fallback link for Insider plan */}
                    {plan.name === "Insider" && plan.fallbackUrl && (
                      <div className="text-center mt-2">
                        <a 
                          href={plan.fallbackUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-400 hover:text-purple-400 underline transition-colors duration-300"
                        >
                          Direct Annual Checkout (Fallback)
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
