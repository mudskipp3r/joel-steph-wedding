'use client';

import React from 'react';
import ScrollAnimationSection from './ScrollAnimationSection';

const VenueSection: React.FC = () => {
  return (
    <section className="venue-section">
      <h2 className="venues-title">Venues</h2>
      <ScrollAnimationSection />

      <style jsx>{`
        .venue-section {
          background: transparent;
          padding: 80px 20px 0;
        }

        .venues-title {
          font-family: 'Instrument Serif', serif;
          text-align: center;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 600;
          color: white;
          margin: 2rem 0 3rem;
          letter-spacing: -0.02em;
        }
      `}</style>
    </section>
  );
};

export default VenueSection;