'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface VenueData {
  title: string;
  venueName: string;
  address: string;
  time: string;
  description: string;
  mapUrl: string;
  directionsUrl: string;
  publicTransport: string;
  imageUrl: string;
  number: string;
  backgroundColor: string;
  textColor: string;
}

const venues: VenueData[] = [
  {
    title: "Ceremony",
    venueName: "St. Mary's Cathedral",
    address: "123 Cathedral Ave, Downtown, NY 10001",
    time: "3:00 PM",
    description: "Join us for our wedding ceremony in this beautiful historic cathedral. Please arrive 15 minutes early for seating.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1580491637188!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/maps?q=Empire+State+Building,+New+York,+NY",
    publicTransport: "Take the B, D, F, M, N, Q, R, or W train to 34th St-Herald Sq station. The cathedral is a 2-minute walk from the station.",
    imageUrl: "/images/LKCK6724.JPG",
    number: "(01)",
    backgroundColor: "transparent",
    textColor: "white"
  },
  {
    title: "Reception",
    venueName: "The Grand Ballroom",
    address: "456 Celebration Blvd, Uptown, NY 10002",
    time: "6:00 PM",
    description: "Celebrate with us at our reception! Dinner, dancing, and drinks will follow immediately after the ceremony.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1580491637188!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/maps?q=Times+Square,+New+York,+NY",
    publicTransport: "Take the N, Q, R, W, S, 1, 2, 3, or 7 trains to Times Sq-42nd St station. The ballroom is directly above the station.",
    imageUrl: "/images/LKCK6729.JPG",
    number: "(02)",
    backgroundColor: "transparent",
    textColor: "white"
  }
];

