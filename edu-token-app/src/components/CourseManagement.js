// src/components/CourseManagement.js

import React, { useState } from 'react';
import axios from 'axios';

const CourseManagement = ({ token }) => {
    const [courseName, setCourseName] = useState('');
    const [tokensEarned, setTokensEarned] = useState('');
    const [courses, setCourses] = useState([]);

    const handleCreateCourse = async () => {
        try {
            await axios.post('http://localhost:5000/courses', { name: courseName, tokensEarned: Number(tokensEarned) }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Course created successfully!');
            fetchCourses(); // Refresh course list
        } catch (error) {
            alert(error.response.data);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/courses', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCourses(response.data);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch courses');
        }
    };

    return (
        <div>
            <h2>Create Course</h2>
            <input type="text" placeholder="Course Name" onChange={(e) => setCourseName(e.target.value)} />
            <input type="number" placeholder="Tokens Earned" onChange={(e) => setTokensEarned(e.target.value)} />
            <button onClick={handleCreateCourse}>Create Course</button>

            <h3>Your Courses</h3>
            <button onClick={fetchCourses}>Refresh Courses</button>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>{course.name} - Earn Tokens: {course.tokensEarned}</li>
                ))}
            </ul>
        </div>
    );
};

export default CourseManagement;