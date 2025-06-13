import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, FileText, Zap, Check, X, Star, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const subscribeFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  agree: z.boolean().refine((value) => value === true, {
    message: "You must agree to receive email updates",
  }),
});

type SubscribeFormValues = z.infer<typeof subscribeFormSchema>;

const Subscribe = () => {
  const { toast } = useToast();
  const [emailFocused, setEmailFocused] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: "",
      agree: false,
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      return await apiRequest("/api/subscribe", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing. You'll receive our next newsletter soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      const errorMessage = error.message.includes("409")
        ? "This email is already subscribed"
        : "Failed to subscribe. Please try again.";
      
      toast({
        title: "Subscription failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

    const checkoutMutation = useMutation({
      mutationFn: async (data: { priceId: string; mode?: string }) => {
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

      if (!response.ok) {
        throw new Error(`Failed to create checkout session: ${response.statusText}`);
      }
      
      return await response.json();
    },
    onSuccess: (data: { url: string }) => {
      window.location.href = data.url;
    },
    onError: (error: any) => {
      toast({
        title: "Checkout failed",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCheckout = (plan: 'insider' | 'pro') => {
    // These are example price IDs - you'll need to replace with your actual Stripe price IDs
    const priceIds = {
  insider: isAnnual
    ? 'price_1RUd2pEQSEnAatPzrdY7SY46'  // Insider Annual
    : 'price_1RPVhwEQSEnAatPzcBLCAqRZ',  // Insider Monthly
  pro: isAnnual
    ? 'price_1RUct0EQSEnAatPzzvImS36S'   // Pro Annual
    : 'price_1RPVfMEQSEnAatPzBflehIb6'   // Pro Monthly
};
      insider: isAnnual ? 'price_1RUd2pEQSEnAatPzrdY7SY46' : 'price_1RPVhwEQSEnAatPzcBLCAqRZ',
      pro: isAnnual ? 'price_1RUct0EQSEnAatPzzvImS36S' : 'price_1RPVfMEQSEnAatPzBflehIb6'
    };
    
    checkoutMutation.mutate({ 
      priceId: priceIds[plan],
      mode: 'subscription'
    });
  };

  const onSubmit = (values: SubscribeFormValues) => {
    subscribeMutation.mutate({ email: values.email });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Subscribe</h1>
          <p className="text-xl text-gray-300">Subscribe for insights, updates, and research</p>
        </div>

        {/* Pricing Grid */}
        <div className="mb-16 -mt-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Access Level</h2>
            <p className="text-xl text-gray-300 mb-8">Select the plan that fits your investment research needs</p>
            
            {/* Monthly/Annual Toggle */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gray-900/50 rounded-2xl p-2 border border-gray-700">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsAnnual(false)}
                    className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      !isAnnual 
                        ? 'bg-purple-500 text-white shadow-lg' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setIsAnnual(true)}
                    className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 relative ${
                      isAnnual 
                        ? 'bg-purple-500 text-white shadow-lg' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Annual
                    <span className="absolute -top-6 -right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      10% OFF
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <Mail className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Foretoken Digest</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">Free</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Tuesday Newsletter</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>1 Glossary Term/Week</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>eBooks / Reports</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>Dashboard Access</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>Forecast Reports</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>Email Support</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => {
                    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                    if (emailInput) {
                      emailInput.scrollIntoView({ behavior: 'smooth' });
                      emailInput.focus();
                    }
                  }}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-purple-500/25 animate-glow"
                >
                  Stay In the Loop
                </Button>
              </div>
            </div>

            {/* Insider Tier */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-700/30 rounded-2xl p-8 border border-purple-500/50 hover:border-purple-400 transition-all duration-300 transform hover:scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Popular</span>
              </div>
              <div className="text-center">
                <Star className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Foretoken Insider</h3>
                <div className="mb-6">
                  {isAnnual ? (
                    <>
                      <span className="text-4xl font-bold">$89.99</span>
                      <span className="text-gray-400">/yr</span>
                      <div className="text-sm text-green-400 mt-1">Save $9.89 vs monthly</div>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">$9.99</span>
                      <span className="text-gray-400">/mo</span>
                      <div className="text-sm text-gray-400 mt-1">or $89.99/yr (save 10%)</div>
                    </>
                  )}
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>All newsletters</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Full Rowlett Report</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>1 eBook/month</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>Dashboard Access</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>Forecast Reports</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>Email Support</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleCheckout('insider')}
                  disabled={checkoutMutation.isPending}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-purple-500/25 animate-glow"
                >
                  {checkoutMutation.isPending ? "Loading..." : "Join Insider"}
                </Button>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-2xl p-8 border border-yellow-500/50 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Foretoken Pro</h3>
                <div className="mb-6">
                  {isAnnual ? (
                    <>
                      <span className="text-4xl font-bold">$269.99</span>
                      <span className="text-gray-400">/yr</span>
                      <div className="text-sm text-green-400 mt-1">Save $29.89 vs monthly</div>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">$29.99</span>
                      <span className="text-gray-400">/mo</span>
                      <div className="text-sm text-gray-400 mt-1">or $269.99/yr (save 10%)</div>
                    </>
                  )}
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>All insider features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Full Concourse Dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>All eBooks unlocked</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Weekly Sector Report</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Monthly Forecast PDF</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>1-on-1 Support</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleCheckout('pro')}
                  disabled={checkoutMutation.isPending}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-yellow-500/25"
                >
                  {checkoutMutation.isPending ? "Loading..." : "Go Pro"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/20 to-purple-700/20 rounded-2xl p-8 md:p-12 border border-purple-500/30 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Foretoken Digest</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Get exclusive access to our latest research, market analysis, and insights on tokenized assets. Join thousands of investors who rely on Foretoken for clarity in the evolving world of digital finance.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email address"
                            className={`w-full px-6 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
                              emailFocused ? "border-purple-500" : ""
                            }`}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                          />
                          <div 
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-transparent transition-opacity duration-300 pointer-events-none ${
                              emailFocused ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agree"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <label className="text-sm text-gray-300 leading-relaxed text-left">
                          I agree to receive email updates from Foretoken and understand that I can unsubscribe at any time. View our{" "}
                          <a href="#" className="text-purple-500 hover:text-purple-400 underline">
                            Privacy Policy
                          </a>
                          .
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 animate-glow"
                >
                  {subscribeMutation.isPending ? "Subscribing..." : "Stay In the Loop"}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-sm text-gray-400">
              <p>🔒 Your privacy is protected. We never sell or share your information.</p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
              <div className="flex items-start space-x-3">
                <Mail className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Weekly Newsletter</h4>
                  <p className="text-sm text-gray-400">Curated insights and market updates</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FileText className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Exclusive Research</h4>
                  <p className="text-sm text-gray-400">In-depth analysis and reports</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Breaking News</h4>
                  <p className="text-sm text-gray-400">Important updates as they happen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
