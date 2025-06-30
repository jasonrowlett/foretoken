import HeroSection from "@/components/hero-section";
import NewsletterSignup from "@/components/newsletter-signup";
import LiveMarketData from "@/components/live-market-data";

export default function Home() {
  return (
    <div className="bg-black">
      <HeroSection />
      <NewsletterSignup />
      <LiveMarketData />
    </div>
  );
}
