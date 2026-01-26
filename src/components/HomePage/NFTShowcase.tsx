import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useHomeMintStats } from "./useHomeMintStats";
import imagesSummary from "../../abi/images_summary.json" assert { type: "json" };
import filterMap from "../../abi/filter_map.json" assert { type: "json" };

type NFTLevel = "white" | "purple";

const extractNftNumber = (imageUrl: string): number => {
  const match = imageUrl.match(/\/(\d+)\.png/);
  return match ? parseInt(match[1]) : 0;
};

interface NFT {
  id: number;
  visualId: number;
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

function NFTShowcase({ count = 18 }: NFTShowcaseProps) {
  const { totalMinted } = useHomeMintStats();

  const rareSet = useMemo(() => {
    const rareList =
      (filterMap as Record<string, Record<string, number[]>>)?.["Tier"]?.[
      "Rare"
      ] || [];
    return new Set(rareList);
  }, []);

  const allNFTs: NFT[] = useMemo(() => {
    const list = (
      imagesSummary as Array<{ edition: number; image: string }>
    ).map(({ edition, image }) => {
      const level: NFTLevel = rareSet.has(edition) ? "purple" : "white";
      const visualId = extractNftNumber(image);
      return {
        id: edition,
        visualId,
        name: `NINJ4 #${visualId}`,
        image: resolveImageUrl(image),
        level,
      };
    });
    // 已铸造的在前，未铸造的在后
    return list.sort((a, b) => {
      const aMinted = a.id <= totalMinted;
      const bMinted = b.id <= totalMinted;
      if (aMinted === bMinted) return 0;
      return aMinted ? -1 : 1;
    });
  }, [rareSet, totalMinted]);

  const showcaseNFTs: NFT[] = useMemo(() => {
    // 随机打乱数组的辅助函数
    const shuffle = <T,>(array: T[]) => {
      const newArr = [...array];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };

    const minted = allNFTs.filter((nft) => nft.id <= totalMinted);
    const notMinted = allNFTs.filter((nft) => nft.id > totalMinted);

    // 分别随机打乱
    const randomMinted = shuffle(minted);
    const randomNotMinted = shuffle(notMinted);

    const pickedMinted = randomMinted.slice(0, count);
    const remaining = count - pickedMinted.length;
    const pickedPlaceholder = remaining > 0 ? randomNotMinted.slice(0, remaining) : [];

    return [...pickedMinted, ...pickedPlaceholder];
  }, [allNFTs, totalMinted, count]);

  return (
    <div className="nft-showcase">
      <div className="nft-showcase-header">
        <h2 className="title title-lg text-center mb-md">All N1NJ4 NFTs</h2>
        <Link to="/gallery" className="btn btn-outline btn-sm">
          See all NFTs →
        </Link>
      </div>
      <div className="nft-showcase-grid">
        {showcaseNFTs.map((nft) => {
          const isMinted = nft.id <= totalMinted;
          const imageSrc = isMinted
            ? nft.image
            : "/Placeholder_image.jpg";

          const content = (
            <>
              <img src={imageSrc} alt={nft.name} loading="lazy" />
              {isMinted && (
                <span className="nft-showcase-id">#{nft.visualId}</span>
              )}
            </>
          );

          return isMinted ? (
            <Link
              key={nft.id}
              to={`/nft/${nft.id}`}
              className={`nft-showcase-item level-${nft.level}`}
              title={nft.name}
            >
              {content}
            </Link>
          ) : (
            <div
              key={nft.id}
              className={`nft-showcase-item level-${nft.level}`}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NFTShowcase;
