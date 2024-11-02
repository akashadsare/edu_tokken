// src/components/adaptive-learning/AdaptiveLearningPath.js
import React, { useState, useEffect } from 'react';
import { Web3Provider } from '../../services/web3';
import './AdaptiveLearning.css';

const AdaptiveLearningPath = ({ userId }) => {
    const [learningPath, setLearningPath] = useState(null);
    const [currentModule, setCurrentModule] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        fetchLearningPath();
    }, [userId]);

    const fetchLearningPath = async () => {
        try {
            const response = await fetch(`/api/learning-path/${userId}`);
            const data = await response.json();
            setLearningPath(data);
            setCurrentModule(data.currentModule);
        } catch (error) {
            console.error('Error fetching learning path:', error);
        }
    };

    const updateProgress = async (moduleId, progress) => {
        try {
            await fetch(`/api/update-progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    moduleId,
                    progress
                })
            });
            setProgress(progress);
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

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
                </div>
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