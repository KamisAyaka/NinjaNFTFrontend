import { useEffect, useMemo, useState } from "react";
import NFTCard from "../components/NFTCard";
import { useLanguage } from "../context/LanguageContext";
import { evmContractService } from "../utils/evmContract";

type OwnedNFT = {
  id: number;
  name: string;
  image: string;
  owner: string;
  level: "white" | "purple";
};

type Attribute = {
  trait_type: string;
  value: string;
};

interface MyNFTsPageProps {
  address: string;
  isConnected: boolean;
}

const resolveImageUrl = (url?: string) =>
  url && url.startsWith("ipfs://")
    ? `https://ipfs.io/ipfs/${url.slice(7)}`
    : url;

async function fetchMetadata(tokenURI: string) {
  if (!tokenURI) return null;
  try {
    const resolved = resolveImageUrl(tokenURI) || tokenURI;
    const response = await fetch(resolved);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    return null;
  }
}

function MyNFTsPage({ address, isConnected }: MyNFTsPageProps) {
  const [myNFTs, setMyNFTs] = useState<OwnedNFT[]>([]);
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();
  const translate = useMemo(
    () => (zh: string, en: string) => (language === "zh" ? zh : en),
    [language]
  );
  const pageTitle = translate("我的 N1NJ4", "MY N1NJ4");

  useEffect(() => {
    const loadMyNFTs = async () => {
      if (!isConnected || !address) {
        setMyNFTs([]);
        return;
      }

      try {
        setLoading(true);
        const tokens = await evmContractService.getOwnerTokensWithURI(address);

        if (tokens.length === 0) {
          setMyNFTs([]);
          return;
        }

        const details = await Promise.all(
          tokens.map(async ({ tokenId, tokenURI }) => {
            try {
              const metadata = await fetchMetadata(tokenURI);
              const image =
                resolveImageUrl(metadata?.image) || "/Placeholder_image.jpg";
              const name = metadata?.name || `NINJ4 #${tokenId}`;
              const tier = metadata?.attributes?.find(
                (attr: Attribute) => attr.trait_type === "Tier"
              )?.value;
              const level =
                tier === "Rare" ? ("purple" as const) : ("white" as const);

              return {
                id: tokenId,
                name,
                image,
                owner: address,
                level,
              };
            } catch (error) {
              console.error(`Failed to process token #${tokenId}:`, error);
              return null;
            }
          })
        );

        setMyNFTs(details.filter((item): item is OwnedNFT => item !== null));
      } catch (error) {
        console.error("Failed to load user N1NJ4:", error);
        setMyNFTs([]);
      } finally {
        setLoading(false);
      }
    };

    loadMyNFTs();
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <div className="page-wrapper section">
        <div className="container">
          <div className="text-center mb-lg">
            <h1 className="title title-xl mb-md">{pageTitle}</h1>
            <p className="text-lg text-secondary">
              {translate("请先连接钱包查看您的 N1NJ4", "Connect a wallet to see your N1NJ4")}
            </p>
          </div>
          <div className="empty-state">
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🔌</div>
            <p>{translate("未连接钱包", "Wallet not connected")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-wrapper section">
        <div className="container">
          <div className="text-center mb-lg">
            <h1 className="title title-xl mb-md">{pageTitle}</h1>
          </div>
          <div className="empty-state">
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>⏳</div>
            <p>{translate("加载中...", "Loading...")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (myNFTs.length === 0) {
    return (
      <div className="page-wrapper section">
        <div className="container">
          <div className="text-center mb-lg">
            <h1 className="title title-xl mb-md">{pageTitle}</h1>
          </div>
          <div className="empty-state">
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📦</div>
            <p>{translate("您还没有任何 N1NJ4", "You don't own any N1NJ4 yet")}</p>
            <p className="text-secondary">
              {translate(
                "前往铸造页面获取您的第一个 N1NJ4！",
                "Head to the mint page to claim your first N1NJ4!"
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper section">
      <div className="container">
        <div className="text-center mb-lg">
          <h1 className="title title-xl mb-md">{pageTitle}</h1>
        </div>

        <div className="nft-grid">
          {myNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              id={nft.id}
              name={nft.name}
              image={nft.image}
              owner={nft.owner}
              level={nft.level}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyNFTsPage;
