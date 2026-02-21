import React from "react";
import { Link } from "react-router-dom";
import "./CityZeroStadiumPage.css";

interface PhaseData {
    id: number;
    title: string;
    image: string;
    status: 'Completed' | 'Ongoing' | 'Upcoming';
    descriptions: string[];
}

const PHASE_DATA: PhaseData[] = [
    {
        id: 1,
        title: "PHASE ONE - Mission Name Abstract",
        image: "https://placehold.co/800x250/bbf7d0/1f2937?text=Characters+Concept+Art",
        status: "Completed",
        descriptions: [
            "The page with all the different tasks related to the ecosystem and reward for those tasks.These tasks can be developer related for now, possibility of creator related tasks can be explored in the future.",
            "These tasks can be something like a 'Bounty' where the ecosystem projects can simply list out something they'd wanna do for their projects and list it there with a reward.The idea appears to be simple but finding projects who are willing to put up tasks there might be difficult since the Injective ecosystem is not very big at the moment & most teams operate independently."
        ]
    },
    {
        id: 2,
        title: "PHASE TWO - Mission Name Abstract",
        image: "https://placehold.co/800x400/93c5fd/1f2937?text=Collector's+Passport",
        status: "Ongoing",
        descriptions: [
            "The page with all the different tasks related to the ecosystem and reward for those tasks.These tasks can be developer related for now, possibility of creator related tasks can be explored in the future.",
            "These tasks can be something like a 'Bounty' where the ecosystem projects can simply list out something they'd wanna do for their projects and list it there with a reward.The idea appears to be simple but finding projects who are willing to put up tasks there might be difficult since the Injective ecosystem is not very big at the moment & most teams operate independently."
        ]
    },
    {
        id: 3,
        title: "PHASE THREE - Mission Name Abstract",
        image: "https://placehold.co/800x250/e5e7eb/1f2937?text=Project+We+Love+Kickstarter",
        status: "Upcoming",
        descriptions: [
            "The page with all the different tasks related to the ecosystem and reward for those tasks.These tasks can be developer related for now, possibility of creator related tasks can be explored in the future.",
            "These tasks can be something like a 'Bounty' where the ecosystem projects can simply list out something they'd wanna do for their projects and list it there with a reward.The idea appears to be simple but finding projects who are willing to put up tasks there might be difficult since the Injective ecosystem is not very big at the moment & most teams operate independently."
        ]
    }
];

