import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import NFTShowcase from "../components/HomePage/NFTShowcase";
import FAQ from "../components/HomePage/FAQ";
import NFTPreview from "../components/MintPage/NFTPreview";
import StatsGrid from "../components/MintPage/StatsGrid";
import MintSection from "../components/MintPage/MintSection";
import Message from "../components/MintPage/Message";
import { useLanguage } from "../context/useLanguage";
import { evmContractService } from "../utils/evmContract";
import "./HomePage.css";

interface HomePageProps {
  isConnected: boolean;
  address: string;
  onMint: (quantity: number) => Promise<void>;
}

function HomePage({ isConnected, address, onMint }: HomePageProps) {
  const { language } = useLanguage();
  const translate = useCallback(
    (zh: string, en: string) => (language === "zh" ? zh : en),
    [language]
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [totalMinted, setTotalMinted] = useState(0);
  const [userMinted, setUserMinted] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [maxPerWallet, setMaxPerWallet] = useState(1);
  const [activePoster, setActivePoster] = useState(0);

  const deploymentTimeline = useMemo(
    () => [
      {
        phase: "roadmap - 01",
        title: translate("零号城市部署", "City Zero Deployment"),
        description: translate(
          "发布 N1NJ4:Origins， 公开所有赛博忍者身份",
          "Launch N1NJ4: Origins and reveal every cyber-ninja identity."
        ),
        status: "LIVE",
      },
      {
        phase: "roadmap - 02",
        title: translate("加密中", "Encrypted"),
        description: translate(
          "内容仍被加密，等待解密",
          "Content remains encrypted and awaits decryption."
        ),
        status: "Locked",
      },
      {
        phase: "roadmap - 03",
        title: translate("加密中", "Encrypted"),
        description: translate(
          "内容仍被加密，等待解密",
          "Content remains encrypted and awaits decryption."
        ),
        status: "Locked",
      },
    ],
    [translate]
  );

  const posterCollections = useMemo(
    () => [
      {
        id: "event-zero",
        title: translate("零号城市特别广播", "City Zero Broadcast"),
        description: translate(
          "最新的战术数据正在释出，Origin 小队完成了第一轮部署，空投信号覆盖整个 Injective 主城。",
          "Fresh tactical intel is being released as Team Origin completes phase one and the airdrop signal covers the entire Injective capital."
        ),
        image: "/Ninja Labs CN-banner-2-2.jpg",
        type: "event",
      },
      {
        id: "collection-origin",
        title: "N1NJ4: Origin Prime",
        description: translate(
          "500 枚原初忍者身份 NFT，算法生成、绝无重复，限定供应正在进行中。",
          "A generative drop of 500 origin ninjas: never repeated, strictly limited, and live now."
        ),
        image: "/Ninja Labs CN-banner-2-1.png",
      },
      {
        id: "collection-ronin",
        title: "Cyber Ronin Draft",
        description: translate(
          "将 Injective 的速度与社区贡献系统结合的次世代小队，现开放抢先预约。",
          "A next-generation squad combining Injective speed with our contribution system is now open for early enlistment."
        ),
        image: "/Ninja Labs CN-banner-2.png",
      },
    ],
    [translate]
  );

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
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [translate]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [total, max, maxWallet] = await Promise.all([
          evmContractService.getTotalMinted(),
          evmContractService.getMaxSupply(),
          evmContractService.getMaxPerWallet(),
        ]);
        if (!isMounted) return;
        setTotalMinted(total);
        setMaxSupply(max);
        setMaxPerWallet(maxWallet);
      } catch (error) {
        console.error(
          translate("加载合约数据失败:", "Failed to load contract data:"),
          error
        );
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [translate]);

  useEffect(() => {
    let isMounted = true;

    const loadUserData = async () => {
      if (!isConnected || !address) {
        setUserMinted(0);
        return;
      }
      try {
        const userCount = await evmContractService.getMintedCount(address);
        if (!isMounted) return;
        setUserMinted(userCount);
      } catch (error) {
        console.error(
          translate("加载用户数据失败:", "Failed to load user data:"),
          error
        );
      }
    };

    loadUserData();

    return () => {
      isMounted = false;
    };
  }, [isConnected, address, translate]);

  const handleMintAction = async (quantity: number) => {
    if (!isConnected) {
      setMessage(translate("请先连接钱包", "Please connect your wallet first"));
      return;
    }

    if (quantity < 1 || quantity > maxPerWallet) {
      setMessage(
        language === "zh"
          ? `请输入1到${maxPerWallet}之间的数量`
          : `Enter a value between 1 and ${maxPerWallet}`
      );
      return;
    }

    if (userMinted + quantity > maxPerWallet) {
      setMessage(
        language === "zh"
          ? `超出每个钱包的铸造限制(${maxPerWallet}个)`
          : `You reached the per-wallet mint limit (${maxPerWallet})`
      );
      return;
    }

    try {
      setLoading(true);
      setMessage(translate("正在铸造NFT...", "Minting your NFT..."));
      await onMint(quantity);

      const [total, userCount] = await Promise.all([
        evmContractService.getTotalMinted(),
        evmContractService.getMintedCount(address),
      ]);

      setTotalMinted(total);
      setUserMinted(userCount);
      setMessage(
        language === "zh"
          ? `成功铸造 ${quantity} 个 NFT!`
          : `Successfully minted ${quantity} NFT(s)!`
      );
    } catch (error) {
      console.error("Mint failed:", error);
      setMessage(
        translate("铸造失败: ", "Mint failed: ") + (error as Error).message
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePosterNavigate = (direction: "prev" | "next") => {
    setActivePoster((prev) => {
      if (direction === "prev") {
        return prev === 0 ? posterCollections.length - 1 : prev - 1;
      }
      return prev === posterCollections.length - 1 ? 0 : prev + 1;
    });
  };

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
            <div className="hero-download-panel">
              <div>
                <p className="hero-download-title">
                  {translate(
                    "零号城市已开放，立刻入驻",
                    "City Zero is open now."
                  )}
                </p>
              </div>
              <div className="download-buttons">
                <a href="#mint" className="download-btn primary">
                  {translate("立即铸造", "Mint Now")}
                </a>
                <Link to="/gallery" className="download-btn">
                  {translate("查看忍者", "View Ninjas")}
                </Link>
                <Link to="/my-nfts" className="download-btn">
                  {translate("我的身份", "My Identity")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container hero-info">
          <div className="hero-copy-card">
            <h1 className="hero-title">
              <span>NINJ4 Origin Deployment</span>
            </h1>
            <div className="hero-description">
              <p>
                <strong>
                  {translate(
                    "500 个独一无二的赛博朋克忍者即将降临 N1NJ4 零号城市。",
                    "500 unique cyberpunk ninjas are descending upon the N1NJ4 City Zero."
                  )}
                </strong>
              </p>
              <p>
                {translate(
                  "这座零号城市由 Ninja Labs 发起并由社区自治共建，是数字秩序与未来文明交汇的起点。",
                  "City Zero is initiated by Ninja Labs and co-built with the community. It is a joint point between digital order and future civilization."
                )}
              </p>
              <p>
                <strong>
                  {translate(
                    "N1NJ4 致力于打造源自赛博潮流文化与未来朋克美学的专属社区身份系统。",
                    "N1NJ4 is building a community identity system rooted in cyber street culture and future-punk aesthetics."
                  )}
                </strong>
              </p>
              <p>
                {translate(
                  "通过深度融合 Injective 生态，我们将数字世界的主权与价值真正交还给每一位社区参与者，实现身份、资产与文化的全面上链。",
                  "By deeply integrating with the Injective ecosystem, we return digital sovereignty and value to every participant—bringing identity, assets, and culture fully on-chain."
                )}
              </p>
              <p>
                {translate("未来，", "Looking ahead, ")}
                <strong>N1NJ4</strong>
                {translate(
                  " 的世界观与城市版图将持续扩展，不断引入更多链上实验与链下交互场景，构建一个集 Web3 科技、潮流文化与沉浸式体验于一体的先锋生态。",
                  "'s world view and city map will keep expanding with on-chain experiments and real-world interactions, forming a pioneering ecosystem that fuses Web3 tech, culture, and immersive experiences."
                )}
              </p>
              <p>
                <strong>
                  {translate(
                    "每一个 N1NJ4：Origin 均由多种特征经算法随机生成，绝无重复。",
                    "Every N1NJ4: Origin is generated algorithmically from traits—no duplicates."
                  )}
                </strong>
              </p>
              <p>
                {translate(
                  "它不仅是一枚 NFT，更是你在赛博忍者世界中的身份象征。",
                  "It’s more than an NFT, it’s your identity inside the cyber-ninja universe."
                )}
              </p>
            </div>

            <div className="hero-actions">
              <a href="#mint" className="btn btn-primary btn-lg">
                {translate(
                  "铸造你的专属 N1NJ4，加入零号城市",
                  "Mint your exclusive N1NJ4 and join City Zero"
                )}
              </a>
              <Link to="/gallery" className="btn btn-secondary btn-lg">
                {translate(
                  "进入画廊，探索全部忍者",
                  "Enter the gallery to explore all ninjas"
                )}
              </Link>
            </div>
          </div>

          <div className="hero-status">
            <div className="status-item reveal">
              <span className="status-label">SUPPLY</span>
              <span className="status-value">500</span>
              <span className="status-meta">Unique Agents</span>
            </div>
            <div className="status-item reveal">
              <span className="status-label">CHAIN</span>
              <span className="status-value">Injective</span>
              <span className="status-meta">Zero Gas Mint</span>
            </div>
            <div className="status-item reveal">
              <span className="status-label">ACCESS</span>
              <span className="status-value">FREE</span>
              <span className="status-meta">Whitelist Optional</span>
            </div>
          </div>
        </div>

        <div className="container mission-grid">
          <div className="mission-card reveal">
            <p className="mission-label">MISSION // 00</p>
            <h3>{translate("城市创建", "City Deployment")}</h3>
            <p>
              {translate(
                "N1NJ4 现已开放入驻，加入零号城市，成为忍者一员，开启独一无二的链上体验！",
                "N1NJ4 is open, enter City Zero, become a ninja, and unlock a one-of-a-kind on-chain experience."
              )}
            </p>
          </div>
          <div className="mission-card reveal">
            <p className="mission-label">MISSION // 01</p>
            <h3>{translate("零号城市 Hack！", "City Zero Hack!")}</h3>
            <p>
              {translate(
                "随着忍者们进入零号城市，城市地图将逐渐开放。详尽的城市生存指南即将发布，你准备好了么？",
                "As ninjas enter City Zero, the map unlocks piece by piece. A complete survival guide is coming, are you ready?"
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section poster-section reveal">
        <div className="container poster-grid">
          <div className="poster-copy">
            <p className="section-kicker">Street Poster</p>
            <h2>N1NJ4: Origins Recruiting Now!</h2>
            <p>
              {translate(
                "你被选中了。在这座由代码与霓虹构成的城市中，N1NJ4: Origins 正在苏醒。我们正在寻找, 不是旁观者，而是真正的赛博忍者候选人。",
                "You’ve been selected. In this city of code and neon, N1NJ4: Origins is awakening. We are seeking true cyber-ninja candidates—not bystanders."
              )}
            </p>
          </div>
          <div className="poster-slider reveal">
            <div
              className="poster-slider-track"
              style={{ transform: `translateX(-${activePoster * 100}%)` }}
            >
              {posterCollections.map((collection) => (
                <article
                  key={collection.id}
                  className={`poster-card ${
                    collection.type === "event" ? "poster-card-event" : ""
                  }`}
                >
                  <div className="poster-card-media">
                    <img src={collection.image} alt={collection.title} />
                  </div>
                  <div className="poster-card-body">
                    <div className="poster-card-head">
                      <h3>{collection.title}</h3>
                    </div>
                    <p>{collection.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <button
              type="button"
              className="poster-slider-nav poster-slider-nav-prev"
              onClick={() => handlePosterNavigate("prev")}
              aria-label={translate("上一张", "Previous")}
            ></button>
            <button
              type="button"
              className="poster-slider-nav poster-slider-nav-next"
              onClick={() => handlePosterNavigate("next")}
              aria-label={translate("下一张", "Next")}
            ></button>
            <div className="poster-slider-dots">
              {posterCollections.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  className={`poster-dot ${
                    index === activePoster ? "poster-dot-active" : ""
                  }`}
                  onClick={() => setActivePoster(index)}
                  aria-label={
                    language === "zh"
                      ? `切换到第 ${index + 1} 张`
                      : `Go to slide ${index + 1}`
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section timeline-section reveal">
        <div className="container timeline-grid">
          {deploymentTimeline.map((item, index) => (
            <article
              key={item.phase}
              className="timeline-card reveal"
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <p className="timeline-phase">{item.phase}</p>
              <h3>{item.title}</h3>
              <p className="timeline-description">{item.description}</p>
              <span
                className={`timeline-status status-${item.status.toLowerCase()}`}
              >
                {item.status}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="section ops-section reveal">
        <div className="container ops-grid">
          <div className="ops-copy">
            <p className="section-kicker">FIELD REPORT</p>
            <h2>{translate("零号城市实时画面", "City Zero Live Feed")}</h2>
            <h3>
              {translate("城市发起人： Ninja Labs", "Initiated by: Ninja Labs")}
            </h3>
            <p>
              {translate(
                "城市的摩天大楼天际线一望无际，忍者们已经悄然加入，零号城市深度融入 Injective 生态，赛博文化与链上潮流在此无缝叠加。这里不仅是一座城市，更是一个持续进化的实验场。",
                "The skyline stretches forever as ninjas slip into the city. City Zero is deeply woven into Injective where cyber culture and on-chain trends merge. It’s more than a city; it’s an ever-evolving test field."
              )}
            </p>
            <div className="ops-actions">
              <a href="#mint" className="btn btn-primary">
                {translate("开始铸造", "Start Minting")}
              </a>
              <Link to="/my-nfts" className="btn btn-secondary">
                {translate("查看身份", "View Identity")}
              </Link>
            </div>
          </div>

          <div className="ops-visual reveal">
            <img
              src="/Ninja Labs CN-banner-2-1.png"
              alt="City Zero"
              className="ops-image"
            />
            <div className="ops-overlay">
              <div>
                <p className="ops-value">NINJA BASE CITY</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mint" className="section mint-terminal reveal">
        <div className="container mint-grid">
          <div className="mint-preview">
            <NFTPreview />
          </div>
          <div className="mint-panel">
            <div className="mb-md">
              <p className="section-kicker">MINT TERMINAL</p>
              <h2>{translate("部署你的 N1NJ4", "Deploy Your N1NJ4")}</h2>
              <p className="text-secondary" style={{ lineHeight: "1.7" }}>
                {translate(
                  "铸造你的专属忍者 NFT，成为 N1NJ4 社区的一员。每个钱包最多可铸造",
                  "Mint your personal ninja NFT and join the N1NJ4 community. Each wallet can mint up to "
                )}
                {maxPerWallet}
                {translate(" 个。", " NFT(s).")}
              </p>
            </div>
            <StatsGrid
              totalMinted={totalMinted}
              maxSupply={maxSupply}
              userMinted={userMinted}
              maxPerWallet={maxPerWallet}
            />
            <MintSection
              isConnected={isConnected}
              loading={loading}
              maxPerWallet={maxPerWallet}
              userMinted={userMinted}
              onMint={handleMintAction}
            />
            {message && <Message message={message} />}
          </div>
        </div>
      </section>

      <section className="section showcase-section reveal">
        <div className="container">
          <div className="showcase-header">
            <div>
              <p className="section-kicker">NINJA INDEX</p>
              <h2>{translate("先导档案展示", "Preview Roster")}</h2>
            </div>
            <p>
              {translate(
                "初始 500 名 Ninja 正在待机",
                "The first 500 ninjas are standing by."
              )}
            </p>
          </div>
          <NFTShowcase count={18} />
        </div>
      </section>

      <section className="section faq-section-wrap reveal">
        <div className="container-sm">
          <FAQ />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
