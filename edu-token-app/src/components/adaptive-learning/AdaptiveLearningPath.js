// src/components/adaptive-learning/AdaptiveLearningPath.js
import React, { useState, useEffect } from 'react';
import './AdaptiveLearning.css';

const AdaptiveLearningPath = ({ userId }) => {
    const [learningPath, setLearningPath] = useState(null);
    const [currentModule, setCurrentModule] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userId) {
            fetchLearningPath();
        }
    }, [userId]);

    const fetchLearningPath = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/learning-path/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch learning path');
            }
            const data = await response.json();
            setLearningPath(data);
            setCurrentModule(data.currentModule);
            setProgress(data.progress);
        } catch (error) {
            console.error('Error fetching learning path:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateProgress = async (moduleId, newProgress) => {
        try {
            const response = await fetch(`/api/update-progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    moduleId,
                    progress: newProgress
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update progress');
            }
            setProgress(newProgress);
        } catch (error) {
            console.error('Error updating progress:', error);
            setError(error.message);
        }
    };

    if (isLoading) {
        return <div className="loading">Loading learning path...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!learningPath) {
        return <div className="no-data">No learning path available.</div>;
    }

    return (
        <div className="adaptive-learning-container">
            <h2>Your Learning Path</h2>
            <div className="progress-indicator">
                <div className="progress-bar">
                    <div 
                        className="progress-fill" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <span>{progress}% Complete</span>
            </div>
            
            <div className="current-module">
                <h3>Current Module: {currentModule?.title}</h3>
                <p>{currentModule?.description}</p>
                <div className="module-content">
                    {/* Render module content */}
                    {currentModule?.content}
                </div>
                <button onClick={() => updateProgress(currentModule?.id, progress + 10)}>
                    Mark as Complete
                </button>
            </div>

            <div className="recommended-paths">
                <h3>Recommended Next Steps</h3>
                {learningPath?.recommendations?.map(rec => (
                    <div key={rec.id} className="recommendation-card">
                        <h4>{rec.title}</h4>
                        <p>{rec.description}</p>
                        <button onClick={() => setCurrentModule(rec)}>
                            Start Module
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdaptiveLearningPath;