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
        maxWidth: '800px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '1rem'
        }}>
          <div style={{
            textAlign: 'center',
            minWidth: '200px'
          }}>
            <h4 style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#FF6B6B',
              margin: '0 0 0.5rem 0'
            }}>Ceremony</h4>
            <p style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '0.85rem',
              color: '#666',
              lineHeight: 1.4,
              margin: '0'
            }}>
              Saint Brigid's Catholic Church<br/>
              392 Marrickville Rd<br/>
              Marrickville NSW 2204
            </p>
          </div>

          <div style={{
            textAlign: 'center',
            minWidth: '200px'
          }}>
            <h4 style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#FF6B6B',
              margin: '0 0 0.5rem 0'
            }}>Reception</h4>
            <p style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '0.85rem',
              color: '#666',
              lineHeight: 1.4,
              margin: '0'
            }}>
              The Sky Ballroom<br/>
              Level 3/462 Chapel Rd<br/>
              Bankstown NSW 2200
            </p>
          </div>
        </div>

        <p style={{
          fontFamily: 'Instrument Sans, sans-serif',
          fontSize: '0.8rem',
          color: '#666',
          lineHeight: 1.5,
          margin: '0',
          textAlign: 'center'
        }}>We can't wait to celebrate with you on our special day!</p>
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