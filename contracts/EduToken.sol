// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EduToken is ERC20, Ownable {
    mapping(address => bool) public isEducator;
    mapping(address => bool) public isStudent;
    
    constructor() ERC20("Education Token", "EDU") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
    
    function registerAsEducator() external {
        isEducator[msg.sender] = true;
    }
    
    function registerAsStudent() external {
        isStudent[msg.sender] = true;
    }
    
    function mintTokens(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}