const CityZeroStadiumPage: React.FC = () => {
    return (
        <div className="stadium-page">
            {/* Hero Section */}
            <section className="stadium-hero-section">
                <div className="stadium-hero-image-container">
                    <img src="/CityZero/Stadium.png" alt="City Zero Stadium" className="stadium-hero-image" />
                </div>
            </section>

            {/* Content Section */}
            <section className="stadium-content-section">
                <div className="stadium-content">
                    {/* Header Row */}
                    <div className="stadium-header-row">
                        <div className="stadium-title-group">
                            <h1 className="stadium-title">City Zero Stadium Construction Project</h1>
                            <p className="stadium-deadline">Until 26th May 2026</p>
                        </div>
                        <div className="stadium-status-badge">
                            Ongoing
                        </div>
                    </div>

                    {/* Original Introduction & Progress */}
                    <div className="stadium-body-row">
                        <div className="stadium-text-column">
                            <h3 className="stadium-subtitle">BRIEF INTRODUCTION</h3>
                            <p>
                                The page with all the different tasks related to the ecosystem and reward for those tasks.These tasks can be developer related for now, possibility of creator related tasks can be explored in the future.
                            </p>
                            <p>
                                These tasks can be something like a 'Bounty' where the ecosystem projects can simply list out something they'd wanna do for their projects and list it there with a reward.The idea appears to be simple but finding projects who are willing to put up tasks there might be difficult since the Injective ecosystem is not very big at the moment & most teams operate independently.
                            </p>
                        </div>

                        <div className="stadium-progress-column">
                            <div className="progress-label">
                                70% Completed
                            </div>
                            <div className="progress-bar-container">
                                <div className="progress-bar-fill" style={{ width: '70%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Body Layout */}
                    <div className="stadium-advanced-body">
                        {/* Left Column: Mission Phase Cards */}
                        <div className="stadium-phases-column">
                            {PHASE_DATA.map((phase) => (
                                <div key={phase.id} className="phase-card">
                                    <div className="phase-image-wrapper">
                                        <img src={phase.image} alt={phase.title} className="phase-image" />
                                    </div>
                                    <div className="phase-header">
                                        <h3 className="phase-title">{phase.title}</h3>
                                        <span className={`phase-status-badge status-${phase.status.toLowerCase()}`}>
                                            {phase.status}
                                        </span>
                                    </div>
                                    <div className="phase-content">
                                        {phase.descriptions.map((desc, idx) => (
                                            <p key={idx}>{desc}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column: Sidebar Widgets */}
                        <div className="stadium-sidebar-column">
                            {/* Widget 1: Participants & Links */}
                            <div className="sidebar-widget">
                                <h4 className="widget-title">Participant</h4>
                                <div className="participant-list">
                                    <div className="participant-item">
                                        <img src="https://placehold.co/24x24/fbb/fff" alt="User" className="p-avatar" />
                                        <span>Alice Jeng</span>
                                    </div>
                                    <div className="participant-item">
                                        <img src="https://placehold.co/24x24/bbf/fff" alt="User" className="p-avatar" />
                                        <span>Dido</span>
                                    </div>
                                    <div className="participant-item">
                                        <img src="https://placehold.co/24x24/fbf/fff" alt="User" className="p-avatar" />
                                        <span>Ale'x</span>
                                    </div>
                                </div>
                                <h4 className="widget-title">Project Links</h4>
                                <a href="#" className="project-link-btn">www.figma/projectAAA.com</a>
                            </div>

                            {/* Widget 2: Support Pledge */}
                            <div className="sidebar-widget no-padding">
                                <div className="widget-header-wrapper">
                                    <h3 className="widget-main-title">Support</h3>
                                </div>
                                <div className="widget-body-wrapper">
                                    <h4 className="pledge-title">Make a pledge without a reward</h4>
                                    <div className="pledge-input-group">
                                        <div className="pledge-currency">HK$</div>
                                        <input type="number" defaultValue="10" className="pledge-input" />
                                    </div>
                                    <div className="pledge-about">ABOUT $2</div>
                                    <div className="pledge-reason-box">
                                        <h5>Back it because you believe in it.</h5>
                                        <p>Support the project for no reward, just because it speaks to you.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Widget 3: Available Rewards */}
                            <div className="sidebar-widget no-padding">
                                <div className="widget-header-wrapper">
                                    <h3 className="widget-main-title">Available rewards</h3>
                                </div>
                                <div className="widget-body-wrapper reward-body">
                                    <img src="https://placehold.co/300x200/efefef/666?text=Product+Hero" alt="Product" className="reward-product-image" />
                                    <div className="reward-pricing">
                                        <div className="reward-price-left">
                                            <h4>Late Pledge Price</h4>
                                            <p>| Aceii One x 1</p>
                                        </div>
                                        <div className="reward-price-right">
                                            <span className="currency">HK$</span>
                                            <span className="amount">11,692</span>
                                            <span className="approx">ABOUT $1,496</span>
                                        </div>
                                    </div>
                                    <div className="reward-details-list">
                                        <p className="highlight-text">🎯 Late Pledge Now Available — Save $600 OFF the $2,099 MSRP!</p>
                                        <p className="detail-header">⚡ INCLUDES:</p>
                                        <ul>
                                            <li>Aceii One Tennis Robot *1</li>
                                            <li>Portable Charger *1</li>
                                            <li>Aceii One Battery *1</li>
                                            <li>1-Year International Warranty</li>
                                        </ul>
                                        <p className="disclaimer">*Price may be displayed in HKD. Please change them to your local currency.</p>
                                    </div>
                                    <div className="reward-shipping-info">
                                        <div className="shipping-col">
                                            <span className="info-label">Backers</span>
                                            <span className="info-val">6</span>
                                        </div>
                                        <div className="shipping-col">
                                            <span className="info-label">Ships to</span>
                                            <span className="info-val">Anywhere in the world</span>
                                        </div>
                                        <div className="shipping-col">
                                            <span className="info-label">Estimated delivery</span>
                                            <span className="info-val">Feb 2026</span>
                                        </div>
                                        <div className="shipping-col">
                                            <span className="info-label">Limited quantity</span>
                                            <span className="info-val">194 left of 200</span>
                                        </div>
                                    </div>
                                    <div className="reward-footer">
                                        <span><strong>1 item included</strong> + optional add-ons</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="stadium-footer-actions">
                        <Link to="/city-zero" className="return-city-zero-btn">
                            Return to City Zero
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CityZeroStadiumPage;
