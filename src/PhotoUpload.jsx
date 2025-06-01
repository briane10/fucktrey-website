import React, { useState } from 'react';
import { storage, db, auth } from './firebaseClient';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function PhotoUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const fileRef = ref(storage, `photos/${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      await addDoc(collection(db, 'photos'), {
        url,
        uid: auth.currentUser ? auth.currentUser.uid : null,
        createdAt: serverTimestamp(),
      });
      alert('Uploaded!');
      setFile(null);
    } catch (err) {
      alert(err.message);
    }
    setUploading(false);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', background: '#FFAF00', border: 'none' }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}
