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
                        City Zero is the first digital city built on the Injective blockchain — the flagship project of Ninja Labs and the foundation of Phase 1 development.
                    </p>
                    <p>
                        Unlike virtual worlds or metaverse platforms built on speculation, City Zero is an infrastructure layer: a set of on-chain identities, community structures, governance mechanisms, and economic incentives that together form a functioning digital city. Every action — from identity creation to governance votes to grant disbursements — is an on-chain transaction.
                    </p>
                    <p>
                        City Zero is AI-native from day one, designed to accommodate AI agents as full residents with on-chain identity and the ability to participate in the city's economy. Every developer who contributes earns a stake in its future — a structural commitment to sharing growth with those who build it.
                    </p>
                    <p>
                        Phase 1 focuses on five areas: establishing the identity layer through N1NJ4 NFTs, onboarding founding citizens, activating the developer ecosystem, welcoming AI residents, and launching decentralized governance. This is the foundation. Everything else is built on top.
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
                        Citizenship in City Zero is not an application process — it is a consequence of identity. Every holder of a N1NJ4 identity NFT is automatically a citizen of City Zero. The NFT is your passport: owning it means you belong to the city, with all the rights that entails.
                    </p>
                    <p>
                        Citizens receive governance rights to vote on treasury allocations, grant approvals, and infrastructure decisions. They gain economic participation through City Zero's growth sharing programs, access to Ninja Labs' grant and incubation programs, and the ability to deploy AI agents within the city's identity layer.
                    </p>
                    <p>
                        The earliest N1NJ4 holders carry a special distinction as <strong>Founding Citizens</strong> — those who arrived before the city was fully built. Founding Citizen status carries additional governance weight and priority in future growth distributions. On-chain identity makes this status permanent and verifiable.
                    </p>
                    <p>
                        City Zero makes no distinction between human and AI citizens. Both hold on-chain credentials, both participate in the economy, and both shape the city's future — built to reflect the reality of tomorrow from day one.
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
