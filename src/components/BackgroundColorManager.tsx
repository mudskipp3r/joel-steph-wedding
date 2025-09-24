'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SectionConfig {
  selector: string;
  backgroundColor: string;
  nextBackgroundColor?: string;
  name: string;
  gradientDirection?: string;
}

const BackgroundColorManager: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Define sections and their background colors with smooth transitions
    const sections: SectionConfig[] = [
      {
        selector: '.optimized-middle-section',
        backgroundColor: '#F0E9E1',
        nextBackgroundColor: '#EBE3D8',
        name: 'OptimizedMiddleSection',
        gradientDirection: 'to bottom'
      },
      {
        selector: '[data-timeline-section]',
        backgroundColor: '#EBE3D8',
        nextBackgroundColor: '#FFF0E2',
        name: 'TimelineSection',
        gradientDirection: 'to bottom'
      },
      {
        selector: '.venue-section',
        backgroundColor: '#FFF0E2',
        nextBackgroundColor: '#F4C5AF',
        name: 'VenueSection',
        gradientDirection: 'to bottom'
      },
      {
        selector: '.photo-section',
        backgroundColor: '#F4C5AF',
        nextBackgroundColor: '#D0DBE1',
        name: 'PhotoSection',
        gradientDirection: 'to bottom'
      },
      {
        selector: '.faq-section',
        backgroundColor: '#D0DBE1',
        nextBackgroundColor: '#E8E8E8',
        name: 'FAQSection',
        gradientDirection: 'to bottom'
      }
    ];

    // Set initial background color (first section)
    gsap.set(document.body, { backgroundColor: sections[0].backgroundColor });
    gsap.set('.page-content', { backgroundColor: sections[0].backgroundColor });

    // Create smooth gradient transitions between sections
    sections.forEach((section, index) => {
      const element = document.querySelector(section.selector);
      const nextSection = sections[index + 1];

      if (element) {
        console.log(`Setting up gradient trigger for ${section.name}`);

        // Create gradient transition at the end of each section
        if (section.nextBackgroundColor) {
          const trigger = ScrollTrigger.create({
            trigger: element,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 1,
            markers: false,
            onUpdate: (self) => {
              const progress = self.progress;
              const fromColor = section.backgroundColor;
              const toColor = section.nextBackgroundColor!;

              // Create smooth gradient background
              const gradient = `linear-gradient(${section.gradientDirection},
                ${fromColor} ${Math.max(0, (1 - progress) * 100)}%,
                ${toColor} ${Math.min(100, progress * 100 + 50)}%)`;

              gsap.set(document.body, { background: gradient });
              gsap.set('.page-content', { background: gradient });
            }
          });

          triggers.push(trigger);
        }

        // Solid color trigger for when fully in section
        const solidTrigger = ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          markers: false,
          onEnter: () => {
            console.log(`Fully entering ${section.name}`);
            gsap.to(document.body, {
              backgroundColor: section.backgroundColor,
              background: section.backgroundColor,
              duration: 0.8,
              ease: 'power2.out'
            });
            gsap.to('.page-content', {
              backgroundColor: section.backgroundColor,
              background: section.backgroundColor,
              duration: 0.8,
              ease: 'power2.out'
            });
          },
          onEnterBack: () => {
            console.log(`Re-entering ${section.name}`);
            gsap.to(document.body, {
              backgroundColor: section.backgroundColor,
              background: section.backgroundColor,
              duration: 0.8,
              ease: 'power2.out'
            });
            gsap.to('.page-content', {
              backgroundColor: section.backgroundColor,
              background: section.backgroundColor,
              duration: 0.8,
              ease: 'power2.out'
            });
          }
        });

        triggers.push(solidTrigger);
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