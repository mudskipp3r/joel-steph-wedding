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
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1
        }}
      >
        <source src="/images/AILoop.mp4" type="video/mp4" />
        {/* Fallback image if video doesn't load */}
        <img
          src="/images/LKCK6634.JPG"
          alt="Hero background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </video>

      {/* Dark overlay */}
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

      {/* Content */}
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