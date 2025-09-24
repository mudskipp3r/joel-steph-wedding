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

    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;

    // Clean up any existing ScrollTriggers
    const triggers: ScrollTrigger[] = [];

    if (!isMobile) {
      // Desktop: Use complex pinned scroll animation
      gsap.set(eventsContainer, { y: window.innerHeight });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: content,
          pinSpacing: true,
          scrub: 1,
          id: "timeline-scroll",
          markers: false,
        }
      });

      tl.to(eventsContainer, {
        y: -window.innerHeight * 2,
        ease: "none",
        duration: 1
      });

      triggers.push(ScrollTrigger.getById("timeline-scroll")!);
    } else {
      // Mobile: Simple static layout, no pinning
      gsap.set(eventsContainer, { y: 0, clearProps: "transform" });
    }

    return () => {
      triggers.forEach(trigger => trigger?.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-timeline-section
      className="timeline-section"
      style={{
        position: 'relative',
        background: 'transparent'
      }}
    >
      {/* Content container that gets pinned */}
      <div
        ref={contentRef}
        className="timeline-content"
        style={{
          position: 'relative',
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

      <style jsx>{`
        /* Desktop Layout (Default) */
        .timeline-section {
          height: 300vh; /* Total scroll distance for desktop animation */
        }

        .timeline-content {
          height: 100vh;
        }

        /* Mobile Layout */
        @media (max-width: 768px) {
          .timeline-section {
            height: auto !important; /* Remove fixed height on mobile */
            padding: 2rem 1rem;
          }

          .timeline-content {
            height: auto !important;
            position: static !important; /* Remove pinning on mobile */
          }

          /* Background card adjustments for mobile */
          .timeline-content > div {
            position: static !important;
            inset: 0 !important;
            margin: 0 !important;
            border-radius: 20px !important;
            padding: 2rem !important;
          }

          /* Hide the vertical line on mobile */
          .timeline-content > div > div:first-child {
            display: none !important;
          }

          /* Events container mobile layout */
          .timeline-content > div > div:last-child {
            position: static !important;
            height: auto !important;
            transform: none !important;
            display: flex;
            flex-direction: column;
            gap: 3rem;
            padding: 1rem 0;
          }

          /* Mobile title section */
          .timeline-content > div > div:last-child > div:first-child {
            position: static !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            text-align: center;
            margin-bottom: 3rem;
          }

          .timeline-content > div > div:last-child > div:first-child > div:first-child {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
            margin-bottom: 1rem !important;
          }

          .timeline-content > div > div:last-child > div:first-child > div:last-child {
            font-size: 1rem !important;
          }

          /* Mobile event items */
          .timeline-content > div > div:last-child > div:not(:first-child) {
            position: static !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            text-align: center;
            background: rgba(255, 255, 255, 0.8);
            padding: 2rem;
            border-radius: 16px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }

          /* Hide circles on mobile */
          .timeline-content > div > div:last-child > div:nth-child(2),
          .timeline-content > div > div:last-child > div:nth-child(4) {
            display: none !important;
          }

          /* Mobile event content adjustments */
          .timeline-content > div > div:last-child > div:nth-child(3) > div:first-child,
          .timeline-content > div > div:last-child > div:nth-child(5) > div:first-child {
            font-size: 2.5rem !important;
            margin-bottom: 0.5rem !important;
          }

          .timeline-content > div > div:last-child > div:nth-child(3) > div:nth-child(2),
          .timeline-content > div > div:last-child > div:nth-child(5) > div:nth-child(2) {
            font-size: 3rem !important;
            line-height: 1.1 !important;
            margin-bottom: 1rem !important;
          }

          .timeline-content > div > div:last-child > div:nth-child(3) > div:nth-child(3),
          .timeline-content > div > div:last-child > div:nth-child(5) > div:nth-child(3) {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 769px) and (max-width: 1024px) {
          .timeline-content > div > div:last-child > div:first-child > div:first-child {
            font-size: 3rem !important;
          }

          .timeline-content > div > div:last-child > div:nth-child(3) > div:nth-child(2),
          .timeline-content > div > div:last-child > div:nth-child(5) > div:nth-child(2) {
            font-size: 4rem !important;
          }

          .timeline-content > div > div:last-child > div:nth-child(3) > div:first-child,
          .timeline-content > div > div:last-child > div:nth-child(5) > div:first-child {
            font-size: 3rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TimelineSection;