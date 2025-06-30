import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function NewsletterSignup() {
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

  return (
    <section className="py-12 bg-black relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="data-card text-center glow-effect">
          <CardContent className="p-8">
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
      </div>
    </section>
  );
}