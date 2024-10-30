import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken, setView }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to handle error messages
    const [loading, setLoading] = useState(false); // State to manage loading status

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Set loading to true while waiting for response
        setError(''); // Clear previous error messages

        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            setToken(response.data.token); // Store the token
            alert('Login successful!');
            setView('profile'); // Switch to profile view after successful login
        } catch (error) {
            // Handle error response gracefully
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Login failed. Please try again.'); // Use a specific error message if available
            } else {
                setError('An unexpected error occurred.'); // Fallback error message
            }
        } finally {
            setLoading(false); // Reset loading state regardless of success or failure
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}> {/* Use form submission for better accessibility */}
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required // Ensure the field is filled before submission
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required // Ensure the field is filled before submission
                />
                <button type="submit" disabled={loading}> {/* Disable button while loading */}
                    {loading ? 'Logging in...' : 'Login'} {/* Show loading text */}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if exists */}
            <p>Don't have an account? <button onClick={() => setView('register')}>Register</button></p>
        </div>
    );
};

export default Login;