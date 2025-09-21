'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MiddleSection: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Darker background for card section
    ScrollTrigger.create({
      trigger: '.animation-section',
      start: 'top center',
      onEnter: () => {
        gsap.to(document.body, {
          backgroundColor: '#2c3e50',
          duration: 1.5,
          ease: 'power2.out'
        });
      },
      onLeaveBack: () => {
        gsap.to(document.body, {
          backgroundColor: '#667eea',
          duration: 1.5,
          ease: 'power2.out'
        });
      }
    });

    // New color for photo carousel section
    ScrollTrigger.create({
      trigger: '.photo-carousel-section',
      start: 'top center',
      onEnter: () => {
        gsap.to(document.body, {
          backgroundColor: '#8B4513',
          duration: 2,
          ease: 'power2.out'
        });
      },
      onLeaveBack: () => {
        gsap.to(document.body, {
          backgroundColor: '#2c3e50',
          duration: 2,
          ease: 'power2.out'
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="middle-section">
      <div className="content">
        <h2>Our Story Continues</h2>
        <p>
          This is where our journey takes its next beautiful turn. As we prepare for our wedding day,
          we want to share this special moment with all the people who mean the most to us.
        </p>
        <p>
          Join us as we celebrate love, friendship, and the beginning of our forever.
          Your presence would make our day complete.
        </p>
      </div>

      <style jsx>{`
        .middle-section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: white;
          padding: 0 5vw;
        }

        .content {
          max-width: 800px;
          text-align: center;
        }

        .content h2 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: bold;
          margin-bottom: 2rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .content p {
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          opacity: 0.9;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .content p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .middle-section {
            padding: 0 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default MiddleSection;