// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Login = ({ setToken, setUser }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            const { token, user } = response.data;
            
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            navigate('/dashboard'); // Navigate to dashboard after successful login
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login to Your Account</h2>
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="login-button">Login</button>
                
                <p className="register-link">
                    Don't have an account?{' '}
                    <button 
                        type="button"
                        className="link-button"
                        onClick={() => navigate('/register')}
                    >
                        Register here
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;