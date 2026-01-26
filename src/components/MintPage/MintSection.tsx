import { useState } from "react";
import { useLanguage } from "../../context/useLanguage";

interface MintSectionProps {
  maxPerWallet: number;
}

function MintSection({
  maxPerWallet,
}: MintSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const { language } = useLanguage();

  const handleMint = () => {
    // 直接跳转到 Rarible 铸造页面
    window.open(
      "https://rarible.com/injective/collections/0x816070929010a3d202d8a6b89f92bee33b7e8769/drops",
      "_blank"
    );
  };

  return (
    <div className="card flex-col gap-lg">
      <div className="flex-center gap-md">
        <button
          className="btn btn-icon btn-secondary"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          className="input text-center font-bold text-xl"
          style={{ width: "80px" }}
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 1;
            setQuantity(Math.min(maxPerWallet, Math.max(1, val)));
          }}
          min="1"
          max={maxPerWallet}
        />
        <button
          className="btn btn-icon btn-secondary"
          onClick={() => setQuantity(Math.min(maxPerWallet, quantity + 1))}
          disabled={quantity >= maxPerWallet}
        >
          +
        </button>
      </div>

      <button
        className="btn btn-primary btn-full btn-lg"
        onClick={handleMint}
      >
        {language === "zh"
          ? `铸造 ${quantity} 个 NFT`
          : `Mint ${quantity} NFT${quantity > 1 ? "s" : ""}`}
      </button>
    </div>
  );
}

export default MintSection;
