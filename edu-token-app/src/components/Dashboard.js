// src/components/Dashboard.js
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdaptiveLearningPath from './adaptive-learning/AdaptiveLearningPath';
import ContentMarketplace from './marketplace/ContentMarketplace';
import TutoringNetwork from './tutoring/TutoringNetwork';
import CourseTracker from './tracking/CourseTracker';

const Dashboard = ({ user, handleLogout }) => {
    const [activeSection, setActiveSection] = useState('overview');
    const navigate = useNavigate();

    const DashboardOverview = () => {
        return (
            <div className="dashboard-overview">
                <h2>Welcome back, {user?.username || 'User'}!</h2>
                <div className="overview-content">
                    <div className="stats-card">
                        <h3>Your Progress</h3>
                        <p>Courses completed: {user?.completedCourses?.length || 0}</p>
                        <p>Tokens earned: {user?.tokens || 0}</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection = () => {
        const userId = user?._id || user?.id;

        switch(activeSection) {
            case 'learning':
                return <AdaptiveLearningPath userId={userId} />;
            case 'marketplace':
                return <ContentMarketplace userId={userId} />;
            case 'tutoring':
                return <TutoringNetwork userId={userId} />;
            case 'progress':
                return <CourseTracker userId={userId} />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="profile-section">
                    <div className="profile-image">
                        {user?.username?.charAt(0) || 'U'}
                    </div>
                    <h3>{user?.username || 'User'}</h3>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveSection('overview')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`nav-item ${activeSection === 'learning' ? 'active' : ''}`}
                        onClick={() => navigate('/dashboard/courses')}
                    >
                        Learning Path
                    </button>
                    <button 
                        className={`nav-item ${activeSection === 'marketplace' ? 'active' : ''}`}
                        onClick={() => navigate('/marketplace')}
                    >
                        Marketplace
                    </button>
                    <button 
                        className={`nav-item ${activeSection === 'tutoring' ? 'active' : ''}`}
                        onClick={() => setActiveSection('tutoring')}
                    >
                        Tutoring
                    </button>
                    <button 
                        className={`nav-item ${activeSection === 'progress' ? 'active' : ''}`}
                        onClick={() => navigate('/dashboard/profile')}
                    >
                        Progress
                    </button>
                    <button className="nav-item logout" onClick={handleLogout}>
                        Logout
                    </button>
                </nav>
            </div>
            <div className="main-content">
                {activeSection === 'overview' ? renderSection() : <Outlet />}
            </div>
        </div>
    );
};

export default Dashboard;