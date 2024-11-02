// src/components/Wallet.js
import React, { useState, useEffect } from 'react';
import { blockchainService } from '../services/blockchainService';

const Wallet = ({ address }) => {
    const [balance, setBalance] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (address) {
            fetchWalletData();
        }
    }, [address]);

    const fetchWalletData = async () => {
        try {
            setLoading(true);
            const [balanceData, txHistory] = await Promise.all([
                blockchainService.getBalance(address),
                blockchainService.getTransactionHistory(address)
            ]);
            
            setBalance(balanceData);
            setTransactions(txHistory);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading wallet data...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="wallet-container">
            <h2>Wallet Details</h2>
            <div className="balance-section">
                <h3>Balance</h3>
                <p>{balance} ETH</p>
            </div>
            <div className="transactions-section">
                <h3>Recent Transactions</h3>
                <div className="transaction-list">
                    {transactions.map((tx, index) => (
                        <div key={index} className="transaction-item">
                            <p>Hash: {tx.hash}</p>
                            <p>From: {tx.from}</p>
                            <p>To: {tx.to}</p>
                            <p>Value: {blockchainService.core.utils.fromWei(tx.value, 'ether')} ETH</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wallet;