'use client';

import React from 'react';

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title = "Welcome to Our Wedding",
  subtitle = "Joel & Stephanie",
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
      <div style={{ maxWidth: '800px', padding: '0 20px' }}>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.2rem, 4vw, 2rem)',
            marginBottom: '2rem',
            opacity: 0.9,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}
        >
          {subtitle}
        </p>
        <button
          style={{
            padding: '12px 30px',
            fontSize: '1.1rem',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid white',
            color: 'white',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.color = 'white';
          }}
        >
          Learn More
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite'
        }}
      >
        <div
          style={{
            width: '24px',
            height: '40px',
            border: '2px solid white',
            borderRadius: '12px',
            position: 'relative'
          }}
        >
          <div
            style={{
              width: '4px',
              height: '8px',
              background: 'white',
              borderRadius: '2px',
              position: 'absolute',
              top: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'scroll 1.5s infinite'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @keyframes scroll {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(15px);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;