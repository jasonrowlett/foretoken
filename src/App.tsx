import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import RWA101 from "@/pages/RWA101";
import Library from "@/pages/Library";
import Podcast from "@/pages/Podcast";
import Glossary from "@/pages/Glossary";
import About from "@/pages/About";
import Subscribe from "@/pages/Subscribe";
import Success from "@/pages/Success";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import PaxgVsGold from "@/pages/PaxgVsGold";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import AdvertisingPolicy from "@/pages/AdvertisingPolicy";
import Connect from "@/pages/Connect";
import SpeakerBooking from "@/pages/SpeakerBooking";
import Consulting from "@/pages/Consulting";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/library" component={Library} />
        <Route path="/library/paxg-vs-gold" component={PaxgVsGold} />
        <Route path="/rwa101" component={RWA101} />
        <Route path="/podcast" component={Podcast} />
        <Route path="/glossary" component={Glossary} />
        <Route path="/about" component={About} />
        <Route path="/subscribe" component={Subscribe} />
        <Route path="/success" component={Success} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/advertising-policy" component={AdvertisingPolicy} />
        <Route path="/connect" component={Connect} />
        <Route path="/connect/speaker-booking" component={SpeakerBooking} />
        <Route path="/connect/consulting" component={Consulting} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
