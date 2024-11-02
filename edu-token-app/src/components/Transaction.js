// src/components/Transaction.js
import React, { useState } from 'react';
import { blockchainService } from '../services/blockchainService';

const Transaction = ({ userAddress }) => {
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const receipt = await blockchainService.sendTransaction(
                userAddress,
                toAddress,
                amount,
                privateKey
            );
            setSuccess(`Transaction successful! Hash: ${receipt.transactionHash}`);
            setToAddress('');
            setAmount('');
            setPrivateKey('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="transaction-container">
            <h2>Send Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>To Address:</label>
                    <input
                        type="text"
                        value={toAddress}
                        onChange={(e) => setToAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Amount (ETH):</label>
                    <input
                        type="number"
                        step="0.000001"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Private Key:</label>
                    <input
                        type="password"
                        value={privateKey}
                        onChange={(e) => setPrivateKey(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Transaction'}
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
        </div>
    );
};

export default Transaction;