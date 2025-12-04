import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

type LocaleText = { zh: string; en: string };

interface FAQItem {
  question: LocaleText;
  answer: LocaleText;
}

const faqData: FAQItem[] = [
  {
    question: {
      zh: "什么是 N1NJ4 NFT?",
      en: "What is the N1NJ4 NFT?",
    },
    answer: {
      zh: "N1NJ4 NFT 是一个包含 100 个独特像素赛博朋克忍者肖像的 NFT 集合。每个 Ninja 都是从不同的特征（发型、配饰、面部细节）中通过算法生成的，分为两个等级：白色背景（普通贡献者）和紫色背景（资深贡献者）。",
      en: "The N1NJ4 NFT collection features 100 unique pixel cyberpunk ninja portraits. Each ninja is algorithmically generated from traits such as hairstyle, accessories, and facial details, and grouped into two tiers: white background (community contributors) and purple background (veteran contributors).",
    },
  },
  {
    question: { zh: "这里到底发生了什么？", en: "What is happening here?" },
    answer: {
      zh: "N1NJ4 NFT 旨在构建一个专属的开发者社区身份系统。这是一个大规模的生成艺术作品，一种全新的数字所有权模式，以及一个内置的社区贡献激励系统。通过参与社区活动、贡献代码、分享知识等方式，你的 NFT 会随着贡献度提升而升级。",
      en: "N1NJ4 NFTs power a dedicated developer identity system. It’s a large-scale generative art project, a new model for digital ownership, and a contribution-based incentive program. As you participate in events, code, or share knowledge, your NFT reflects that progress.",
    },
  },
  {
    question: { zh: "如何获得一个 Ninja?", en: "How do I get a Ninja?" },
    answer: {
      zh: "你可以前往铸造页面免费铸造你的第一个 Ninja NFT。只需要连接你的钱包，点击铸造按钮即可。铸造是完全免费的，只需要支付网络费用（Gas费）。",
      en: "Visit the mint terminal to mint your first Ninja for free. Connect your wallet, click Mint, and only pay the required network gas fee—no extra cost.",
    },
  },
  {
    question: {
      zh: "Ninja 的图像存储在哪里？",
      en: "Where are the Ninja images stored?",
    },
    answer: {
      zh: "所有 Ninja NFT 的图像和元数据都永久存储在去中心化的存储网络中，确保它们可以永久访问。智能合约部署在 Injective 区块链上，确保真正的所有权。",
      en: "All images and metadata live on decentralized storage so they remain accessible forever. The smart contract is deployed on Injective, guaranteeing true ownership.",
    },
  },
  {
    question: { zh: "Ninja 是 ERC-721 代币吗？", en: "Are Ninjas ERC-721 tokens?" },
    answer: {
      zh: "N1NJ4 NFT 部署在 Injective 区块链上，遵循类似的 NFT 标准。每个 NFT 都是唯一且不可替代的，可以在支持的市场上进行交易。",
      en: "N1NJ4 NFTs are deployed on the Injective blockchain and follow ERC-721 style behavior. Each token is unique and non-fungible, and can be traded wherever Injective NFTs are supported.",
    },
  },
  {
    question: {
      zh: "网站上的市场数据来自哪里？",
      en: "Where does the market data come from?",
    },
    answer: {
      zh: "目前网站显示的是模拟数据。未来当我们集成真实的链上数据和市场交易后，所有数据都将来自 Injective 区块链，包括铸造、转移和交易记录。",
      en: "For now we display simulated data. Once on-chain feeds and marketplace integrations are live, every number will be sourced directly from Injective—mints, transfers, and trades.",
    },
  },
  {
    question: {
      zh: "交易需要支付手续费吗？",
      en: "Do I need to pay transaction fees?",
    },
    answer: {
      zh: "铸造 NFT 是完全免费的，但你需要在 Injective 区块链上支付网络交易费用（Gas费）。未来如果涉及到市场交易，可能会有少量的平台手续费，这将完全透明地显示在交易界面中。",
      en: "Minting itself is free, but you still cover Injective’s gas fees. Future marketplace trades may include a small transparent platform fee, clearly shown before you sign.",
    },
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useLanguage();

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2 className="title title-lg text-center mb-lg">Q &amp; A</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleQuestion(index)}
            >
              <span>{item.question[language]}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={`faq-icon ${openIndex === index ? "rotated" : ""}`}
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="faq-answer">{item.answer[language]}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
