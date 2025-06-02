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

  // ...rest of the file remains unchanged
};

export default Glossary;
