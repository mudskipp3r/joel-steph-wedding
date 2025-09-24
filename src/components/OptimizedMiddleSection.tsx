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
        } else {
          textElement.textContent = "We can't wait to see you all";
          gsap.set(textElement, { opacity: (progress - 0.5) * 2, y: -20 * (1 - progress) });
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
        } else {
          textElement.textContent = "On our special day";
          gsap.set(textElement, { opacity: (progress - 0.5) * 2, y: -20 * (1 - progress) });
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
          <div className="red-square" style={{ top: '10%', left: '15%', width: '60px', height: '60px' }}></div>
          <div className="red-square" style={{ top: '20%', right: '20%', width: '80px', height: '40px' }}></div>
          <div className="red-square" style={{ top: '35%', left: '10%', width: '40px', height: '80px' }}></div>
          <div className="red-square" style={{ top: '70%', right: '15%', width: '50px', height: '50px' }}></div>
          <div className="red-square" style={{ top: '85%', left: '25%', width: '70px', height: '35px' }}></div>
          <div className="red-square overlap" style={{ top: '45%', right: '10%', width: '45px', height: '45px' }}></div>
        </div>
      </div>
      <div ref={div2Ref} className="section-div">
        <div className="div-label">DIV 2</div>
        <div className="squares-container">
          <div className="red-square" style={{ top: '5%', left: '20%', width: '55px', height: '55px' }}></div>
          <div className="red-square" style={{ top: '15%', right: '25%', width: '40px', height: '70px' }}></div>
          <div className="red-square" style={{ top: '30%', left: '8%', width: '65px', height: '45px' }}></div>
          <div className="red-square overlap" style={{ top: '52%', left: '12%', width: '40px', height: '40px' }}></div>
          <div className="red-square" style={{ top: '75%', right: '18%', width: '75px', height: '35px' }}></div>
          <div className="red-square" style={{ top: '90%', left: '30%', width: '50px', height: '60px' }}></div>
        </div>
      </div>
      <div ref={div3Ref} className="section-div">
        <div className="div-label">DIV 3</div>
        <div className="squares-container">
          <div className="red-square" style={{ top: '8%', right: '22%', width: '50px', height: '65px' }}></div>
          <div className="red-square" style={{ top: '25%', left: '18%', width: '70px', height: '40px' }}></div>
          <div className="red-square overlap" style={{ top: '48%', right: '8%', width: '35px', height: '35px' }}></div>
          <div className="red-square" style={{ top: '65%', left: '12%', width: '45px', height: '55px' }}></div>
          <div className="red-square" style={{ top: '82%', right: '25%', width: '60px', height: '45px' }}></div>
        </div>
      </div>
      <div ref={div4Ref} className="section-div">
        <div className="div-label">DIV 4</div>
        <div className="squares-container">
          <div className="red-square" style={{ top: '12%', left: '22%', width: '45px', height: '75px' }}></div>
          <div className="red-square" style={{ top: '28%', right: '12%', width: '65px', height: '50px' }}></div>
          <div className="red-square" style={{ top: '42%', left: '8%', width: '55px', height: '55px' }}></div>
          <div className="red-square overlap" style={{ top: '58%', right: '20%', width: '40px', height: '40px' }}></div>
          <div className="red-square" style={{ top: '78%', left: '15%', width: '50px', height: '70px' }}></div>
        </div>
      </div>

      <div id="pinned-text-element">
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

        .section-div:nth-child(1) {
          background: rgba(245, 142, 127, 0.1);
        }

        .section-div:nth-child(2) {
          background: rgba(102, 126, 234, 0.1);
        }

        .section-div:nth-child(3) {
          background: rgba(118, 75, 162, 0.1);
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
          z-index: 500;
        }

        .red-square {
          position: absolute;
          background: red;
          border-radius: 4px;
          opacity: 0.8;
        }

        .red-square.overlap {
          z-index: 2100;
          opacity: 0.9;
        }



      `}</style>
    </section>
  );
};

export default OptimizedMiddleSection;