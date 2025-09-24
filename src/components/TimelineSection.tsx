"use client";

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScheduleEvent {
  id: number;
  time: string;
  title: string;
  location: string;
  address: string;
  coordinates: { lat: number; lng: number };
  color: string;
  accentColor: string;
}

const events: ScheduleEvent[] = [
  {
    id: 1,
    time: "12:30 PM",
    title: "Church ceremony",
    location: "Saint Brigid's Catholic Church",
    address: "Livingstone Rd, Marrickville, NSW 2204",
    coordinates: { lat: -33.9133, lng: 151.1553 },
    color: "#FFF3E0",
    accentColor: "#FF9800"
  },
  {
    id: 2,
    time: "6:30 PM",
    title: "Reception",
    location: "The Sky Ballroom",
    address: "Level 3/462 Chapel Rd, Bankstown NSW 2200",
    coordinates: { lat: -33.9198, lng: 151.0346 },
    color: "#F3E5F5",
    accentColor: "#9C27B0"
  }
];

const images = [
  "/images/Joel Proposes to Steph-139.jpg",
  "/images/Joel Proposes to Steph-103.jpg",
  "/images/Joel Proposes to Steph-212.jpg",
  "/images/Joel Proposes to Steph-149.jpg",
  "/images/Joel Proposes to Steph-153.jpg",
  "/images/Joel Proposes to Steph-145.jpg",
  "/images/Joel Proposes to Steph-43.jpg",
  "/images/Joel Proposes to Steph-22.jpg"
];

const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pinned = pinnedRef.current;
    const events = eventsRef.current;

    if (!container || !pinned || !events) return;

    const ctx = gsap.context(() => {
      // Set initial state for events
      gsap.set(events, { y: window.innerHeight });

      // Pin the entire container and animate events scrolling through
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=300%", // Extend scroll distance for all events
        pin: pinned,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Move events up through the container
          const yPos = window.innerHeight - (progress * (window.innerHeight * 3));
          gsap.set(events, { y: yPos });
        }
      });

      // Track active event based on scroll progress
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=300%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalItems = events.length + 1; // +1 for title
          const activeIndex = Math.floor(progress * totalItems);
          if (activeIndex < totalItems && activeIndex >= 0) {
            setActiveEvent(activeIndex);
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const openInGoogleMaps = (event: ScheduleEvent) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      ref={containerRef}
      data-timeline-section
      style={{
        position: 'relative',
        height: '150vh', // Further reduced height for scroll
        background: 'transparent' // No background - managed by BackgroundColorManager
      }}
    >
      {/* Pinned Container */}
      <div
        ref={pinnedRef}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Background container with clipping */}
        <div
          style={{
            position: 'absolute',
            inset: '2rem',
            background: 'white', // White card background
            borderRadius: '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden' // Clip any content outside this container
          }}
        >
          {/* Fixed Vertical Line - thin gray line like reference */}
          <div
            style={{
              position: 'absolute',
              left: '23%', // Adjusted for being inside the inset container
              transform: 'translateX(-50%)',
              top: '0',
              bottom: '0',
              width: '1px',
              background: '#d0d0d0', // Light gray line like reference
              zIndex: 10
            }}
          />

          {/* Scrolling container with 3 circles - inside background container */}
          <div
            ref={eventsRef}
            style={{
              position: 'absolute',
              left: '0',
              right: '0',
              top: '0',
              bottom: '0'
            }}
          >
            {/* Title Section - No pip, just content */}
            <div
              style={{
                position: 'absolute',
                left: 'calc(23% + 3rem)',
                top: '30vh', // First position
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
                top: '130vh', // Second position
                width: '12px',
                height: '12px',
                background: '#c8beb7',
                borderRadius: '50%',
                zIndex: 20
              }}
            />

            {/* Content - Ceremony section */}
            <div
              style={{
                position: 'absolute',
                left: 'calc(23% + 3rem)',
                top: '130vh',
                transform: 'translateY(-50%)',
                zIndex: 15
              }}
            >
              {/* Time - coral color like reference */}
              <div style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '3.5rem', // Larger like reference
                color: '#FF6B6B', // Brighter coral like reference
                fontWeight: '400', // Lighter weight
                marginBottom: '0.5rem',
                lineHeight: '1'
              }}>
                3:00 pm
              </div>

              {/* Title - large black serif */}
              <div style={{
                fontFamily: 'Cardo, serif',
                fontSize: '5.5rem', // Much larger like reference
                color: '#1a1a1a', // Pure black like reference
                fontWeight: '400', // Not bold
                marginBottom: '1.5rem',
                lineHeight: '0.9',
                letterSpacing: '-0.02em'
              }}>
                Ceremony
              </div>

              {/* Subtitle - smaller gray text */}
              <div style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '1.1rem',
                color: '#666666', // Gray like reference
                fontWeight: '400',
                marginBottom: '2rem',
                lineHeight: '1.4'
              }}>
                Please arrive at least 30 mins early to be seated
              </div>

              {/* Button - coral rounded */}
              <button style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '1rem',
                fontWeight: '500',
                color: 'white',
                background: '#FF6B6B', // Same coral as time
                border: 'none',
                borderRadius: '25px', // More rounded like reference
                padding: '14px 28px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Add to calendar
              </button>
            </div>

            {/* Circle 2 - Reception */}
            <div
              style={{
                position: 'absolute',
                left: '23%',
                transform: 'translateX(-50%)',
                top: '230vh', // Third position
                width: '12px',
                height: '12px',
                background: '#c8beb7',
                borderRadius: '50%',
                zIndex: 20
              }}
            />

            {/* Content - Reception section */}
            <div
              style={{
                position: 'absolute',
                left: 'calc(23% + 3rem)',
                top: '230vh',
                transform: 'translateY(-50%)',
                zIndex: 15
              }}
            >
              {/* Time - coral color */}
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

              {/* Title - large black serif */}
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

              {/* Subtitle - gray text */}
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

              {/* Button - coral rounded */}
              <button style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '1rem',
                fontWeight: '500',
                color: 'white',
                background: '#FF6B6B',
                border: 'none',
                borderRadius: '25px',
                padding: '14px 28px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Add to calendar
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;