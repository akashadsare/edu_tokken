// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken, setView }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            setToken(response.data.token); // Store the token
            alert('Login successful!');
            setView('profile'); // Switch to profile view after successful login
        } catch (error) {
            alert(error.response.data);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <button onClick={() => setView('register')}>Register</button></p>
        </div>
    );
};

export default Login;