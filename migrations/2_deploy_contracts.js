const EduToken = artifacts.require("EduToken");

module.exports = function(deployer) {
  deployer.deploy(EduToken, 1000000); // Initial supply of 1 million tokens
};