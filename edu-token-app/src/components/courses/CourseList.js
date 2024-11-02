// src/components/courses/CourseList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

const CourseList = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/courses');
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p>Tokens: {course.tokensEarned}</p>
            <Link to={`/courses/${course._id}`} className="view-course-btn">
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;