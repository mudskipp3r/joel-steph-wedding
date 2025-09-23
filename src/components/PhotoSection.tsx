'use client';

import React from 'react';
import PhotoCarousel from './PhotoCarousel';

const PhotoSection: React.FC = () => {
  return (
    <section className="photo-section">
      <PhotoCarousel />
    </section>
  );
};

export default PhotoSection;