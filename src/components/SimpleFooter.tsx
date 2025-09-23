'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SimpleFooter: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    const marqueeText = marqueeRef.current;

    if (footer && marqueeText) {
      // Set initial state - footer starts off-screen
      gsap.set(footer, {
        yPercent: 100
      });

      // Marquee animation
      gsap.to(marqueeText, {
        x: '-50%',
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      // Scroll-linked animation (scrub effect)
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Calculate scroll position relative to bottom
        const scrollBottom = scrollTop + windowHeight;
        const startThreshold = documentHeight - (windowHeight * 0.5); // Start at 50vh from bottom
        const endThreshold = documentHeight; // End at very bottom

        // Calculate progress between start and end thresholds
        if (scrollBottom >= startThreshold) {
          const progress = Math.min(1, (scrollBottom - startThreshold) / (endThreshold - startThreshold));

          // Map progress to footer position (100% hidden to 0% visible)
          const yPercent = 100 - (progress * 100);

          gsap.set(footer, {
            yPercent: yPercent
          });
        } else {
          // Keep footer hidden when above threshold
          gsap.set(footer, {
            yPercent: 100
          });
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible]);

  return (
    <div
      ref={footerRef}
      className="simple-footer"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '50vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px'
      }}
    >
      <div className="footer-content">
        <div className="footer-main">
          <h2>Thank You</h2>
          <p>We can't wait to celebrate with you on our special day.</p>
          <p>Your presence is the greatest gift of all.</p>
        </div>

        <div className="marquee-container">
          <div ref={marqueeRef} className="marquee-wrapper">
            <span className="marquee-text">
              Stephanie & Joel • Stephanie & Joel •
            </span>
            <span className="marquee-text">
              Stephanie & Joel • Stephanie & Joel •
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-content {
          padding: 2rem;
          color: white;
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          height: 100%;
        }

        .footer-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 900px;
        }

        .footer-main h2 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.02em;
        }

        .footer-main p {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          line-height: 1.4;
          margin-bottom: 0.8rem;
          opacity: 0.95;
          max-width: 800px;
        }

        .marquee-container {
          width: 100%;
          height: 80px;
          overflow: hidden;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          padding-top: 1rem;
          position: relative;
        }

        .marquee-wrapper {
          display: flex;
          white-space: nowrap;
          will-change: transform;
        }

        .marquee-text {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: bold;
          opacity: 0.8;
          letter-spacing: 0.1em;
          padding-right: 3rem;
          display: inline-block;
        }

        @media (max-width: 768px) {
          .footer-content {
            padding: 1.5rem;
          }

          .footer-main h2 {
            margin-bottom: 1rem;
          }

          .footer-main p {
            margin-bottom: 0.5rem;
          }

          .marquee-container {
            height: 60px;
            padding-top: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SimpleFooter;