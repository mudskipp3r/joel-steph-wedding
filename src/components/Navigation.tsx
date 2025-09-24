'use client';

import React, { useState, useEffect } from 'react';
import Button from './Button';

interface NavigationProps {
  isRSVPFormOpen?: boolean;
  onOpenRSVPForm?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isRSVPFormOpen = false, onOpenRSVPForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = lastScrollY - currentScrollY;

      // Update scrolled state
      setIsScrolled(currentScrollY > 50);

      // At top of page - always show nav
      if (currentScrollY <= 50) {
        setIsVisible(true);
        setScrollingUp(false);
      } else {
        // Determine scroll direction with threshold to avoid jitter
        if (scrollDifference > 3) {
          // Scrolling up with sufficient movement
          setScrollingUp(true);
          setIsVisible(true);
        } else if (scrollDifference < -3) {
          // Scrolling down with sufficient movement
          setScrollingUp(false);
          setIsVisible(false);
          setIsOpen(false); // Close mobile menu when hiding
        }
        // If scrollDifference is between -3 and 3, maintain current state (no change)
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
        transform: (isVisible && !isRSVPFormOpen) ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'all 0.3s ease',
        padding: '1rem 2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: '1.5rem',
            fontWeight: '400',
            color: isScrolled ? '#1a1a1a' : 'white',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
          }}
          onClick={() => scrollToSection('hero')}
        >
          Stephanie<strong>and</strong>Joel
        </div>

        {/* Desktop Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="desktop-nav"
        >
          <button
            onClick={() => scrollToSection('timeline')}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '1rem',
              fontWeight: '500',
              color: isScrolled ? '#1a1a1a' : 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: '0.5rem 0',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FF6B6B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isScrolled ? '#1a1a1a' : 'white';
            }}
          >
            Schedule
          </button>
          <button
            onClick={() => scrollToSection('venues')}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '1rem',
              fontWeight: '500',
              color: isScrolled ? '#1a1a1a' : 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: '0.5rem 0',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FF6B6B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isScrolled ? '#1a1a1a' : 'white';
            }}
          >
            Venue
          </button>
          <button
            onClick={() => {
              const element = document.querySelector('.faq-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '1rem',
              fontWeight: '500',
              color: isScrolled ? '#1a1a1a' : 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: '0.5rem 0',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FF6B6B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isScrolled ? '#1a1a1a' : 'white';
            }}
          >
            FAQ
          </button>
          <Button
            size="small"
            onClick={() => onOpenRSVPForm?.()}
          >
            RSVP
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: isScrolled ? '#1a1a1a' : 'white',
          }}
          className="mobile-menu-toggle"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        style={{
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem',
          gap: '1.5rem',
        }}
        className="mobile-menu"
      >
        <button
          onClick={() => scrollToSection('timeline')}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: '1.1rem',
            fontWeight: '500',
            color: '#1a1a1a',
            cursor: 'pointer',
            padding: '1rem 0',
            textAlign: 'left',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          Schedule
        </button>
        <button
          onClick={() => scrollToSection('venues')}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: '1.1rem',
            fontWeight: '500',
            color: '#1a1a1a',
            cursor: 'pointer',
            padding: '1rem 0',
            textAlign: 'left',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          Venue
        </button>
        <button
          onClick={() => {
            const element = document.querySelector('.faq-section');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: '1.1rem',
            fontWeight: '500',
            color: '#1a1a1a',
            cursor: 'pointer',
            padding: '1rem 0',
            textAlign: 'left',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          FAQ
        </button>
        <Button
          size="medium"
          onClick={() => {
            onOpenRSVPForm?.();
            setIsOpen(false);
          }}
          style={{ alignSelf: 'flex-start', marginTop: '1rem' }}
        >
          RSVP
        </Button>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;