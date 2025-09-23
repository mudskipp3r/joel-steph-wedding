'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BackgroundColorManager: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Background colors with transition to dark at schedule section
    const colors = [
      '#faf9f6', // HeroSection - off-white
      '#faf9f6', // MiddleSection - off-white
      '#1a1a2e', // ScheduleSection - dark navy
      '#16213e', // ScrollAnimationSection - dark blue
      '#0f1419', // PhotoSection - very dark
      '#1a1a2e', // RSVPSection - back to dark navy
      '#16213e'  // FAQSection - dark blue
    ];

    const sections = [
      '.hero-section',
      '.mwg_effect006', // MiddleSection
      '.schedule-section',
      '.animation-section', // ScrollAnimationSection
      '.photo-section',
      '.rsvp-section',
      '.faq-section'
    ];

    // Set initial background color
    gsap.set(document.body, { backgroundColor: colors[0] });

    // Create transitions for each section
    sections.forEach((sectionSelector, index) => {
      const section = document.querySelector(sectionSelector);

      if (section && index > 0) { // Skip first section as it's the initial color
        console.log(`Creating trigger for ${sectionSelector}, color: ${colors[index]}`);

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top', // Trigger when section hits the top of viewport
          end: 'bottom top',
          markers: index === 2, // Show markers only for schedule section (index 2)
          onEnter: () => {
            console.log(`Entering ${sectionSelector}, changing to ${colors[index]}`);
            gsap.to(document.body, {
              backgroundColor: colors[index],
              duration: 1.2,
              ease: 'power2.out'
            });
          },
          onLeaveBack: () => {
            console.log(`Leaving back ${sectionSelector}, changing to ${colors[index - 1]}`);
            gsap.to(document.body, {
              backgroundColor: colors[index - 1],
              duration: 1.2,
              ease: 'power2.out'
            });
          }
        });
        triggers.push(trigger);
      } else if (!section) {
        console.warn(`Section not found: ${sectionSelector}`);
      }
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

export default BackgroundColorManager;