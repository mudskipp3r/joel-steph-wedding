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

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];

    if (root && pinHeight && container && sentences) {
      // Pin setup
      const pinTrigger = ScrollTrigger.create({
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container
      });
      triggers.push(pinTrigger);

      // Simple fade transition timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onRefresh: (self) => triggers.push(self)
        }
      });

      // Simple fade animation between sentences
      sentences.forEach((sentence, index) => {
        if (sentences[index + 1]) {
          // Fade out current sentence
          tl.to(sentence, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut'
          });

          // Fade in next sentence
          tl.fromTo(sentences[index + 1], {
            opacity: 0
          }, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.inOut'
          }, '-=0.2');
        }
      });

      // Fade out all text at the end of the section
      tl.to(sentences, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.1
      }, '+=0.5');
    }


    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="mwg_effect006">
      {/* Background images */}
      <div className="bg-images">
        <div className="bg-image">
          <img src="/images/LKCK6491.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image">
          <img src="/images/LKCK6507.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image">
          <img src="/images/LKCK6591.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image">
          <img src="/images/LKCK6595.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image">
          <img src="/images/LKCK6634.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image">
          <img src="/images/LKCK6661.JPG" alt="Joel and Stephanie photo" loading="lazy" />
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
          height: 400vh;
          background: transparent;
          letter-spacing: -0.03em;
          overflow: hidden;
        }

        .pin-height {
          height: 400vh;
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
          width: clamp(300px, 60vw, 800px);
          text-align: center;
          display: flex;
          justify-content: center;
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: 500;
          color: white;
          line-height: 1.2;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          margin: 0 auto;
          flex-wrap: wrap;
        }


        .sentence:not(:first-child) {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
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
          height: 400vh;
          z-index: 1;
        }

        .bg-image {
          position: absolute;
          width: 20vw;
          height: 30vh;
          border-radius: 15px;
          overflow: hidden;
          opacity: 0.8;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .bg-image:nth-child(1) { left: 8vw; top: 20vh; }
        .bg-image:nth-child(2) { right: 15vw; top: 50vh; }
        .bg-image:nth-child(3) { left: 20vw; top: 120vh; }
        .bg-image:nth-child(4) { right: 12vw; top: 150vh; }
        .bg-image:nth-child(5) { left: 10vw; top: 220vh; }
        .bg-image:nth-child(6) { right: 18vw; top: 250vh; }

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