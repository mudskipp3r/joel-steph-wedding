'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const OptimizedMiddleSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const div1 = div1Ref.current;
    const div2 = div2Ref.current;
    const div3 = div3Ref.current;
    const div4 = div4Ref.current;

    if (!section || !div1 || !div2 || !div3 || !div4) return;

    const pinnedText = document.querySelector('#pinned-text-element');
    if (!pinnedText) return;

    const textElement = pinnedText.querySelector('h2');
    if (!textElement) return;

    // Helper function to create text split animation
    const splitTextIntoChars = (text: string) => {
      return text.split('').map((char, index) =>
        `<span class="char-${index}" style="display: inline-block; opacity: 0; transform: translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
    };

    // Pin the text to center when div 1 top hits screen top
    ScrollTrigger.create({
      trigger: div1,
      start: "top top",
      end: () => `+=${window.innerHeight * 3}`,
      pin: pinnedText,
      pinSpacing: false,
      markers: false,
    });

    const heartSvg = document.querySelector('.heart-svg') as HTMLElement;
    const sunSvg = document.querySelector('.sun-svg') as HTMLElement;
    const cloudSvg = document.querySelector('.cloud-svg') as HTMLElement;

    // Track current state to prevent conflicts
    let currentText = "6th February, 2026";
    let currentSvg: HTMLElement | null = heartSvg;

    // Helper function to animate text with split effect
    const animateTextTransition = (newText: string, svgToShow: HTMLElement | null, svgToHide: HTMLElement[]) => {
      // Prevent unnecessary transitions
      if (currentText === newText) return;

      currentText = newText;
      currentSvg = svgToShow;

      // Set new text content with split chars
      textElement.innerHTML = splitTextIntoChars(newText);

      // Animate characters in with stagger
      const chars = textElement.querySelectorAll(`[class*="char-"]`);
      gsap.fromTo(chars,
        { opacity: 0, y: 20, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.out(1.7)"
        }
      );

      // Handle SVG transitions with better timing
      svgToHide.forEach(svg => {
        if (svg && svg !== svgToShow) {
          gsap.to(svg, { opacity: 0, scale: 0.7, duration: 0.3 });
        }
      });

      // Delay showing new SVG to prevent overlap
      if (svgToShow) {
        gsap.to(svgToShow, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.2
        });
      }
    };

    // Balanced text transitions - each phrase gets equal duration
    // Transition 1 -> 2: At end of div1 (33% through)
    ScrollTrigger.create({
      trigger: div1,
      start: "bottom-=50 top",
      end: "bottom top",
      onUpdate: self => {
        const progress = self.progress;
        if (progress > 0.5) {
          animateTextTransition("Together February 6th", sunSvg, [heartSvg, cloudSvg]);
        }
      },
      id: "text-1-to-2"
    });

    // Transition 2 -> 3: At end of div2 (66% through)
    ScrollTrigger.create({
      trigger: div2,
      start: "bottom-=50 top",
      end: "bottom top",
      onUpdate: self => {
        const progress = self.progress;
        if (progress > 0.5) {
          animateTextTransition("Love begins February 6th", cloudSvg, [heartSvg, sunSvg]);
        }
      },
      id: "text-2-to-3"
    });

    // REVERSE TRANSITIONS
    // Transition 2 -> 1: Going back up through div2 (not div1)
    ScrollTrigger.create({
      trigger: div2,
      start: "top-=50 bottom",
      end: "top bottom",
      onUpdate: self => {
        const progress = self.progress;
        if (progress < 0.5) {
          animateTextTransition("6th February, 2026", heartSvg, [sunSvg, cloudSvg]);
        }
      },
      id: "text-2-to-1"
    });

    // Transition 3 -> 2: Going back up through div3
    ScrollTrigger.create({
      trigger: div3,
      start: "top-=50 bottom",
      end: "top bottom",
      onUpdate: self => {
        const progress = self.progress;
        if (progress < 0.5) {
          animateTextTransition("Together February 6th", sunSvg, [heartSvg, cloudSvg]);
        }
      },
      id: "text-3-to-2"
    });



    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === div1 || trigger.trigger === div2 || trigger.trigger === div3 || trigger.trigger === div4) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="optimized-middle-section"
      style={{
        position: 'relative',
        zIndex: 10
      }}
    >
      <div ref={div1Ref} className="section-div">
        <div className="squares-container">
          <img src="/images/compressed_Joel Proposes to Steph-22.jpg" alt="Proposal portrait" className="red-square portrait" style={{ top: '15%', right: '12%' }} />
          <img src="/images/compressed_Joel Proposes to Steph-103.jpg" alt="Proposal tall" className="red-square portrait-tall" style={{ top: '55%', left: '5%' }} />
          <img src="/images/compressed_LKCK6467.JPG" alt="Proposal landscape" className="red-square" style={{ top: '85%', right: '25%' }} />
        </div>
      </div>
      <div ref={div2Ref} className="section-div">
        <div className="squares-container">
          <img src="/images/compressed_LKCK6595.JPG" alt="Couple landscape" className="red-square" style={{ top: '12%', left: '8%' }} />
          <img src="/images/compressed_joel and steph-05191.jpg" alt="Couple large portrait" className="red-square portrait-large" style={{ top: '40%', right: '10%' }} />
          <img src="/images/compressed_LKCK6601.JPG" alt="Couple portrait" className="red-square portrait" style={{ top: '80%', left: '15%' }} />
        </div>
      </div>
      <div ref={div3Ref} className="section-div">
        <div className="squares-container">
          <img src="/images/compressed_Joel Proposes to Steph-114.jpg" alt="Engagement tall portrait" className="red-square portrait-tall" style={{ top: '10%', right: '15%' }} />
          <img src="/images/compressed_joel and steph-05237.jpg" alt="Engagement large portrait" className="red-square portrait-large" style={{ top: '45%', left: '8%' }} />
          <img src="/images/compressed_Joel Proposes to Steph-130.jpg" alt="Beautiful moment" className="red-square" style={{ top: '85%', right: '20%' }} />
        </div>
      </div>
      <div ref={div4Ref} className="section-div">
        <div className="squares-container">
          <img src="/images/compressed_LKCK6632.JPG" alt="Engagement photo" className="red-square" style={{ top: '18%', left: '12%' }} />
          <img src="/images/compressed_joel and steph-05263.jpg" alt="Couple portrait" className="red-square" style={{ top: '50%', right: '8%' }} />
        </div>
      </div>

      <div id="pinned-text-element">
        <div className="svg-background">
          <img src="/heart.svg" alt="" className="background-svg heart-svg" />
          <img src="/sun.svg" alt="" className="background-svg sun-svg" />
          <img src="/cloud.svg" alt="" className="background-svg cloud-svg" />
        </div>
        <h2>6th February, 2026</h2>
      </div>

      <style jsx>{`
        .optimized-middle-section {
          height: 400vh;
          background: transparent;
        }

        .section-div {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px;
          border: none;
          box-sizing: border-box;
          color: #2c3e50;
          position: relative;
        }

        .section-div h2 {
          font-family: 'Cardo', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 600;
          margin: 0 0 20px 0;
          letter-spacing: -0.02em;
        }

        .section-div p {
          font-family: 'Instrument Sans', sans-serif;
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          font-weight: 300;
          margin: 0;
          line-height: 1.6;
          opacity: 0.8;
        }



        #pinned-text-element {
          position: absolute;
          top: 50vh;
          left: 50vw;
          transform: translate(-50%, -50%);
          z-index: 2000;
          text-align: center;
          pointer-events: none;
        }

        #pinned-text-element h2 {
          font-family: 'Cardo', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 600;
          margin: 0;
          letter-spacing: -0.02em;
          color: #4a4a4a;
          position: relative;
          z-index: 10;
        }

        .squares-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 2500;
        }

        .red-square {
          position: absolute;
          background: red;
          border-radius: 16px;
          opacity: 1;
          width: 240px;
          height: 240px;
          object-fit: cover;
        }

        .red-square.portrait {
          width: 210px;
          height: 315px;
        }

        .red-square.portrait-tall {
          width: 225px;
          height: 340px;
        }

        .red-square.portrait-large {
          width: 270px;
          height: 405px;
        }

        @media (max-width: 768px) {
          .red-square {
            width: 180px;
            height: 180px;
          }

          .red-square.portrait {
            width: 150px;
            height: 225px;
          }

          .red-square.portrait-tall {
            width: 165px;
            height: 248px;
          }

          .red-square.portrait-large {
            width: 195px;
            height: 293px;
          }
        }

        @media (max-width: 480px) {
          .red-square {
            width: 135px;
            height: 135px;
          }

          .red-square.portrait {
            width: 120px;
            height: 180px;
          }

          .red-square.portrait-tall {
            width: 128px;
            height: 192px;
          }

          .red-square.portrait-large {
            width: 150px;
            height: 225px;
          }
        }

        .red-square.overlap {
          z-index: 2100;
          opacity: 0.9;
        }

        .svg-background {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          pointer-events: none;
        }

        .background-svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          opacity: 0;
          transition: opacity 0.15s ease;
          pointer-events: none;
          z-index: -1;
        }

        .heart-svg {
          opacity: 1;
          filter: drop-shadow(0 4px 20px rgba(246, 198, 175, 0.3)) brightness(0) saturate(100%) invert(93%) sepia(15%) saturate(1151%) hue-rotate(317deg) brightness(94%) contrast(92%);
        }

        .sun-svg {
          filter: drop-shadow(0 4px 20px rgba(245, 142, 127, 0.3)) brightness(0) saturate(100%) invert(71%) sepia(51%) saturate(468%) hue-rotate(315deg) brightness(97%) contrast(91%);
        }

        .cloud-svg {
          filter: drop-shadow(0 4px 20px rgba(255, 207, 145, 0.3)) brightness(0) saturate(100%) invert(93%) sepia(56%) saturate(443%) hue-rotate(315deg) brightness(102%) contrast(94%);
        }

        @media (max-width: 768px) {
          .background-svg {
            width: 150px;
            height: 150px;
          }
        }

        @media (max-width: 480px) {
          .background-svg {
            width: 120px;
            height: 120px;
          }
        }



      `}</style>
    </section>
  );
};

export default OptimizedMiddleSection;