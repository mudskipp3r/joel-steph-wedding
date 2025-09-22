'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  location?: string;
}

const scheduleEvents: ScheduleEvent[] = [
  {
    time: "2:30 PM",
    title: "Guest Arrival",
    description: "Welcome drinks and mingling",
    location: "Cathedral Entrance"
  },
  {
    time: "3:00 PM",
    title: "Wedding Ceremony",
    description: "The moment we say 'I do'",
    location: "St. Mary's Cathedral"
  },
  {
    time: "4:00 PM",
    title: "Photos & Cocktails",
    description: "Capturing memories while you enjoy cocktails",
    location: "Cathedral Gardens"
  },
  {
    time: "6:00 PM",
    title: "Reception Begins",
    description: "Dinner, dancing, and celebration",
    location: "The Grand Ballroom"
  },
  {
    time: "7:30 PM",
    title: "First Dance",
    description: "Our first dance as married couple",
    location: "Main Dance Floor"
  },
  {
    time: "11:30 PM",
    title: "Last Dance",
    description: "Final celebration before we say goodnight",
    location: "Main Dance Floor"
  }
];

const ScheduleSection: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pinHeight = document.querySelector('.schedule-pin-height') as HTMLElement;
    const container = document.querySelector('.schedule-container') as HTMLElement;
    const scheduleItems = document.querySelectorAll('.schedule-item');

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];

    if (pinHeight && container && scheduleItems.length > 0) {
      // Pin the container
      const pinTrigger = ScrollTrigger.create({
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container
      });
      triggers.push(pinTrigger);

      // Animate schedule items scrolling through
      scheduleItems.forEach((item, index) => {
        const itemTrigger = ScrollTrigger.create({
          trigger: pinHeight,
          start: `top+=${index * (100 / scheduleItems.length)}% top`,
          end: `top+=${(index + 1) * (100 / scheduleItems.length)}% top`,
          scrub: true,
          animation: gsap.fromTo(item, {
            yPercent: 100,
            opacity: 0
          }, {
            yPercent: -100,
            opacity: 1,
            ease: 'none'
          })
        });
        triggers.push(itemTrigger);
      });
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="schedule-section">
      <div className="schedule-pin-height">
        <div className="schedule-container">
          <div className="schedule-left">
            <h2 className="schedule-title">Schedule</h2>
          </div>

          <div className="schedule-right">
            <div className="schedule-viewport">
              {scheduleEvents.map((event, index) => (
                <div key={index} className="schedule-item">
                  <div className="schedule-content">
                    <div className="schedule-time">{event.time}</div>
                    <h3 className="schedule-event-title">{event.title}</h3>
                    <p className="schedule-description">{event.description}</p>
                    {event.location && (
                      <p className="schedule-location">📍 {event.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .schedule-section {
          background: transparent;
        }

        .schedule-pin-height {
          height: 400vh;
        }

        .schedule-container {
          height: 100vh;
          display: flex;
          overflow: hidden;
        }

        .schedule-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 40px;
        }

        .schedule-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: bold;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          writing-mode: vertical-rl;
          text-orientation: mixed;
          letter-spacing: 0.1em;
        }

        .schedule-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .schedule-viewport {
          position: relative;
          height: 80vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
        }

        .schedule-item {
          position: absolute;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .schedule-content {
          background: rgba(255, 255, 255, 0.95);
          padding: 30px 35px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          text-align: left;
          width: 100%;
          max-width: 400px;
          border-left: 4px solid #667eea;
        }

        .schedule-time {
          font-size: 1.8rem;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 8px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .schedule-event-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 8px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .schedule-description {
          font-size: 1rem;
          color: #555;
          line-height: 1.4;
          margin-bottom: 8px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .schedule-location {
          font-size: 0.9rem;
          color: #777;
          font-style: italic;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        @media (max-width: 768px) {
          .schedule-container {
            flex-direction: column;
          }

          .schedule-left {
            flex: 0 0 20%;
            padding: 20px;
          }

          .schedule-title {
            writing-mode: horizontal-tb;
            text-orientation: initial;
            font-size: clamp(2rem, 8vw, 3rem);
            text-align: center;
          }

          .schedule-right {
            flex: 1;
            padding: 20px;
          }

          .schedule-content {
            padding: 20px 25px;
            max-width: 100%;
          }

          .schedule-time {
            font-size: 1.5rem;
          }

          .schedule-event-title {
            font-size: 1.2rem;
          }

          .schedule-description {
            font-size: 0.9rem;
          }

          .schedule-location {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ScheduleSection;