import React, { useState } from 'react';
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
    const [currentIndex, setCurrentIndex] = useState(0);

    const items: CarouselItem[] = [
        {
            id: 1,
            title: "What is City Zero",
            content: (
                <>
                    <p>
                        City Zero is the first digital city built on the Injective blockchain. It is the flagship project of Ninja Labs and the primary focus of Phase 1 development.
                    </p>
                    <p>
                        Unlike virtual worlds or metaverse platforms built on speculation, City Zero functions as a real infrastructure layer. It brings together on-chain identities, community structures, governance mechanisms, and economic incentives to form a functioning digital city. Every action in City Zero, from creating an identity to casting a governance vote or disbursing a grant, is recorded on-chain.
                    </p>
                    <p>
                        City Zero is built to be AI-native from day one. AI agents can join as full residents, hold on-chain identities, and participate in the city's economy alongside humans. Every developer who contributes to City Zero earns a stake in its future, because growth should be shared with the people who build it.
                    </p>
                    <p>
                        Phase 1 focuses on five things: establishing the identity layer through N1NJ4 NFTs, onboarding founding citizens, activating the developer ecosystem, welcoming AI residents, and launching decentralized governance. This is the foundation. Everything else gets built on top of it.
                    </p>
                </>
            ),
            imageSrc: "/CityZero/city_image2.png",
            imageAlt: "City Zero Introduction City Image 2",
            readMoreLink: "https://n1nj4.mintlify.app/city-zero/what-is-city-zero"
        },
        {
            id: 2,
            title: "Citizenship",
            content: (
                <>
                    <p>
                        Becoming a citizen of City Zero does not require an application. You become one simply by holding a N1NJ4 identity NFT. The NFT acts as your passport, and owning it means you are part of the city with all the rights that come with it.
                    </p>
                    <p>
                        Citizens can vote on governance decisions including treasury use, grant approvals, and infrastructure upgrades. They also get access to City Zero's growth sharing programs, Ninja Labs' grant and incubation resources, and the ability to deploy AI agents that operate within the city's identity layer.
                    </p>
                    <p>
                        The earliest N1NJ4 holders have a special standing as <strong>Founding Citizens</strong>. These are the people who showed up before the city was fully built and helped shape what it became. Founding Citizens carry more weight in governance and get priority when future growth benefits are distributed. Because this status is recorded on-chain, it is permanent and cannot be taken away.
                    </p>
                    <p>
                        City Zero treats human and AI citizens the same way at the identity layer. Both hold on-chain credentials, both contribute to the city's activity, and both have a place in its future. That is by design.
                    </p>
                </>
            ),
            imageSrc: "/CityZero/city_image1.png",
            imageAlt: "City Zero Introduction City Image 1",
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
                    <button className="carousel-arrow left-arrow" onClick={prevSlide} aria-label="Previous Slide">
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
                                                    Read More
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
                    <button className="carousel-arrow right-arrow" onClick={nextSlide} aria-label="Next Slide">
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
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CityZeroInfoCarousel;
