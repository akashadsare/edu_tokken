import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import CourseManagement from './components/CourseManagement';
import { Core } from '@quicknode/sdk';
import QUICKNODE_URL from './config'; // Ensure this path is correct

// Initialize QuickNode SDK
const core = new Core({
    endpointUrl: QUICKNODE_URL,
});

const App = () => {
    const [token, setToken] = useState(null); // State to manage authentication token
    const [view, setView] = useState('landing'); // Default view is landing page

    // Function to render the appropriate view based on the current state
    const renderView = () => {
        switch (view) {
            case 'landing':
                return <LandingPage setView={setView} />;
            case 'register':
                return <Register setView={setView} />;
            case 'login':
                return <Login setToken={setToken} setView={setView} />;
            case 'profile':
                return <Profile token={token} setView={setView} />;
            case 'courseManagement':
                return <CourseManagement token={token} />;
            default:
                return <LandingPage setView={setView} />;
        }
    };

    return (
        <div>
            {renderView()} {/* Render the current view */}
        </div>
    );
};

export default App;