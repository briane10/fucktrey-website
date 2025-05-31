import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const { data } = await supabase.storage.from('photos').list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      });
      if (data) {
        const urls = await Promise.all(
          data.map(async (file) => {
            const { data: url } = await supabase.storage
              .from('photos')
              .getPublicUrl(file.name);
            return url.publicUrl;
          })
        );
        setImages(urls);
      }
    }
    fetchImages();
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
      {images.map((src) => (
        <img key={src} src={src} alt="uploaded" style={{ width: '100%' }} />
      ))}
    </div>
  );
}
