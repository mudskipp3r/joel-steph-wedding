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

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];

    if (pinHeight && container && circles) {
      const pinTrigger = ScrollTrigger.create({
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container
      });
      triggers.push(pinTrigger);

      const rotationTrigger = ScrollTrigger.create({
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        animation: gsap.fromTo(circles, {
          rotation: 30
        }, {
          rotation: -30,
          ease: 'power2.inOut',
          stagger: 0.06
        })
      });
      triggers.push(rotationTrigger);
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  const photos = [
    {
      src: "/images/compressed_Joel Proposes to Steph-43.jpg",
      alt: "Joel and Stephanie engagement photo - romantic moment"
    },
    {
      src: "/images/compressed_LKCK6451.JPG",
      alt: "Joel and Stephanie engagement photo - celebration"
    },
    {
      src: "/images/compressed_Joel Proposes to Steph-145.jpg",
      alt: "Joel and Stephanie engagement photo - portrait"
    },
    {
      src: "/images/compressed_LKCK6514.JPG",
      alt: "Joel and Stephanie engagement photo - intimate moment"
    },
    {
      src: "/images/compressed_joel and steph-05255.jpg",
      alt: "Joel and Stephanie engagement photo - joyful scene"
    },
    {
      src: "/images/compressed_LKCK6668.JPG",
      alt: "Joel and Stephanie engagement photo - beautiful setting"
    }
  ];

  return (
    <section className="photo-carousel-section">
      <div className="pin-height">
        <div className="container">
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