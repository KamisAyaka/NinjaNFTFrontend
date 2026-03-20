import React, { useCallback, useState } from 'react';
import { useLanguage } from "../../context/useLanguage";
import './CityZeroInfoCarousel.css';

interface CarouselItem {
    id: number;
    title: string;
    content: React.ReactNode;
    imageSrc: string;
    imageAlt: string;
    readMoreLink?: string;
}

const CityZeroInfoCarousel: React.FC = () => {
    const { language } = useLanguage();
    const translate = useCallback(
        (zh: string, en: string) => (language === "zh" ? zh : en),
        [language],
    );

    const [currentIndex, setCurrentIndex] = useState(0);

    const items: CarouselItem[] = [
        {
            id: 1,
            title: translate("什么是 City Zero", "What is City Zero"),
            content: (
                <>
                    <p>
                        {translate(
                            "City Zero 是构建在 Injective 区块链上的首个数字城市。它是 Ninja Labs 的旗舰项目，也是第一阶段开发的核心重点。",
                            "City Zero is the first digital city built on the Injective blockchain. It is the flagship project of Ninja Labs and the primary focus of Phase 1 development.",
                        )}
                    </p>
                    <p>
                        {translate(
                            "City Zero 并不是依赖炒作的虚拟世界或元宇宙平台，而是一个真实可运行的基础设施层。它将链上身份、社区结构、治理机制和经济激励整合为一个完整的数字城市。无论是创建身份、发起治理投票，还是发放资助，每一个动作都会被记录在链上。",
                            "Unlike virtual worlds or metaverse platforms built on speculation, City Zero functions as a real infrastructure layer. It brings together on-chain identities, community structures, governance mechanisms, and economic incentives to form a functioning digital city. Every action in City Zero, from creating an identity to casting a governance vote or disbursing a grant, is recorded on-chain.",
                        )}
                    </p>
                    <p>
                        {translate(
                            "City Zero 从第一天起就按 AI-native 方式构建。AI Agent 可以作为完整居民加入，持有链上身份，并与人类一起参与城市经济。每一位为 City Zero 做出贡献的开发者都应分享到城市未来成长带来的价值，因为增长应该属于建设者。",
                            "City Zero is built to be AI-native from day one. AI agents can join as full residents, hold on-chain identities, and participate in the city's economy alongside humans. Every developer who contributes to City Zero earns a stake in its future, because growth should be shared with the people who build it.",
                        )}
                    </p>
                    <p>
                        {translate(
                            "第一阶段聚焦五件事：通过 N1NJ4 NFT 建立身份层、引导创始公民入驻、激活开发者生态、欢迎 AI 居民加入、以及启动去中心化治理。这是整个城市的基础，后续所有能力都将在其上构建。",
                            "Phase 1 focuses on five things: establishing the identity layer through N1NJ4 NFTs, onboarding founding citizens, activating the developer ecosystem, welcoming AI residents, and launching decentralized governance. This is the foundation. Everything else gets built on top of it.",
                        )}
                    </p>
                </>
            ),
            imageSrc: "/CityZero/city_image2.png",
            imageAlt: translate("City Zero 介绍图 2", "City Zero Introduction City Image 2"),
            readMoreLink: "https://n1nj4.mintlify.app/city-zero/what-is-city-zero"
        },
        {
            id: 2,
            title: translate("公民身份", "Citizenship"),
            content: (
                <>
                    <p>
                        {translate(
                            "成为 City Zero 公民不需要申请。只要持有一枚 N1NJ4 身份 NFT，你就自动获得公民身份。该 NFT 相当于你的城市护照，持有它就意味着你拥有相应的城市权利。",
                            "Becoming a citizen of City Zero does not require an application. You become one simply by holding a N1NJ4 identity NFT. The NFT acts as your passport, and owning it means you are part of the city with all the rights that come with it.",
                        )}
                    </p>
                    <p>
                        {translate(
                            "公民可以参与治理投票，包括国库资金使用、资助审批、基础设施升级等事项。同时，公民还能接入 City Zero 的增长共享机制、Ninja Labs 的资助与孵化资源，并可部署在身份层中运行的 AI Agent。",
                            "Citizens can vote on governance decisions including treasury use, grant approvals, and infrastructure upgrades. They also get access to City Zero's growth sharing programs, Ninja Labs' grant and incubation resources, and the ability to deploy AI agents that operate within the city's identity layer.",
                        )}
                    </p>
                    <p>
                        {translate(
                            "最早的一批 N1NJ4 持有者会被认定为",
                            "The earliest N1NJ4 holders have a special standing as ",
                        )}
                        <strong>{translate("创始公民", "Founding Citizens")}</strong>
                        {translate(
                            "。他们在城市尚未建成时就已加入并共同塑造其方向。创始公民在治理中拥有更高权重，并在未来增长收益分配中享有优先级。该状态记录在链上，永久有效且不可被撤销。",
                            ". These are the people who showed up before the city was fully built and helped shape what it became. Founding Citizens carry more weight in governance and get priority when future growth benefits are distributed. Because this status is recorded on-chain, it is permanent and cannot be taken away.",
                        )}
                    </p>
                    <p>
                        {translate(
                            "在身份层上，City Zero 对人类与 AI 公民一视同仁。两者都可以持有链上凭证、共同参与城市活动，并在城市未来中拥有明确位置。这是系统的有意设计。",
                            "City Zero treats human and AI citizens the same way at the identity layer. Both hold on-chain credentials, both contribute to the city's activity, and both have a place in its future. That is by design.",
                        )}
                    </p>
                </>
            ),
            imageSrc: "/CityZero/city_image1.png",
            imageAlt: translate("City Zero 介绍图 1", "City Zero Introduction City Image 1"),
            readMoreLink: "https://n1nj4.mintlify.app/city-zero/citizenship"
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className="info-carousel-section">
            <div className="info-carousel-frame">
                <div className="carousel-container">
                    {/* Left Arrow */}
                    <button className="carousel-arrow left-arrow" onClick={prevSlide} aria-label={translate("上一页", "Previous Slide")}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="carousel-track-container">
                        <div
                            className="carousel-track"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {items.map((item) => (
                                <div className="carousel-slide" key={item.id}>
                                    <div className="slide-content-wrapper">
                                        <div className="slide-text">
                                            <h2>{item.title}</h2>
                                            <div className="slide-description">
                                                {item.content}
                                            </div>
                                            {item.readMoreLink && (
                                                <a
                                                    href={item.readMoreLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="read-more-btn"
                                                >
                                                    {translate("阅读更多", "Read More")}
                                                </a>
                                            )}
                                        </div>
                                        <div className="slide-image-container">
                                            <img src={item.imageSrc} alt={item.imageAlt} className="slide-image" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button className="carousel-arrow right-arrow" onClick={nextSlide} aria-label={translate("下一页", "Next Slide")}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="carousel-pagination">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`${translate("跳转到第", "Go to slide ")}${index + 1}${translate("页", "")}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CityZeroInfoCarousel;
