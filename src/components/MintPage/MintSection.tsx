import { useState } from "react";
import { useLanguage } from "../../context/useLanguage";

interface MintSectionProps {
  isConnected: boolean;
  loading: boolean;
  maxPerWallet: number;
  userMinted: number;
  onMint: (quantity: number) => void;
}

function MintSection({
  isConnected,
  loading,
  maxPerWallet,
  userMinted,
  onMint,
}: MintSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const { language } = useLanguage();

  const handleMint = () => {
    onMint(quantity);
  };
  const reachedLimit = userMinted >= maxPerWallet;

  return (
    <div className="card flex-col gap-lg">
      <div className="flex-center gap-md">
        <button
          className="btn btn-icon btn-secondary"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={true}
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
          disabled={true}
        />
        <button
          className="btn btn-icon btn-secondary"
          onClick={() => setQuantity(Math.min(maxPerWallet, quantity + 1))}
          disabled={true}
        >
          +
        </button>
      </div>

      <button
        className="btn btn-primary btn-full btn-lg"
        onClick={handleMint}
        disabled={true}
      >
        {language === "zh" ? "铸造错误" : "Mint Error"}
      </button>
    </div>
  );
}

export default MintSection;
