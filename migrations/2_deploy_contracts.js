const EduToken = artifacts.require("EduToken");
const CourseNFT = artifacts.require("CourseNFT");
const CourseManager = artifacts.require("CourseManager");
const LearningPathManager = artifacts.require("LearningPathManager");

module.exports = async function(deployer) {
    // Deploy EduToken
    await deployer.deploy(EduToken);
    const eduToken = await EduToken.deployed();
    
    // Deploy CourseNFT
    await deployer.deploy(CourseNFT);
    
    // Deploy CourseManager with EduToken address
    await deployer.deploy(CourseManager, eduToken.address);
    
    // Deploy LearningPathManager
    await deployer.deploy(LearningPathManager);
};