"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';
import { typography } from '../styles/typography';

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

    // Check if we're on mobile or iOS
    const isMobile = window.innerWidth <= 768;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

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
          // iOS-specific optimizations
          invalidateOnRefresh: true,
          refreshPriority: isIOS ? 1 : 0,
        }
      });

      // Scroll up less distance since we're starting from 0
      tl.to(eventsContainer, {
        y: -window.innerHeight * 2.5,
        ease: "none",
        duration: 1,
        force3D: true, // Force hardware acceleration on iOS
      });

      triggers.push(ScrollTrigger.getById("timeline-scroll")!);
    } else {
      // Mobile: Simple static layout, no pinning
      gsap.set(eventsContainer, { y: 0, clearProps: "transform" });
    }

    // Refresh ScrollTrigger after setup for iOS
    if (isIOS) {
      ScrollTrigger.refresh();
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
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
          WebkitBackfaceVisibility: 'hidden', // Reduce flickering on iOS
          WebkitPerspective: 1000, // Enable 3D acceleration
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
            {/* Title pip */}
            <div
              style={{
                position: 'absolute',
                left: '23%',
                transform: 'translateX(-50%)',
                top: '30vh',
                width: '24px',
                height: '24px',
                background: '#FF6B6B',
                borderRadius: '50%',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
                zIndex: 20
              }}
            />

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
                ...typography.styles.eventTitle,
                marginBottom: '1rem'
              }}>
                The Day's Timeline
              </div>
              <div style={{
                ...typography.styles.body,
                fontSize: '1.2rem',
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
                width: '24px',
                height: '24px',
                background: '#FF6B6B',
                borderRadius: '50%',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
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
                ...typography.styles.eventTime,
                marginBottom: '0.5rem'
              }}>
                12:30 pm
              </div>

              <div style={{
                ...typography.styles.eventTitle,
                marginBottom: '1.5rem'
              }}>
                Ceremony
              </div>

              <div style={{
                ...typography.styles.body,
                fontSize: '1.1rem',
                marginBottom: '2rem'
              }}>
                Please arrive at least 30 minutes early
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
                width: '24px',
                height: '24px',
                background: '#FF6B6B',
                borderRadius: '50%',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
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
                ...typography.styles.eventTime,
                marginBottom: '0.5rem'
              }}>
                6:00 pm
              </div>

              <div style={{
                ...typography.styles.eventTitle,
                marginBottom: '1.5rem'
              }}>
                Reception
              </div>

              <div style={{
                ...typography.styles.body,
                fontSize: '1.1rem',
                marginBottom: '2rem'
              }}>
                6:00pm - 11:30pm. Celebrate with us! Dinner, dancing, and drinks.
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
          /* iOS Safari viewport height fix */
          height: 100dvh; /* Dynamic viewport height - iOS 15.4+ */
          height: -webkit-fill-available; /* Fallback for older iOS */
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

          /* Mobile title section - left aligned with pip (child 2) */
          .timeline-content > div > div:last-child > div:nth-child(2) {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            text-align: left; /* Left align title */
            margin-bottom: 3rem;
          }

          /* Add pip for title section */
          .timeline-content > div > div:last-child > div:nth-child(2)::before {
            content: '';
            position: absolute;
            left: -3rem;
            top: 1rem;
            width: 24px;
            height: 24px;
            background: #FF6B6B;
            border-radius: 50%;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
          }

          .timeline-content > div > div:last-child > div:nth-child(2) > div:first-child {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
            margin-bottom: 1rem !important;
          }

          .timeline-content > div > div:last-child > div:nth-child(2) > div:last-child {
            font-size: 1rem !important;
          }

          /* Mobile event items - left aligned with no background boxes and pips */
          .timeline-content > div > div:last-child > div:nth-child(4),
          .timeline-content > div > div:last-child > div:nth-child(6) {
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

          /* Add pips for ceremony and reception events */
          .timeline-content > div > div:last-child > div:nth-child(4)::before,
          .timeline-content > div > div:last-child > div:nth-child(6)::before {
            content: '';
            position: absolute;
            left: -3rem;
            top: 2rem;
            width: 24px;
            height: 24px;
            background: #FF6B6B;
            border-radius: 50%;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
          }

          /* Hide desktop pip circles on mobile */
          .timeline-content > div > div:last-child > div:nth-child(1),
          .timeline-content > div > div:last-child > div:nth-child(3),
          .timeline-content > div > div:last-child > div:nth-child(5) {
            display: none !important;
          }

          /* Mobile event content adjustments - Ceremony (child 4) */
          .timeline-content > div > div:last-child > div:nth-child(4) > div:first-child {
            font-size: 2.5rem !important;
            margin-bottom: 0.5rem !important;
          }

          .timeline-content > div > div:last-child > div:nth-child(4) > div:nth-child(2) {
            font-size: 3rem !important;
            line-height: 1.1 !important;
            margin-bottom: 1rem !important;
          }

          .timeline-content > div > div:last-child > div:nth-child(4) > div:nth-child(3) {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }

          /* Mobile event content adjustments - Reception (child 6) */
          .timeline-content > div > div:last-child > div:nth-child(6) > div:first-child {
            font-size: 2.5rem !important;
            margin-bottom: 0.5rem !important;
          }

          .timeline-content > div > div:last-child > div:nth-child(6) > div:nth-child(2) {
            font-size: 3rem !important;
            line-height: 1.1 !important;
            margin-bottom: 1rem !important;
          }

          .timeline-content > div > div:last-child > div:nth-child(6) > div:nth-child(3) {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
        }

        /* iOS Safari specific fixes */
        @supports (-webkit-touch-callout: none) {
          .timeline-content {
            /* Fix viewport height issues on iOS */
            height: -webkit-fill-available;
          }

          /* Ensure smooth scrolling and reduce jank on iOS */
          .timeline-section * {
            -webkit-transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            -webkit-perspective: 1000;
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