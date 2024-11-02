// src/components/TokenBalance.js
import React, { useState, useEffect } from 'react';
import { contractService } from '../services/contractService';

const TokenBalance = ({ address }) => {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (address) {
            fetchBalance();
        }
    }, [address]);

    const fetchBalance = async () => {
        try {
            setLoading(true);
            const balance = await contractService.getTokenBalance(address);
            setBalance(balance);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading token balance...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="token-balance">
            <h3>EDT Balance</h3>
            <p>{balance} EDT</p>
        </div>
    );
};

export default TokenBalance;