'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MiddleSection: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Get elements exactly like mwg_006
    const root = document.querySelector('.mwg_effect006');
    const pinHeight = root?.querySelector('.pin-height');
    const container = root?.querySelector('.container');
    const sentences = root?.querySelectorAll('.sentence');

    // Function to wrap letters exactly like mwg_009
    function wrapLettersInSpan(element: Element) {
      const text = element.textContent;
      if (text) {
        element.innerHTML = text
          .split('')
          .map(char => char === ' ' ? '<span>&nbsp;</span>' : `<span>${char}</span>`)
          .join(' ');
      }
    }

    if (root && pinHeight && container && sentences) {
      // Wrap letters in spans
      sentences.forEach(sentence => {
        wrapLettersInSpan(sentence);
      });

      // Pin setup
      ScrollTrigger.create({
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container,
        markers: true
      });

      // Timeline like mwg_009
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });

      // Animation loop like mwg_009
      sentences.forEach((sentence, index) => {
        if (sentences[index + 1]) {
          // Move current sentence up and out
          tl.to(sentence, {
            yPercent: -50,
            y: '-50vh',
            ease: 'power4.in',
          });

          // Move current sentence letters up with stagger
          tl.to(sentence.querySelectorAll('span'), {
            yPercent: -50,
            y: '-50vh',
            stagger: -0.02,
            ease: 'power2.in',
          }, '<');

          // Move next sentence in from below
          tl.from(sentences[index + 1], {
            yPercent: 50,
            y: '50vh',
            ease: 'power4.out',
          }, '<');

          // Move next sentence letters in with stagger
          tl.from(sentences[index + 1].querySelectorAll('span'), {
            yPercent: 50,
            y: '50vh',
            ease: 'power2.out',
            stagger: -0.02,
          }, '<');
        }
      });
    }

    // Background color transitions
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
    <section className="mwg_effect006">
      {/* Background images */}
      <div className="bg-images">
        <div className="bg-image">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop" alt="Wedding moment 1" loading="lazy" />
        </div>
        <div className="bg-image">
          <img src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=600&fit=crop" alt="Wedding moment 2" loading="lazy" />
        </div>
        <div className="bg-image">
          <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=600&fit=crop" alt="Wedding moment 3" loading="lazy" />
        </div>
        <div className="bg-image">
          <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=600&fit=crop" alt="Wedding moment 4" loading="lazy" />
        </div>
        <div className="bg-image">
          <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=600&fit=crop" alt="Wedding moment 5" loading="lazy" />
        </div>
        <div className="bg-image">
          <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=600&fit=crop" alt="Wedding moment 6" loading="lazy" />
        </div>
      </div>

      <div className="pin-height">
        <div className="container">
          <div className="center">
            <div className="sentence">We are absolutely thrilled to celebrate this magical day with all of you, our cherished family and friends.</div>
            <div className="sentence">Your love and support have been the foundation of our journey together, and we couldn't imagine this moment without you.</div>
            <div className="sentence">Thank you for being part of our story and for making our wedding day truly perfect and unforgettable.</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mwg_effect006 {
          position: relative;
          height: 300vh;
          background: red;
          letter-spacing: -0.03em;
          overflow: hidden;
        }

        .pin-height {
          height: 300vh;
        }

        .container {
          height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 3vw;
          position: relative;
        }

        .center {
          position: relative;
          width: 100%;
        }

        .sentence {
          width: 100%;
          text-align: center;
          display: flex;
          justify-content: center;
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: 500;
          color: white;
          line-height: 1.2;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          max-width: 800px;
          margin: 0 auto;
        }

        .sentence span {
          display: inline-block;
          letter-spacing: -0.06em;
        }

        .sentence:not(:first-child) {
          position: absolute;
          left: 0;
          top: 0;
        }

        @media (max-width: 768px) {
          .sentence {
            font-size: clamp(1.2rem, 5vw, 2rem);
          }

          .container {
            padding: 0 2vw;
          }
        }

        .bg-images {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 300vh;
          z-index: 1;
        }

        .bg-image {
          position: absolute;
          width: 15vw;
          height: 25vh;
          border-radius: 15px;
          overflow: hidden;
          opacity: 0.8;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .bg-image:nth-child(1) { left: 5vw; top: 20vh; }
        .bg-image:nth-child(2) { right: 5vw; top: 50vh; }
        .bg-image:nth-child(3) { left: 8vw; top: 120vh; }
        .bg-image:nth-child(4) { right: 8vw; top: 150vh; }
        .bg-image:nth-child(5) { left: 6vw; top: 220vh; }
        .bg-image:nth-child(6) { right: 6vw; top: 250vh; }

        .bg-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </section>
  );
};

export default MiddleSection;