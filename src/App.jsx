import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Auth from './Auth';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#FFAF00' }}>Fuck Trey</h1>

      {session ? (
        <>
          <p>Logged in as {session.user.email}</p>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </>
      ) : (
        <Auth />
      )}

      <p style={{ marginTop: '1rem' }}>
        Coolest of red bears with a slight sun allergy, Trey boi is a money brah with a mad ass golf swing and a sweet lead guitar. Shaggy and swaggy with man muscles, (who can’t beat his old man arm wrestling yet), off to university he goes. Don’t forget to set an alarm though my dude so you don’t miss class in the early morning; we all know that’s not your thang! Now, go slay it. Kid stuff is over my boy.
      </p>
    </div>
  );
}

export default App;
