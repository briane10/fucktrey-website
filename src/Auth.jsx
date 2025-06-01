import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    let error;
    if (isLogin) {
      ({ error } = await supabase.auth.signInWithPassword({ email, password }));
    } else {
      ({ error } = await supabase.auth.signUp({ email, password }));
    }
    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <form onSubmit={handleAuth} style={{ marginBottom: '1rem' }}>
        <input
          type="email"
          placeholder="Your email"
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
          style={{
            marginLeft: '0.5rem',
            padding: '0.5rem 1rem',
            background: '#FFAF00',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Loading...' : isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#FFAF00',
          cursor: 'pointer',
        }}
      >
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
      </button>
    </div>
  );
}
