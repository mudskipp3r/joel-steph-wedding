'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScheduleEvent {
  title: string;
  startTime: string;
  duration: string;
  description: string;
  location: string;
  address: string;
  mapUrl: string;
  specialNote?: string;
}

const scheduleEvents: ScheduleEvent[] = [
  {
    title: "Wedding Ceremony",
    startTime: "3:00 PM",
    duration: "45 minutes",
    description: "Join us as we exchange vows and begin our journey together",
    location: "St. Mary's Cathedral",
    address: "123 Cathedral Ave, Downtown, NY 10001",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1580491637188!5m2!1sen!2sus",
    specialNote: "Please arrive 30 minutes before the ceremony begins"
  },
  {
    title: "Reception",
    startTime: "6:00 PM",
    duration: "5 hours",
    description: "Celebrate with us! Dinner, dancing, and unforgettable memories",
    location: "The Grand Ballroom",
    address: "456 Celebration Blvd, Uptown, NY 10002",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1580491637188!5m2!1sen!2sus"
  }
];

const ScheduleSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLIFrameElement>(null);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [currentMapUrl, setCurrentMapUrl] = useState(scheduleEvents[0].mapUrl);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const eventCards = section.querySelectorAll('.event-card');
    const triggers: ScrollTrigger[] = [];

    // Create scroll triggers for each event card
    eventCards.forEach((card, index) => {
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setActiveEventIndex(index);
          setCurrentMapUrl(scheduleEvents[index].mapUrl);
        },
        onEnterBack: () => {
          setActiveEventIndex(index);
          setCurrentMapUrl(scheduleEvents[index].mapUrl);
        }
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="schedule-section">
      <h2 className="schedule-title">Schedule & Locations</h2>

      <div className="schedule-layout">
        {/* Left side - Scrollable events */}
        <div className="events-container">
          <div className="events-scroll">
            {scheduleEvents.map((event, index) => (
              <div
                key={index}
                className={`event-card ${activeEventIndex === index ? 'active' : ''}`}
              >
                <div className="event-number">{index + 1}</div>
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>

                  <div className="event-time">
                    <span className="time">{event.startTime}</span>
                    <span className="duration">{event.duration}</span>
                  </div>

                  <p className="event-description">{event.description}</p>

                  <div className="event-location">
                    <strong>{event.location}</strong>
                    <span>{event.address}</span>
                  </div>

                  {event.specialNote && (
                    <div className="special-note">
                      {event.specialNote}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Fixed map */}
        <div className="map-container">
          <div className="map-wrapper">
            <iframe
              ref={mapRef}
              src={currentMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .schedule-section {
          background: transparent;
          padding: 80px 20px;
          min-height: 100vh;
        }

        .schedule-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 600;
          color: white;
          text-align: center;
          margin: 0 0 4rem;
          letter-spacing: -0.02em;
        }

        .schedule-layout {
          display: flex;
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
          height: 80vh;
        }

        .events-container {
          flex: 1;
          overflow-y: auto;
          padding-right: 20px;
        }

        .events-scroll {
          display: flex;
          flex-direction: column;
          gap: 30px;
          padding: 40px 0;
        }

        .event-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 40px;
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          display: flex;
          gap: 30px;
          position: relative;
          min-height: 250px;
        }

        .event-card.active {
          background: rgba(255, 255, 255, 0.15);
          border-color: #F58E7F;
          transform: translateX(10px);
          box-shadow: 0 12px 40px rgba(245, 142, 127, 0.3);
        }

        .event-number {
          font-family: 'Instrument Serif', serif;
          font-size: 4rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.2);
          line-height: 1;
          transition: all 0.3s ease;
        }

        .event-card.active .event-number {
          color: #F58E7F;
        }

        .event-content {
          flex: 1;
        }

        .event-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 3vw, 2.5rem);
          font-weight: 600;
          color: white;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .event-time {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-bottom: 20px;
        }

        .time {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #F58E7F;
        }

        .duration {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          background: rgba(245, 142, 127, 0.2);
          padding: 6px 16px;
          border-radius: 20px;
          border: 1px solid rgba(245, 142, 127, 0.3);
        }

        .event-description {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .event-location {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .event-location strong {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1.2rem;
          color: white;
          font-weight: 600;
        }

        .event-location span {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .special-note {
          background: rgba(245, 142, 127, 0.2);
          border: 1px solid rgba(245, 142, 127, 0.4);
          border-radius: 12px;
          padding: 15px;
          color: rgba(255, 255, 255, 0.95);
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
        }

        .map-container {
          flex: 1;
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .map-wrapper {
          width: 100%;
          height: 70vh;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        /* Scrollbar styling */
        .events-container::-webkit-scrollbar {
          width: 8px;
        }

        .events-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .events-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }

        .events-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 1024px) {
          .schedule-layout {
            flex-direction: column;
            height: auto;
          }

          .map-container {
            position: sticky;
            top: 20px;
            order: -1;
            margin-bottom: 40px;
          }

          .map-wrapper {
            height: 400px;
          }

          .events-container {
            overflow-y: visible;
            padding-right: 0;
          }

          .event-card.active {
            transform: translateX(0) translateY(-5px);
          }
        }

        @media (max-width: 768px) {
          .schedule-section {
            padding: 60px 15px;
          }

          .event-card {
            padding: 30px 20px;
            flex-direction: column;
            gap: 20px;
          }

          .event-number {
            font-size: 3rem;
          }

          .map-wrapper {
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default ScheduleSection;