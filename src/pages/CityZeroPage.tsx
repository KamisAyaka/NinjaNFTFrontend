import React from "react";
import { Link } from "react-router-dom";
import "./CityZeroPage.css";
import CityZeroTasks from "../components/CityZeroTasks";

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

            {/* Info Section */}
            <section className="info-section">
                <div className="info-content">
                    <div className="info-text">
                        <h2>City Zero Introdunction- Text & Image</h2>
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
                        <a href="https://n1nj4.mintlify.app" target="_blank" rel="noopener noreferrer" className="read-more-btn">Read More</a>
                    </div>
                    <div className="info-image-container">
                        <img src="/CityZero/city_image1.png" alt="City Zero Introduction" className="info-image" />
                    </div>
                </div>
            </section>

            {/* Infinite Scrolling Tasks Section */}
            <CityZeroTasks />
        </div>
    );
};

export default CityZeroPage;
