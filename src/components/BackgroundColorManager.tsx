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
        start: '70% center', // Trigger at 70% through the middle section
        end: '80% center', // Complete transition by 80%
        markers: true, // Show markers for debugging
        onEnter: () => {
          console.log('Transition point reached - changing to beige background');
          gsap.to(document.body, {
            backgroundColor: '#EBE3D8',
            duration: 1.5,
            ease: 'power2.out'
          });
          gsap.to('.page-content', {
            backgroundColor: '#EBE3D8',
            duration: 1.5,
            ease: 'power2.out'
          });
          // Keep schedule title dark for good contrast on beige
          gsap.to('.schedule-title', {
            color: '#2c3e50',
            duration: 1.5,
            ease: 'power2.out'
          });
        },
        onLeaveBack: () => {
          console.log('Transition point left - changing back to light background');
          gsap.to(document.body, {
            backgroundColor: '#faf9f6',
            duration: 1.5,
            ease: 'power2.out'
          });
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

    // Add trigger for when leaving schedule section
    const timelineSection = document.querySelector('[data-timeline-section]');
    if (timelineSection) {
      console.log('Setting up trigger for leaving schedule section');

      const scheduleExitTrigger = ScrollTrigger.create({
        trigger: timelineSection,
        start: 'bottom center',
        markers: true,
        onEnter: () => {
          console.log('Left schedule section - changing background color');
          gsap.to(document.body, {
            backgroundColor: '#2C5F2D', // Deep forest green background after schedule
            duration: 1.5,
            ease: 'power2.out'
          });
          gsap.to('.page-content', {
            backgroundColor: '#2C5F2D', // Deep forest green background after schedule
            duration: 1.5,
            ease: 'power2.out'
          });
        },
        onLeaveBack: () => {
          console.log('Re-entering schedule section - back to beige');
          gsap.to(document.body, {
            backgroundColor: '#faf9f6', // Back to original cream
            duration: 1.5,
            ease: 'power2.out'
          });
          gsap.to('.page-content', {
            backgroundColor: '#EBE3D8', // Back to beige
            duration: 1.5,
            ease: 'power2.out'
          });
        }
      });
      triggers.push(scheduleExitTrigger);
    } else {
      console.warn('Timeline section not found');
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

export default BackgroundColorManager;