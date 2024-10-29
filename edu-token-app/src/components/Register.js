// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setView }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/register', { username, password });
            alert('User registered successfully!');
            setView('login'); // Switch to login view after successful registration
        } catch (error) {
            alert(error.response.data);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account? <button onClick={() => setView('login')}>Login</button></p>
        </div>
    );
};

export default Register;