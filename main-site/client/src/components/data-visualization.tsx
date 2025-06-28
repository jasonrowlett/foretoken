import { TrendingUp, TrendingDown } from "lucide-react";

export default function DataVisualization() {
  return (
    <div className="space-y-4 w-full">
      {/* Top row with all three data cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Market Cap */}
        <div className="data-card rounded-lg p-4 lg:p-6 glow-effect">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-gray-300 font-semibold text-sm lg:text-base">Market Cap</h3>
            <span className="text-green-400 text-xs lg:text-sm flex items-center gap-1">
              <TrendingUp size={14} />
              +12.3%
            </span>
          </div>
          <div className="text-xl lg:text-2xl font-bold text-white">$847.2B</div>
          <div className="text-xs lg:text-sm text-gray-400">Tokenized Assets</div>
        </div>

        {/* Real Estate */}
        <div className="data-card rounded-lg p-4 lg:p-6">
          <div className="text-purple-400 text-sm lg:text-base font-medium mb-2">Real Estate</div>
          <div className="text-xl lg:text-2xl font-bold text-white mb-2">$312.4B</div>
          <div className="text-green-400 text-xs lg:text-sm flex items-center gap-1">
            <TrendingUp size={12} />
            +8.7%
          </div>
        </div>

        {/* Commodities */}
        <div className="data-card rounded-lg p-4 lg:p-6">
          <div className="text-purple-400 text-sm lg:text-base font-medium mb-2">Commodities</div>
          <div className="text-xl lg:text-2xl font-bold text-white mb-2">$189.1B</div>
          <div className="text-red-400 text-xs lg:text-sm flex items-center gap-1">
            <TrendingDown size={12} />
            -2.1%
          </div>
        </div>
      </div>

      {/* Full width Live Market Data below */}
      <div className="data-card rounded-lg p-4 lg:p-6 h-32 lg:h-48 flex items-center justify-center w-full">
        <div className="text-center">
          <TrendingUp className="text-3xl lg:text-4xl text-purple-400 mb-2 mx-auto" size={36} />
          <div className="text-gray-400 text-sm lg:text-base">Live Market Data</div>
        </div>
      </div>
    </div>
  );
}
