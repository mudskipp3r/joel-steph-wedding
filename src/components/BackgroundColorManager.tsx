'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SectionConfig {
  selector: string;
  backgroundColor: string;
  name: string;
}

const BackgroundColorManager: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Define sections and their background colors using new palette
    const sections: SectionConfig[] = [
      { selector: '.optimized-middle-section', backgroundColor: '#F0E9E1', name: 'OptimizedMiddleSection' }, // warm-ivory
      { selector: '[data-timeline-section]', backgroundColor: '#EBE3D8', name: 'TimelineSection' }, // stone-beige
      { selector: '.venue-section', backgroundColor: '#4A4643', name: 'VenueSection' }, // charcoal
      { selector: '.photo-section', backgroundColor: '#F4C5AF', name: 'PhotoSection' }, // soft-peach
      { selector: '.faq-section', backgroundColor: '#D0DBE1', name: 'FAQSection' } // dusty-blue
    ];

    // Set initial background color (first section)
    gsap.set(document.body, { backgroundColor: sections[0].backgroundColor });
    gsap.set('.page-content', { backgroundColor: sections[0].backgroundColor });

    // Create scroll triggers for each section
    sections.forEach((section, index) => {
      const element = document.querySelector(section.selector);

      if (element) {
        console.log(`Setting up trigger for ${section.name}`);

        const trigger = ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          markers: false, // Set to true for debugging
          onEnter: () => {
            console.log(`Entering ${section.name} - changing to ${section.backgroundColor}`);
            gsap.to(document.body, {
              backgroundColor: section.backgroundColor,
              duration: 1.5,
              ease: 'power2.out'
            });
            gsap.to('.page-content', {
              backgroundColor: section.backgroundColor,
              duration: 1.5,
              ease: 'power2.out'
            });
          },
          onEnterBack: () => {
            console.log(`Re-entering ${section.name} - changing to ${section.backgroundColor}`);
            gsap.to(document.body, {
              backgroundColor: section.backgroundColor,
              duration: 1.5,
              ease: 'power2.out'
            });
            gsap.to('.page-content', {
              backgroundColor: section.backgroundColor,
              duration: 1.5,
              ease: 'power2.out'
            });
          }
        });

        triggers.push(trigger);
      } else {
        console.warn(`${section.name} with selector "${section.selector}" not found`);
      }
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

export default BackgroundColorManager;