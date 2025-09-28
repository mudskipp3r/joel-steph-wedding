'use client';

import React from 'react';

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  backgroundImage,
  className = ""
}) => {
  return (
    <section
      className={`hero-banner ${className}`}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`
          : 'transparent',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      {/* Main Names Display */}
      <div className="names-container" style={{
        position: 'absolute',
        bottom: 'calc(12% + 20px)', // Desktop keeps original spacing
        right: '8%', // Moved left from 4% to 8%
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        textAlign: 'right'
      }}>
        {/* Stephanie */}
        <div
          style={{
            fontFamily: 'Cardo, serif',
            fontSize: 'clamp(5rem, 15vw, 12rem)',
            fontWeight: '300', // Lighter weight
            margin: '0',
            lineHeight: '0.8',
            letterSpacing: '-0.02em',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
            color: '#FFF0E2'
          }}
        >
          Stephanie
        </div>

        {/* and Joel on same line with consistent sizing */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '1.2rem',
          justifyContent: 'center',
          marginTop: '-1rem' // Much tighter spacing between lines
        }}>
          <span
            style={{
              fontFamily: 'Cardo, serif',
              fontSize: 'clamp(5rem, 15vw, 12rem)', // Same size as Stephanie
              fontWeight: '300', // Lighter weight
              color: '#D9950D', // Golden color for "and"
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
              letterSpacing: '-0.02em'
            }}
          >
            and
          </span>
          <span
            style={{
              fontFamily: 'Cardo, serif',
              fontSize: 'clamp(5rem, 15vw, 12rem)', // Same size as Stephanie
              fontWeight: '300', // Lighter weight
              color: '#FFF0E2',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
              letterSpacing: '-0.02em'
            }}
          >
            Joel
          </span>
        </div>
      </div>

      {/* Date in bottom right */}
      <div
        className="date-container"
        style={{
          position: 'absolute',
          bottom: '5%', // More padding from bottom
          right: '4%',
          fontFamily: 'Instrument Sans, sans-serif',
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          fontWeight: '400',
          color: '#FFF0E2',
          textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)',
          textAlign: 'right'
        }}
      >
        6th February <span style={{ fontWeight: 'bold' }}>2026</span>
      </div>

      {/* Heart SVG in bottom left */}
      <div
        className="heart-container"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '4%',
          width: '60px',
          height: '60px',
          opacity: 0.8
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          style={{
            filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))'
          }}
        >
          <image
            href="/Heart_3.svg"
            width="100"
            height="100"
            style={{
              filter: 'brightness(0) saturate(100%) invert(100%) sepia(5%) saturate(341%) hue-rotate(12deg) brightness(105%) contrast(92%)'
            }}
          />
        </svg>
      </div>

      {/* Mobile-specific adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-banner .names-container {
            bottom: 14% !important;
            right: 6% !important;
            left: 6% !important;
            max-width: none !important;
          }

          .hero-banner .date-container {
            bottom: 8% !important;
            right: 6% !important;
          }

          .hero-banner .heart-container {
            bottom: 8% !important;
            left: 6% !important;
          }
        }

        @media (max-width: 480px) {
          .hero-banner .names-container {
            bottom: 16% !important;
          }

          .hero-banner .date-container {
            bottom: 10% !important;
          }

          .hero-banner .heart-container {
            bottom: 10% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;