// src/components/Profile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ({ token, setView }) => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfileData(response.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch profile data');
            }
        };

        fetchProfileData();
    }, [token]);

    if (!profileData) return <div>Loading...</div>;

    const handleLogout = () => {
        setView('landing'); // Redirect to landing page
        setToken(null); // Clear token
    };

    return (
        <div>
            <h2>Profile</h2>
            <p>Username: {profileData.username}</p>
            <p>Tokens Balance: {profileData.tokens}</p>
            <p>Completed Courses: {profileData.completedCourses.join(', ')}</p>
            <button onClick={handleLogout}>Logout</button>
            <button onclick="fetchAccountBalance('0x1Efe5a321997d4bA7e7A2D9CA8D56F0201cD40B3')">Get Balance</button>
        </div>
    );
};

export default Profile;