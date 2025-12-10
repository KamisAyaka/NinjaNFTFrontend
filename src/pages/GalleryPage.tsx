import { useState, useEffect } from "react";
import NFTCard from "../components/NFTCard";
import GalleryHero from "../components/GalleryPage/GalleryHero";
import GallerySidebar from "../components/GalleryPage/GallerySidebar";
import imagesSummary from "../abi/images_summary.json" assert { type: "json" };
import rawFilterMap from "../abi/filter_map.json" assert { type: "json" };
import { useLanguage } from "../context/useLanguage";
import "./GalleryPage.css";
import { evmContractService } from "../utils/evmContract";

type TraitCategory = string;
type TraitMapRecord = Record<TraitCategory, string>;
type TierValue = string;
type TierRank = "Rare" | "Common";
type NFTItem = {
  id: number;
  name: string;
  image: string;
  traits: TraitMapRecord;
};

const filterMap = rawFilterMap as Record<string, Record<string, number[]>>;
const traitSummary = Object.entries(filterMap).reduce(
  (acc, [category, values]) => {
    acc[category] = {};
    Object.entries(values).forEach(([value, editions]) => {
      acc[category][value] = editions.length;
    });
    return acc;
  },
  {} as Record<string, Record<string, number>>
);
const traitCategories = Object.keys(traitSummary) as TraitCategory[];

const resolveImageUrl = (image: string) =>
  image.startsWith("ipfs://")
    ? `https://ipfs.io/ipfs/${image.slice(7)}`
    : image;

const tierOrder: Record<TierRank, number> = {
  Rare: 0,
  Common: 1,
};

const getTierRank = (value?: string): TierRank =>
  value === "Rare" ? "Rare" : "Common";

const nftTraitLookup: Record<number, TraitMapRecord> = {};
Object.entries(filterMap).forEach(
  ([category, values]) => {
    Object.entries(values).forEach(([value, editions]) => {
      editions.forEach((edition) => {
        const cat = category as TraitCategory;
        if (!nftTraitLookup[edition]) {
          nftTraitLookup[edition] = {} as TraitMapRecord;
        }
        nftTraitLookup[edition][cat] = value;
      });
    });
  }
);

const nftList = (imagesSummary as Array<{ edition: number; image: string }>).map(
  ({ edition, image }) => ({
    id: edition,
    name: `NINJ4 #${edition}`,
    image: resolveImageUrl(image),
    traits: nftTraitLookup[edition] || ({} as TraitMapRecord),
  })
);

const ITEMS_PER_PAGE = 20; // 每页显示20个

function GalleryPage() {
  const { language } = useLanguage();
  const translate = (zh: string, en: string) =>
    language === "zh" ? zh : en;
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const [searchId, setSearchId] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState<Record<TraitCategory, string>>(() => {
    const initial = {} as Record<TraitCategory, string>;
    traitCategories.forEach((category) => {
      initial[category] = "all";
    });
    return initial;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [mintedLimit, setMintedLimit] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const total = await evmContractService.getTotalMinted();
        if (!mounted) return;
        setMintedLimit(total);
        setNfts(
          nftList
            .filter((nft) => nft.id <= total)
            .sort((a, b) => b.id - a.id)
        );
      } catch {
        if (!mounted) return;
        setMintedLimit(0);
        setNfts([]);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const handleFilterChange = (category: TraitCategory, value: string) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  // 筛选和排序
  const filteredNFTs = nfts
    .filter((nft) => {
      if (!searchId) return true;
      const idNumber = Number(searchId);
      if (!idNumber) return false;
      return nft.id === idNumber;
    })
    .filter((nft) =>
      traitCategories.every((category) => {
        const filterValue = filters[category];
        if (filterValue === "all") return true;
        return nft.traits[category] === filterValue;
      })
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "level": {
          const tierA = getTierRank(a.traits["Tier"] as TierValue);
          const tierB = getTierRank(b.traits["Tier"] as TierValue);
          return tierOrder[tierA] - tierOrder[tierB];
        }
        case "oldest":
          return a.id - b.id;
        case "newest":
        default:
          return b.id - a.id;
      }
    });

  // 计算分页信息
  const totalPages = Math.ceil(filteredNFTs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedNFTs = filteredNFTs.slice(startIndex, endIndex);

  // 当筛选条件改变时，重置到第一页
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, searchId]);

  // 生成页码数组
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 处理页码点击
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <GalleryHero />

      {/* 主内容区域 - 左右布局 */}
      <div className="gallery-main">
        <div className="gallery-main-container">
          {/* 左侧边栏 */}
          <GallerySidebar
            traitSummary={traitSummary}
            filters={filters}
            onFilterChange={handleFilterChange}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* 右侧内容 */}
          <div className="gallery-content">
            <div className="gallery-search">
              <label className="gallery-search-label" htmlFor="gallery-search-id">
                {translate("按编号搜索", "Search by ID")}
              </label>
              <input
                id="gallery-search-id"
                className="gallery-search-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={translate("输入编号，例如 123", "Enter ID, e.g. 123")}
                value={searchId}
                onChange={(e) =>
                  setSearchId(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
            </div>
            {/* NFT 网格 */}
            {filteredNFTs.length > 0 ? (
              <>
                <div className="nft-grid">
                  {displayedNFTs.map((nft) => (
                    <NFTCard
                      key={nft.id}
                      id={nft.id}
                      name={nft.name}
                      image={nft.image}
                      level={
                        (nft.traits["Tier"] as TierValue) === "Rare"
                          ? "purple"
                          : "white"
                      }
                      attributes={Object.entries(nft.traits).map(
                        ([key, value]) => `${key}: ${value}`
                      )}
                    />
                  ))}
                </div>

                {/* 分页控件 */}
                {totalPages > 1 && (
                  <div className="gallery-pagination">
                    <button
                      className="pagination-btn prev"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M12.5 15L7.5 10L12.5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div className="pagination-numbers">
                      {getPageNumbers().map((page, index) =>
                        typeof page === "number" ? (
                          <button
                            key={index}
                            className={`pagination-number ${
                              currentPage === page ? "active" : ""
                            }`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        ) : (
                          <span key={index} className="pagination-ellipsis">
                            {page}
                          </span>
                        )
                      )}
                    </div>

                    <button
                      className="pagination-btn next"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M7.5 15L12.5 10L7.5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-results">
                <p>{translate("没有符合条件的 NFT", "No items found")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;
