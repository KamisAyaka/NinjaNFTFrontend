import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./CityZeroTaskDetailPage.css";

const GrantsHubDetailPage: React.FC = () => {
    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="task-detail-page">
            {/* Hero Section */}
            <section className="task-detail-hero">
                <img src="/CityZero/grants_hub.png" alt="Grants Hub" className="task-detail-hero-image" />
            </section>

            {/* Content Section */}
            <section className="task-detail-content-section">
                <div className="task-detail-content">

                    {/* Return Navigation */}
                    <Link to="/city-zero" className="back-link">
                        ← Back to City Zero
                    </Link>

                    {/* Header Info Route */}
                    <div className="task-head-info">
                        <div className="task-head-left">
                            <h1 className="task-title">N1NJ4</h1>
                            <h3 className="task-subtitle">Organized by IBM sKILL</h3>
                            <div className="task-tags">
                                <span className="task-tag">Tags</span>
                                <span className="task-tag">UI</span>
                                <span className="task-tag">Virtual</span>
                                <span className="task-tag">Fintech</span>
                            </div>
                        </div>
                        <div className="task-head-right">
                            <a href="#" className="event-website-btn">Event Website</a>
                        </div>
                    </div>

                    <hr className="task-divider" />

                    {/* Split Body Layout */}
                    <div className="task-body-layout">
                        {/* Left Content */}
                        <div className="task-main-content">
                            <h4 className="task-section-title">Event Detail Description</h4>
                            <div className="task-description">
                                <p>
                                    Maple Forest is an action RPG inspired by 90s classics, including Zelda, Secret of Mana, the Soul Blazer trilogy, and more. In it, you'll adventure across an island that's begun to sink for mysterious reasons. The village elder tells you that Maple Island's guardian at the top of the island's tallest mountain may be able to help, but the door to the guardian's shrine has been locked for longer than anyone can remember. Nobody has been brave or adventurous enough to unlock that door...until now!
                                </p>
                                <p>
                                    The village elder tells you that Maple Island's guardian at the top of the island's tallest mountain may be able to help, but the door to the guardian's shrine has been locked for longer than anyone can remember. Nobody has been brave or adventurous enough to unlock that door...until now!
                                </p>
                                <p>
                                    The village elder tells you that Maple Island's guardian at the top of the island's tallest mountain may be able to help, but the door to the guardian's shrine has been locked for longer than anyone can remember. Nobody has been brave or adventurous enough to unlock that door...until now!
                                </p>
                                <p>
                                    Maple Forest is an action RPG inspired by 90s classics, including Zelda, Secret of Mana, the Soul Blazer trilogy, and more. In it, you'll adventure across an island that's begun to sink for mysterious reasons. The village elder tells you that Maple Island's guardian at the top of the island's tallest mountain may be able to help, but the door to the guardian's shrine has been locked for longer than anyone can remember. Nobody has been brave or adventurous enough to unlock that door...until now!
                                </p>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="task-sidebar">
                            <h4 className="task-section-title">Location</h4>
                            <div className="task-info-item">
                                <div className="task-info-icon">📍</div>
                                <div className="task-info-text">
                                    The Ohio State University<br />
                                    Columbus, United States
                                </div>
                            </div>

                            <h4 className="task-section-title">Date</h4>
                            <div className="task-info-item">
                                <div className="task-info-icon">📅</div>
                                <div className="task-info-text">
                                    From 27th Feb 2026 - 08:00 AM<br />
                                    To 28th Feb 2026 - 05:00PM
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GrantsHubDetailPage;
