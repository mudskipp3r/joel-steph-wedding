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

    // Pin the text to center when div 1 top hits screen top
    ScrollTrigger.create({
      trigger: div1,
      start: "top top",
      end: () => `+=${window.innerHeight * 3}`,
      pin: pinnedText,
      pinSpacing: false,
      markers: true,
    });

    const heartSvg = document.querySelector('.heart-svg');
    const sunSvg = document.querySelector('.sun-svg');
    const cloudSvg = document.querySelector('.cloud-svg');

    // Text change triggers - using direct onUpdate instead of timelines for scrub
    ScrollTrigger.create({
      trigger: div1,
      start: "bottom-=50 top",
      end: "bottom+50 top",
      scrub: true,
      onUpdate: self => {
        const progress = self.progress;
        if (progress < 0.5) {
          textElement.textContent = "Welcome to our wedding";
          gsap.set(textElement, { opacity: 1 - (progress * 2), y: -20 * progress });
          if (heartSvg) gsap.set(heartSvg, { opacity: 1 - (progress * 2), scale: 1 - (progress * 0.3) });
          if (sunSvg) gsap.set(sunSvg, { opacity: 0 });
          if (cloudSvg) gsap.set(cloudSvg, { opacity: 0 });
        } else {
          textElement.textContent = "We can't wait to see you all";
          gsap.set(textElement, { opacity: (progress - 0.5) * 2, y: -20 * (1 - progress) });
          if (heartSvg) gsap.set(heartSvg, { opacity: 0 });
          if (sunSvg) gsap.set(sunSvg, { opacity: (progress - 0.5) * 2, scale: 0.7 + ((progress - 0.5) * 0.6) });
          if (cloudSvg) gsap.set(cloudSvg, { opacity: 0 });
        }
      },
      markers: { startColor: "blue", endColor: "blue", fontSize: "12px", fontWeight: "bold", indent: 120 },
      id: "text-1-to-2"
    });

    ScrollTrigger.create({
      trigger: div2,
      start: "bottom-=50 top",
      end: "bottom+50 top",
      scrub: true,
      onUpdate: self => {
        const progress = self.progress;
        if (progress < 0.5) {
          textElement.textContent = "We can't wait to see you all";
          gsap.set(textElement, { opacity: 1 - (progress * 2), y: -20 * progress });
          if (sunSvg) gsap.set(sunSvg, { opacity: 1 - (progress * 2), scale: 1 - (progress * 0.3) });
          if (heartSvg) gsap.set(heartSvg, { opacity: 0 });
          if (cloudSvg) gsap.set(cloudSvg, { opacity: 0 });
        } else {
          textElement.textContent = "On our special day";
          gsap.set(textElement, { opacity: (progress - 0.5) * 2, y: -20 * (1 - progress) });
          if (sunSvg) gsap.set(sunSvg, { opacity: 0 });
          if (heartSvg) gsap.set(heartSvg, { opacity: 0 });
          if (cloudSvg) gsap.set(cloudSvg, { opacity: (progress - 0.5) * 2, scale: 0.7 + ((progress - 0.5) * 0.6) });
        }
      },
      markers: { startColor: "purple", endColor: "purple", fontSize: "12px", fontWeight: "bold", indent: 140 },
      id: "text-2-to-3"
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
        <div className="div-label">DIV 1</div>
        <div className="squares-container">
          <img src="/images/middle_section_images/Joel Proposes to Steph-103.jpg" alt="" className="red-square portrait" style={{ top: '15%', right: '12%' }} />
          <img src="/images/middle_section_images/Joel Proposes to Steph-139.jpg" alt="" className="red-square portrait-tall" style={{ top: '55%', left: '5%' }} />
          <img src="/images/middle_section_images/Joel Proposes to Steph-153.jpg" alt="" className="red-square" style={{ top: '85%', right: '25%' }} />
        </div>
      </div>
      <div ref={div2Ref} className="section-div">
        <div className="div-label">DIV 2</div>
        <div className="squares-container">
          <img src="/images/middle_section_images/Joel Proposes to Steph-212.jpg" alt="" className="red-square" style={{ top: '12%', left: '8%' }} />
          <img src="/images/middle_section_images/Joel Proposes to Steph-216.jpg" alt="" className="red-square portrait-large" style={{ top: '40%', right: '10%' }} />
          <img src="/images/middle_section_images/Joel Proposes to Steph-242.jpg" alt="" className="red-square portrait" style={{ top: '80%', left: '15%' }} />
        </div>
      </div>
      <div ref={div3Ref} className="section-div">
        <div className="div-label">DIV 3</div>
        <div className="squares-container">
          <img src="/images/middle_section_images/Joel Proposes to Steph-255.jpg" alt="" className="red-square portrait-tall" style={{ top: '10%', right: '15%' }} />
          <img src="/images/middle_section_images/LKCK6595.JPG" alt="" className="red-square portrait-large" style={{ top: '45%', left: '8%' }} />
          <div className="red-square" style={{ top: '85%', right: '20%' }}></div>
        </div>
      </div>
      <div ref={div4Ref} className="section-div">
        <div className="div-label">DIV 4</div>
        <div className="squares-container">
          <div className="red-square" style={{ top: '18%', left: '12%' }}></div>
          <div className="red-square" style={{ top: '50%', right: '8%' }}></div>
        </div>
      </div>

      <div id="pinned-text-element">
        <div className="svg-background">
          <img src="/heart.svg" alt="" className="background-svg heart-svg" />
          <img src="/sun.svg" alt="" className="background-svg sun-svg" />
          <img src="/cloud.svg" alt="" className="background-svg cloud-svg" />
        </div>
        <h2>Welcome to our wedding</h2>
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
          border: 2px solid rgba(44, 62, 80, 0.2);
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


        .div-label {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 14px;
          font-weight: bold;
          z-index: 1000;
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
          color: #F58E7F;
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
          opacity: 0.8;
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
          z-index: -1;
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
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .heart-svg {
          opacity: 1;
          filter: drop-shadow(0 4px 20px rgba(245, 142, 127, 0.3));
        }

        .sun-svg {
          filter: drop-shadow(0 4px 20px rgba(255, 193, 7, 0.3)) hue-rotate(20deg) saturate(1.2);
        }

        .cloud-svg {
          filter: drop-shadow(0 4px 20px rgba(102, 126, 234, 0.3)) hue-rotate(-10deg) saturate(0.8) brightness(1.1);
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