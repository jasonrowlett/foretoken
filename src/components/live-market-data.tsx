export default function LiveMarketData() {
  return (
    <section className="py-5 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="data-card rounded-lg p-4 lg:p-6 h-32 lg:h-48 flex items-center justify-center w-full">
          <div className="text-center">
            <svg className="text-3xl lg:text-4xl text-purple-400 mb-2 mx-auto w-9 h-9" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <div className="text-gray-400 text-sm lg:text-base">Live Market Data</div>
          </div>
        </div>
      </div>
    </section>
  );
}