// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./EduToken.sol";

contract CourseManager {
    EduToken public eduToken;
    
    struct Course {
        string name;
        address educator;
        uint256 price;
        string contentHash; // IPFS hash of course content
        bool isActive;
    }
    
    struct Enrollment {
        bool isEnrolled;
        uint256 enrollmentDate;
        bool completed;
    }
    
    mapping(uint256 => Course) public courses;
    mapping(uint256 => mapping(address => Enrollment)) public enrollments;
    uint256 public courseCount;
    
    event CourseCreated(uint256 courseId, string name, address educator);
    event CourseEnrollment(uint256 courseId, address student);
    event CourseCompleted(uint256 courseId, address student);
    
    constructor(address _eduTokenAddress) {
        eduToken = EduToken(_eduTokenAddress);
    }
    
    function createCourse(
        string memory name,
        uint256 price,
        string memory contentHash
    ) external returns (uint256) {
        require(eduToken.isEducator(msg.sender), "Not an educator");
        
        courseCount++;
        courses[courseCount] = Course({
            name: name,
            educator: msg.sender,
            price: price,
            contentHash: contentHash,
            isActive: true
        });
        
        emit CourseCreated(courseCount, name, msg.sender);
        return courseCount;
    }
    
    function enrollInCourse(uint256 courseId) external {
        require(eduToken.isStudent(msg.sender), "Not a student");
        require(courses[courseId].isActive, "Course not active");
        require(!enrollments[courseId][msg.sender].isEnrolled, "Already enrolled");
        
        uint256 coursePrice = courses[courseId].price;
        require(
            eduToken.transferFrom(msg.sender, courses[courseId].educator, coursePrice),
            "Token transfer failed"
        );
        
        enrollments[courseId][msg.sender] = Enrollment({
            isEnrolled: true,
            enrollmentDate: block.timestamp,
            completed: false
        });
        
        emit CourseEnrollment(courseId, msg.sender);
    }
    
    function completeCourse(uint256 courseId, address student) external {
        require(msg.sender == courses[courseId].educator, "Not the course educator");
        require(enrollments[courseId][student].isEnrolled, "Student not enrolled");
        
        enrollments[courseId][student].completed = true;
        emit CourseCompleted(courseId, student);
    }
}