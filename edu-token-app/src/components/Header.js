// src/components/Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

const Header = ({ user, isConnected, userAddress, connectWallet, handleLogout }) => {
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <header className="header">
            <nav className="nav">
                {!user ? (
                    <>
                        <Link 
                            to="/login" 
                            className={`nav-item ${isActive('/login')}`}
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register" 
                            className={`nav-item ${isActive('/register')}`}
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/dashboard" 
                            className={`nav-item ${isActive('/dashboard')}`}
                        >
                            Dashboard
                        </Link>
                        <Link 
                            to="/marketplace" 
                            className={`nav-item ${isActive('/marketplace')}`}
                        >
                            Marketplace
                        </Link>
                        {isConnected ? (
                            <div className="wallet-info">
                                <span className="address">
                                    {userAddress?.slice(0, 6)}...{userAddress?.slice(-4)}
                                </span>
                                <Link 
                                    to="/wallet" 
                                    className={`nav-item ${isActive('/wallet')}`}
                                >
                                    Wallet
                                </Link>
                            </div>
                        ) : (
                            <button 
                                className="connect-wallet-btn"
                                onClick={connectWallet}
                            >
                                Connect Wallet
                            </button>
                        )}
                        <button 
                            className="nav-item logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;