'use client';

import React from 'react';
import Button from './Button';
import { typography } from '../styles/typography';

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
        background: 'transparent',
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
          columnGap: '80px',
          marginBottom: '40px',
          alignItems: 'start'
        }}>
          {/* Logo/Brand */}
          <div style={{
            minWidth: '160px'
          }}>
            <h3 style={{
              ...typography.styles.subheading,
              fontSize: '1.5rem',
              margin: '0 0 8px 0'
            }}>Stephanie & Joel</h3>
            <p style={{
              ...typography.styles.body,
              margin: '0'
            }}>February 6th, 2026</p>
          </div>

          {/* Wedding Details */}
          <div>
            <h4 style={{
              ...typography.styles.label,
              fontSize: '0.9rem',
              margin: '0 0 16px 0'
            }}>Site links</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li><a href="#our-story" style={{
                ...typography.styles.body,
                textDecoration: 'none',
                lineHeight: 1.8,
                transition: 'color 0.3s ease',
                color: typography.colors.primary
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = typography.colors.accent}
              onMouseLeave={(e) => e.currentTarget.style.color = typography.colors.primary}>Our Story</a></li>
              <li><a href="#timeline" style={{
                ...typography.styles.body,
                textDecoration: 'none',
                lineHeight: 1.8,
                transition: 'color 0.3s ease',
                color: typography.colors.primary
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = typography.colors.accent}
              onMouseLeave={(e) => e.currentTarget.style.color = typography.colors.primary}>Timeline</a></li>
              <li><a href="#venues" style={{
                ...typography.styles.body,
                textDecoration: 'none',
                lineHeight: 1.8,
                transition: 'color 0.3s ease',
                color: typography.colors.primary
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = typography.colors.accent}
              onMouseLeave={(e) => e.currentTarget.style.color = typography.colors.primary}>Venues</a></li>
            </ul>
          </div>

          {/* Ceremony */}
          <div>
            <h4 style={{
              ...typography.styles.label,
              fontSize: '0.9rem',
              margin: '0 0 16px 0'
            }}>Ceremony</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{
                ...typography.styles.body,
                lineHeight: 1.8
              }}>12:30 pm</li>
              <li style={{
                ...typography.styles.body,
                lineHeight: 1.8
              }}>Saint Brigid's Church</li>
              <li style={{
                ...typography.styles.body,
                lineHeight: 1.8
              }}>Marrickville NSW</li>
            </ul>
          </div>

          {/* Reception */}
          <div>
            <h4 style={{
              ...typography.styles.label,
              fontSize: '0.9rem',
              margin: '0 0 16px 0'
            }}>Reception</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{
                ...typography.styles.body,
                lineHeight: 1.8
              }}>6:00 pm</li>
              <li style={{
                ...typography.styles.body,
                lineHeight: 1.8
              }}>The Sky Ballroom</li>
              <li style={{
                ...typography.styles.body,
                lineHeight: 1.8
              }}>Bankstown NSW</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              ...typography.styles.label,
              fontSize: '0.9rem',
              margin: '0 0 16px 0'
            }}>Contact</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{
                ...typography.styles.body,
                lineHeight: 1.8
              }}>Steph: 0426 875 301</li>
              <li style={{
                ...typography.styles.body,
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
              ...typography.styles.body,
              margin: '0'
            }}>© 2025 Stephanie & Joel</p>
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