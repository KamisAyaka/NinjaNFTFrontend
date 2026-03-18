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
            title: "City Zero Introdunction- Text",
            content: (
                <>
                    <p>
                        page with all the different tasks related to the ecosystem and reward for those tasks.These tasks can be developer related for now, possibility of creator related tasks can be explored in the future.
                    </p>
                    <p>
                        These tasks can be something like a 'Bounty' where the ecosystem projects can simply list out something they'd wanna do for their projects and list it there with a reward.The idea appears to be simple but finding projects who are willing to put up tasks there might be difficult since the Injective ecosystem is not very big at the moment & most teams operate independently.
                    </p>
                    <p>
                        The idea appears to be simple but finding projects who are willing to put up tasks there might be difficult since the Injective ecosystem is not very big at the moment & most teams operate independently.
                    </p>
                </>
            ),
            imageSrc: "/CityZero/city_image2.png",
            imageAlt: "City Zero Introduction City Image 2",
            readMoreLink: "https://n1nj4.mintlify.app"
        },
        {
            id: 2,
            title: "City Zero Introdunction- Text & Image",
            content: (
                <>
                    <p>
                        page with all the different tasks related to the ecosystem and reward for those tasks.These tasks can be developer related for now, possibility of creator related tasks can be explored in the future.
                    </p>
                    <p>
                        These tasks can be something like a 'Bounty' where the ecosystem projects can simply list out something they'd wanna do for their projects and list it there with a reward.The idea appears to be simple but finding projects who are willing to put up tasks there might be difficult since the Injective ecosystem is not very big at the moment & most teams operate independently.
                    </p>
                    <p>
                        This can also include tasks from Ninja Labs.<br />
                        The idea appears to be simple but finding projects who are willing to put up tasks there might be difficult since the Injective ecosystem is not very big at the moment & most teams operate independently.
                    </p>
                </>
            ),
            imageSrc: "/CityZero/city_image1.png",
            imageAlt: "City Zero Introduction City Image 1",
            readMoreLink: "https://n1nj4.mintlify.app"
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
