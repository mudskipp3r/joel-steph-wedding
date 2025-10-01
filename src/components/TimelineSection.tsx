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

    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      // Desktop: Use pinned scroll animation
      gsap.set(eventsContainer, { y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: content,
          pinSpacing: true,
          scrub: 1,
          markers: false,
          invalidateOnRefresh: true,
        }
      });

      tl.to(eventsContainer, {
        y: -window.innerHeight * 2.5,
        ease: "none",
        duration: 1,
        force3D: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="timeline"
      className="timeline-section"
    >
      <div ref={contentRef} className="timeline-content">
        {/* Fixed Vertical Line */}
        <div className="timeline-line" />

        {/* Scrolling events container */}
        <div ref={eventsRef} className="timeline-events">
          {/* Title Section */}
          <div className="timeline-item title-item">
            <div className="timeline-pip" />
            <div className="timeline-text">
              <div className="event-title">The Day's Timeline</div>
              <div className="event-description">Join us for our special day</div>
            </div>
          </div>

          {/* Ceremony */}
          <div className="timeline-item">
            <div className="timeline-pip" />
            <div className="timeline-text">
              <div className="event-time">12:30 pm</div>
              <div className="event-title">Ceremony</div>
              <div className="event-description">
                Please arrive 30 minutes early so the ceremony can begin smoothly and on time.
              </div>
              <Button variant="secondary" calendarEvent="ceremony">Add to calendar</Button>
            </div>
          </div>

          {/* Reception */}
          <div className="timeline-item">
            <div className="timeline-pip" />
            <div className="timeline-text">
              <div className="event-time">6:00 pm</div>
              <div className="event-title">Reception</div>
              <div className="event-description">
                6:00pm - 11:30pm. Celebrate with us! Dinner, dancing, and drinks.
              </div>
              <Button variant="secondary" calendarEvent="reception">Add to calendar</Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline-section {
          position: relative;
          background: transparent;
          height: 300vh; /* Desktop scroll distance */
        }

        .timeline-content {
          position: relative;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        .timeline-line {
          position: absolute;
          left: 23%;
          transform: translateX(-50%);
          top: 2rem;
          bottom: 2rem;
          width: 4px;
          background: linear-gradient(to bottom,
            rgba(208, 219, 225, 0.3) 0%,
            rgba(208, 219, 225, 0.8) 20%,
            rgba(208, 219, 225, 0.8) 80%,
            rgba(208, 219, 225, 0.3) 100%);
          border-radius: 2px;
          box-shadow: 0 2px 10px rgba(208, 219, 225, 0.2);
          z-index: 10;
        }

        .timeline-events {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 300vh;
          will-change: transform;
        }

        .timeline-item {
          position: absolute;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        .timeline-item.title-item {
          top: 30vh;
        }

        .timeline-item:nth-child(2) {
          top: 130vh;
        }

        .timeline-item:nth-child(3) {
          top: 230vh;
        }

        .timeline-pip {
          position: absolute;
          left: 23%;
          transform: translateX(-50%);
          width: 24px;
          height: 24px;
          background: #D0DBE1;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(208, 219, 225, 0.3);
          z-index: 20;
        }

        .timeline-text {
          margin-left: calc(23% + 3rem);
          z-index: 15;
        }

        .event-time {
          font-family: ${typography.fonts.sans};
          font-size: 3rem;
          font-weight: ${typography.weights.normal};
          color: ${typography.colors.primary};
          margin-bottom: 0.5rem;
          line-height: 1.1;
        }

        .event-title {
          font-family: ${typography.fonts.serif};
          font-size: 4.5rem;
          font-weight: ${typography.weights.normal};
          color: ${typography.colors.primary};
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .title-item .event-title {
          font-size: 4.5rem;
          margin-bottom: 1rem;
        }

        .event-description {
          font-family: ${typography.fonts.sans};
          font-size: 1.1rem;
          color: ${typography.colors.body};
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .title-item .event-description {
          font-size: 1.2rem;
          line-height: 1.4;
        }

        /* Mobile Layout */
        @media (max-width: 768px) {
          .timeline-section {
            height: auto !important;
            padding: 4rem 2rem;
            min-height: auto;
          }

          .timeline-content {
            height: auto !important;
            position: static !important;
            display: flex;
            gap: 2rem;
            align-items: flex-start;
            min-height: auto;
            overflow: visible !important;
            padding-left: 3rem;
            padding-right: 1rem; /* Add right padding to prevent cutoff */
          }

          .timeline-line {
            position: static !important;
            width: 4px !important;
            height: auto !important;
            min-height: 500px;
            flex: 0 0 4px;
            top: auto !important;
            bottom: auto !important;
            left: auto !important;
            transform: none !important;
            align-self: stretch;
          }

          .timeline-events {
            position: static !important;
            height: auto !important;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4rem;
            padding: 0;
          }

          .timeline-item {
            position: relative !important;
            display: block !important;
            top: auto !important;
            overflow: visible !important;
          }

          .timeline-pip {
            position: absolute !important;
            left: -2.85rem !important;
            top: 1rem !important;
            transform: none !important;
            z-index: 30 !important;
          }

          .timeline-text {
            margin-left: 0 !important;
            position: relative;
          }

          .event-time {
            font-size: 2.5rem !important;
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
          }

          .event-title {
            font-size: 3rem !important;
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
          }

          .title-item .event-title {
            font-size: 2.5rem !important;
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
          }

          .event-description {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
          }

          /* Fix button layout on mobile */
          .timeline-text button {
            position: relative !important;
            z-index: 40 !important;
            margin-top: 0.5rem !important;
            display: inline-block !important;
            white-space: nowrap !important;
            pointer-events: auto !important;
            -webkit-tap-highlight-color: transparent !important;
          }

          /* Ensure ceremony button specifically is clickable */
          .timeline-item:nth-child(2) .timeline-text button {
            z-index: 50 !important;
            position: relative !important;
            pointer-events: auto !important;
          }
        }

        /* Small mobile portrait specific fixes */
        @media (max-width: 480px) {
          /* Ensure ceremony button is fully clickable on small screens */
          .timeline-item:nth-child(2) {
            overflow: visible !important;
            position: relative !important;
            z-index: 45 !important;
          }

          .timeline-item:nth-child(2) .timeline-text {
            position: relative !important;
            z-index: 45 !important;
            overflow: visible !important;
          }

          .timeline-item:nth-child(2) button {
            z-index: 60 !important;
            position: relative !important;
            pointer-events: auto !important;
            display: block !important;
            width: auto !important;
            min-height: 44px !important; /* iOS minimum touch target */
            padding: 12px 20px !important;
            margin-top: 1rem !important;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 769px) and (max-width: 1024px) {
          .event-time {
            font-size: 2.5rem;
          }

          .event-title {
            font-size: 3.5rem;
          }

          .title-item .event-title {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TimelineSection;