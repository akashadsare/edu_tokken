import React, { useState } from 'react';
import { Core } from '@quicknode/sdk';
import { QUICKNODE_URL } from '../config';

const CheckBalance = () => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');

    const core = new Core({
        endpointUrl: QUICKNODE_URL,
    });

    const fetchBalance = async () => {
        setError('');
        try {
            const weiBalance = await core.eth.getBalance(address);
            const ethBalance = parseFloat(weiBalance) / 1e18; // Convert Wei to Ether
            setBalance(ethBalance);
        } catch (err) {
            setError('Error fetching balance. Please check the address.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Check Ethereum Balance</h2>
            <input
                type="text"
                placeholder="Enter Ethereum Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={fetchBalance}>Check Balance</button>
            {balance !== null && <p>Balance: {balance} ETH</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CheckBalance;