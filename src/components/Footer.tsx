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
        background: '#F4C5AF',
        color: '#2c3e50',
        padding: '60px 40px 40px 40px',
        borderTop: '1px solid rgba(44, 62, 80, 0.1)'
      }}
    >
      <div className="footer-container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Main footer content */}
        <div className="footer-content" style={{
          display: 'grid',
          gridTemplateColumns: 'auto repeat(4, 1fr)',
          gap: '60px',
          marginBottom: '40px',
          alignItems: 'start'
        }}>
          {/* Logo/Brand */}
          <div style={{
            minWidth: '160px'
          }}>
            <h3 style={{
              fontFamily: 'Cardo, serif',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#2c3e50',
              margin: '0 0 8px 0',
              letterSpacing: '-0.01em'
            }}>Joel & Stephanie</h3>
            <p style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '0.85rem',
              color: '#4a4a4a',
              margin: '0',
              lineHeight: 1.4
            }}>February 6th, 2026</p>
          </div>

          {/* Wedding Details */}
          <div>
            <h4 style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#2c3e50',
              margin: '0 0 16px 0'
            }}>Wedding</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li><a href="#our-story" style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.85rem',
                color: '#4a4a4a',
                textDecoration: 'none',
                lineHeight: 1.8,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B6B'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}>Our Story</a></li>
              <li><a href="#timeline" style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.85rem',
                color: '#4a4a4a',
                textDecoration: 'none',
                lineHeight: 1.8,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B6B'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}>Timeline</a></li>
              <li><a href="#venues" style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.85rem',
                color: '#4a4a4a',
                textDecoration: 'none',
                lineHeight: 1.8,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B6B'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}>Venues</a></li>
            </ul>
          </div>

          {/* Ceremony */}
          <div>
            <h4 style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#2c3e50',
              margin: '0 0 16px 0'
            }}>Ceremony</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.85rem',
                color: '#4a4a4a',
                lineHeight: 1.8
              }}>Saint Brigid's Church</li>
              <li style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.85rem',
                color: '#4a4a4a',
                lineHeight: 1.8
              }}>Marrickville NSW</li>
            </ul>
          </div>

          {/* Reception */}
          <div>
            <h4 style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#2c3e50',
              margin: '0 0 16px 0'
            }}>Reception</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.85rem',
                color: '#4a4a4a',
                lineHeight: 1.8
              }}>The Sky Ballroom</li>
              <li style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.85rem',
                color: '#4a4a4a',
                lineHeight: 1.8
              }}>Bankstown NSW</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#2c3e50',
              margin: '0 0 16px 0'
            }}>Contact</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.85rem',
                color: '#4a4a4a',
                lineHeight: 1.8
              }}>Steph: 0426 875 301</li>
              <li style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.85rem',
                color: '#4a4a4a',
                lineHeight: 1.8
              }}>Joel: 0497 091 831</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr style={{
          border: 'none',
          borderTop: '1px solid rgba(44, 62, 80, 0.1)',
          margin: '40px 0'
        }} />

        {/* Bottom section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <p style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '0.85rem',
              color: '#4a4a4a',
              margin: '0'
            }}>© 2025 Joel & Stephanie</p>
          </div>

          <div>
            <Button onClick={onOpenRSVPForm} variant="primary" size="medium">
              RSVP Now
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .simple-footer {
            padding: 40px 20px 30px 20px !important;
          }

          .footer-content {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: left !important;
          }

          .footer-content > div {
            min-width: unset !important;
          }
        }

        @media (max-width: 480px) {
          .simple-footer {
            padding: 30px 15px 20px 15px !important;
          }

          .footer-content {
            gap: 30px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;