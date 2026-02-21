import React from 'react';
import './CityZeroTasks.css';

type TaskCardProps = {
    category: string;
    categoryColor: string; // e.g., '#93c5fd' for blue, '#fde047' for yellow, '#86efac' for green
    imageSrc: string;
    title: string;
    description: string;
};

const TaskCard: React.FC<TaskCardProps> = ({ category, categoryColor, imageSrc, title, description }) => {
    return (
        <div className="city-task-card">
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
        </div>
    );
};

// Dummy Data
const DUMMY_DATA: TaskCardProps[] = [
    {
        category: "Task Board",
        categoryColor: "#93c5fd", // Light Blue
        imageSrc: "/CityZero/task_board.png",
        title: "AI Hackathon at Ohio State",
        description: "Join us for the AI Hackathon at Ohio State, a 24-hour, in-person student hackathon on February 27th & 28th. Sponsored by IBM SkillsBuild in collaboration with the Buckeye Fintech Group, this event invites college students to build AI-powered solutions to real-world challenges in education and finance."
    },
    {
        category: "Grants Hub",
        categoryColor: "#fef08a", // Light Yellow
        imageSrc: "/CityZero/grants_hub.png",
        title: "AI Hackathon at Ohio State",
        description: "Join us for the AI Hackathon at Ohio State, a 24-hour, in-person student hackathon on February 27th & 28th. Sponsored by IBM SkillsBuild in collaboration with the Buckeye Fintech Group, this event invites college."
    },
    {
        category: "Job Board",
        categoryColor: "#bbf7d0", // Light Green
        imageSrc: "/CityZero/job.png",
        title: "AI Hackathon at Ohio State",
        description: "Join us for the AI Hackathon at Ohio State, a 24-hour, in-person student hackathon on February 27th & 28th. Sponsored by IBM SkillsBuild in collaboration with the Buckeye Fintech Group, this event invites college students to build AI-powered solutions to real-world challenges in education and finance."
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

    // Create enough items so the screen is always full during animation
    const row1Data = getDuplicatedData([DUMMY_DATA[0], DUMMY_DATA[1], DUMMY_DATA[2], DUMMY_DATA[0]]);
    const row2Data = getDuplicatedData([DUMMY_DATA[2], DUMMY_DATA[1], DUMMY_DATA[0], DUMMY_DATA[1]]);

    return (
        <section className="city-tasks-section">
            <div className="tasks-marquee-container">

                {/* Row 1: Left to Right */}
                <div className="marquee-row marquee-left-to-right">
                    <div className="marquee-track">
                        {row1Data.map((task, idx) => (
                            <TaskCard key={`row1-${idx}`} {...task} />
                        ))}
                    </div>
                    {/* Duplicate track for seamless infinite scroll */}
                    <div className="marquee-track">
                        {row1Data.map((task, idx) => (
                            <TaskCard key={`row1-dup-${idx}`} {...task} />
                        ))}
                    </div>
                </div>

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
        </section>
    );
};

export default CityZeroTasks;
