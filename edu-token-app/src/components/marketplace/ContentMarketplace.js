// src/components/marketplace/ContentMarketplace.js
import React, { useState, useEffect } from 'react';
import './ContentMarketplace.css';

const ContentMarketplace = ({ userId }) => {
    const [content, setContent] = useState([]);
    const [userContent, setUserContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userId) {
            fetchMarketplaceContent();
            fetchUserContent();
        }
    }, [userId]);

    const fetchMarketplaceContent = async () => {
        try {
            const response = await fetch('/api/marketplace-content');
            if (!response.ok) {
                throw new Error('Failed to fetch marketplace content');
            }
            const data = await response.json();
            setContent(data);
        } catch (error) {
            console.error('Error fetching marketplace content:', error);
            setError(error.message);
        }
    };

    const fetchUserContent = async () => {
        try {
            const response = await fetch(`/api/user-content/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user content');
            }
            const data = await response.json();
            setUserContent(data);
        } catch (error) {
            console.error('Error fetching user content:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleContentUpload = async (contentData) => {
        try {
            const response = await fetch('/api/upload-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    ...contentData
                })
            });
            if (!response.ok) {
                throw new Error('Failed to upload content');
            }
            fetchMarketplaceContent();
        } catch (error) {
            console.error('Error uploading content:', error);
            setError(error.message);
        }
    };

    const handlePurchase = async (contentId) => {
        try {
            const response = await fetch('/api/purchase-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    contentId
                })
            });
            if (!response.ok) {
                throw new Error('Failed to purchase content');
            }
            fetchUserContent();
        } catch (error) {
            console.error('Error purchasing content:', error);
            setError(error.message);
        }
    };

    if (isLoading) {
        return <div className="loading">Loading marketplace content...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="content-marketplace">
            <h2>Content Marketplace</h2>
            <div className="content-upload">
                <h3>Upload New Content</h3>
                {/* Add a form for content upload */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleContentUpload({
                        title: e.target.title.value,
                        description: e.target.description.value,
                        price: e.target.price.value
                    });
                }}>
                    <input type="text" name="title" placeholder="Content Title" required />
                    <textarea name="description" placeholder="Content Description" required />
                    <input type="number" name="price" placeholder="Price in Tokens" required />
                    <button type="submit">Upload Content</button>
                </form>
            </div>
            <div className="content-listings">
                <h3>Available Content</h3>
                {content.map(item => (
                    <div key={item.id} className="content-card">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p >
                        <span>Price: {item.price} Tokens</span>
                        {userContent.includes(item.id) ? (
                            <button disabled>Purchased</button>
                        ) : (
                            <button onClick={() => handlePurchase(item.id)}>Purchase</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentMarketplace;