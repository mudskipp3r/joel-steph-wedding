'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Google Maps types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface Event {
  id: number;
  time: string;
  title: string;
  location: string;
  address: string;
  lat: number;
  lng: number;
  color: string;
}

const OptimizedTimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState(0);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  const events: Event[] = [
    {
      id: 1,
      time: '3:00 PM',
      title: 'Ceremony',
      location: 'Beautiful Garden Chapel',
      address: '123 Wedding Lane, Love City',
      lat: -33.8688,
      lng: 151.2093,
      color: '#F58E7F'
    },
    {
      id: 2,
      time: '4:30 PM',
      title: 'Cocktail Hour',
      location: 'Sunset Terrace',
      address: '456 Celebration Ave, Joy Town',
      lat: -33.8650,
      lng: 151.2094,
      color: '#667eea'
    },
    {
      id: 3,
      time: '6:00 PM',
      title: 'Reception',
      location: 'Grand Ballroom',
      address: '789 Party Plaza, Happiness Heights',
      lat: -33.8671,
      lng: 151.2070,
      color: '#764ba2'
    },
    {
      id: 4,
      time: '11:00 PM',
      title: 'Late Night Dancing',
      location: 'Dance Floor',
      address: '789 Party Plaza, Happiness Heights',
      lat: -33.8671,
      lng: 151.2070,
      color: '#FF8E53'
    }
  ];

  // Initialize Google Maps
  useEffect(() => {
    const initializeMap = () => {
      if (!window.google || !mapRef.current) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: { lat: events[0].lat, lng: events[0].lng },
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f5f5f5' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9e2f7' }]
          }
        ]
      });

      const newMarkers = events.map((event, index) => {
        const marker = new window.google.maps.Marker({
          position: { lat: event.lat, lng: event.lng },
          map: mapInstance,
          title: event.title,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: index === activeEvent ? 12 : 8,
            fillColor: event.color,
            fillOpacity: index === activeEvent ? 1 : 0.7,
            strokeWeight: 2,
            strokeColor: '#ffffff'
          }
        });

        marker.addListener('click', () => {
          setActiveEvent(index);
        });

        return marker;
      });

      setMap(mapInstance);
      setMarkers(newMarkers);
    };

    if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      if (window.google) {
        initializeMap();
      } else {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        script.async = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      }
    }
  }, [activeEvent]);

  // Update map when active event changes
  useEffect(() => {
    if (map && markers.length > 0) {
      const event = events[activeEvent];

      // Update marker styles
      markers.forEach((marker, index) => {
        marker.setIcon({
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: index === activeEvent ? 12 : 8,
          fillColor: events[index].color,
          fillOpacity: index === activeEvent ? 1 : 0.7,
          strokeWeight: 2,
          strokeColor: '#ffffff'
        });
      });

      // Pan to active location
      map.panTo({ lat: event.lat, lng: event.lng });
    }
  }, [activeEvent, map, markers]);

  // Timeline scroll animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const timeline = timelineRef.current;

    if (!section || !timeline) return;

    const triggers: ScrollTrigger[] = [];

    // Animate timeline items on scroll
    const timelineItems = timeline.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        animation: gsap.fromTo(item,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => setActiveEvent(index)
          }
        )
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="optimized-timeline-section">
      <div className="timeline-container">
        <div className="timeline-content">
          <h2>Wedding Day Timeline</h2>
          <div ref={timelineRef} className="timeline">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`timeline-item ${index === activeEvent ? 'active' : ''}`}
                onClick={() => setActiveEvent(index)}
              >
                <div className="timeline-dot" style={{ backgroundColor: event.color }}>
                  <div className="timeline-dot-inner"></div>
                </div>
                <div className="timeline-content-item">
                  <div className="timeline-time">{event.time}</div>
                  <div className="timeline-title">{event.title}</div>
                  <div className="timeline-location">{event.location}</div>
                  <div className="timeline-address">{event.address}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="map-container">
          <div ref={mapRef} className="map"></div>
          <div className="map-overlay">
            <h3>{events[activeEvent].title}</h3>
            <p>{events[activeEvent].location}</p>
            <small>{events[activeEvent].address}</small>
          </div>
        </div>
      </div>

      <style jsx>{`
        .optimized-timeline-section {
          padding: 6rem 2rem;
          background: transparent;
          min-height: 90vh;
        }

        .timeline-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .timeline-content h2 {
          font-family: 'Cardo', serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 400;
          color: #2c3e50;
          margin-bottom: 3rem;
          text-align: center;
          letter-spacing: -0.02em;
        }

        .timeline {
          position: relative;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #F58E7F, #667eea, #764ba2, #FF8E53);
        }

        .timeline-item {
          position: relative;
          padding: 2rem 0 2rem 4rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 16px;
          margin-bottom: 1rem;
        }

        .timeline-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .timeline-item.active {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .timeline-dot {
          position: absolute;
          left: -4rem;
          top: 2rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .timeline-dot-inner {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
        }

        .timeline-time {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 3rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .timeline-title {
          font-family: 'Cardo', serif;
          font-size: 4.5rem;
          font-weight: 400;
          color: #2c3e50;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .timeline-location {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1.3rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .timeline-address {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1rem;
          color: #888;
        }

        .map-container {
          position: relative;
          height: 600px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .map {
          width: 100%;
          height: 100%;
        }

        .map-overlay {
          position: absolute;
          top: 2rem;
          left: 2rem;
          right: 2rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .map-overlay h3 {
          font-family: 'Cardo', serif;
          font-size: 1.5rem;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .map-overlay p {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .map-overlay small {
          font-family: 'Instrument Sans', sans-serif;
          color: #888;
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          .timeline-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .map-container {
            height: 400px;
          }
        }

        @media (max-width: 768px) {
          .optimized-timeline-section {
            padding: 4rem 1rem;
          }

          .timeline-item {
            padding: 1.5rem 0 1.5rem 3rem;
          }

          .timeline-dot {
            left: -3rem;
            width: 30px;
            height: 30px;
          }

          .timeline-time {
            font-size: 2rem;
          }

          .timeline-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default OptimizedTimelineSection;