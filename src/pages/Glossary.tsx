import { useState } from "react";
import { Search, Hash } from "lucide-react";

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const glossaryTerms = [
    { letter: "A", term: "AML (Anti-Money Laundering)", definition: "Procedures aimed at preventing the illegal use of financial systems." },
    { letter: "A", term: "Asset-Backed Token", definition: "Token directly backed by a physical or financial asset." },
    { letter: "B", term: "Blockchain", definition: "Distributed ledger technology enabling transparent transactions." },
    { letter: "B", term: "Burning", definition: "Permanently removing tokens from circulation." },
    { letter: "C", term: "Cold Wallet", definition: "Offline crypto wallet offering high security." },
    { letter: "C", term: "Collateralization", definition: "Using assets as security for a loan in DeFi." },
    { letter: "C", term: "Commodity Tokenization", definition: "Tokenizing physical goods like gold or oil." },
    { letter: "C", term: "Composability", definition: "Interoperability of assets and protocols across DeFi." },
    { letter: "C", term: "Custodian", definition: "A third party that securely holds the physical asset backing a token." },
    { letter: "D", term: "DAO (Decentralized Autonomous Organization)", definition: "Organization run by smart contracts and governed by token holders." },
    { letter: "D", term: "DeFi (Decentralized Finance)", definition: "Financial services using blockchain technology without intermediaries." },
    { letter: "D", term: "Digital Twin", definition: "A digital representation of a real-world asset." },
    { letter: "E", term: "ERC-1155", definition: "Multi-token standard supporting fungible and non-fungible tokens." },
    { letter: "E", term: "ERC-20", definition: "Standard for fungible tokens on Ethereum." },
    { letter: "E", term: "ERC-721", definition: "Standard for NFTs on Ethereum." },
    { letter: "F", term: "Fractional Ownership", definition: "Allows multiple individuals to own a share of an asset through tokenization." },
    { letter: "G", term: "Gas Fees", definition: "Transaction fees on a blockchain network." },
    { letter: "H", term: "Hot Wallet", definition: "Online wallet for quick access to tokens." },
    { letter: "K", term: "KYC (Know Your Customer)", definition: "Process of verifying the identity of users." },
    { letter: "L", term: "Layer 1 Blockchain", definition: "Base network like Ethereum or Bitcoin." },
    { letter: "L", term: "Layer 2 Solution", definition: "Scalability protocols built on Layer 1 chains." },
    { letter: "L", term: "Ledger", definition: "A record of all transactions on a blockchain." },
    { letter: "L", term: "Legal Wrapper", definition: "Legal structure that ties on-chain tokens to off-chain legal rights." },
    { letter: "L", term: "Liquidity", definition: "Ease with which an asset can be bought or sold without affecting its price." },
    { letter: "M", term: "Minting", definition: "Creating new tokens and adding them to circulation." },
    { letter: "N", term: "Non-Fungible Token (NFT)", definition: "Unique digital token that represents a distinct asset." },
    { letter: "O", term: "Off-Chain", definition: "Assets or activities that exist outside the blockchain." },
    { letter: "O", term: "On-Chain", definition: "Data or transactions recorded directly on the blockchain." },
    { letter: "O", term: "Oracles", definition: "Entities that bring off-chain data onto the blockchain." },
    { letter: "P", term: "Primary Market", definition: "Initial issuance of a tokenized asset." },
    { letter: "P", term: "Private Key", definition: "Confidential key used to authorize transactions." },
    { letter: "P", term: "Programmable Asset", definition: "Asset with embedded logic via smart contracts." },
    { letter: "P", term: "Proof-of-Reserve", definition: "Verification that tokens are backed 1:1 by real assets." },
    { letter: "P", term: "Public Key", definition: "Cryptographic key used to receive assets." },
    { letter: "R", term: "Real Estate Tokenization", definition: "Tokenizing ownership rights in real property." },
    { letter: "R", term: "Real-World Asset (RWA)", definition: "A tangible or intangible asset that exists off-chain (in the traditional financial or physical world), such as real estate, commodities, or bonds, which can be tokenized on a blockchain." },
    { letter: "R", term: "RegTech", definition: "Technology used to ensure regulatory compliance." },
    { letter: "S", term: "Secondary Market", definition: "Where tokenized assets are traded post-issuance." },
    { letter: "S", term: "Security Token", definition: "A digital token representing ownership in a real-world financial asset, subject to securities regulations." },
    { letter: "S", term: "Security Token Offering (STO)", definition: "A fundraising event issuing security tokens." },
    { letter: "S", term: "Settlement Layer", definition: "Layer of blockchain where asset ownership is recorded." },
    { letter: "S", term: "Smart Contract", definition: "Self-executing code on a blockchain that enforces agreement terms." },
    { letter: "S", term: "Stablecoin", definition: "A cryptocurrency pegged to a stable asset such as fiat currency or gold." },
    { letter: "S", term: "Staking", definition: "Locking tokens to support a network and earn rewards." },
    { letter: "S", term: "Synthetic Asset", definition: "A tokenized derivative mirroring the price of an underlying asset." },
    { letter: "T", term: "Token Generation Event (TGE)", definition: "Initial creation and distribution of tokens." },
    { letter: "T", term: "Token Standard", definition: "Set of rules a token follows on a blockchain (e.g., ERC-20)." },
    { letter: "T", term: "Tokenization", definition: "The process of converting rights to a real-world asset into a digital token on a blockchain." },
    { letter: "T", term: "Treasury Tokenization", definition: "Issuing blockchain-based tokens backed by government bonds." },
    { letter: "U", term: "Utility Token", definition: "A token used to access a product or service within a blockchain ecosystem." },
    { letter: "W", term: "Whitepaper", definition: "A document explaining the technical and financial details of a token or platform." },
    { letter: "Y", term: "Yield Token", definition: "Token representing cash flows from a yield-bearing asset." }
  ];

  const filteredTerms = searchTerm
    ? glossaryTerms.filter(
        term =>
          term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : glossaryTerms;

  const groupedTerms = filteredTerms.reduce((groups, term) => {
    const letter = term.letter;
    if (!groups[letter]) {
      groups[letter] = [];
    }
    groups[letter].push(term);
    return groups;
  }, {} as Record<string, typeof glossaryTerms>);

  const alphabetLetters = Object.keys(groupedTerms).sort();

  const scrollToSection = (letter: string) => {
    const element = document.getElementById(`section-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Glossary</h1>
          <p className="text-xl text-gray-300">Comprehensive definitions for crypto and RWA terminology</p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search terms and definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Alphabet Navigation */}
        {!searchTerm && (
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {alphabetLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => scrollToSection(letter)}
                  className="bg-gray-900/50 hover:bg-purple-500 text-white px-4 py-2 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 font-semibold"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Terms Display */}
        <div className="space-y-12">
          {searchTerm ? (
            // Search Results
            <div>
              <h2 className="text-2xl font-bold mb-6 text-purple-400">
                Search Results ({filteredTerms.length} terms)
              </h2>
              <div className="space-y-4">
                {filteredTerms.map((term, index) => (
                  <div
                    key={`${term.letter}-${index}`}
                    className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-colors"
                  >
                    <h3 className="text-xl font-bold mb-3 text-white">{term.term}</h3>
                    <p className="text-gray-300 leading-relaxed">{term.definition}</p>
                  </div>
                ))}
                {filteredTerms.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No terms found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Grouped by Letter
            alphabetLetters.map((letter) => (
              <div key={letter} id={`section-${letter}`} className="scroll-mt-24">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-500 text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold mr-4">
                    {letter}
                  </div>
                  <h2 className="text-3xl font-bold text-white">{letter}</h2>
                </div>
                <div className="space-y-4">
                  {groupedTerms[letter].map((term, index) => (
                    <div
                      key={`${letter}-${index}`}
                      className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-colors"
                    >
                      <h3 className="text-xl font-bold mb-3 text-white">{term.term}</h3>
                      <p className="text-gray-300 leading-relaxed">{term.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Back to Top */}
        {!searchTerm && (
          <div className="mt-16 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Top
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Glossary;