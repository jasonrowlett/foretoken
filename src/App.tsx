import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Library from "@/pages/library";
import Podcast from "@/pages/podcast";
import Connect from "@/pages/connect";
import Subscribe from "@/pages/subscribe";
import AdvertisingPolicy from "@/pages/advertising-policy";
import TermsOfService from "@/pages/terms-of-service";
import PrivacyPolicy from "@/pages/privacy-policy";
import CheckoutSuccess from "@/pages/checkout-success";
import CheckoutCancel from "@/pages/checkout-cancel";
import NotFound from "@/pages/not-found";
// RWA 101 Articles
import AnalyzeTokenizedAssets from "@/pages/rwa-101/analyze-tokenized-assets";
import WhatIsBlockchain from "@/pages/rwa-101/what-is-blockchain";
import DoublePedigreeStrategy from "@/pages/rwa-101/double-pedigree-strategy";
import SmartContractsGuide from "@/pages/rwa-101/smart-contracts-guide";
import BlockchainSolvingProblems from "@/pages/rwa-101/blockchain-solving-problems";
import RWATokenizationGuide from "@/pages/rwa-101/rwa-tokenization-guide";
import Glossary from "@/pages/glossary";
// Authentication pages
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Welcome from "@/pages/welcome";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/library" component={Library} />
        <Route path="/podcasts" component={Podcast} />
        <Route path="/connect" component={Connect} />
        <Route path="/subscribe" component={Subscribe} />
        <Route path="/advertising-policy" component={AdvertisingPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/checkout-success" component={CheckoutSuccess} />
        <Route path="/checkout-cancel" component={CheckoutCancel} />
        {/* RWA 101 Article Routes */}
        <Route path="/rwa-101/analyze-tokenized-assets" component={AnalyzeTokenizedAssets} />
        <Route path="/rwa-101/what-is-blockchain" component={WhatIsBlockchain} />
        <Route path="/rwa-101/double-pedigree-strategy" component={DoublePedigreeStrategy} />
        <Route path="/rwa-101/smart-contracts-guide" component={SmartContractsGuide} />
        <Route path="/rwa-101/blockchain-solving-problems" component={BlockchainSolvingProblems} />
        <Route path="/rwa-101/rwa-tokenization-guide" component={RWATokenizationGuide} />
        <Route path="/glossary" component={Glossary} />
        {/* Authentication Routes */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/welcome" component={Welcome} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
