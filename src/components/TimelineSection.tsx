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
          const eventIndex = Math.floor(progress * events.length);
          if (eventIndex < events.length && eventIndex >= 0) {
            setActiveEvent(eventIndex);
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
        height: '400vh' // Extended height for scroll
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
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            inset: '2rem',
            background: '#F58E7F', // Bride's coral color
            borderRadius: '40px',
            boxShadow: '0 20px 60px rgba(245, 142, 127, 0.3)'
          }}
        >
          {/* Vertical Line - spans full height */}
          <div
            style={{
              position: 'absolute',
              left: '33.33%',  // Positioned at 1/3 from left
              top: '0',
              bottom: '0',
              width: '2px',
              background: 'rgba(255, 255, 255, 0.6)',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
              zIndex: 5
            }}
          />
        </div>

        {/* Events Container - moves within pinned container */}
        <div
          ref={eventsRef}
          style={{
            position: 'absolute',
            left: '33.33%',  // Aligned with vertical line
            width: '60%',
            maxWidth: '800px'
          }}
        >
        {/* Title as first sliding element */}
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '2rem 2rem 2rem 4rem'  // Align with event content
          }}
        >
          <h2 style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            color: 'white',
            fontWeight: '400',
            letterSpacing: '-0.02em',
            textShadow: '0 3px 15px rgba(0,0,0,0.2)'
          }}>
            The Day's Timeline
          </h2>
        </div>
        {events.map((event, index) => (
          <div
            key={event.id}
            data-timeline-event-id={event.id}
            className="timeline-item"
            style={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              padding: '2rem'
            }}
          >
            {/* Timeline dot */}
            <div
              className="timeline-dot"
              style={{
              position: 'absolute',
              left: '-14px',  // Fine-tuned to center dot on the line
              top: '50%',
              transform: 'translateY(-50%)',
              width: '24px',
              height: '24px',
              background: activeEvent === index ? 'white' : 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              border: activeEvent === index ? '4px solid white' : '4px solid rgba(255, 255, 255, 0.6)',
              boxShadow: activeEvent === index ? '0 0 20px rgba(255,255,255,0.8)' : '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all 0.4s ease',
              zIndex: 10
            }} />

            {/* Event content */}
            <div style={{
              background: 'transparent',
              padding: '3rem 3rem 3rem 4rem',  // Add extra left padding to account for dot
              transition: 'all 0.5s ease'
            }}>
              <div style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '3rem',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '1rem',
                lineHeight: '1',
                textShadow: '0 2px 8px rgba(255,255,255,0.3)'
              }}>
                {event.time}
              </div>

              <h3 style={{
                fontFamily: 'Instrument Serif, serif',
                fontSize: '4.5rem',
                fontWeight: '700',
                color: 'white',
                margin: '0 0 1.5rem 0',
                letterSpacing: '-0.02em',
                lineHeight: '0.9',
                textShadow: '0 3px 15px rgba(0,0,0,0.2)'
              }}>
                {event.title}
              </h3>

              <div style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '1.4rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '1rem',
                textShadow: '0 1px 5px rgba(0,0,0,0.2)'
              }}>
                {event.location}
              </div>

              <div style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                {event.address}
              </div>

              <button
                onClick={() => openInGoogleMaps(event)}
                style={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  padding: '1rem 2rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                }}
              >
                Open in Google Maps
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;