import { QuickNodeProvider } from '@quicknode/sdk';
import Web3 from 'web3';

class QuickNodeService {
    constructor() {
        // Initialize QuickNode provider
        this.provider = new QuickNodeProvider({
            url: process.env.REACT_APP_QUICKNODE_HTTP_ENDPOINT
        });
        
        // Initialize Web3 with QuickNode provider
        this.web3 = new Web3(this.provider);
    }

    // Get latest block number
    async getLatestBlock() {
        try {
            return await this.web3.eth.getBlockNumber();
        } catch (error) {
            console.error('Error getting latest block:', error);
            throw error;
        }
    }

    // Get account balance
    async getBalance(address) {
        try {
            const balance = await this.web3.eth.getBalance(address);
            return this.web3.utils.fromWei(balance, 'ether');
        } catch (error) {
            console.error('Error getting balance:', error);
            throw error;
        }
    }

    // Get EduToken balance
    async getEduTokenBalance(contractAddress, userAddress) {
        try {
            const contract = new this.web3.eth.Contract(EduTokenABI, contractAddress);
            const balance = await contract.methods.balanceOf(userAddress).call();
            return this.web3.utils.fromWei(balance, 'ether');
        } catch (error) {
            console.error('Error getting EDU token balance:', error);
            throw error;
        }
    }
}

export const quickNodeService = new QuickNodeService();