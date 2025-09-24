'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MiddleSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    const text = textRef.current;
    const heart = heartRef.current;
    const transition = transitionRef.current;

    if (section && pinContainer && text && heart && transition) {
      // Text phrases to cycle through
      const phrases = [
        "Welcome to our celebration",
        "Join us in joy",
        "A day of love and laughter"
      ];

      let currentPhraseIndex = 0;

      // Set initial text and make it invisible
      text.textContent = phrases[0];
      gsap.set(text, { opacity: 0 });
      gsap.set(heart, { opacity: 0, scale: 0.8 });
      gsap.set(transition, { opacity: 0, y: 100 });

      // Set initial state for heart images
      const heart1 = heart.querySelector('.heart-1');
      const heart2 = heart.querySelector('.heart-2');
      gsap.set(heart1, { opacity: 1 });
      gsap.set(heart2, { opacity: 0 });

      // Create the pin animation
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: pinContainer,
        pinSpacing: false,
        onUpdate: (self) => {
          const progress = self.progress;

          // Show text immediately when section starts (0% of scroll)
          const showTextThreshold = 0; // Start at top of section
          const fadeOutThreshold = 0.85; // Start fading at 85% progress

          if (progress >= showTextThreshold && progress < fadeOutThreshold) {
            // Normal animation phase
            const adjustedProgress = (progress - showTextThreshold) / (fadeOutThreshold - showTextThreshold);
            const totalPhrases = phrases.length;
            const phraseProgress = adjustedProgress * totalPhrases;
            const newPhraseIndex = Math.floor(phraseProgress);

            // Show text and heart if they're not visible yet
            if (gsap.getProperty(text, "opacity") === 0) {
              gsap.to(text, {
                opacity: 1,
                duration: 0.5
              });
              gsap.to(heart, {
                opacity: 0.05,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
              });
            }

            // Update text when crossing phrase boundaries
            if (newPhraseIndex !== currentPhraseIndex && newPhraseIndex < totalPhrases) {
              // Update hearts based on the new phrase index
              if (newPhraseIndex === 1) {
                // Going to second phrase - show ring
                gsap.to(heart1, { opacity: 0, duration: 0.5 });
                gsap.to(heart2, { opacity: 1, duration: 0.5 });
              } else if (newPhraseIndex === 0 || newPhraseIndex === 2) {
                // Going to first or third phrase - show heart
                gsap.to(heart1, { opacity: 1, duration: 0.5 });
                gsap.to(heart2, { opacity: 0, duration: 0.5 });
              }

              currentPhraseIndex = newPhraseIndex;

              // Animate text change
              gsap.to(text, {
                opacity: 0,
                scale: 0.8,
                duration: 0.2,
                onComplete: () => {
                  text.textContent = phrases[currentPhraseIndex];
                  gsap.to(text, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.2
                  });
                }
              });
            }
          } else if (progress >= fadeOutThreshold) {
            // Fade out phase - smooth transition to timeline
            const fadeProgress = (progress - fadeOutThreshold) / (1 - fadeOutThreshold);
            const fadeOpacity = 1 - fadeProgress;
            const fadeScale = 1 - (fadeProgress * 0.1); // Subtle scale down
            const fadeY = fadeProgress * -30; // Move up slightly

            gsap.set(text, {
              opacity: fadeOpacity,
              scale: fadeScale,
              y: fadeY
            });
            gsap.set(heart, {
              opacity: 0.05 * fadeOpacity,
              scale: fadeScale
            });

            // Fade out heart images
            gsap.set(heart1, { opacity: fadeOpacity });
            gsap.set(heart2, { opacity: fadeOpacity });

            // Fade in transition element
            const transitionOpacity = Math.min(fadeProgress * 2, 1);
            const transitionY = 100 - (fadeProgress * 100);
            gsap.set(transition, {
              opacity: transitionOpacity,
              y: transitionY
            });
          } else {
            // Hide text and heart if we're above the threshold
            if (gsap.getProperty(text, "opacity") !== 0) {
              gsap.set(text, { opacity: 0 });
              gsap.set(heart, { opacity: 0, scale: 0.8 });
            }
          }
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="mwg_effect006">
      {/* Pinned container that stays in center during scroll */}
      <div ref={pinContainerRef} className="pin-container">
        <div ref={heartRef} className="heart-background">
          <img className="heart-1" src="/Heart_3.svg" alt="" />
          <img className="heart-2" src="/ring.svg" alt="" />
        </div>
        <div ref={textRef} className="center-text">
          Welcome to our celebration
        </div>
        <div ref={transitionRef} className="transition-element">
          <div className="transition-line"></div>
          <div className="transition-hearts">
            <span>♥</span>
            <span>♥</span>
            <span>♥</span>
          </div>
        </div>
      </div>

      {/* Background images that scroll past */}
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
          background: transparent;
          letter-spacing: -0.03em;
          overflow: hidden;
          margin: -60px -20px 0 -20px;
          padding: 60px 20px 0 20px;
        }


        .bg-images {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 400vh;
        }

        .bg-image {
          position: absolute;
          border-radius: 15px;
          overflow: hidden;
          opacity: 0.8;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        /* Images that appear UNDER the text (lower z-index) */
        .bg-image-1 {
          left: 10vw;
          top: 20vh;
          width: 16vw;
          height: 24vh;
          z-index: 1;
        }

        .bg-image-3 {
          right: 15vw;
          top: 80vh;
          width: 14vw;
          height: 28vh;
          z-index: 1;
        }

        .bg-image-5 {
          right: 14vw;
          top: 140vh;
          width: 18vw;
          height: 18vw;
          z-index: 1;
        }

        .bg-image-7 {
          left: 5vw;
          top: 200vh;
          width: 20vw;
          height: 30vh;
          z-index: 1;
        }

        .bg-image-9 {
          left: 12vw;
          top: 280vh;
          width: 15vw;
          height: 32vh;
          z-index: 1;
        }

        /* Images that appear OVER the text (higher z-index) */
        .bg-image-2 {
          right: 8vw;
          top: 40vh;
          width: 18vw;
          height: 26vh;
          z-index: 15;
        }

        .bg-image-4 {
          left: 6vw;
          top: 100vh;
          width: 24vw;
          height: 36vh;
          z-index: 15;
        }

        .bg-image-6 {
          left: 16vw;
          top: 160vh;
          width: 16vw;
          height: 28vh;
          z-index: 15;
        }

        .bg-image-8 {
          right: 10vw;
          top: 230vh;
          width: 14vw;
          height: 35vh;
          z-index: 15;
        }

        .bg-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .heart-background {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          width: 60vw;
          height: 60vw;
          max-width: 600px;
          max-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .heart-background img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          object-fit: contain;
        }

        .heart-background .heart-1 {
          width: 100%;
          height: 100%;
        }

        .heart-background .heart-2 {
          width: 50%;
          height: 50%;
        }

        .pin-container {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .center-text {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2.5rem, 4vw + 0.5rem, 4rem);
          font-weight: 400;
          color: #2c3e50;
          text-align: center;
          line-height: 1.2;
          margin: 0;
          max-width: 80vw;
        }

        .transition-element {
          position: absolute;
          bottom: 10vh;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .transition-line {
          width: 2px;
          height: 80px;
          background: linear-gradient(to bottom,
            rgba(44, 62, 80, 0),
            rgba(44, 62, 80, 0.3),
            rgba(44, 62, 80, 0.6));
          position: relative;
        }

        .transition-line::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid rgba(44, 62, 80, 0.6);
        }

        .transition-hearts {
          display: flex;
          gap: 1rem;
          font-size: 1.2rem;
          color: rgba(44, 62, 80, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        .transition-hearts span:nth-child(2) {
          animation-delay: 0.3s;
        }

        .transition-hearts span:nth-child(3) {
          animation-delay: 0.6s;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

      `}</style>
    </section>
  );
};

export default MiddleSection;