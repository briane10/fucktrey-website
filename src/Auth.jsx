import React, { useState } from 'react';
import { auth } from './firebaseClient';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function Auth({ onAuthChange }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      localStorage.setItem('token', data.idToken);
      if (onAuthChange) onAuthChange(data);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);

    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('token');
    if (onAuthChange) onAuthChange(null);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      {auth.currentUser ? (
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#FFAF00', border: 'none' }}>
          Sign Out
        </button>
      ) : (
        <>
          <form onSubmit={handleAuth} style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '0.5rem', width: '200px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '0.5rem', width: '200px', marginLeft: '0.5rem' }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', background: '#FFAF00', border: 'none' }}
            >
              {loading ? 'Loading...' : isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'transparent', border: 'none', color: '#FFAF00', cursor: 'pointer' }}
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
          </button>
        </>
      )}
    </div>
  );
}
