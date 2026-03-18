import React from "react";
import { Link } from "react-router-dom";
import "./CityZeroPage.css";
import CityZeroTasks from "../components/CityZeroTasks";
import CityZeroInfoCarousel from "../components/CityZeroTasks/CityZeroInfoCarousel";
import AiExperienceProject from "../components/AiExperienceProject";

const CityZeroPage: React.FC = () => {
    return (
        <div className="city-zero-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="scrolling-announcements">
                    <div className="scrolling-text">
                        <span className="text-color-1">&lt;&lt;&lt;&lt; SCROLLING ANNOUNCEMENTS</span>
                        <span className="text-color-2">&lt;&lt;&lt; SCROLLING ANNOUNCEMENTS</span>
                        <span className="text-color-3">SCROLLING ANNOUNCEMENTS</span>
                        <span className="text-color-4">&lt;&lt;&lt; SCROLLING ANNOUNCEMENTS</span>
                        <span className="text-color-1">&lt;&lt;&lt;&lt; SCROLLING ANNOUNCEMENTS</span>
                        <span className="text-color-2">&lt;&lt;&lt; SCROLLING ANNOUNCEMENTS</span>
                        <span className="text-color-3">SCROLLING ANNOUNCEMENTS</span>
                        <span className="text-color-4">&lt;&lt;&lt; SCROLLING ANNOUNCEMENTS</span>
                    </div>
                </div>
                <div className="hero-image-container">
                    <img src="/CityZero/city.png" alt="City Zero" className="hero-image" />
                    {/* Stadium Action Button */}
                    <Link to="/city-zero/stadium" className="stadium-action-btn" title="Enter Stadium">
                        <span className="btn-text">ENTER STADIUM</span>
                        <div className="btn-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Info Section (Carousel) */}
            <CityZeroInfoCarousel />

            {/* Infinite Scrolling Tasks Section */}
            <CityZeroTasks />

            {/* AI Experience Project Section */}
            <AiExperienceProject />
        </div>
    );
};

export default CityZeroPage;
