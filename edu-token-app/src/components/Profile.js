import React from 'react';

const Profile = ({ token, handleLogout }) => {
    return (
        <div className="container">
            <h2>Profile</h2>
            <p>Your token: {token}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;