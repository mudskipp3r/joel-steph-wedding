'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = document.querySelector('.footer-drawer') as HTMLElement;
    const footerTrigger = document.querySelector('.footer-trigger') as HTMLElement;
    const marqueeText = document.querySelector('.marquee-text') as HTMLElement;

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];
    const animations: gsap.core.Tween[] = [];

    if (footer && footerTrigger && marqueeText) {
      // Simple drawer animation - footer slides up from bottom
      const drawerTrigger = ScrollTrigger.create({
        trigger: footerTrigger,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
        animation: gsap.fromTo(footer, {
          yPercent: 100
        }, {
          yPercent: 0,
          ease: 'none'
        })
      });
      triggers.push(drawerTrigger);

      // Marquee animation
      const marqueeAnimation = gsap.to(marqueeText, {
        xPercent: -100,
        duration: 10,
        repeat: -1,
        ease: 'none'
      });
      animations.push(marqueeAnimation);
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
      animations.forEach(animation => animation.kill());
    };
  }, []);

  return (
    <footer className="footer-drawer">
      <div className="footer-content">
        <div className="footer-main">
          <h2>Thank You</h2>
          <p>We can't wait to celebrate with you on our special day.</p>
          <p>Your presence is the greatest gift of all.</p>
        </div>

        <div className="marquee-container">
          <div className="marquee-text">
            Stephanie & Joel • Stephanie & Joel • Stephanie & Joel • Stephanie & Joel •
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-drawer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          z-index: 1000;
          overflow: hidden;
        }

        .footer-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
          color: white;
        }

        .footer-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .footer-main h2 {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: bold;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .footer-main p {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          line-height: 1.6;
          margin-bottom: 1rem;
          opacity: 0.9;
          max-width: 600px;
        }

        .marquee-container {
          height: 80px;
          overflow: hidden;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          margin-top: 1rem;
        }

        .marquee-text {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: bold;
          white-space: nowrap;
          opacity: 0.8;
          letter-spacing: 0.1em;
        }

        @media (max-width: 768px) {
          .footer-content {
            padding: 1.5rem;
          }

          .marquee-container {
            height: 60px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;