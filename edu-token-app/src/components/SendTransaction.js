import React, { useState } from 'react';
import { Core } from '@quicknode/sdk';
import { QUICKNODE_URL } from '../config';

const SendTransaction = () => {
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [error, setError] = useState('');

    const core = new Core({
        endpointUrl: QUICKNODE_URL,
    });

    const sendEther = async () => {
        setError('');
        try {
            const weiValue = core.utils.toWei(amount, 'ether');
            const gasPrice = await core.eth.getGasPrice();

            const tx = {
                from: fromAddress,
                to: toAddress,
                value: weiValue,
                gas: 21000,
                gasPrice: gasPrice,
            };

            const signedTx = await core.eth.accounts.signTransaction(tx, privateKey);
            const receipt = await core.eth.sendSignedTransaction(signedTx.rawTransaction);
            setTransactionHash(receipt.transactionHash);
        } catch (err) {
            setError('Error sending transaction. Please check your details.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Send Ether</h2>
            <input
                type="text"
                placeholder="From Address"
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="To Address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="Amount in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="text"
                placeholder="Private Key"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
            />
            <button onClick={sendEther}>Send Ether</button>
            {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SendTransaction;