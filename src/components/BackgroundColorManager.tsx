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

    // Create trigger based on middle section position
    const middleSection = document.querySelector('.mwg_effect006');

    if (middleSection) {
      console.log('Setting up background trigger 50vh above bottom of middle section');

      const trigger = ScrollTrigger.create({
        trigger: middleSection,
        start: 'bottom-=50vh center', // Trigger 50vh before the bottom of middle section
        end: 'bottom center',
        markers: true, // Show markers for debugging
        onEnter: () => {
          console.log('Transition point reached - changing to dark background');
          gsap.to('.page-content', {
            backgroundColor: '#1a1a2e',
            duration: 1.5,
            ease: 'power2.out'
          });
          // Change schedule title to white
          gsap.to('.schedule-title', {
            color: 'white',
            duration: 1.5,
            ease: 'power2.out'
          });
        },
        onLeaveBack: () => {
          console.log('Transition point left - changing back to light background');
          gsap.to('.page-content', {
            backgroundColor: '#faf9f6',
            duration: 1.5,
            ease: 'power2.out'
          });
          // Change schedule title back to black
          gsap.to('.schedule-title', {
            color: '#2c3e50',
            duration: 1.5,
            ease: 'power2.out'
          });
        }
      });
      triggers.push(trigger);
    } else {
      console.warn('Middle section not found');
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

export default BackgroundColorManager;