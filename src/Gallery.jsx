import React, { useEffect, useState } from 'react';
import { db } from './firebaseClient';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'photos'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const urls = snapshot.docs.map((doc) => doc.data().url);
      setImages(urls);
    });
    return () => unsub();
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '10px',
        marginTop: '1rem',
      }}
    >
      {images.map((url) => (
        <img key={url} src={url} alt="" style={{ width: '100%', objectFit: 'cover' }} />
      ))}
    </div>
  );
}
