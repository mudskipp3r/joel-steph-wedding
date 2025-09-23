'use client';

import React from 'react';
import HeroBanner from './HeroBanner';

const HeroSection: React.FC = () => {
  return (
    <section
      className="hero-section"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundImage: 'url(/images/LKCK6634.JPG)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 1
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 2
        }}
      />
      <div style={{ position: 'relative', zIndex: 3 }}>
        <HeroBanner
          title="Joel & Stephanie"
          subtitle="Save the Date"
        />
      </div>
    </section>
  );
};

export default HeroSection;