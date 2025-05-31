import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert('Check your email for the login link!');
    setLoading(false);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <form onSubmit={handleLogin} style={{ marginBottom: '1rem' }}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.5rem', width: '200px' }}
        />
        <button type="submit" disabled={loading} style={{ marginLeft: '0.5rem' }}>
          {loading ? 'Loading…' : 'Send Magic Link'}
        </button>
      </form>
      <button onClick={handleGoogle}>Login with Google</button>
    </div>
  );
}
