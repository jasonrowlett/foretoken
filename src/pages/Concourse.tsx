import React from "react";

const Concourse: React.FC = () => {
  return (
    <div className="bg-[#0E0E0E] text-[#f2f2f2] font-sans min-h-screen">
      <header className="bg-[#111111] border-b border-[#222] text-center py-5">
        <h1 className="text-2xl font-bold text-white">Concourse: Live Tokenized & Traditional Asset Comparison Dashboard</h1>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-10">
        <a href="/" className="text-yellow-400 text-sm mb-6 inline-block hover:underline">← Back to Home</a>
        
        <p className="text-[#cccccc] text-base leading-relaxed mb-8">
          Concourse is a live dashboard from Foretoken comparing the market performance of traditional assets to their tokenized asset counterparts. For example, compare gold-baked RWA tokens XAUT, PAXG, and KAU to physical gold prices. Investors can use this tool to benchmark token performance, assess volatility, track trading premiums, and evaluate liquidity trends over time. Use the date filter in the upper right to explore 7-day, 30-day, and YTD performance. Track weekly, monthly, and year-to-date performance to see how token prices move in sync with — or independently from — the traditional markets they represent.
        </p>

        <div className="rounded-lg shadow-lg overflow-hidden">
          <iframe
            title="Foretoken Concourse Dashboard"
            src="https://lookerstudio.google.com/embed/reporting/c2b05ede-56cb-403b-9edd-c10ae3fcdeb1/page/tgwNF"
            width="100%"
            height="800"
            style={{ border: "none" }}
            allowFullScreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </main>

      <footer className="text-center py-5 border-t border-[#222] text-sm text-[#777]">
        &copy; 2025 Foretoken. All rights reserved.
      </footer>
    </div>
  );
};

export default Concourse;
