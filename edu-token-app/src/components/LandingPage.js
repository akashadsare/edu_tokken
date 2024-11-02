import React from 'react';
import './styles.css';

const LandingPage = () => {
    return (
        <div className="container">
            <h2>Welcome to My Learning Platform</h2>
            <p>Explore a variety of courses and enhance your skills.</p>
            <div className="card">
                <h2>Course Title 1</h2>
                <p>Description of the course goes here. Learn more about this topic!</p>
            </div>
            <div className="card">
                <h2>Course Title 2</h2>
                <p>Description of the course goes here. Learn more about this topic!</p>
            </div>
            <div className="card">
                <h2>Course Title 3</h2>
                <p>Description of the course goes here. Learn more about this topic!</p>
            </div>
        </div>
    );
};

export default LandingPage;