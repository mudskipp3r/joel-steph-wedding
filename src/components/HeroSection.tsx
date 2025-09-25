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
        width: '100vw',
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
        <source src="/images/HeroVideo.mp4" type="video/mp4" />
        {/* Fallback image if video doesn't load */}
        <img
          src="/images/compressed_LKCK6634.JPG"
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

      {/* Noise overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '8px 8px, 6px 6px, 4px 4px',
          backgroundPosition: '0 0, 3px 3px, 1px 1px',
          opacity: 0.3,
          mixBlendMode: 'overlay',
          zIndex: 2.5
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <HeroBanner />
      </div>
    </section>
  );
};

export default HeroSection;