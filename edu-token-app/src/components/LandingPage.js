// src/components/LandingPage.js

import React from 'react';
import './LandingPage.css'; // Import the CSS file for styling

const LandingPage = ({ setView }) => {
    const handleLoginRedirect = () => {
        // Logic to check if user is logged in and redirect accordingly
    };
    return (
        <div className="landing-container">
            <header className="landing-header">
                <h1>Welcome to EduToken</h1>
                <p>Your gateway to decentralized learning.</p>
                <button onClick={() => setView('register')}>Get Started</button>
                <button onClick={() => setView('login')}>Login</button>
            
                <button onClick={() => setView('courseManagement')}>Manage Courses</button>
            </header>
            <section className="features">
                <h2>Features</h2>
                <div className="feature">
                    <h3>Earn Tokens</h3>
                    <p>Complete courses and earn tokens that can be redeemed for educational resources.</p>
                </div>
                <div className="feature">
                    <h3>Decentralized Learning</h3>
                    <p>Access courses anytime, anywhere, with full control over your learning journey.</p>
                </div>
                <div className="feature">
                    <h3>Community Driven</h3>
                    <p>Join a community of learners and educators sharing knowledge and resources.</p>
                </div>
            </section>
            <footer className="landing-footer">
                <p>&copy; 2024 EduToken. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;




// src/components/LandingPage.js

// Add this function inside LandingPage component



// In the header section of LandingPage















