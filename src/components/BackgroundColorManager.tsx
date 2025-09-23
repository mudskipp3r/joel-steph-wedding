'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BackgroundColorManager: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Color palette from the bride's preferences
    const colors = [
      '#F58E7F', // HeroSection - Coral pink
      '#F6C6AF', // MiddleSection - Soft peach
      '#FDDDD0', // ScheduleSection - Light cream
      '#F0E9E1', // VenueSection - Warm beige
      '#EBE3D8', // PhotoSection - Light taupe
      '#D0DBE1', // RSVPSection - Soft blue-gray
      '#F58E7F'  // FAQSection - Back to coral pink
    ];

    const sections = [
      '.hero-section',
      '.mwg_effect006', // MiddleSection
      '.schedule-section',
      '.animation-section', // VenueSection
      '.photo-carousel-section',
      '.rsvp-section',
      '.faq-section'
    ];

    // Set initial background color
    gsap.set(document.body, { backgroundColor: colors[0] });

    // Create transitions for each section
    sections.forEach((sectionSelector, index) => {
      if (index > 0) { // Skip first section as it's the initial color
        const trigger = ScrollTrigger.create({
          trigger: sectionSelector,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            gsap.to(document.body, {
              backgroundColor: colors[index],
              duration: 1.5,
              ease: 'power2.out'
            });
          },
          onLeaveBack: () => {
            gsap.to(document.body, {
              backgroundColor: colors[index - 1],
              duration: 1.5,
              ease: 'power2.out'
            });
          }
        });
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

export default BackgroundColorManager;