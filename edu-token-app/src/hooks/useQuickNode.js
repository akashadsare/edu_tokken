import { useState, useEffect } from 'react';
import { quickNodeService } from '../services/quickNodeService';

export const useQuickNode = (address) => {
    const [balance, setBalance] = useState(null);
    const [eduBalance, setEduBalance] = useState(null);
    const [blockNumber, setBlockNumber] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Get latest block
                const block = await quickNodeService.getLatestBlock();
                setBlockNumber(block);

                if (address) {
                    // Get ETH balance
                    const ethBalance = await quickNodeService.getBalance(address);
                    setBalance(ethBalance);

                    // Get EDU token balance if contract is deployed
                    const tokenBalance = await quickNodeService.getEduTokenBalance(
                        process.env.REACT_APP_EDU_TOKEN_ADDRESS,
                        address
                    );
                    setEduBalance(tokenBalance);
                }

                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        
        // Optional: Set up polling for real-time updates
        const interval = setInterval(fetchData, 15000); // Poll every 15 seconds
        
        return () => clearInterval(interval);
    }, [address]);

    return { balance, eduBalance, blockNumber, loading, error };
};