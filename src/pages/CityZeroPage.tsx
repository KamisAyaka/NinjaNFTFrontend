import React from "react";
import { Link } from "react-router-dom";
import "./CityZeroPage.css";
import CityZeroTasks from "../components/CityZeroTasks";
import CityZeroInfoCarousel from "../components/CityZeroTasks/CityZeroInfoCarousel";
import AiExperienceProject from "../components/AiExperienceProject";
import { useLanguage } from "../context/useLanguage";

const CityZeroPage: React.FC = () => {
    const { language } = useLanguage();
    const translate = (zh: string, en: string) => (language === "zh" ? zh : en);
    const announcementText = translate("滚动公告 · 城市零号实时更新", "SCROLLING ANNOUNCEMENTS");

    return (
        <div className="city-zero-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="scrolling-announcements">
                    <div className={`scrolling-text ${language === "zh" ? "scrolling-text-zh" : ""}`}>
                        <span className="text-color-1">&lt;&lt;&lt;&lt; {announcementText}</span>
                        <span className="text-color-2">&lt;&lt;&lt; {announcementText}</span>
                        <span className="text-color-3">{announcementText}</span>
                        <span className="text-color-4">&lt;&lt;&lt; {announcementText}</span>
                        <span className="text-color-1">&lt;&lt;&lt;&lt; {announcementText}</span>
                        <span className="text-color-2">&lt;&lt;&lt; {announcementText}</span>
                        <span className="text-color-3">{announcementText}</span>
                        <span className="text-color-4">&lt;&lt;&lt; {announcementText}</span>
                    </div>
                </div>
                <div className="hero-image-container">
                    <img src="/CityZero/city.png" alt="City Zero" className="hero-image" />
                    {/* Stadium Action Button */}
                    <Link to="/city-zero/stadium" className="stadium-action-btn" title={translate("进入体育场", "Enter Stadium")}>
                        <span className="btn-text">{translate("进入体育场", "ENTER STADIUM")}</span>
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
