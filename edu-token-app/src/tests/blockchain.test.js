// src/tests/blockchain.test.js
import { blockchainService } from '../services/blockchainService';
import { contractService } from '../services/contractService';

describe('Blockchain Integration Tests', () => {
    test('Should connect to QuickNode', async () => {
        const block = await blockchainService.getLatestBlock();
        expect(block).toBeDefined();
    });

    test('Should get token balance', async () => {
        const address = '0x...'; // Test address
        const balance = await contractService.getTokenBalance(address);
        expect(balance).toBeDefined();
    });
});