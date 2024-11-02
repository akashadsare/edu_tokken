// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet';
import Transaction from './components/Transaction';
import AdaptiveLearningPath from './components/adaptive-learning/AdaptiveLearningPath';
import ContentMarketplace from './components/marketplace/ContentMarketplace';
import CourseList from './components/courses/CourseList';
import CourseDetail from './components/courses/CourseDetail';
import Profile from './components/Profile';
import CheckBalance from './components/CheckBalance';
import SendTransaction from './components/SendTransaction';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userAddress, setUserAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsConnected(false);
    setUserAddress(null);
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setUserAddress(accounts[0]);
        setIsConnected(true);
      } else {
        alert('Please install MetaMask to use this application');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Header 
          user={user}
          isConnected={isConnected}
          userAddress={userAddress}
          connectWallet={connectWallet}
          handleLogout={handleLogout}
        />
        
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route 
    path="/register" 
    element={
        <Register 
            setToken={setToken} 
        />
    } 
/>
            <Route path="/dashboard/*" element={ user ? (
                <Dashboard user={user}>
                  <Routes>
                    <Route path="courses" element={<CourseList user={user} />} />
                    <Route path="courses/:id" element={<CourseDetail user={user} />} />
                    <Route path="profile" element={<Profile user={user} />} />
                    <Route path="check-balance" element={<CheckBalance />} />
                    <Route path="send-transaction" element={<SendTransaction />} />
                  </Routes>
                </Dashboard>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/wallet" element={<Wallet address={userAddress} />} />
            <Route path="/transaction" element={<Transaction userAddress={userAddress} />} />
            <Route path="/marketplace" element={<ContentMarketplace userId={userAddress} />} />
            <Route path="/" element={
              isConnected ? <AdaptiveLearningPath userId={userAddress} /> : <Navigate to="/login" />
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;