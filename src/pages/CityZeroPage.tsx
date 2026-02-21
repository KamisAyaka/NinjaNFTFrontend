import React from "react";
import "./CityZeroPage.css";
import CityZeroTasks from "../components/CityZeroTasks";

const CityZeroPage: React.FC = () => {
    return (
        <div className="city-zero-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="scrolling-announcements">
                    <div className="scrolling-text">
                        <span>&lt;&lt;&lt;&lt; Scrolling Announcements</span>
                        <span>&lt;&lt;&lt; Scrolling Announcements</span>
                        <span>Scrolling Announcements</span>
                        <span>&lt;&lt;&lt;Scrolling Announcements</span>
                        <span>&lt;&lt;&lt;&lt; Scrolling Announcements</span>
                        <span>&lt;&lt;&lt; Scrolling Announcements</span>
                        <span>Scrolling Announcements</span>
                        <span>&lt;&lt;&lt;Scrolling Announcements</span>
                    </div>
                </div>
                <div className="hero-image-container">
                    <img src="/CityZero/city.png" alt="City Zero" className="hero-image" />
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
                        <button className="read-more-btn">Read More</button>
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
