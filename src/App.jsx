import React, { useEffect, useState } from 'react';
import Auth from './Auth';
import PhotoUpload from './PhotoUpload';
import Gallery from './Gallery';
import { auth } from './firebaseClient';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h1 style={{ color: '#FFAF00' }}>Fuck Trey</h1>
      {user ? (
        <>
          <p>Logged in as {user.email}</p>
          <button
            onClick={() => auth.signOut()}
            style={{ padding: '0.5rem 1rem', background: '#FFAF00', border: 'none' }}
          >
            Sign Out
          </button>
          <PhotoUpload />
          <Gallery />
        </>
      ) : (
        <Auth onAuthChange={setUser} />
      )}
    </div>
  );
}

export default App;
