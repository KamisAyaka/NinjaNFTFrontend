import React, { useCallback, useState } from "react";
import { useLanguage } from "../../context/useLanguage";
import "./CityZeroInfoCarousel.css";

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
        </>
      ),
      imageSrc: "/CityZero/city_image2.png",
      imageAlt: translate(
        "City Zero 介绍图 2",
        "City Zero Introduction City Image 2",
      ),
      readMoreLink: "https://n1nj4.mintlify.app/city-zero/what-is-city-zero",
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
        </>
      ),
      imageSrc: "/CityZero/city_image1.png",
      imageAlt: translate(
        "City Zero 介绍图 1",
        "City Zero Introduction City Image 1",
      ),
      readMoreLink: "https://n1nj4.mintlify.app/city-zero/citizenship",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="info-carousel-section">
      <div className="info-carousel-frame">
        <div className="carousel-container">
          {/* Left Arrow */}
          <button
            className="carousel-arrow left-arrow"
            onClick={prevSlide}
            aria-label={translate("上一页", "Previous Slide")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
                      <div className="slide-description">{item.content}</div>
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
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="slide-image"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            className="carousel-arrow right-arrow"
            onClick={nextSlide}
            aria-label={translate("下一页", "Next Slide")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="carousel-pagination">
          {items.map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index === currentIndex ? "active" : ""}`}
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
