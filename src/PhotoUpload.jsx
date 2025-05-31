import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function PhotoUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage
      .from('photos')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });
    if (error) alert(error.message);
    else alert('Uploaded!');
    setFile(null);
    setUploading(false);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? 'Uploading…' : 'Upload'}
      </button>
    </div>
  );
}
