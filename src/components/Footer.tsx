'use client';

import React from 'react';
import Button from './Button';

interface FooterProps {
  onOpenRSVPForm: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenRSVPForm }) => {
  return (
    <footer
      className="simple-footer"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '160px',
        background: '#FFF0E2',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.05)',
        gap: '1.5rem'
      }}
    >
      <div className="footer-main" style={{
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h3 style={{
          fontFamily: 'Cardo, serif',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 400,
          margin: '0 0 0.5rem 0',
          color: '#2c3e50'
        }}>Join Us for Our Special Day</h3>
        <p style={{
          fontFamily: 'Instrument Sans, sans-serif',
          fontSize: '1rem',
          color: '#666',
          margin: '0 0 0.5rem 0',
          lineHeight: 1.5
        }}>Saturday, June 21st, 2025 • Marin County, California</p>
        <p style={{
          fontFamily: 'Instrument Sans, sans-serif',
          fontSize: '0.9rem',
          color: '#888',
          margin: 0,
          lineHeight: 1.4
        }}>Please RSVP by April 15th, 2025</p>
      </div>

      <Button onClick={onOpenRSVPForm} variant="primary" size="large">
        RSVP Now
      </Button>

      <style jsx>{`
        @media (max-width: 768px) {
          .simple-footer {
            min-height: 140px !important;
            padding: 1.5rem !important;
            gap: 1rem !important;
          }

          .footer-main h3 {
            font-size: 1.25rem !important;
          }

          .footer-main p {
            font-size: 0.85rem !important;
          }
        }

        @media (max-width: 480px) {
          .simple-footer {
            min-height: 120px !important;
            padding: 1rem !important;
          }

          .footer-main h3 {
            font-size: 1.1rem !important;
          }

          .footer-main p {
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;