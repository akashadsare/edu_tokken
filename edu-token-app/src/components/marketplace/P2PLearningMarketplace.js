// P2PLearningMarketplace.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './P2PLearningMarketplace.css';

const P2PLearningMarketplace = () => {
  const [sessions, setSessions] = useState([]);
  const [userTokens, setUserTokens] = useState(0);
  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    duration: 30,
    tokens: 0
  });

  const createSession = async () => {
    try {
      const response = await fetch('/api/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSession)
      });

      if (response.ok) {
        fetchSessions();
        clearForm();
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  return (
    <div className="p2p-marketplace">
      <div className="marketplace-header">
        <h2>Peer-to-Peer Learning Marketplace</h2>
        <div className="token-balance">
          Available Tokens: {userTokens}
        </div>
      </div>

      <div className="create-session-form">
        <h3>Create Teaching Session</h3>
        <input
          type="text"
          placeholder="Session Title"
          value={newSession.title}
          onChange={(e) => setNewSession({...newSession, title: e.target.value})}
        />
        <textarea
          placeholder="Session Description"
          value={newSession.description}
          onChange={(e) => setNewSession({...newSession, description: e.target.value})}
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={newSession.duration}
          onChange={(e) => setNewSession({...newSession, duration: e.target.value})}
        />
        <input
          type="number"
          placeholder="Token Cost"
          value={newSession.tokens}
          onChange={(e) => setNewSession({...newSession, tokens: e.target.value})}
        />
        <button onClick={createSession}>Create Session</button>
      </div>

      <div className="sessions-list">
        {sessions.map(session => (
          <div key={session.id} className="session-card">
            <h4>{session.title}</h4>
            <p>{session.description}</p>
            <div className="session-details">
              <span>Duration: {session.duration} minutes</span>
              <span>Cost: {session.tokens} tokens</span>
            </div>
            <button onClick={() => bookSession(session.id)}>Book Session</button>
          </div>
        ))}
      </div>
    </div>
  );
};