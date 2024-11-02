// src/services/contractService.js
import { ethers } from 'ethers';
import EduToken from '../contracts/EduToken.json';

class ContractService {
    constructor() {
        this.contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.contract = new ethers.Contract(
            this.contractAddress,
            EduToken.abi,
            this.provider.getSigner()
        );
    }

    async getTokenBalance(address) {
        try {
            const balance = await this.contract.balanceOf(address);
            return ethers.utils.formatEther(balance);
        } catch (error) {
            console.error('Error getting token balance:', error);
            throw error;
        }
    }

    async transferTokens(to, amount) {
        try {
            const tx = await this.contract.transfer(
                to, 
                ethers.utils.parseEther(amount.toString())
            );
            return await tx.wait();
        } catch (error) {
            console.error('Error transferring tokens:', error);
            throw error;
        }
    }

    async updateUserProgress(user, progress) {
        try {
            const tx = await this.contract.updateProgress(user, progress);
            return await tx.wait();
        } catch (error) {
            console.error('Error updating progress:', error);
            throw error;
        }
    }
}

export const contractService = new ContractService();