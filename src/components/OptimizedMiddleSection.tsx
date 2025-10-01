"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { typography } from "../styles/typography";

const OptimizedMiddleSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const pinnedTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const div1 = div1Ref.current;
    const div2 = div2Ref.current;
    const div3 = div3Ref.current;
    const div4 = div4Ref.current;
    const pinnedText = pinnedTextRef.current;

    if (!section || !div1 || !div2 || !div3 || !div4 || !pinnedText) return;

    // Get SVG elements
    const heartSvg = pinnedText.querySelector('.heart-svg') as HTMLElement;
    const sunSvg = pinnedText.querySelector('.sun-svg') as HTMLElement;
    const cloudSvg = pinnedText.querySelector('.cloud-svg') as HTMLElement;

    if (!heartSvg || !sunSvg || !cloudSvg) return;

    // Text states for each section
    const textStates = [
      "Together we celebrate",
      "With family and friends",
      "Friday 6th February 2026"
    ];

    const svgStates = [heartSvg, cloudSvg, sunSvg];

    // Set initial states - all SVGs hidden except first
    gsap.set([cloudSvg, sunSvg], { autoAlpha: 0, scale: 0.7 });
    gsap.set(heartSvg, { autoAlpha: 1, scale: 1 });

    // Create a ScrollTrigger that updates pinned text and SVGs based on scroll progress
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      pin: pinnedText,
      pinSpacing: false,
      markers: false,
      onUpdate: (self) => {
        const progress = self.progress;
        let index = 0;
        if (progress >= 0.66) {
          index = 2;
        } else if (progress >= 0.33) {
          index = 1;
        } else {
          index = 0;
        }

        // Update text
        const textContent = pinnedText.querySelector('.pinned-text-content');
        if (textContent) {
          textContent.textContent = textStates[index];
        }

        // Update SVGs - show current, hide others
        svgStates.forEach((svg, i) => {
          if (i === index) {
            gsap.to(svg, { autoAlpha: 1, scale: 1, duration: 0.3 });
          } else {
            gsap.to(svg, { autoAlpha: 0, scale: 0.7, duration: 0.3 });
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="optimized-middle-section"
      style={{
        position: "relative",
        zIndex: 10,
      }}
    >
      <div ref={div1Ref} className="section-div">
        <div className="squares-container">
          <img
            src="/images/story-section1-proposal-portrait.webp"
            alt="Proposal portrait"
            className="red-square portrait"
            style={{ top: "15%", right: "12%" }}
          />
          <img
            src="/images/story-section1-proposal-tall.webp"
            alt="Proposal tall"
            className="red-square portrait-tall"
            style={{ top: "55%", left: "5%" }}
          />
          <img
            src="/images/story-section1-proposal-landscape.webp"
            alt="Proposal landscape"
            className="red-square"
            style={{ top: "85%", right: "25%" }}
          />
        </div>
      </div>
      <div ref={div2Ref} className="section-div">
        <div className="squares-container">
          <img
            src="/images/story-section2-couple-landscape.webp"
            alt="Couple landscape"
            className="red-square"
            style={{ top: "12%", left: "8%" }}
          />
          <img
            src="/images/story-section2-couple-portrait.webp"
            alt="Couple large portrait"
            className="red-square portrait-large"
            style={{ top: "40%", right: "10%" }}
          />
          <img
            src="/images/story-section2-couple-small.webp"
            alt="Couple portrait"
            className="red-square portrait"
            style={{ top: "80%", left: "15%" }}
          />
        </div>
      </div>
      <div ref={div3Ref} className="section-div">
        <div className="squares-container">
          <img
            src="/images/story-section3-engagement-tall.webp"
            alt="Engagement tall portrait"
            className="red-square portrait-tall"
            style={{ top: "10%", right: "15%" }}
          />
          <img
            src="/images/story-section3-engagement-portrait.webp"
            alt="Engagement large portrait"
            className="red-square portrait-large"
            style={{ top: "45%", left: "8%" }}
          />
          <img
            src="/images/story-section3-engagement-moment.webp"
            alt="Beautiful moment"
            className="red-square"
            style={{ top: "85%", right: "20%" }}
          />
        </div>
      </div>
      <div ref={div4Ref} className="section-div">
        <div className="squares-container">
          <img
            src="/images/story-section4-final-photo.webp"
            alt="Engagement photo"
            className="red-square"
            style={{ top: "18%", left: "12%" }}
          />
          <img
            src="/images/story-section4-couple-portrait.webp"
            alt="Couple portrait"
            className="red-square"
            style={{ top: "50%", right: "8%" }}
          />
        </div>
      </div>

      <div className="pinned-text" ref={pinnedTextRef}>
        <div className="svg-background">
          <img src="/heart.svg" alt="" className="background-svg heart-svg" />
          <img src="/sun.svg" alt="" className="background-svg sun-svg" />
          <img src="/cloud.svg" alt="" className="background-svg cloud-svg" />
        </div>
        <div className="pinned-text-content">
          Together we celebrate
        </div>
      </div>

      <div style={{ height: "100vh" }}></div>

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
          font-family: ${typography.fonts.serif};
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: ${typography.weights.semibold};
          margin: 0 0 20px 0;
          letter-spacing: -0.02em;
        }

        .section-div p {
          font-family: ${typography.fonts.sans};
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          font-weight: ${typography.weights.light};
          margin: 0;
          line-height: 1.6;
          opacity: 0.8;
        }

        .pinned-text {
          position: absolute;
          top: 50vh;
          left: 50vw;
          transform: translate(-50%, -50%);
          z-index: 5;
          text-align: center;
          pointer-events: none;
          font-family: ${typography.fonts.serif};
          font-size: clamp(1.8rem, 4vw, 4.5rem);
          font-weight: ${typography.weights.semibold};
          color: ${typography.colors.body};
          letter-spacing: -0.02em;
          max-width: calc(100vw - 4rem);
          box-sizing: border-box;
          line-height: 1.1;
          opacity: 1;
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
          background: #f5f5f5;
          border-radius: 16px;
          opacity: 1;
          width: 240px;
          height: 240px;
          object-fit: cover;
          border: 1px solid #e0e0e0;
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

          /* Strategic repositioning for text readability on mobile */
          /* Keep images fully visible within viewport */

          /* Section 1 - Keep tall image visible on left */
          .section-div:nth-child(1) .red-square.portrait-tall {
            left: 2% !important;
            top: 60% !important;
          }

          /* Section 2 - Keep large portrait visible on right */
          .section-div:nth-child(2) .red-square.portrait-large {
            right: 2% !important;
            top: 20% !important;
          }

          /* Section 2 - Small portrait on left */
          .section-div:nth-child(2) .red-square.portrait:last-child {
            top: 85% !important;
            left: 5% !important;
          }

          /* Section 3 - Keep tall portrait visible on right */
          .section-div:nth-child(3) .red-square.portrait-tall {
            right: 2% !important;
            top: 10% !important;
          }

          /* Section 3 - Keep large portrait visible on left */
          .section-div:nth-child(3) .red-square.portrait-large {
            left: 2% !important;
            top: 55% !important;
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

          /* Repositioning for smaller screens - keep images visible */

          /* Section 1 - Position images within viewport */
          .section-div:nth-child(1) .red-square.portrait-tall {
            left: 2% !important;
            top: 65% !important;
          }

          .section-div:nth-child(1) .red-square.portrait {
            right: 3% !important;
            top: 8% !important;
          }

          /* Section 2 - Keep images visible */
          .section-div:nth-child(2) .red-square.portrait-large {
            right: 2% !important;
            top: 15% !important;
          }

          .section-div:nth-child(2) .red-square:first-child {
            left: 2% !important;
            top: 5% !important;
          }

          /* Section 3 - Position images within bounds */
          .section-div:nth-child(3) .red-square.portrait-tall {
            right: 2% !important;
            top: 8% !important;
          }

          .section-div:nth-child(3) .red-square.portrait-large {
            left: 2% !important;
            top: 50% !important;
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
          width: 200px;
          height: 200px;
          opacity: 0;
          transition: opacity 0.15s ease;
          pointer-events: none;
          z-index: -1;
        }

        .heart-svg {
          top: 45%;
          left: 55%;
          transform: translate(-50%, -50%);
          opacity: 0.15;
          filter: drop-shadow(0 2px 10px rgba(222, 184, 184, 0.2)) brightness(0)
            saturate(100%) invert(89%) sepia(12%) saturate(380%)
            hue-rotate(314deg) brightness(97%) contrast(91%);
        }

        .sun-svg {
          top: 48%;
          left: 52%;
          transform: translate(-50%, -50%);
          opacity: 0.15;
          filter: drop-shadow(0 2px 10px rgba(240, 229, 207, 0.2)) brightness(0)
            saturate(100%) invert(94%) sepia(15%) saturate(434%)
            hue-rotate(346deg) brightness(98%) contrast(93%);
        }

        .cloud-svg {
          top: 55%;
          left: 45%;
          transform: translate(-50%, -50%);
          opacity: 0.15;
          filter: drop-shadow(0 2px 10px rgba(226, 232, 236, 0.2)) brightness(0)
            saturate(100%) invert(92%) sepia(4%) saturate(324%)
            hue-rotate(200deg) brightness(97%) contrast(92%);
        }

        .pinned-text-content {
          position: relative;
          z-index: 10;
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
