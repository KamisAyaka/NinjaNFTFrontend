import { Link } from "react-router-dom";
import { useMemo } from "react";
import imagesSummary from "../../abi/images_summary.json";
import filterMap from "../../abi/filter_map.json";

type NFTLevel = "white" | "purple";

interface NFT {
  id: number;
  name: string;
  image: string;
  level: NFTLevel;
}

interface NFTShowcaseProps {
  count?: number;
}

const resolveImageUrl = (image: string) =>
  image.startsWith("ipfs://")
    ? `https://ipfs.io/ipfs/${image.slice(7)}`
    : image;

function NFTShowcase({ count = 30 }: NFTShowcaseProps) {
  const rareSet = useMemo(() => {
    const rareList =
      (filterMap as Record<string, Record<string, number[]>>)?.["Tier"]?.[
        "Rare"
      ] || [];
    return new Set(rareList);
  }, []);

  const allNFTs: NFT[] = useMemo(() => {
    return (imagesSummary as Array<{ edition: number; image: string }>).map(
      ({ edition, image }) => ({
        id: edition,
        name: `NINJ4 #${edition}`,
        image: resolveImageUrl(image),
        level: rareSet.has(edition) ? "purple" : "white",
      })
    );
  }, [rareSet]);

  const showcaseNFTs: NFT[] = useMemo(() => {
    const shuffled = [...allNFTs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }, [allNFTs, count]);

  return (
    <div className="nft-showcase">
      <div className="nft-showcase-header">
        <h2 className="title title-lg text-center mb-md">All N1NJ4 NFTs</h2>
        <Link to="/gallery" className="btn btn-outline btn-sm">
          See all NFTs →
        </Link>
      </div>
      <div className="nft-showcase-grid">
        {showcaseNFTs.map((nft) => (
          <Link
            key={nft.id}
            to={`/nft/${nft.id}`}
            className={`nft-showcase-item level-${nft.level}`}
            title={nft.name}
          >
            <img src={nft.image} alt={nft.name} loading="lazy" />
            <span className="nft-showcase-id">#{nft.id}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NFTShowcase;
