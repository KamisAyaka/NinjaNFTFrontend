import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import NFTShowcase from "../components/HomePage/NFTShowcase";
import FAQ from "../components/HomePage/FAQ";

import { useLanguage } from "../context/useLanguage";
import { evmContractService } from "../utils/evmContract";
import "./HomePage.css";

interface HomePageProps {
  isConnected: boolean;
  address: string;
}

function HomePage({ isConnected, address }: HomePageProps) {
  void isConnected;
  void address;
  const { language } = useLanguage();
  const translate = useCallback(
    (zh: string, en: string) => (language === "zh" ? zh : en),
    [language],
  );

  const [totalMinted, setTotalMinted] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [activePosterIndex, setActivePosterIndex] = useState(0);

  const deploymentTimeline = useMemo(
    () => [
      {
        phase: "ROADMAP · PHASE 01",
        title: translate("City Zero 部署", "City Zero Deployment"),
        description: translate(
          "500 枚 N1NJ4: Origins 已完成上链。社区治理已开启，持有者可进入专属频道并参与第一阶段任务。",
          "All 500 N1NJ4: Origins are minted and on-chain. Community governance is live with holder channels and first-wave missions.",
        ),
        statusKey: "live",
        statusLabel: translate("进行中", "Live"),
      },
      {
        phase: "ROADMAP · PHASE 02",
        title: translate("城市扩张 · Cyber Ronin", "City Expansion · Cyber Ronin"),
        description: translate(
          "第二套忍者系列 Cyber Ronin 即将部署，社区贡献系统同步开启，链上任务与城市分区将逐步解锁。",
          "The second ninja series, Cyber Ronin, is on the way with a community contribution layer, on-chain missions, and new city sectors.",
        ),
        statusKey: "coming",
        statusLabel: translate("即将上线", "Coming Soon"),
      },
      {
        phase: "ROADMAP · PHASE 03",
        title: translate("DAO · 链上治理", "DAO · On-Chain Governance"),
        description: translate(
          "社区驱动 DAO 将上线，持有者共同塑造城市发展方向，现实世界联动与生态合作将全面展开。",
          "A community-driven DAO goes live where holders shape the city's direction alongside real-world activations and ecosystem partnerships.",
        ),
        statusKey: "locked",
        statusLabel: translate("信号锁定", "Signal Locked"),
      },
    ],
    [translate],
  );

  const posterSlides = useMemo(
    () => [
      {
        image: "/Ninja Labs CN-banner-2-1.png",
        title: translate("City Zero Broadcast", "City Zero Broadcast"),
        description: translate(
          "战术情报正在持续释放。随着第一阶段部署完成，空投信号已覆盖整个 Injective 主城。",
          "Fresh tactical intel is being released as phase one completes and the airdrop signal spreads across the Injective capital.",
        ),
        tag: translate("现场信号", "Live Signal"),
      },
      {
        image: "/Ninja Labs CN-banner-2-2.jpg",
        title: translate("Neon Street Dispatch", "Neon Street Dispatch"),
        description: translate(
          "N1NJ4 小队已在城市边界建立据点。持有者社群任务与实战地图正在同步解锁。",
          "N1NJ4 squads have secured city outposts. Holder missions and tactical map sectors are unlocking in sync.",
        ),
        tag: translate("任务更新", "Mission Update"),
      },
      {
        image: "/Ninja Labs CN-banner-2.png",
        title: translate("Origin Identity Feed", "Origin Identity Feed"),
        description: translate(
          "每一枚 Origin 都是链上身份入口。500 个起点，持续扩展的城市叙事。",
          "Each Origin is an on-chain identity entry point: 500 starting points for an expanding city narrative.",
        ),
        tag: translate("身份档案", "Identity Feed"),
      },
    ],
    [translate],
  );

  const handlePosterPrev = useCallback(() => {
    setActivePosterIndex(
      (prev) => (prev - 1 + posterSlides.length) % posterSlides.length,
    );
  }, [posterSlides.length]);

  const handlePosterNext = useCallback(() => {
    setActivePosterIndex((prev) => (prev + 1) % posterSlides.length);
  }, [posterSlides.length]);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 },
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [translate]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePosterIndex((prev) => (prev + 1) % posterSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [posterSlides.length]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const total = await evmContractService.getTotalMinted();
        if (!isMounted) return;
        setTotalMinted(total);
        const hardcodedMax = 500;
        setMaxSupply(hardcodedMax);
      } catch (error) {
        console.error(
          translate("加载合约数据失败:", "Failed to load contract data:"),
          error,
        );
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [translate]);

  const safeMaxSupply = maxSupply || 500;
  const mintedRatio = Math.min(100, Math.round((totalMinted / safeMaxSupply) * 100));

  return (
    <div className="page-wrapper home-page reveal in-view">
      <section className="section hero-section reveal">
        <div className="hero-visual-wrap">
          <div className="hero-illustration">
            <img
              src="/Ninja Labs CN-banner-2.png"
              alt="N1NJ4 Poster"
              className="hero-art"
            />
            <div className="hero-overlay hero-overlay-left">
              <p className="hero-badge">
                {translate("Phase 01 · 已上线", "Phase 01 · Live Now")}
              </p>
              <h1 className="hero-title">
                <span>500 Cyber Ninjas</span>
                <strong>
                  {translate("已登陆零号城市", "Have Landed in City Zero")}
                </strong>
              </h1>
            </div>

            <aside className="hero-overlay hero-overlay-right">
              <p className="hero-panel-label">
                {translate("Origin 系列", "Origin Series")}
              </p>
              <h2 className="hero-panel-title">
                N1NJ4: Origins - {translate("全量发布", "Fully Minted")}
              </h2>
              <div className="hero-panel-stats">
                <div className="hero-panel-stat">
                  <strong>500</strong>
                  <span>{translate("供应量", "Supply")}</span>
                </div>
                <div className="hero-panel-stat">
                  <strong>Free</strong>
                  <span>{translate("铸造价格", "Mint Price")}</span>
                </div>
                <div className="hero-panel-stat">
                  <strong>INJ</strong>
                  <span>{translate("链", "Chain")}</span>
                </div>
              </div>
              <a
                href="https://rarible.com/injective/collections/0x816070929010a3d202d8a6b89f92bee33b7e8769"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-market-btn"
              >
                {translate("前往二级市场", "Buy on Secondary Market")} →
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="section deployment-section reveal">
        <div className="container deployment-layout">
          <article className="deployment-copy-card reveal">
            <p className="deployment-kicker">NINJ4 Origin Deployment</p>
            <h2>
              {translate("你的链上身份", "Your On-Chain Identity")}
              <span>{translate("始于零号城市", "Starts at City Zero")}</span>
            </h2>
            <p>
              {translate(
                "N1NJ4 是构建在 Injective 上的赛博社区身份系统。500 个算法生成且独一无二的忍者 NFT，将链上资产、社区治理与文化归属统一为一个身份凭证。",
                "N1NJ4 is a cyberpunk community identity system built on Injective. 500 algorithmically generated one-of-a-kind ninja NFTs unify on-chain assets, governance, and cultural belonging into one identity token.",
              )}
            </p>
            <div className="deployment-actions">
              <a
                href="https://rarible.com/injective/collections/0x816070929010a3d202d8a6b89f92bee33b7e8769"
                target="_blank"
                rel="noopener noreferrer"
                className="deployment-btn deployment-btn-primary"
              >
                {translate("前往 Rarible", "Get One on Rarible")}
              </a>
              <Link
                to="/gallery"
                className="deployment-btn deployment-btn-secondary"
              >
                {translate("探索画廊", "Explore The Gallery")} →
              </Link>
            </div>
          </article>

          <aside className="deployment-status-card reveal">
            <div className="deployment-status-item">
              <p>{translate("供应量", "Supply")}</p>
              <strong>{maxSupply || 500}</strong>
              <span>{translate("独特身份", "Unique Agents")}</span>
            </div>
            <div className="deployment-status-item">
              <p>{translate("链", "Chain")}</p>
              <strong>Injective</strong>
              <span>Zero Gas Mint</span>
            </div>
            <div className="deployment-status-item">
              <p>{translate("铸造价格", "Mint Price")}</p>
              <strong>FREE</strong>
              <span>{translate("仅 Gas", "Gas only")}</span>
            </div>
            <div className="deployment-status-item">
              <p>{translate("状态", "Status")}</p>
              <strong className="status-soldout">
                {(maxSupply > 0 && totalMinted >= maxSupply)
                  ? "✓ Sold Out"
                  : translate("进行中", "Live")}
              </strong>
              <span>
                {totalMinted} / {maxSupply || 500} minted
              </span>
            </div>
          </aside>
        </div>

        <div className="container deployment-mission-grid">
          <article className="mission-card reveal">
            <p className="mission-label">Mission // 00 · Complete</p>
            <h3>
              {translate(
                "零号城市已开放部署",
                "City Zero - Open for Deployment",
              )}
            </h3>
            <p>
              {translate(
                "500 枚忍者已全部部署。城市版图正在成型，早期持有者将获得链上身份权益与社区治理资格。",
                "All 500 ninjas are deployed. The city map is taking shape, and early holders receive on-chain identity rights and governance access.",
              )}
            </p>
          </article>
          <article className="mission-card reveal">
            <p className="mission-label">Mission // 01 · In Progress</p>
            <h3>
              {translate(
                "城市探索与 Hack 任务",
                "City Exploration & Hack Missions",
              )}
            </h3>
            <p>
              {translate(
                "零号城市生存指南即将上线。持有者将逐步解锁任务、地图分区以及线下活动参与资格。",
                "The City Zero survival guide is coming. Holders will unlock missions, map sectors, and real-world activation eligibility.",
              )}
            </p>
          </article>
        </div>
      </section>

      <section className="section showcase-section reveal">
        <div className="container">
          <div className="showcase-header">
            <div>
              <p className="section-kicker">NINJA INDEX</p>
              <h1>{translate("预览名单", "Preview Roster")}</h1>
            </div>
            <p>
              {translate(
                "500个起源忍者，每个都由算法根据独特的特征组合生成。没有两个是相同的。每个代币都是艺术与身份的完美结合。",
                "500 Origin ninjas, each algorithmically generated from a unique combination of traits. No two are alike. Every token is art and identity in one.",
              )}
            </p>
          </div>
          <NFTShowcase count={18} />
        </div>
      </section>

      <section className="section ninja-transition-section reveal">
        <div className="container ninja-transition-grid">
          <article className="ninja-transition-item">
            <strong>500</strong>
            <p>{translate("总供应", "Total Supply")}</p>
            <span>{translate("独特 NFT", "Unique NFTs")}</span>
          </article>
          <article className="ninja-transition-item">
            <strong>100%</strong>
            <p>{translate("全部铸造", "Fully Minted")}</p>
            <span>{translate("已售罄", "Sold Out")}</span>
          </article>
          <article className="ninja-transition-item">
            <strong>FREE</strong>
            <p>{translate("铸造价格", "Mint Price")}</p>
            <span>{translate("零成本入场", "Zero Cost Entry")}</span>
          </article>
          <article className="ninja-transition-item">
            <strong>INJ</strong>
            <p>{translate("区块链", "Blockchain")}</p>
            <span>Injective Chain</span>
          </article>
        </div>
      </section>

      <section className="section market-links-section reveal">
        <div className="container market-links-grid">
          <article className="market-main-card">
            <p className="market-main-badge">
              {translate("• 铸造已关闭 · 已售罄", "• Mint Closed · Sold Out")}
            </p>
            <h2>
              {translate("Origin 系列已", "The Origin Series Has")}
              <span>{translate("全部部署", "Fully Deployed")}</span>
            </h2>
            <p>
              {translate(
                "全部 500 枚 N1NJ4: Origin 已完成铸造。错过首发？你依然可以在二级市场找到你的赛博忍者，并在零号城市占据一席之地。",
                "All 500 N1NJ4: Origin NFTs have been minted. Missed the drop? You can still find your cyber ninja on the secondary market and claim your place in City Zero.",
              )}
            </p>
            <div className="market-progress-track">
              <div
                className="market-progress-fill"
                style={{ width: `${mintedRatio}%` }}
              />
            </div>
            <div className="market-progress-meta">
              <span>{translate("已铸造", "Minted")}</span>
              <strong>
                {totalMinted} / {safeMaxSupply}
              </strong>
            </div>
            <a
              href="https://rarible.com/injective/collections/0x816070929010a3d202d8a6b89f92bee33b7e8769"
              target="_blank"
              rel="noopener noreferrer"
              className="market-main-btn"
            >
              {translate("前往 Rarible", "Buy on Rarible")} →
            </a>
          </article>

          <div className="market-side-list">
            <article className="market-side-item">
              <div className="market-side-icon" aria-hidden>
                🎯
              </div>
              <div className="market-side-copy">
                <h3>Rarible · Injective</h3>
                <p>
                  {translate(
                    "官方二级市场合作伙伴，支持 N1NJ4: Origin 的买卖流通。",
                    "Official secondary market partner for buying and selling N1NJ4: Origin.",
                  )}
                </p>
              </div>
              <a
                href="https://rarible.com/injective/collections/0x816070929010a3d202d8a6b89f92bee33b7e8769"
                target="_blank"
                rel="noopener noreferrer"
                className="market-side-action"
              >
                Go →
              </a>
            </article>

            <article className="market-side-item">
              <div className="market-side-icon" aria-hidden>
                🧾
              </div>
              <div className="market-side-copy">
                <h3>{translate("智能合约", "Smart Contract")}</h3>
                <p>0x8160...8769 · Injective EVM · Verified on-chain</p>
              </div>
              <a
                href="https://blockscout.injective.network/address/0x816070929010a3d202d8a6b89f92bee33b7e8769"
                target="_blank"
                rel="noopener noreferrer"
                className="market-side-action"
              >
                Verify →
              </a>
            </article>

            <article className="market-side-item">
              <div className="market-side-icon" aria-hidden>
                📋
              </div>
              <div className="market-side-copy">
                <h3>Whitepaper · Docs</h3>
                <p>
                  {translate(
                    "查看 N1NJ4 世界观、城市规则与社区协议说明。",
                    "Full documentation on N1NJ4 lore, city rules, and community protocol.",
                  )}
                </p>
              </div>
              <a
                href="https://n1nj4.mintlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="market-side-action"
              >
                Read →
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="section timeline-section reveal">
        <div className="container">
          <header className="timeline-intro">
            <p className="timeline-kicker">
              {translate("部署时间线", "Deployment Timeline")}
            </p>
            <h2>{translate("城市扩张路线图", "City Expansion Roadmap")}</h2>
            <p>
              {translate(
                "City Zero 只是起点。N1NJ4 的版图将持续扩张，更多忍者与新城市正在集结。",
                "City Zero is just the beginning. N1NJ4's territory will keep expanding as more ninjas and new cities are recruited.",
              )}
            </p>
          </header>

          <div className="timeline-grid">
            {deploymentTimeline.map((item, index) => (
              <article
                key={item.phase}
                className="timeline-card reveal"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <p className="timeline-phase">{item.phase}</p>
                <h3>{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
                <span className={`timeline-status status-${item.statusKey}`}>
                  {item.statusLabel}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section poster-section reveal">
        <div className="container poster-grid">
          <article className="poster-copy">
            <p className="section-kicker">STREET POSTER</p>
            <h2>
              {translate("你已被选中。", "You've Been")}
              <span style={{ display: "block", color: "#ee6a9e" }}>
                {translate("加入行动。", "Selected.")}
              </span>
            </h2>
            <p>
              {translate(
                "在这座由代码与霓虹构成的城市里，N1NJ4: Origins 正在苏醒。我们不需要旁观者，我们正在招募真正的赛博忍者。",
                "In this city of code and neon, N1NJ4: Origins is awakening. We are not looking for bystanders. We are recruiting true cyber ninjas.",
              )}
            </p>
            <p>
              {translate(
                "每一枚 N1NJ4 NFT 都是你独一无二的数字身份。500 个起点，无限方向。",
                "Every N1NJ4 NFT is your one-of-a-kind identity in this digital city. 500 starting points. Infinite directions.",
              )}
            </p>
          </article>

          <div className="poster-slider-container">
            <div className="poster-slider">
              <div
                className="poster-slider-track"
                style={{
                  transform: `translateX(-${activePosterIndex * 100}%)`,
                }}
              >
                {posterSlides.map((slide, index) => (
                  <article
                    key={slide.title}
                    className={`poster-card ${index === 0 ? "poster-card-event" : ""}`}
                  >
                    <div className="poster-card-media">
                      <img src={slide.image} alt={slide.title} />
                    </div>
                    <div className="poster-card-body">
                      <div className="poster-card-head">
                        <h3>{slide.title}</h3>
                        <span className="timeline-status status-live">{slide.tag}</span>
                      </div>
                      <p>{slide.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <button
                type="button"
                className="poster-slider-nav poster-slider-nav-prev"
                onClick={handlePosterPrev}
                aria-label={translate("上一张", "Previous slide")}
              >
                {translate("上一张", "Previous")}
              </button>
              <button
                type="button"
                className="poster-slider-nav poster-slider-nav-next"
                onClick={handlePosterNext}
                aria-label={translate("下一张", "Next slide")}
              >
                {translate("下一张", "Next")}
              </button>

              <div className="poster-slider-dots">
                {posterSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    className={`poster-dot ${index === activePosterIndex ? "poster-dot-active" : ""}`}
                    onClick={() => setActivePosterIndex(index)}
                    aria-label={`${translate("切换到第", "Go to slide ")}${index + 1}${translate("张", "")}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section ops-section reveal">
        <div className="container ops-grid">
          <div className="ops-copy">
            <p className="ops-kicker">FIELD REPORT</p>
            <h2>{translate("零号城市实时画面", "City Zero Live Feed")}</h2>
            <p className="ops-lead">
              {translate(
                "城市天际线向远方延伸，忍者正悄然进入零号城市。City Zero 与 Injective 生态深度耦合，赛博文化与链上动能在此无缝融合。",
                "The skyline stretches on forever as ninjas slip silently into the city. City Zero is woven into the Injective ecosystem, where cyber culture and on-chain momentum merge without friction.",
              )}
            </p>
            <p className="ops-sub">
              {translate(
                "由 Ninja Labs 发起，与社区共建，并持续进化。",
                "Initiated by Ninja Labs, built by the community, always evolving.",
              )}
            </p>
            <div className="ops-actions">
              <a
                href="https://rarible.com/injective/collections/0x816070929010a3d202d8a6b89f92bee33b7e8769"
                target="_blank"
                rel="noopener noreferrer"
                className="ops-btn ops-btn-primary"
              >
                {translate("加入零号城市", "Join City Zero")}
              </a>
              <Link to="/gallery" className="ops-btn ops-btn-secondary">
                {translate("探索画廊", "Explore the Gallery")}
              </Link>
            </div>
          </div>

          <div className="ops-visual reveal">
            <video
              src="/live.mp4"
              className="ops-image"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </section>

      <section className="section city-entry-section reveal">
        <div className="city-entry-card">
          <p className="city-entry-kicker">
            {translate("加入城市", "Join The City")}
          </p>
          <h2>
            {translate("进入", "Enter")}
            <span>City Zero</span>
          </h2>
          <p>
            {translate(
              "社区是 N1NJ4 最重要的基础设施。无论你是持有者、创作者，还是热爱赛博文化的忍者，城市之门始终为你敞开。",
              "The community is N1NJ4's most important infrastructure. Whether you're a holder, a creator, or just a ninja at heart, the city gates are always open.",
            )}
          </p>
          <div className="city-entry-actions">
            <a
              href="https://x.com/ninjalabscn"
              target="_blank"
              rel="noopener noreferrer"
              className="city-entry-btn city-entry-btn-dark"
            >
              Twitter / X
            </a>
            <a
              href="https://github.com/Ninja-Labs-CN"
              target="_blank"
              rel="noopener noreferrer"
              className="city-entry-btn city-entry-btn-muted"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="section faq-section-wrap reveal">
        <div className="container-sm">
          <FAQ />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
