// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CourseNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    struct Certificate {
        string courseName;
        address student;
        uint256 completionDate;
        string ipfsHash; // For storing certificate metadata
    }
    
    mapping(uint256 => Certificate) public certificates;
    
    constructor() ERC721("Course Certificate", "CERT") {}
    
    function issueCertificate(
        address student,
        string memory courseName,
        string memory ipfsHash
    ) external returns (uint256) {
        _tokenIds.increment();
        uint256 newCertificateId = _tokenIds.current();
        
        _mint(student, newCertificateId);
        
        certificates[newCertificateId] = Certificate({
            courseName: courseName,
            student: student,
            completionDate: block.timestamp,
            ipfsHash: ipfsHash
        });
        
        return newCertificateId;
    }
}