'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MiddleSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const text = textRef.current;
    const trigger = triggerRef.current;

    if (section && text && trigger) {
      const firstPhraseWords = text.querySelectorAll('.first-phrase .word');
      const secondPhraseWords = text.querySelectorAll('.second-phrase .word');

      // Set initial state
      gsap.set(text, {
        opacity: 1,
        zIndex: 20
      });

      // Set initial state for all words
      gsap.set([firstPhraseWords, secondPhraseWords], {
        opacity: 0,
        y: 30,
        scale: 0.8
      });

      // Create timeline with phrase transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          pin: text,
          markers: { startColor: "green", endColor: "red", fontSize: "16px", fontWeight: "bold", indent: 20 }
        }
      });

      // First phrase: animate each word in (0% to 25% of timeline)
      firstPhraseWords.forEach((word, index) => {
        tl.to(word, {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'back.out(1.7)'
        }, index * 0.05);
      });

      // Fade out first phrase (25% to 50% of timeline)
      tl.to(firstPhraseWords, {
        opacity: 0,
        y: -30,
        scale: 0.8,
        stagger: 0.02
      }, "+=0.25");

      // Animate in second phrase (50% to 75% of timeline)
      secondPhraseWords.forEach((word, index) => {
        tl.to(word, {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'back.out(1.7)'
        }, "+=0.1");
      });

      // Fade out second phrase (75% to 100% of timeline)
      tl.to(secondPhraseWords, {
        opacity: 0,
        y: -30,
        scale: 0.8,
        stagger: 0.02
      }, "+=0.25");
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="mwg_effect006">
      {/* Welcome text - top container */}
      <div className="welcome-container">
        <div className="welcome-text">
          <div className="heart-background">
            <img src="/heart_3.svg" alt="" />
          </div>
          <p>Welcome to our wedding website. We're so excited to share our special day with you. Here you'll find everything you need for our celebration.</p>
        </div>
        <div className="names-text">
          <p>STEPHANIE<br />AND JOEL</p>
        </div>
      </div>

      {/* Trigger element positioned 200vh down */}
      <div ref={triggerRef} className="scroll-trigger"></div>

      {/* Center text triggered by element above */}
      <div ref={textRef} className="center-text">
        <h2 className="first-phrase">
          <span className="word">Join</span>
          <span className="word">us</span>
          <span className="word">in</span>
          <span className="word">celebration</span>
        </h2>
        <h2 className="second-phrase">
          <span className="word">A</span>
          <span className="word">day</span>
          <span className="word">of</span>
          <span className="word">love</span>
          <span className="word">and</span>
          <span className="word">joy</span>
        </h2>
      </div>

      {/* Background images */}
      <div className="bg-images">
        <div className="bg-image bg-image-1">
          <img src="/images/LKCK6491.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image bg-image-2">
          <img src="/images/LKCK6507.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image bg-image-3">
          <img src="/images/LKCK6591.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image bg-image-4">
          <img src="/images/LKCK6595.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image bg-image-5">
          <img src="/images/LKCK6634.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image bg-image-6">
          <img src="/images/LKCK6661.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image bg-image-7">
          <img src="/images/LKCK6491.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image bg-image-8">
          <img src="/images/LKCK6507.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
        <div className="bg-image bg-image-9">
          <img src="/images/LKCK6591.JPG" alt="Joel and Stephanie photo" loading="lazy" />
        </div>
      </div>


      <style jsx>{`
        .mwg_effect006 {
          position: relative;
          height: 400vh;
          background: #faf9f6;
          letter-spacing: -0.03em;
          overflow: hidden;
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

        .bg-image-1 { left: 8vw; top: 90vh; width: 18vw; height: 25vh; }
        .bg-image-2 { right: 12vw; top: 60vh; width: 22vw; height: 35vh; }
        .bg-image-3 { left: 15vw; top: 100vh; width: 15vw; height: 40vh; }
        .bg-image-4 { right: 8vw; top: 130vh; width: 25vw; height: 20vh; }
        .bg-image-5 { left: 5vw; top: 170vh; width: 20vw; height: 30vh; }
        .bg-image-6 { right: 20vw; top: 200vh; width: 16vw; height: 45vh; }
        .bg-image-7 { left: 25vw; top: 250vh; width: 24vw; height: 18vh; }
        .bg-image-8 { right: 15vw; top: 280vh; width: 18vw; height: 38vh; }
        .bg-image-9 { left: 12vw; top: 320vh; width: 22vw; height: 28vh; }

        .bg-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .welcome-container {
          position: absolute;
          top: 1.25vw;
          left: 2.5vw;
          right: 2.5vw;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          z-index: 10;
          color: #2c3e50;
        }

        .welcome-text {
          width: 40vw;
          position: relative;
        }

        .names-text {
          text-align: right;
        }

        .names-text p {
          font-family: 'Instrument Sans', sans-serif;
          font-size: clamp(0.9rem, 1.5vw, 1.2rem);
          font-weight: 400;
          opacity: 0.9;
          margin: 0;
          letter-spacing: 0.15em;
          line-height: 1.3;
        }

        .heart-background {
          position: absolute;
          top: 60%;
          left: 60%;
          transform: translate(-50%, -50%);
          z-index: -1;
          opacity: 0.1;
          width: clamp(180%, 15vw + 100%, 220%);
          height: clamp(180%, 15vw + 100%, 220%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .heart-background img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .welcome-text p {
          font-family: 'Instrument Sans', sans-serif;
          font-size: clamp(1.8rem, 2.5vw + 0.5rem, 3rem);
          line-height: 1.2;
          margin-bottom: 1.5rem;
          font-weight: 400;
          opacity: 0.95;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .welcome-container {
            flex-direction: column;
            gap: 1rem;
          }

          .welcome-text {
            width: 70vw;
          }

          .names-text {
            text-align: left;
          }
        }

        .scroll-trigger {
          position: absolute;
          top: 75vh;
          left: 0;
          width: 100%;
          height: 100vh;
          pointer-events: none;
        }

        .center-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 80vw;
          max-width: 800px;
        }

        .center-text h2 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2.5rem, 4vw + 0.5rem, 4rem);
          font-weight: 400;
          color: #2c3e50;
          line-height: 1.2;
          margin: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }

        .word {
          display: inline-block;
          margin-right: 0.3em;
          transform-origin: center bottom;
        }

      `}</style>
    </section>
  );
};

export default MiddleSection;