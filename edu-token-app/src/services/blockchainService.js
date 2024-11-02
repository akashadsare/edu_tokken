// src/services/blockchainService.js
import { Core } from '@quicknode/sdk';

class BlockchainService {
    constructor() {
        this.core = new Core({
            endpointUrl: process.env.REACT_APP_QUICKNODE_URL || 'YOUR_QUICKNODE_ENDPOINT_URL',
        });
    }

    // Get account balance
    async getBalance(address) {
        try {
            const balance = await this.core.eth.getBalance(address);
            return this.core.utils.fromWei(balance, 'ether');
        } catch (error) {
            console.error('Error getting balance:', error);
            throw error;
        }
    }

    // Send transaction
    async sendTransaction(fromAddress, toAddress, amount, privateKey) {
        try {
            const weiValue = this.core.utils.toWei(amount.toString(), 'ether');
            const gasPrice = await this.core.eth.getGasPrice();
            
            const tx = {
                from: fromAddress,
                to: toAddress,
                value: weiValue,
                gas: '21000',
                gasPrice: gasPrice,
            };

            const signedTx = await this.core.eth.accounts.signTransaction(tx, privateKey);
            const receipt = await this.core.eth.sendSignedTransaction(signedTx.rawTransaction);
            return receipt;
        } catch (error) {
            console.error('Error sending transaction:', error);
            throw error;
        }
    }

    // Get transaction history
    async getTransactionHistory(address) {
        try {
            const history = await this.core.eth.getTransactionsByAddress(address);
            return history;
        } catch (error) {
            console.error('Error getting transaction history:', error);
            throw error;
        }
    }

    // Get latest block
    async getLatestBlock() {
        try {
            const block = await this.core.eth.getBlock('latest');
            return block;
        } catch (error) {
            console.error('Error getting latest block:', error);
            throw error;
        }
    }
}

export const blockchainService = new BlockchainService();