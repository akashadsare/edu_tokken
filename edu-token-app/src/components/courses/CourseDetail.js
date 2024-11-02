// src/components/courses/CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Courses.css';

const CourseDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/courses/${id}`);
        if (!response.ok) {
          throw new Error('Course not found');
        }
        const data = await response.json();
        setCourse(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const response = await fetch(`http://localhost:5000/courses/${id}/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        // Handle successful enrollment
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  if (loading) return <div>Loading course details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="course-detail">
      <h2>{course.name}</h2>
      <div className="course-info">
        <p>{course.description}</p>
        <p>Tokens to earn: {course.tokensEarned}</p>
        <p>Duration: {course.duration}</p>
      </div>
      <div className="course-content">
        {/* Course content sections */}
      </div>
      <button 
        onClick={handleEnroll}
        className="enroll-button"
      >
        Enroll in Course
      </button>
    </div>
  );
};

export default CourseDetail;