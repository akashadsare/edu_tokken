// src/App.js

import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import CourseManagement from './components/CourseManagement';

const App = () => {
    const [token, setToken] = useState(null);
    const [view, setView] = useState('landing'); // Default view is landing page

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
            {renderView()}
        </div>
    );
};

export default App;



