'use client';

import React from 'react';
import ScrollAnimationSection from './ScrollAnimationSection';

const VenueSection: React.FC = () => {
  return (
    <section className="venue-section">
      <h2 className="venues-title">Venues</h2>
      <ScrollAnimationSection />
    </section>
  );
};

export default VenueSection;