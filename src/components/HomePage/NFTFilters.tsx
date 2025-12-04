import { useMemo } from "react";
import { useLanguage } from "../../context/useLanguage";
import "./NFTFilters.css";

type NFTLevel = "white" | "purple" | "orange";

interface NFTFiltersProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  levelFilter: NFTLevel | "all";
  onLevelChange: (level: NFTLevel | "all") => void;
}

function NFTFilters({
  sortBy,
  onSortChange,
  levelFilter,
  onLevelChange,
}: NFTFiltersProps) {
  const { language } = useLanguage();
  const translate = useMemo(
    () => (zh: string, en: string) => (language === "zh" ? zh : en),
    [language]
  );
  return (
    <div className="nft-filters">
      <div className="filter-section">
        <h3 className="filter-title">
          {translate("等级类型与属性", "Tier & Attributes")}
        </h3>

        <div className="level-filters">
          <button
            className={`level-btn ${levelFilter === "all" ? "active" : ""}`}
            onClick={() => onLevelChange("all")}
          >
            {translate("全部", "All")}
          </button>
          <button
            className={`level-btn level-white ${
              levelFilter === "white" ? "active" : ""
            }`}
            onClick={() => onLevelChange("white")}
          >
            <span className="level-indicator white"></span>
            {translate("白色背景", "White Background")}
          </button>
          <button
            className={`level-btn level-purple ${
              levelFilter === "purple" ? "active" : ""
            }`}
            onClick={() => onLevelChange("purple")}
          >
            <span className="level-indicator purple"></span>
            {translate("紫色背景", "Purple Background")}
          </button>
          <button
            className={`level-btn level-orange ${
              levelFilter === "orange" ? "active" : ""
            }`}
            onClick={() => onLevelChange("orange")}
          >
            <span className="level-indicator orange"></span>
            {translate("橙色背景", "Orange Background")}
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">
          {translate("排序方式", "Sort Order")}
        </label>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="newest">{translate("最新", "Newest")}</option>
          <option value="oldest">{translate("最早", "Oldest")}</option>
          <option value="level">{translate("等级", "Level")}</option>
        </select>
      </div>
    </div>
  );
}

export default NFTFilters;
