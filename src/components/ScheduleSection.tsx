'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScheduleEvent {
  title: string;
  startTime: string;
  duration: string;
  description: string;
  location: string;
  imageUrl: string;
  specialNote?: string;
}

const scheduleEvents: ScheduleEvent[] = [
  {
    title: "Wedding Ceremony",
    startTime: "3:00 PM",
    duration: "45 minutes",
    description: "Join us as we exchange vows and begin our journey together",
    location: "St. Mary's Cathedral",
    imageUrl: "/images/LKCK6724.JPG",
    specialNote: "Please arrive 30 minutes before the ceremony begins"
  },
  {
    title: "Reception",
    startTime: "6:00 PM",
    duration: "5 hours",
    description: "Celebrate with us! Dinner, dancing, and unforgettable memories",
    location: "The Grand Ballroom",
    imageUrl: "/images/LKCK6729.JPG"
  }
];

const ScheduleSection: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll('.schedule-card');

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Simple fade-in animation for cards
    cards.forEach((card, index) => {
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        animation: gsap.fromTo(card, {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: index * 0.2
        })
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="schedule-section">
      <div className="schedule-container">
        <h2 className="schedule-title">Schedule</h2>

        <div className="schedule-cards">
          {scheduleEvents.map((event, index) => (
            <div key={index} className="schedule-card">
              <div className="card-image">
                <img src={event.imageUrl} alt={event.title} />
              </div>

              <div className="card-content">
                <h3 className="event-title">{event.title}</h3>

                <div className="time-info">
                  <div className="start-time">{event.startTime}</div>
                  <div className="duration">{event.duration}</div>
                </div>

                <p className="event-description">{event.description}</p>
                <p className="event-location">📍 {event.location}</p>

                {event.specialNote && (
                  <div className="special-note">
                    <strong>{event.specialNote}</strong>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .schedule-section {
          background: transparent;
          padding: 80px 20px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .schedule-container {
          max-width: 1000px;
          width: 100%;
        }

        .schedule-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 600;
          color: white;
          text-align: center;
          margin: 2rem 0 3rem;
          letter-spacing: -0.02em;
        }

        .schedule-cards {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .schedule-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
          display: flex;
          min-height: 280px;
          transition: all 0.3s ease;
        }

        .schedule-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          background: rgba(255, 255, 255, 0.15);
        }

        .card-image {
          flex: 0 0 300px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-content {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .event-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 600;
          color: white;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .time-info {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-bottom: 20px;
        }

        .start-time {
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
          margin-bottom: 15px;
        }

        .event-location {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 15px;
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

        @media (max-width: 768px) {
          .schedule-section {
            padding: 60px 15px;
          }

          .schedule-card {
            flex-direction: column;
            min-height: auto;
          }

          .card-image {
            flex: 0 0 200px;
          }

          .card-content {
            padding: 30px 25px;
          }

          .time-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .event-title {
            font-size: clamp(1.5rem, 6vw, 2rem);
          }

          .start-time {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ScheduleSection;