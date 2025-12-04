import { useLanguage } from "../../context/LanguageContext";

interface CollectionStatsProps {
  totalSupply: number;
  owners: number;
  whiteCount: number;
  purpleCount: number;
  orangeCount: number;
}

function CollectionStats({
  totalSupply,
  owners,
  whiteCount,
  purpleCount,
  orangeCount,
}: CollectionStatsProps) {
  const uniqueOwnerPercentage = ((owners / totalSupply) * 100).toFixed(1);
  const { language } = useLanguage();
  const translate = (zh: string, en: string) => (language === "zh" ? zh : en);

  return (
    <div className="grid-auto gap-lg mb-lg">
      <div className="stat-card">
        <div className="stat-label">
          {translate("总供应量", "Total Supply")}
        </div>
        <div className="stat-value">{totalSupply}</div>
        <div className="text-sm text-secondary mt-sm">
          {translate("全部 NFT", "Total NFTs")}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">
          {translate("持有者数量", "Total Holders")}
        </div>
        <div className="stat-value">{owners}</div>
        <div className="text-sm text-secondary mt-sm">
          {language === "zh"
            ? `${uniqueOwnerPercentage}% 唯一持有者`
            : `${uniqueOwnerPercentage}% unique holders`}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">
          {translate("白色背景", "White Background")}
        </div>
        <div className="stat-value">{whiteCount}</div>
        <div className="text-sm text-secondary mt-sm">
          {translate("普通贡献者", "Community contributors")}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">
          {translate("紫色背景", "Purple Background")}
        </div>
        <div className="stat-value">{purpleCount}</div>
        <div className="text-sm text-secondary mt-sm">
          {translate("资深贡献者", "Veteran contributors")}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">
          {translate("橙色背景", "Orange Background")}
        </div>
        <div className="stat-value">{orangeCount}</div>
        <div className="text-sm text-secondary mt-sm">
          {translate("顶级贡献者", "Top contributors")}
        </div>
      </div>
    </div>
  );
}

export default CollectionStats;
