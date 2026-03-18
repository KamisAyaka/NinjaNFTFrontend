import React from 'react';
import './CityZeroTasks.css';

import { Link } from 'react-router-dom';

type TaskCardProps = {
    category: string;
    categoryColor: string; // e.g., '#93c5fd' for blue, '#fde047' for yellow, '#86efac' for green
    imageSrc: string;
    title: string;
    description: string;
    linkUrl?: string; // Made optional
};

const TaskCard: React.FC<TaskCardProps> = ({ category, categoryColor, imageSrc, title, description, linkUrl }) => {
    const cardContent = (
        <>
            <div
                className="task-card-header"
                style={{ backgroundColor: categoryColor }}
            >
                <span className="task-category">{category}</span>
            </div>
            <div className="task-card-image-wrapper">
                <img src={imageSrc} alt={title} className="task-card-image" />
            </div>
            <div className="task-card-content">
                <h3 className="task-card-title">{title}</h3>
                <p className="task-card-desc">{description}</p>
            </div>
        </>
    );

    if (linkUrl) {
        return (
            <Link to={linkUrl} className="city-task-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                {cardContent}
            </Link>
        );
    }

    return (
        <div className="city-task-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            {cardContent}
        </div>
    );
};



const COMMUNITY_DATA: TaskCardProps[] = [
    {
        category: "Community Project",
        categoryColor: "#57a8d4", // Blue similar to the screenshot
        imageSrc: "/CityZero/community_page1.png",
        title: "Metaloft",
        description: "MetaLoft is an immersive platform where users naturally own, trade, and govern their digital worlds through creation and social interaction. We are building a livable, social, creative, and monetizable digital apartment ecosystem, empowering every user to shape and inhabit a world that truly belongs to them, in the future.",
        linkUrl: "/city-zero/task-board"
    },
    {
        category: "Community Project",
        categoryColor: "#57a8d4",
        imageSrc: "/CityZero/inj_pass.png",
        title: "Injective Pass",
        description: "Injective Pass abstracts Web3 identity, creating the bridge between Web2 and Web3.",
        linkUrl: "/city-zero/job-board"
    },
    {
        category: "Community Project",
        categoryColor: "#57a8d4",
        imageSrc: "/Ninja Labs CN-banner-2-2.jpg",
        title: "N1NJ4",
        description: "N1NJ4 NFT 旨在构建一个专属的开发者社区身份系统。这是一个大规模的生成艺术作品，一种全新的数字所有权模式，以及一个内置的社区贡献激励系统。未来会有更多城市和不同的忍者特工登录N1NJ4世界，打造一个丰富可供探索的数字世界",
        linkUrl: "/city-zero/grants-hub"
    }
];

// Helper to duplicate data to ensure marquee has enough length to loop
const getDuplicatedData = (data: TaskCardProps[], times: number = 4) => {
    let result: TaskCardProps[] = [];
    for (let i = 0; i < times; i++) {
        // We add an index to the map loop but the data itself is just repeated
        result = [...result, ...data];
    }
    return result;
}


const CityZeroTasks: React.FC = () => {

    const row2Data = getDuplicatedData([COMMUNITY_DATA[0], COMMUNITY_DATA[1], COMMUNITY_DATA[2]]);

    return (
        <section className="city-tasks-section">
            <div className="city-tasks-container">
                <h2 className="city-tasks-title">COMMUNITY GALLERY</h2>

                <div className="tasks-marquee-container">
                    {/* Row 2: Right to Left */}
                    <div className="marquee-row marquee-right-to-left">
                        <div className="marquee-track">
                            {row2Data.map((task, idx) => (
                                <TaskCard key={`row2-${idx}`} {...task} />
                            ))}
                        </div>
                        {/* Duplicate track for seamless infinite scroll */}
                        <div className="marquee-track">
                            {row2Data.map((task, idx) => (
                                <TaskCard key={`row2-dup-${idx}`} {...task} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CityZeroTasks;
