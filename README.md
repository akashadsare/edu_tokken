# Educational Token Platform (EDU Token)

A Decentralized Learning Management System (DLMS) that leverages blockchain technology to facilitate the administration, tracking, and delivery of educational courses and training programs. This platform uses EDU tokens as an incentive mechanism for learning and teaching.

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/akashadsare/edu_tokken)](https://github.com/akashadsare/edu_tokken/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/akashadsare/edu_tokken)](https://github.com/akashadsare/edu_tokken/network)
[![GitHub issues](https://img.shields.io/github/issues/akashadsare/edu_tokken)](https://github.com/akashadsare/edu_tokken/issues)
[![GitHub license](https://img.shields.io/github/license/akashadsare/edu_tokken)](https://github.com/akashadsare/edu_tokken/blob/main/LICENSE)

</div>

## 🚀 Features

- **🔗 Blockchain Integration**: Built on Ethereum using QuickNode for reliable blockchain connectivity
- **🪙 Token System**: EDU tokens for rewarding learning achievements and participation
- **📚 Adaptive Learning**: Personalized learning paths based on user progress
- **🏪 Content Marketplace**: P2P marketplace for educational content
- **📊 Course Management**: Create, enroll in, and track progress in courses
- **👛 Wallet Integration**: MetaMask integration for token transactions
- **🔐 User Authentication**: Secure login and registration system

## 💻 Technical Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Blockchain**: Ethereum (Sepolia testnet)
- **Smart Contracts**: Solidity
- **Web3 Integration**: Web3.js, QuickNode SDK

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- MetaMask browser extension
- QuickNode API key
- Ethereum wallet with test ETH (for Sepolia testnet)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/akashadsare/edu_tokken.git
```
2. Install dependencies:
```bash
# Frontend
cd edu-token-app
npm install

# Backend
cd ../edu-token-backend
npm install
```
Configure environment variables:
.env
```# Frontend (.env)
REACT_APP_QUICKNODE_HTTP_ENDPOINT=your_quicknode_endpoint
REACT_APP_CONTRACT_ADDRESS=your_contract_address

# Backend (.env)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start development servers:

```bash
# Frontend
cd edu-token-app
npm start

# Backend
cd edu-token-backend
node server.js
```
📄 Smart Contracts
Our platform utilizes the following smart contracts:

- EduToken: Main token contract
- CourseNFT: NFT contract for course certificates
- CourseManager: Manages course creation and enrollment
- LearningPathManager: Handles learning path progression

📚 API Endpoints
- Auth
POST /register: New user registration
POST /login: User login
- Courses
GET /courses: List all courses
GET /courses/:id: Course details
POST /courses: Create a course
POST /courses/:id/enroll: Course enrollment
- User
GET /profile: User profile
PUT /profile: Update profile
GET /progress: Learning progress

🧪 Testing
```sh
Insert Code
Edit
Copy code
# Frontend tests
cd edu-token-app && npm test

# Smart contract tests
truffle test
```
🔒 Security
JWT authentication
Encrypted password storage
Smart contract best practices
Protected API endpoints
🤝 Contributing
Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
📜 License
Distributed under the MIT License. See LICENSE for more information.

📞 Contact
Akash Adsare - ghost.boy123@outlook.com

Project Link: https://github.com/akashadsare/edu_tokken

🙏 Acknowledgments
OpenZeppelin for smart contract libraries
QuickNode for blockchain infrastructure
React community for frontend tools and libraries
