import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NFTShowcase from "../components/HomePage/NFTShowcase";
import FAQ from "../components/HomePage/FAQ";
import NFTPreview from "../components/MintPage/NFTPreview";
import StatsGrid from "../components/MintPage/StatsGrid";
import MintSection from "../components/MintPage/MintSection";
import Message from "../components/MintPage/Message";
import { evmContractService } from "../utils/evmContract";
import "./HomePage.css";

const deploymentTimeline = [
  {
    phase: "PHASE 01",
    title: "CALLSIGN BROADCAST",
    description: "发布 N1NJ4 作战情报，公开 100 位核心特工身份。",
    status: "LIVE",
  },
  {
    phase: "PHASE 02",
    title: "ZERO-CITY DEPLOY",
    description: "Injective 上启动免费铸造，完成钱包识别与角色配置。",
    status: "UPCOMING",
  },
  {
    phase: "PHASE 03",
    title: "EVOLUTION PROTOCOL",
    description: "解锁作战任务、代码贡献、社区积分的动态升级系统。",
    status: "LOCKED",
  },
];

interface HomePageProps {
  isConnected: boolean;
  address: string;
  onMint: (quantity: number) => Promise<void>;
}

function HomePage({ isConnected, address, onMint }: HomePageProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [totalMinted, setTotalMinted] = useState(0);
  const [userMinted, setUserMinted] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [maxPerWallet, setMaxPerWallet] = useState(1);

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
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        await evmContractService.init();
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
        console.error("加载合约数据失败:", error);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

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
        console.error("加载用户数据失败:", error);
      }
    };

    loadUserData();

    return () => {
      isMounted = false;
    };
  }, [isConnected, address]);

  const handleMintAction = async (quantity: number) => {
    if (!isConnected) {
      setMessage("请先连接钱包");
      return;
    }

    if (quantity < 1 || quantity > maxPerWallet) {
      setMessage(`请输入1到${maxPerWallet}之间的数量`);
      return;
    }

    if (userMinted + quantity > maxPerWallet) {
      setMessage(`超出每个钱包的铸造限制(${maxPerWallet}个)`);
      return;
    }

    try {
      setLoading(true);
      setMessage("正在铸造NFT...");
      await onMint(quantity);

      const [total, userCount] = await Promise.all([
        evmContractService.getTotalMinted(),
        evmContractService.getMintedCount(address),
      ]);

      setTotalMinted(total);
      setUserMinted(userCount);
      setMessage(`成功铸造 ${quantity} 个 NFT!`);
    } catch (error) {
      console.error("铸造失败:", error);
      setMessage("铸造失败: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
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
                <p className="hero-download-title">城市已开放，立刻开始作战</p>
              </div>
              <div className="download-buttons">
                <a href="#mint" className="download-btn primary">
                  立即铸造
                </a>
                <Link to="/gallery" className="download-btn">
                  查看特工
                </Link>
                <Link to="/my-nfts" className="download-btn">
                  我的身份
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container hero-info">
          <div className="hero-copy-card">
            <h1 className="hero-title">
              Injective Ninja Unit
              <span>City Deployment</span>
            </h1>
            <p className="hero-description">
              我们正把 N1NJ4 的像素特工重新部署到近未来的零号城市。
              链上身份、赛博视觉、探索式任务系统——重塑 Web3 的圈层文化。
            </p>

            <div className="hero-actions">
              <a href="#mint" className="btn btn-primary btn-lg">
                立刻启动铸造
              </a>
              <Link to="/gallery" className="btn btn-secondary btn-lg">
                查看特工档案
              </Link>
            </div>
          </div>

          <div className="hero-status">
            <div className="status-item reveal">
              <span className="status-label">SUPPLY</span>
              <span className="status-value">100</span>
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
            <h3>数字人格注入</h3>
            <p>
              每一位 Ninja 都是可塑的。通过 GitHub、注入器、社区事件上传你的
              行为数据，NFT 会获得新的立绘与特性。
            </p>
          </div>
          <div className="mission-card reveal">
            <p className="mission-label">MISSION // 01</p>
            <h3>跨平台同步</h3>
            <p>
              合作组织、赛事节点与工具都在同一个 HUD
              中展示。我们提供统一的任务编排，让 Ninja 成为 Web3
              社区的多维入口。
            </p>
          </div>
        </div>
      </section>

      <section className="section poster-section reveal">
        <div className="container poster-grid">
          <div className="poster-copy">
            <p className="section-kicker">TACTICAL POSTER</p>
            <h2>零号城市外景扫描</h2>
            <p>
              这张最新的视觉档案来自实地的无人机回传，记录了 Ninja
              小队进入零号城市外围枢纽前的准备状态。我们将其部署到主页，作为作战氛围与视觉叙事的延伸。
            </p>
            <div className="poster-meta">
              <span>FILE // 022</span>
              <span>STATUS: ACTIVE</span>
            </div>
          </div>
          <div className="poster-visual reveal">
            <img
              src="/Ninja Labs CN-banner-2-2.jpg"
              alt="N1NJ4 Tactical Poster"
              className="poster-image"
            />
            <span className="poster-badge">NEW FEED</span>
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
            <h2>零号城市实时画面</h2>
            <p>
              结合 public 目录中的视觉素材重新设计
              HUD：高光、磁带贴纸、机械刻度、霓虹标识。系统同步 Mint
              终端的数据状态与链上指标，让操作者第一眼就知道该执行哪步。
            </p>
            <div className="ops-actions">
              <a href="#mint" className="btn btn-primary">
                开始铸造
              </a>
              <Link to="/my-nfts" className="btn btn-secondary">
                查看身份
              </Link>
            </div>
          </div>

          <div className="ops-visual reveal">
            <img
              src="/Ninja Labs CN-banner-2-1.png"
              alt="Zero City"
              className="ops-image"
            />
            <div className="ops-overlay">
              <div>
                <p className="ops-label">OSIRIS FEED</p>
                <p className="ops-value">NINJA BASE // 07</p>
              </div>
              <span>Online</span>
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
              <h2>部署你的 N1NJ4</h2>
              <p className="text-secondary" style={{ lineHeight: "1.7" }}>
                铸造你的专属忍者 NFT，成为 N1NJ4 社区的一员。每个钱包最多可铸造{" "}
                {maxPerWallet} 个。
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
              <p className="section-kicker">AGENT INDEX</p>
              <h2>先导档案展示</h2>
            </div>
            <p>
              初始 30 名 Ninja 正在待机。浏览档案即可感受新的像素材质、都市光源
            </p>
          </div>
          <NFTShowcase count={30} />
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
