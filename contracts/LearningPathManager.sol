// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract LearningPathManager {
    struct LearningPath {
        string name;
        uint256[] courseIds;
        uint256 tokenReward;
        bool isActive;
    }
    
    mapping(uint256 => LearningPath) public learningPaths;
    uint256 public pathCount;
    
    event PathCreated(uint256 pathId, string name);
    event PathCompleted(uint256 pathId, address student);
    
    function createLearningPath(
        string memory name,
        uint256[] memory courseIds,
        uint256 tokenReward
    ) external returns (uint256) {
        pathCount++;
        learningPaths[pathCount] = LearningPath({
            name: name,
            courseIds: courseIds,
            tokenReward: tokenReward,
            isActive: true
        });
        
        emit PathCreated(pathCount, name);
        return pathCount;
    }
}