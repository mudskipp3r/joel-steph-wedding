'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PhotoCarousel: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = document.querySelector('.photo-carousel-section');
    const pinHeight = root?.querySelector('.pin-height') as HTMLElement;
    const container = root?.querySelector('.container') as HTMLElement;
    const circles = root?.querySelectorAll('.circle');

    if (pinHeight && container && circles) {
      ScrollTrigger.create({
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container
      });

      gsap.fromTo(circles, {
        rotation: 30
      }, {
        rotation: -30,
        ease: 'power2.inOut',
        stagger: 0.06,
        scrollTrigger: {
          trigger: pinHeight,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const photos = [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop",
      alt: "Wedding moment 1"
    },
    {
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=600&fit=crop",
      alt: "Wedding moment 2"
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=600&fit=crop",
      alt: "Wedding moment 3"
    },
    {
      src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=600&fit=crop",
      alt: "Wedding moment 4"
    },
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=600&fit=crop",
      alt: "Wedding moment 5"
    },
    {
      src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=600&fit=crop",
      alt: "Wedding moment 6"
    }
  ];

  return (
    <section className="photo-carousel-section">
      <div className="pin-height">
        <div className="container">
          <p className="header">Our Journey Together</p>
          {photos.map((photo, index) => (
            <div key={index} className="circle">
              <img
                className="media"
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .photo-carousel-section {
          background: transparent;
          color: #F1F1F1;
          font-family: 'Inter', sans-serif;
        }

        .header {
          position: absolute;
          width: 100%;
          text-align: center;
          top: 25px;
          left: 0;
          font-weight: 500;
          font-size: clamp(0.8rem, 2vw, 1rem);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.9;
          color: white;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .pin-height {
          height: 400vh;
        }

        .container {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        .circle {
          width: 300%;
          aspect-ratio: 1;
          position: absolute;
          top: 50%;
          left: -100%;
        }

        .media {
          width: 25vw;
          aspect-ratio: 0.74;
          border-radius: 0.6vw;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
        }

        .media:hover {
          transform: translate(-50%, -50%) scale(1.05);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
        }

        @media (max-width: 768px) {
          .circle {
            width: 400%;
            left: -150%;
          }

          .media {
            width: 55vw;
          }

          .header {
            font-size: clamp(0.7rem, 3vw, 0.9rem);
          }
        }
      `}</style>
    </section>
  );
};

export default PhotoCarousel;