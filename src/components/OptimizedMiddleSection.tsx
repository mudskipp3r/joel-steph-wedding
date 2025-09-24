'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const OptimizedMiddleSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const textContainer = textRef.current;
    const imagesContainer = imagesRef.current;

    if (!section || !textContainer || !imagesContainer) return;

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Text animation on section entry
    const textTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      animation: gsap.fromTo(
        textContainer.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out'
        }
      )
    });
    triggers.push(textTrigger);

    // Image reveal animations
    const images = imagesContainer.querySelectorAll('.bg-image');
    images.forEach((image, index) => {
      const imageTrigger = ScrollTrigger.create({
        trigger: section,
        start: `top ${80 - index * 10}%`,
        end: `bottom ${20 + index * 10}%`,
        onEnter: () => {
          gsap.to(image, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out'
          });
        },
        onLeave: () => {
          gsap.to(image, {
            opacity: 0.3,
            scale: 0.95,
            duration: 0.6,
            ease: 'power2.in'
          });
        },
        onEnterBack: () => {
          gsap.to(image, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
      triggers.push(imageTrigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="optimized-middle-section">
      {/* Background Images */}
      <div ref={imagesRef} className="bg-images">
        <div className="bg-image bg-image-1">
          <img src="/images/LKCK6634.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image bg-image-2">
          <img src="/images/LKCK6591.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image bg-image-3">
          <img src="/images/LKCK6634.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
      </div>

      {/* Content */}
      <div ref={textRef} className="content-container">
        <div className="text-block">
          <h2>Our Journey</h2>
          <p>From our first meeting to this magical day, every moment has been leading us here.</p>
        </div>

        <div className="text-block">
          <h3>How We Met</h3>
          <p>A story of serendipity and love that brought two hearts together.</p>
        </div>

        <div className="text-block">
          <h3>Our Adventure</h3>
          <p>Through travels, laughter, and countless memories, we've built a life together.</p>
        </div>

        <div className="text-block">
          <h3>Forever Begins</h3>
          <p>Today we celebrate not just our love, but the beginning of our forever.</p>
        </div>
      </div>

      <style jsx>{`
        .optimized-middle-section {
          position: relative;
          padding: 8rem 2rem;
          background: transparent;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .bg-images {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .bg-image {
          position: absolute;
          border-radius: 20px;
          overflow: hidden;
          opacity: 0;
          transform: scale(0.9);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .bg-image-1 {
          top: 10%;
          left: 15%;
          width: 300px;
          height: 200px;
          z-index: 1;
        }

        .bg-image-2 {
          top: 50%;
          right: 20%;
          width: 250px;
          height: 180px;
          z-index: 2;
        }

        .bg-image-3 {
          bottom: 15%;
          left: 25%;
          width: 280px;
          height: 190px;
          z-index: 1;
        }

        .bg-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content-container {
          position: relative;
          z-index: 10;
          max-width: 800px;
          text-align: center;
          background: rgba(250, 249, 246, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          padding: 4rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .text-block {
          margin-bottom: 3rem;
        }

        .text-block:last-child {
          margin-bottom: 0;
        }

        .text-block h2 {
          font-family: 'Cardo', serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 400;
          color: #2c3e50;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .text-block h3 {
          font-family: 'Cardo', serif;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 400;
          color: #2c3e50;
          margin-bottom: 0.8rem;
          letter-spacing: -0.01em;
        }

        .text-block p {
          font-family: 'Instrument Sans', sans-serif;
          font-size: clamp(1rem, 2vw, 1.3rem);
          line-height: 1.7;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .optimized-middle-section {
            padding: 4rem 1rem;
            min-height: 60vh;
          }

          .content-container {
            padding: 2.5rem;
          }

          .bg-image-1,
          .bg-image-2,
          .bg-image-3 {
            opacity: 0.1 !important;
          }

          .bg-image-1 {
            width: 200px;
            height: 130px;
          }

          .bg-image-2 {
            width: 180px;
            height: 120px;
          }

          .bg-image-3 {
            width: 190px;
            height: 125px;
          }
        }
      `}</style>
    </section>
  );
};

export default OptimizedMiddleSection;