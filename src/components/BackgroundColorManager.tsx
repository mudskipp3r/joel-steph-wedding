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

    // Helper function to interpolate between hex colors
    const interpolateColor = (color1: string, color2: string, factor: number): string => {
      // Convert hex to RGB
      const hex2rgb = (hex: string) => ({
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16)
      });

      const rgb2hex = (r: number, g: number, b: number) =>
        '#' + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('');

      const c1 = hex2rgb(color1);
      const c2 = hex2rgb(color2);

      const r = c1.r + (c2.r - c1.r) * factor;
      const g = c1.g + (c2.g - c1.g) * factor;
      const b = c1.b + (c2.b - c1.b) * factor;

      return rgb2hex(r, g, b);
    };

    // Define sections and their background colors with smooth transitions
    const sections: SectionConfig[] = [
      {
        selector: '.optimized-middle-section',
        backgroundColor: '#F0E9E1',
        nextBackgroundColor: '#EBE3D8',
        name: 'OptimizedMiddleSection'
      },
      {
        selector: '[data-timeline-section]',
        backgroundColor: '#EBE3D8',
        nextBackgroundColor: '#FFF0E2',
        name: 'TimelineSection'
      },
      {
        selector: '.venue-section',
        backgroundColor: '#FFF0E2',
        nextBackgroundColor: '#F4C5AF',
        name: 'VenueSection'
      },
      {
        selector: '.photo-section',
        backgroundColor: '#F4C5AF',
        nextBackgroundColor: '#EBE3D8',
        name: 'PhotoSection'
      },
      {
        selector: '.faq-section',
        backgroundColor: '#EBE3D8',
        nextBackgroundColor: '#F0E9E1',
        name: 'FAQSection'
      }
    ];

    // Set initial background color
    const initialColor = sections[0].backgroundColor;
    gsap.set(document.body, { backgroundColor: initialColor });

    // Create single comprehensive trigger for each section
    sections.forEach((section, index) => {
      const element = document.querySelector(section.selector);

      if (element) {
        console.log(`Setting up comprehensive trigger for ${section.name}`);

        const trigger = ScrollTrigger.create({
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5, // Smoother scrubbing
          markers: false,
          onUpdate: (self) => {
            const progress = self.progress;
            let backgroundColor = section.backgroundColor;

            // Handle transition to next section
            if (progress > 0.75 && section.nextBackgroundColor) {
              // Start transition in last 25% of section
              const transitionProgress = Math.min(1, (progress - 0.75) / 0.25);
              backgroundColor = interpolateColor(
                section.backgroundColor,
                section.nextBackgroundColor,
                transitionProgress
              );
            }

            // Apply background color directly with gsap.set for immediate response
            gsap.set(document.body, { backgroundColor: backgroundColor });
          },
          onEnter: () => {
            console.log(`Entering ${section.name}`);
          },
          onLeave: () => {
            console.log(`Leaving ${section.name}`);
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