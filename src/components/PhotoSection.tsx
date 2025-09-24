'use client';

import React from 'react';
import PhotoCarousel from './PhotoCarousel';

const PhotoSection: React.FC = () => {
  return (
    <section
      className="photo-section"
      style={{
        position: 'relative',
        zIndex: 5,
        background: 'transparent' // Managed by BackgroundColorManager
      }}
    >
      <PhotoCarousel />
    </section>
  );
};

export default PhotoSection;