"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';

const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const content = contentRef.current;
    const eventsContainer = eventsRef.current;

    if (!container || !content || !eventsContainer) return;

    // Clean up any existing ScrollTriggers
    const triggers: ScrollTrigger[] = [];

    // Set initial state for events
    gsap.set(eventsContainer, { y: window.innerHeight });

    // Create a simple animation that moves events up
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom", // Changed to bottom bottom for proper spacing
        pin: content,
        pinSpacing: true, // Changed to true to maintain proper spacing
        scrub: 1,
        id: "timeline-scroll",
        markers: false,
      }
    });

    // Animate events scrolling through
    tl.to(eventsContainer, {
      y: -window.innerHeight * 2,
      ease: "none",
      duration: 1
    });

    triggers.push(ScrollTrigger.getById("timeline-scroll")!);

    return () => {
      triggers.forEach(trigger => trigger?.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-timeline-section
      style={{
        position: 'relative',
        height: '300vh', // Total scroll distance
        background: 'transparent'
      }}
    >
      {/* Content container that gets pinned */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Background card */}
        <div
          style={{
            position: 'absolute',
            inset: '2rem',
            background: 'white',
            borderRadius: '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}
        >
          {/* Fixed Vertical Line */}
          <div
            style={{
              position: 'absolute',
              left: '23%',
              transform: 'translateX(-50%)',
              top: '0',
              bottom: '0',
              width: '1px',
              background: '#d0d0d0',
              zIndex: 10
            }}
          />

          {/* Scrolling events container */}
          <div
            ref={eventsRef}
            style={{
              position: 'absolute',
              left: '0',
              right: '0',
              top: '0',
              height: '300vh', // Full height of all content
              willChange: 'transform'
            }}
          >
            {/* Title Section */}
            <div
              style={{
                position: 'absolute',
                left: 'calc(23% + 3rem)',
                top: '30vh',
                transform: 'translateY(-50%)',
                zIndex: 15
              }}
            >
              <div style={{
                fontFamily: 'Cardo, serif',
                fontSize: '4rem',
                color: '#1a1a1a',
                fontWeight: '400',
                marginBottom: '1rem',
                lineHeight: '0.9',
                letterSpacing: '-0.02em'
              }}>
                The Day's Timeline
              </div>
              <div style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '1.2rem',
                color: '#666666',
                fontWeight: '400',
                lineHeight: '1.4'
              }}>
                Join us for our special day
              </div>
            </div>

            {/* Circle 1 - Ceremony */}
            <div
              style={{
                position: 'absolute',
                left: '23%',
                transform: 'translateX(-50%)',
                top: '130vh',
                width: '12px',
                height: '12px',
                background: '#c8beb7',
                borderRadius: '50%',
                zIndex: 20
              }}
            />

            {/* Ceremony content */}
            <div
              style={{
                position: 'absolute',
                left: 'calc(23% + 3rem)',
                top: '130vh',
                transform: 'translateY(-50%)',
                zIndex: 15
              }}
            >
              <div style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '3.5rem',
                color: '#FF6B6B',
                fontWeight: '400',
                marginBottom: '0.5rem',
                lineHeight: '1'
              }}>
                3:00 pm
              </div>

              <div style={{
                fontFamily: 'Cardo, serif',
                fontSize: '5.5rem',
                color: '#1a1a1a',
                fontWeight: '400',
                marginBottom: '1.5rem',
                lineHeight: '0.9',
                letterSpacing: '-0.02em'
              }}>
                Ceremony
              </div>

              <div style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '1.1rem',
                color: '#666666',
                fontWeight: '400',
                marginBottom: '2rem',
                lineHeight: '1.4'
              }}>
                Please arrive at least 30 mins early to be seated
              </div>

              <Button>
                Add to calendar
              </Button>
            </div>

            {/* Circle 2 - Reception */}
            <div
              style={{
                position: 'absolute',
                left: '23%',
                transform: 'translateX(-50%)',
                top: '230vh',
                width: '12px',
                height: '12px',
                background: '#c8beb7',
                borderRadius: '50%',
                zIndex: 20
              }}
            />

            {/* Reception content */}
            <div
              style={{
                position: 'absolute',
                left: 'calc(23% + 3rem)',
                top: '230vh',
                transform: 'translateY(-50%)',
                zIndex: 15
              }}
            >
              <div style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '3.5rem',
                color: '#FF6B6B',
                fontWeight: '400',
                marginBottom: '0.5rem',
                lineHeight: '1'
              }}>
                6:30 pm
              </div>

              <div style={{
                fontFamily: 'Cardo, serif',
                fontSize: '5.5rem',
                color: '#1a1a1a',
                fontWeight: '400',
                marginBottom: '1.5rem',
                lineHeight: '0.9',
                letterSpacing: '-0.02em'
              }}>
                Reception
              </div>

              <div style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '1.1rem',
                color: '#666666',
                fontWeight: '400',
                marginBottom: '2rem',
                lineHeight: '1.4'
              }}>
                Celebrate with us! Dinner, dancing, and drinks
              </div>

              <Button>
                Add to calendar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;