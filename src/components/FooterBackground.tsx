'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FooterBackground: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeText = marqueeRef.current;

    if (marqueeText) {
      // Continuous marquee animation
      gsap.to(marqueeText, {
        x: '-50%',
        duration: 20,
        repeat: -1,
        ease: 'none'
      });
    }
  }, []);

  return (
    <div
      className="footer-background"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
          padding: 4rem 2rem;
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
          font-size: clamp(4rem, 10vw, 8rem);
          font-weight: bold;
          margin-bottom: 3rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.02em;
        }

        .footer-main p {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          opacity: 0.95;
          max-width: 800px;
        }

        .marquee-container {
          width: 100%;
          height: 120px;
          overflow: hidden;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          padding-top: 2rem;
          position: relative;
        }

        .marquee-wrapper {
          display: flex;
          white-space: nowrap;
          will-change: transform;
        }

        .marquee-text {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: bold;
          opacity: 0.8;
          letter-spacing: 0.1em;
          padding-right: 3rem;
          display: inline-block;
        }

        @media (max-width: 768px) {
          .footer-content {
            padding: 3rem 1.5rem;
          }

          .footer-main h2 {
            margin-bottom: 2rem;
          }

          .footer-main p {
            margin-bottom: 1rem;
          }

          .marquee-container {
            height: 80px;
            padding-top: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FooterBackground;