const ScrollAnimationSection: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];

    const slideElements = document.querySelectorAll('.animation-section .slide');

    slideElements.forEach((slide, index) => {
      const contentWrapper = slide.querySelector('.content-wrapper') as HTMLElement;
      const content = slide.querySelector('.content') as HTMLElement;

      if (contentWrapper && content) {
        // Only animate the first card (index 0)
        if (index === 0) {
          // 3D rotation and scale animation for first card
          const rotationTrigger = ScrollTrigger.create({
            pin: contentWrapper,
            trigger: slide,
            start: 'top 0%',
            end: '+=' + window.innerHeight,
            scrub: true,
            animation: gsap.to(content, {
              rotationZ: (Math.random() - 0.5) * 10,
              scale: 0.7,
              rotationX: 40,
              ease: 'power1.in'
            })
          });
          triggers.push(rotationTrigger);

          // Fade out animation for first card
          const fadeTrigger = ScrollTrigger.create({
            trigger: content,
            start: 'top -80%',
            end: '+=' + 0.2 * window.innerHeight,
            scrub: true,
            animation: gsap.to(content, {
              autoAlpha: 0,
              ease: 'power1.in'
            })
          });
          triggers.push(fadeTrigger);
        }
        // Second card (index 1) just scrolls normally - no special animations
      }
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="animation-section">
      <div>
        {venues.map((venue, index) => (
          <div key={index} className="slide">
            <div className="content-wrapper">
              <div
                className="content"
                style={{
                  backgroundColor: venue.backgroundColor,
                  color: venue.textColor
                }}
              >
                <div className="venue-header">
                  <div className="venue-title-section">
                    <p className="venue-type">{venue.title}</p>
                    <p className="venue-number">{venue.number}</p>
                  </div>
                  <div className="venue-details">
                    <h2 className="venue-name">{venue.venueName}</h2>
                    <p className="venue-time">{venue.time}</p>
                    <p className="venue-address">{venue.address}</p>
                  </div>
                </div>

                <div className="venue-content">
                  <div className="venue-info">
                    <div className="venue-image">
                      <img
                        src={venue.imageUrl}
                        alt={venue.venueName}
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
                      />
                    </div>
                    <div className="venue-description">
                      <p>{venue.description}</p>
                    </div>
                    <div className="transport-info">
                      <h4>Public Transport</h4>
                      <p>{venue.publicTransport}</p>
                    </div>
                  </div>

                  <div className="venue-map-section">
                    <div className="venue-map">
                      <iframe
                        src={venue.mapUrl}
                        width="100%"
                        height="400"
                        style={{ border: 0, borderRadius: '10px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <a
                      href={venue.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="directions-btn"
                    >
                      Get Directions in Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .animation-section {
          padding: 0;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          background: transparent;
        }


        .slide {
          height: 90vh;
          padding: 2vh 2vw;
          box-sizing: border-box;
        }

        .content-wrapper {
          width: 100%;
          height: 100%;
          perspective: 250vw;
        }

        .content {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          transform-origin: 50% 10%;
          padding: 25px 50px 50px 25px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .content:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
        }

        .venue-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .venue-title-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .venue-type {
          font-family: 'Instrument Serif', serif;
          font-weight: 600;
          font-size: clamp(3rem, 8vw, 6rem);
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: white;
        }

        .venue-number {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 500;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          opacity: 0.7;
          color: white;
        }

        .venue-details {
          text-align: right;
          max-width: 60%;
        }

        .venue-name {
          font-family: 'Instrument Serif', serif;
          font-weight: 600;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          margin-bottom: 0.5rem;
          line-height: 1.1;
          color: white;
        }

        .venue-time {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 600;
          font-size: clamp(1.2rem, 2.5vw, 2rem);
          margin-bottom: 0.5rem;
          opacity: 0.9;
          color: #F58E7F;
        }

        .venue-address {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 400;
          font-size: clamp(0.9rem, 1.8vw, 1.4rem);
          line-height: 1.3;
          opacity: 0.8;
          color: rgba(255, 255, 255, 0.8);
        }

        .venue-content {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3rem;
          align-items: start;
        }

        .venue-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .venue-image {
          width: 100%;
        }

        .venue-description {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 400;
          font-size: clamp(1rem, 2vw, 1.5rem);
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.9);
        }

        .transport-info {
          padding: 1rem;
          background: rgba(245, 142, 127, 0.15);
          border: 1px solid rgba(245, 142, 127, 0.3);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .transport-info h4 {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 600;
          font-size: clamp(1rem, 2vw, 1.3rem);
          margin-bottom: 0.5rem;
          opacity: 0.9;
          color: white;
        }

        .transport-info p {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 400;
          font-size: clamp(0.9rem, 1.8vw, 1.2rem);
          line-height: 1.4;
          opacity: 0.8;
          color: rgba(255, 255, 255, 0.8);
        }

        .venue-map-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .venue-map {
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          overflow: hidden;
        }

        .venue-map iframe {
          filter: saturate(0.9) contrast(1.1);
        }

        .directions-btn {
          display: inline-block;
          padding: 14px 28px;
          background: rgba(245, 142, 127, 0.2);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          border: 1px solid rgba(245, 142, 127, 0.4);
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 600;
          font-size: clamp(1rem, 2vw, 1.2rem);
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .directions-btn:hover {
          background: rgba(245, 142, 127, 0.3);
          border: 1px solid rgba(245, 142, 127, 0.6);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(245, 142, 127, 0.3);
        }

        @media (max-aspect-ratio: 1/1) {
          .slide {
            padding: 1vh 1vw;
          }

          .content {
            padding: 20px;
            justify-content: initial;
            border-radius: 10px;
          }

          .venue-header {
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .venue-details {
            text-align: left;
            max-width: 100%;
          }

          .venue-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .venue-info {
            gap: 1rem;
          }

          .venue-image img {
            height: 150px !important;
          }

          .venue-map iframe {
            height: 300px !important;
          }

          .transport-info {
            padding: 0.8rem;
          }

          .directions-btn {
            padding: 10px 20px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ScrollAnimationSection;