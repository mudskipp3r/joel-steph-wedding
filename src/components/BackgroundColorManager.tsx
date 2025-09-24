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

    // Define sections and their background colors
    const sections: SectionConfig[] = [
      { selector: '.mwg_effect006', backgroundColor: '#faf9f6', name: 'MiddleSection' },
      { selector: '[data-timeline-section]', backgroundColor: '#EBE3D8', name: 'TimelineSection' },
      { selector: '.venue-section', backgroundColor: '#754936', name: 'VenueSection' },
      { selector: '.photo-section', backgroundColor: '#F6C6AF', name: 'PhotoSection' },
      { selector: '.faq-section', backgroundColor: '#0f1419', name: 'FAQSection' }
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