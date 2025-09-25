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
      // Start with title visible (y: 0) instead of off-screen
      gsap.set(eventsContainer, { y: 0 });

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

      // Scroll up less distance since we're starting from 0
      tl.to(eventsContainer, {
        y: -window.innerHeight * 2.5,
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
            background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #ffffff 100%)',
            borderRadius: '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            overflow: 'hidden'
          }}
        >
          {/* Decorative background pattern */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              opacity: 0.03,
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #FF6B6B 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #FF6B6B 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px, 40px 40px',
              backgroundPosition: '0 0, 20px 20px',
              pointerEvents: 'none'
            }}
          />

          {/* Subtle corner decorations */}
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(255, 107, 107, 0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              width: '80px',
              height: '80px',
              background: 'radial-gradient(circle, rgba(255, 107, 107, 0.04) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
          {/* Fixed Vertical Line - Thicker with gradient */}
          <div
            style={{
              position: 'absolute',
              left: '23%',
              transform: 'translateX(-50%)',
              top: '2rem',
              bottom: '2rem',
              width: '4px',
              background: 'linear-gradient(to bottom, rgba(255, 107, 107, 0.3) 0%, rgba(255, 107, 107, 0.8) 20%, rgba(255, 107, 107, 0.8) 80%, rgba(255, 107, 107, 0.3) 100%)',
              borderRadius: '2px',
              boxShadow: '0 2px 10px rgba(255, 107, 107, 0.2)',
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

            {/* Circle 1 - Ceremony - Enhanced */}
            <div
              style={{
                position: 'absolute',
                left: '23%',
                transform: 'translateX(-50%)',
                top: '130vh',
                width: '18px',
                height: '18px',
                background: '#FF6B6B',
                borderRadius: '50%',
                border: '3px solid white',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.5)',
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

            {/* Circle 2 - Reception - Enhanced */}
            <div
              style={{
                position: 'absolute',
                left: '23%',
                transform: 'translateX(-50%)',
                top: '230vh',
                width: '18px',
                height: '18px',
                background: '#FF6B6B',
                borderRadius: '50%',
                border: '3px solid white',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.5)',
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
            padding: 2rem 0; /* Remove side padding for full width */
          }

          .timeline-content {
            height: auto !important;
            position: static !important; /* Remove pinning on mobile */
          }

          /* Force hide only the desktop red line - target by specific attributes */
          .timeline-content > div > div[style*="left: 23%"][style*="width: 4px"] {
            display: none !important;
          }

          /* Keep background card container for mobile with flex layout */
          .timeline-content > div {
            position: static !important;
            inset: 0 !important;
            margin: 2rem !important;
            border-radius: 20px !important;
            padding: 2rem !important;
            display: flex !important;
            align-items: flex-start !important;
            gap: 2rem !important; /* Add gap between columns */
          }

          /* Hide desktop red line on mobile (the one with inline styles) */
          .timeline-content > div > div:first-child {
            display: none !important;
          }

          /* Create new mobile red line column */
          .timeline-content > div::before {
            content: '' !important;
            display: block !important;
            width: 4px !important;
            background: linear-gradient(to bottom, rgba(255, 107, 107, 0.3) 0%, rgba(255, 107, 107, 0.8) 20%, rgba(255, 107, 107, 0.8) 80%, rgba(255, 107, 107, 0.3) 100%) !important;
            border-radius: 2px !important;
            box-shadow: 0 2px 10px rgba(255, 107, 107, 0.2) !important;
            flex: 0 0 4px !important; /* Fixed width, no grow, no shrink */
            min-height: 500px !important; /* Ensure line has minimum height */
            align-self: stretch !important; /* Stretch to match container height */
          }

          /* Events container mobile layout - Flexible right column */
          .timeline-content > div > div:last-child {
            position: static !important;
            height: auto !important;
            transform: none !important;
            display: flex;
            flex-direction: column;
            gap: 3rem;
            padding: 0;
            flex: 1 1 auto !important; /* Take remaining space */
            min-width: 0 !important; /* Allow shrinking if needed */
          }

          /* Mobile title section - left aligned with pip */
          .timeline-content > div > div:last-child > div:first-child {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            text-align: left; /* Left align title */
            margin-bottom: 3rem;
          }

          /* Add pip for title section */
          .timeline-content > div > div:last-child > div:first-child::before {
            content: '';
            position: absolute;
            left: -3rem;
            top: 1rem;
            width: 18px;
            height: 18px;
            background: #FF6B6B;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.5);
          }

          .timeline-content > div > div:last-child > div:first-child > div:first-child {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
            margin-bottom: 1rem !important;
          }

          .timeline-content > div > div:last-child > div:first-child > div:last-child {
            font-size: 1rem !important;
          }

          /* Mobile event items - left aligned with no background boxes and pips */
          .timeline-content > div > div:last-child > div:not(:first-child) {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            text-align: left; /* Left align content */
            background: transparent !important; /* Remove background */
            padding: 0 !important; /* Remove padding */
            border-radius: 0 !important; /* Remove border radius */
            border: none !important; /* Remove border */
            box-shadow: none !important; /* Remove shadow */
          }

          /* Add pips for ceremony and reception events (skip the circle divs) */
          .timeline-content > div > div:last-child > div:nth-child(3)::before,
          .timeline-content > div > div:last-child > div:nth-child(5)::before {
            content: '';
            position: absolute;
            left: -3rem;
            top: 2rem;
            width: 18px;
            height: 18px;
            background: #FF6B6B;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.5);
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