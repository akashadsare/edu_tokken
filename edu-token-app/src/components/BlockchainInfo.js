import React from 'react';
import { useQuickNode } from '../hooks/useQuickNode';

const BlockchainInfo = ({ userAddress }) => {
    const { balance, eduBalance, blockNumber, loading, error } = useQuickNode(userAddress);

    if (loading) return <div>Loading blockchain data...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="blockchain-info">
            <h2>Blockchain Information</h2>
            <div className="info-grid">
                <div className="info-item">
                    <h3>Latest Block</h3>
                    <p>{blockNumber}</p>
                </div>
                {userAddress && (
                    <>
                        <div className="info-item">
                            <h3>ETH Balance</h3>
                            <p>{balance} ETH</p>
                        </div>
                        <div className="info-item">
                            <h3>EDU Token Balance</h3>
                            <p>{eduBalance} EDU</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlockchainInfo;