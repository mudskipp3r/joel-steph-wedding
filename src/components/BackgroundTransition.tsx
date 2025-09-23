'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BackgroundTransition: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create a background color transition from hero to animation section
    gsap.to(document.body, {
      backgroundColor: '#667eea',
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.animation-section',
        start: 'top 50%',
        end: 'top 0%',
        scrub: true,
        onEnter: () => {
          document.body.style.transition = 'none';
        },
        onLeave: () => {
          document.body.style.transition = 'background-color 0.3s ease';
        },
        onEnterBack: () => {
          document.body.style.transition = 'none';
        },
        onLeaveBack: () => {
          document.body.style.transition = 'background-color 0.3s ease';
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.body.style.backgroundColor = '';
      document.body.style.transition = '';
    };
  }, []);

  return null;
};

export default BackgroundTransition;