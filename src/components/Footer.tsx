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
        height: '120px',
        background: '#FFF0E2',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="footer-main">
        <h3 style={{
          fontFamily: 'Cardo, serif',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 400,
          margin: 0,
          color: '#2c3e50'
        }}>Thank You</h3>
        <p style={{
          fontFamily: 'Instrument Sans, sans-serif',
          fontSize: '0.9rem',
          color: '#666',
          margin: '0.25rem 0 0 0'
        }}>We can't wait to celebrate with you</p>
      </div>

      <Button onClick={onOpenRSVPForm} size="large" style={{ borderRadius: '50px' }}>
        RSVP
      </Button>

      <style jsx>{`
        @media (max-width: 768px) {
          .simple-footer {
            height: 100px !important;
            padding: 1rem !important;
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .footer-main h3 {
            font-size: 1.25rem !important;
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