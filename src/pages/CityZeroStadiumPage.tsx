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
        title: "Ninja Labs: City Zero Construction",
        image: "https://placehold.co/800x250/bbf7d0/1f2937?text=Characters+Concept+Art",
        status: "Ongoing",
        descriptions: [
            "City Zero is now open for long-term builder partnerships. If you are a developer or a project team looking for a home, we want to hear from you. Reach out to Ninja Labs and we will work with you on bringing your project into the city.",
            "Projects that join will get featured across City Zero and receive ongoing support from the Ninja Labs team. You can also offer your project as a resource or service to the broader community, making it a permanent part of what City Zero has to offer. This is not a short-term grant program. It is an open invitation to build here for the long run."
        ]
    },
    {
        id: 2,
        title: "AI Frontier Bootcamp",
        image: "https://placehold.co/800x400/93c5fd/1f2937?text=Collector's+Passport",
        status: "Upcoming",
        descriptions: [
            "Coming soon. Details will be revealed shortly."
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
                            <h1 className="stadium-title">City Zero Stadium</h1>
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
                                City Zero Stadium is the playground that Ninja Labs built for the residents of City Zero. This is where you will find our major ongoing events and a direct line to interact with the Ninja Labs team.
                            </p>
                            <p>
                                The Stadium is also where we share participation opportunities as they come up, whether that means joining a campaign, contributing to something we are building, or simply being part of what is happening in the community. If you are a builder, this is also where we post growth opportunities designed specifically for people who want to create and ship things within City Zero. Come check in regularly. There is usually something worth your attention.
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

                            {/* Widget 3: Grants & Incubation */}
                            <div className="sidebar-widget no-padding">
                                <div className="widget-header-wrapper">
                                    <h3 className="widget-main-title">Grants &amp; Incubation</h3>
                                </div>
                                <div className="widget-body-wrapper grants-body">
                                    <p className="grants-intro">
                                        Ninja Labs runs two programs to fund and support builders in City Zero. Both are non-dilutive. No equity, no token allocation required.
                                    </p>

                                    <div className="grants-section">
                                        <div className="grants-section-header">
                                            <span className="grants-badge grants-badge-green">Community Grants</span>
                                        </div>
                                        <p className="grants-section-desc">
                                            Direct funding for projects that benefit City Zero citizens. Grants are approved by N1NJ4 holders through on-chain voting, milestone-based, and fully transparent on Injective.
                                        </p>
                                        <div className="grants-tags">
                                            <span className="grants-tag">Open Source Infra</span>
                                            <span className="grants-tag">Consumer Apps</span>
                                            <span className="grants-tag">Research</span>
                                            <span className="grants-tag">Community Building</span>
                                        </div>
                                    </div>

                                    <div className="grants-divider" />

                                    <div className="grants-section">
                                        <div className="grants-section-header">
                                            <span className="grants-badge grants-badge-blue">Incubation</span>
                                        </div>
                                        <p className="grants-section-desc">
                                            A structured support path for builders who want to grow a lasting project inside City Zero. Goes beyond a one-time grant.
                                        </p>
                                        <ul className="grants-list">
                                            <li>Multi-phase sustained funding tied to milestones</li>
                                            <li>Direct technical support from Ninja Labs engineers</li>
                                            <li>Featured as an endorsed City Zero project</li>
                                            <li>Mentorship from experienced web3 builders</li>
                                            <li>On-chain credentialing of your deliverables</li>
                                        </ul>
                                    </div>

                                    <a
                                        href="https://n1nj4.mintlify.app/economy/grants-incubation"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="grants-apply-btn"
                                    >
                                        Learn More
                                    </a>
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
