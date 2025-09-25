'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Button from './Button';

interface SimpleFooterProps {
  isRSVPFormOpen?: boolean;
  onOpenRSVPForm?: () => void;
  onCloseRSVPForm?: () => void;
}

const SimpleFooter: React.FC<SimpleFooterProps> = ({
  isRSVPFormOpen = false,
  onOpenRSVPForm,
  onCloseRSVPForm
}) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [internalPanelOpen, setInternalPanelOpen] = useState(false);

  // Use external control if props are provided, otherwise use internal state
  const isPanelOpen = isRSVPFormOpen ?? internalPanelOpen;


  // RSVP Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    attendance: 'yes', // Default to yes
    hasPlusOne: false,
    plusOneCode: '',
    dietaryRestrictions: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);
  const [plusOneEnabled, setPlusOneEnabled] = useState(false);

  // Handle panel slide animations
  useEffect(() => {
    const panel = panelRef.current;

    if (panel) {
      if (isPanelOpen) {
        // Hide body scrollbar and prevent scroll
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Ensure panel can scroll with all input methods including trackpads
        panel.style.overflowY = 'auto';
        panel.style.overflowX = 'hidden';
        (panel.style as any).WebkitOverflowScrolling = 'touch';
        panel.style.scrollBehavior = 'smooth';

        // Enable trackpad scrolling
        panel.addEventListener('wheel', function(e) {
          e.stopPropagation();
        }, { passive: true });

        // Slide panel in from right
        gsap.fromTo(panel,
          {
            x: '100%'
          },
          {
            x: '0%',
            duration: 0.6,
            ease: 'power3.out'
          }
        );
      } else {
        // Restore body scroll and scrollbar
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';

        // Slide panel out to right
        gsap.to(panel, {
          x: '100%',
          duration: 0.4,
          ease: 'power3.in'
        });
      }
    }

    // Cleanup function
    return () => {
      if (!isPanelOpen) {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      }
    };
  }, [isPanelOpen]);

  // RSVP Form Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        // Clear plus one code if unchecking plus one
        ...(name === 'hasPlusOne' && !checked ? { plusOneCode: '' } : {})
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      attendance: e.target.value,
      // Clear plus one data if selecting "no"
      ...(e.target.value === 'no' ? { hasPlusOne: false, plusOneCode: '' } : {})
    }));
  };

  const verifyPromoCode = async (code: string) => {
    if (!code.trim()) {
      setPlusOneEnabled(false);
      setErrors(prev => ({ ...prev, plusOneCode: '' }));
      return;
    }

    setIsVerifyingPromo(true);
    setErrors(prev => ({ ...prev, plusOneCode: '' }));

    try {
      const response = await fetch('/api/verify-promo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promoCode: code }),
      });

      const result = await response.json();

      if (result.valid) {
        setPlusOneEnabled(true);
        setErrors(prev => ({ ...prev, plusOneCode: '' }));
      } else {
        setPlusOneEnabled(false);
        setErrors(prev => ({ ...prev, plusOneCode: 'Invalid plus one code. Please check your code and try again.' }));
      }
    } catch (error) {
      setPlusOneEnabled(false);
      setErrors(prev => ({ ...prev, plusOneCode: 'Error verifying code. Please try again.' }));
    } finally {
      setIsVerifyingPromo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation for plus one code
    if (formData.hasPlusOne && !plusOneEnabled) {
      setErrors({ plusOneCode: 'Please verify your plus one code before submitting.' });
      return;
    }

    try {
      // Create FormData from the form element (like your old form)
      const formData = new FormData(e.target as HTMLFormElement);

      // Ensure default values for fields that might be blank or unchecked
      if (!formData.get('hasPlusOne')) {
        formData.set('hasPlusOne', 'no');
      }
      if (!formData.get('plusOneCode')) {
        formData.set('plusOneCode', 'N/A');
      }
      if (!formData.get('phone')) {
        formData.set('phone', 'Not provided');
      }
      if (!formData.get('dietaryRestrictions')) {
        formData.set('dietaryRestrictions', 'None specified');
      }
      if (!formData.get('message')) {
        formData.set('message', 'No message provided');
      }

      // Submit to Netlify exactly like your old working form
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your RSVP. Please try again.');
    }
  };

  const openPanel = () => {
    console.log('openPanel called, onOpenRSVPForm:', onOpenRSVPForm);
    if (onOpenRSVPForm) {
      onOpenRSVPForm();
    } else {
      setInternalPanelOpen(true);
    }
  };

  const closePanel = () => {
    if (onCloseRSVPForm) {
      onCloseRSVPForm();
    } else {
      setInternalPanelOpen(false);
    }
  };

  const handleReturnToSite = () => {
    // Reset form and submission state
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      attendance: 'yes',
      hasPlusOne: false,
      plusOneCode: '',
      dietaryRestrictions: '',
      message: ''
    });
    setIsSubmitted(false);
    closePanel();
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      // Ensure scrollbar is restored on component unmount
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {/* Hidden form for Netlify to detect at build time */}
      <form
        name="wedding-rsvp"
        data-netlify="true"
        style={{ display: 'none' }}
      >
        <input type="text" name="fullName" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="attendance" />
        <input type="text" name="hasPlusOne" />
        <input type="text" name="plusOneCode" />
        <input type="text" name="dietaryRestrictions" />
        <textarea name="message"></textarea>
      </form>

      {/* Traditional Footer */}
      <footer
        ref={footerRef}
        className="simple-footer"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '200px',
          background: '#FFF0E2',
          borderTopLeftRadius: '40px',
          borderTopRightRadius: '40px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="footer-main">
          <h3 style={{
            fontFamily: 'Cardo, serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 400,
            margin: '0 0 1rem 0',
            color: '#2c3e50'
          }}>Venue Information</h3>

          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '1rem',
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
            margin: '1rem 0 0 0',
            textAlign: 'center'
          }}>We can't wait to celebrate with you on our special day!</p>
        </div>

        <Button onClick={openPanel} size="large" style={{ borderRadius: '50px' }}>
          RSVP
        </Button>
      </footer>

      {/* Backdrop Overlay */}
      <div
        className="backdrop-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999998,
          opacity: isPanelOpen ? 1 : 0,
          visibility: isPanelOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s ease',
          backdropFilter: 'blur(2px)'
        }}
        onClick={closePanel}
      />

      {/* Slide-out RSVP Panel */}
      <div
        ref={panelRef}
        className="rsvp-panel"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100vw',
          maxWidth: '500px',
          height: '100vh',
          background: 'white',
          zIndex: 999999,
          transform: 'translateX(100%)',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.2)',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
          scrollBehavior: 'smooth'
        }}
      >
        {/* Panel Header */}
        <div className="panel-header" style={{
          position: 'sticky',
          top: 0,
          background: 'white',
          padding: '1.5rem 2rem',
          borderBottom: '2px solid rgba(44, 62, 80, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10
        }}>
          <h2 style={{
            fontFamily: 'Cardo, serif',
            fontSize: '2rem',
            fontWeight: 400,
            margin: 0,
            color: '#2c3e50'
          }}>RSVP</h2>
          <button
            onClick={closePanel}
            className="close-button"
            style={{
              background: 'none',
              color: '#999',
              border: 'none',
              padding: '0.5rem',
              fontSize: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        {/* Panel Content */}
        <div className="panel-content" style={{
          padding: '2rem',
          paddingTop: '1rem',
          paddingBottom: '3rem', // Extra bottom padding for scrolling
          width: '100%',
          boxSizing: 'border-box',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          minHeight: 'calc(100vh - 120px)' // Ensure content is scrollable
        }}>
          <p style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: '1.1rem',
            color: '#666',
            lineHeight: 1.6,
            marginBottom: '2rem',
            textAlign: 'center'
          }}>We can't wait to celebrate with you! Please let us know if you'll be joining us for our special day.</p>

          <div className="deadline-notice" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            marginBottom: '2.5rem',
            boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
          }}>
            <div style={{ fontSize: '2rem', flexShrink: 0 }}>⏰</div>
            <div>
              <strong style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.25rem'
              }}>RSVP Deadline: 6th December 2025</strong>
              <span style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.95rem',
                opacity: 0.95
              }}>Please respond by this date to help us plan the perfect celebration</span>
            </div>
          </div>

          {/* Conditional Content - Form or Success State */}
          {isSubmitted ? (
            /* Success State */
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem'
            }}>
              {/* Success Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF6B6B, #F58E7F)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)'
              }}>
                ✓
              </div>

              {/* Success Message */}
              <div>
                <h3 style={{
                  fontFamily: 'Cardo, serif',
                  fontSize: '2.5rem',
                  color: '#1a1a1a',
                  fontWeight: '400',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em'
                }}>
                  Thank You!
                </h3>
                <p style={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontSize: '1.1rem',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '0'
                }}>
                  Your RSVP has been received successfully. We're excited to celebrate with you and will be in touch soon with more details!
                </p>
              </div>

              {/* Return to Site Button */}
              <Button size="medium" onClick={handleReturnToSite}>
                Return to Site
              </Button>
            </div>
          ) : (
            /* RSVP Form */
            <form className="rsvp-form" onSubmit={handleSubmit} data-netlify="true" name="wedding-rsvp" method="POST" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            <input type="hidden" name="form-name" value="wedding-rsvp" />
            {/* Hidden inputs to ensure default values are always sent */}
            <input type="hidden" name="hasPlusOne" value={formData.hasPlusOne ? 'yes' : 'no'} />

            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email and Phone */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0412 345 678"
                  required
                />
              </div>
            </div>

            {/* Attendance Radio Buttons */}
            <div className="form-group">
              <label className="radio-group-label">Will you be attending? *</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    id="attending-yes"
                    name="attendance"
                    value="yes"
                    checked={formData.attendance === 'yes'}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="attending-yes" className="radio-label">
                    <span className="radio-custom"></span>
                    Yes, I'll be there!
                  </label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="attending-no"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === 'no'}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="attending-no" className="radio-label">
                    <span className="radio-custom"></span>
                    Sorry, can't make it
                  </label>
                </div>
              </div>
            </div>

            {/* Plus One Section - only show if attending */}
            {formData.attendance === 'yes' && (
              <>
                <div className="form-group plus-one-section">
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="hasPlusOne"
                      name="hasPlusOne"
                      checked={formData.hasPlusOne}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="hasPlusOne" className="checkbox-label">
                      <span className="checkbox-custom"></span>
                      I'd like to bring a plus one
                    </label>
                  </div>

                  {formData.hasPlusOne && (
                    <div className="plus-one-code-group">
                      <label htmlFor="plusOneCode">Plus One Code *</label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <input
                          type="text"
                          id="plusOneCode"
                          name="plusOneCode"
                          value={formData.plusOneCode}
                          onChange={handleInputChange}
                          placeholder="Enter the code provided by Joel & Stephanie"
                          style={{
                            flex: 1,
                            borderColor: errors.plusOneCode ? '#e74c3c' : plusOneEnabled ? '#27ae60' : '#ddd'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => verifyPromoCode(formData.plusOneCode)}
                          disabled={!formData.plusOneCode.trim() || isVerifyingPromo}
                          style={{
                            padding: '0.75rem 1.25rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: !formData.plusOneCode.trim() || isVerifyingPromo ? 'not-allowed' : 'pointer',
                            opacity: !formData.plusOneCode.trim() || isVerifyingPromo ? 0.5 : 1,
                            whiteSpace: 'nowrap',
                            minWidth: '80px'
                          }}
                        >
                          {isVerifyingPromo ? 'Verifying...' : 'Verify'}
                        </button>
                      </div>
                      {errors.plusOneCode && (
                        <small style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                          {errors.plusOneCode}
                        </small>
                      )}
                      {plusOneEnabled && !errors.plusOneCode && (
                        <small style={{ color: '#27ae60', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block', fontWeight: '500' }}>
                          ✓ Plus one access granted!
                        </small>
                      )}
                      {!errors.plusOneCode && !plusOneEnabled && (
                        <small>This code was provided to you by the bride and groom</small>
                      )}
                    </div>
                  )}
                </div>

                {/* Dietary Restrictions */}
                <div className="form-group">
                  <label htmlFor="dietaryRestrictions">Dietary Restrictions or Allergies</label>
                  <input
                    type="text"
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    placeholder="e.g., Vegetarian, Gluten-free, Nut allergy, etc."
                  />
                  <small>Help us make sure everyone can enjoy the meal!</small>
                </div>
              </>
            )}

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">A Message for Joel & Stephanie</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Leave a sweet message for the happy couple..."
                rows={4}
              />
            </div>

            <Button type="submit" size="large">
              {formData.attendance === 'yes' ? 'Send RSVP' : 'Send Response'}
            </Button>
          </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .footer-content {
          padding: 3rem 2rem 2rem;
          color: #2c3e50;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          min-height: 100%;
        }

        /* RSVP Form Styles */
        .rsvp-section {
          width: 100%;
          margin-bottom: 3rem;
        }

        .rsvp-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .rsvp-header h2 {
          font-family: 'Cardo', serif;
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 400;
          color: #2c3e50;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .rsvp-header p {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1.1rem;
          color: #666;
          line-height: 1.6;
          max-width: 500px;
          margin: 0 auto;
        }

        .deadline-notice {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, #FF6B6B, #FF8E53);
          color: white;
          padding: 1.5rem;
          border-radius: 16px;
          margin-bottom: 2.5rem;
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
        }

        .deadline-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .deadline-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .deadline-text strong {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .deadline-text span {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.95rem;
          opacity: 0.95;
        }

        .rsvp-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .form-group label {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 600;
          color: #2c3e50;
          font-size: 1rem;
        }

        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group input[type="tel"],
        .form-group textarea {
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px; /* Prevent iOS zoom on focus */
          font-family: 'Instrument Sans', sans-serif;
          background: white;
          transition: all 0.3s ease;
          outline: none;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          -webkit-appearance: none; /* Remove iOS default styling */
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-group small {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.85rem;
          color: #888;
          margin-top: 0.25rem;
        }

        /* Radio Button Styles */
        .radio-group-label {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 600;
          color: #2c3e50;
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .radio-option {
          position: relative;
        }

        .radio-option input[type="radio"] {
          position: absolute;
          opacity: 0;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: #2c3e50;
          cursor: pointer;
          padding: 1rem;
          border: 2px solid #e1e8ed;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: white;
        }

        .radio-label:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.05);
        }

        .radio-option input[type="radio"]:checked + .radio-label {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
        }

        .radio-custom {
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 50%;
          position: relative;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .radio-option input[type="radio"]:checked + .radio-label .radio-custom {
          border-color: #667eea;
        }

        .radio-option input[type="radio"]:checked + .radio-label .radio-custom::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 10px;
          height: 10px;
          background: #667eea;
          border-radius: 50%;
        }

        /* Checkbox Styles */
        .plus-one-section {
          background: rgba(102, 126, 234, 0.05);
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid rgba(102, 126, 234, 0.1);
        }

        .checkbox-container {
          margin-bottom: 1rem;
        }

        .checkbox-container input[type="checkbox"] {
          position: absolute;
          opacity: 0;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: #2c3e50;
          cursor: pointer;
        }

        .checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 4px;
          position: relative;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .checkbox-container input[type="checkbox"]:checked + .checkbox-label .checkbox-custom {
          border-color: #667eea;
          background: #667eea;
        }

        .checkbox-container input[type="checkbox"]:checked + .checkbox-label .checkbox-custom::after {
          content: '✓';
          position: absolute;
          top: -2px;
          left: 2px;
          color: white;
          font-size: 14px;
          font-weight: bold;
        }

        .plus-one-code-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }





        /* Footer Styles */
        .footer-main {
          text-align: center;
          margin-bottom: 2rem;
          padding-top: 2rem;
          border-top: 2px solid rgba(44, 62, 80, 0.1);
        }

        .footer-main h3 {
          font-family: 'Cardo', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 400;
          margin-bottom: 1rem;
          color: #2c3e50;
          letter-spacing: -0.02em;
        }

        .footer-main p {
          font-family: 'Instrument Sans', sans-serif;
          font-size: clamp(1rem, 2vw, 1.3rem);
          line-height: 1.6;
          margin-bottom: 0.8rem;
          opacity: 0.8;
          max-width: 600px;
          color: #666;
        }

        .marquee-container {
          width: 100%;
          height: 80px;
          overflow: hidden;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(44, 62, 80, 0.2);
          padding-top: 1rem;
          position: relative;
          margin-top: 2rem;
        }

        .marquee-wrapper {
          display: flex;
          white-space: nowrap;
          will-change: transform;
        }

        .marquee-text {
          font-family: 'Cardo', serif;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 400;
          opacity: 0.6;
          letter-spacing: 0.1em;
          padding-right: 3rem;
          display: inline-block;
          color: #2c3e50;
        }

        .close-button:hover {
          color: #666 !important;
          transform: scale(1.1);
        }

        /* Panel specific styles */
        .rsvp-panel {
          min-width: 0; /* Prevent flex/grid items from overflowing */
          /* Ensure trackpad scrolling works */
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: -ms-autohiding-scrollbar;
        }

        .rsvp-panel * {
          max-width: 100%;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        /* Backdrop overlay styles */
        .backdrop-overlay {
          -webkit-backdrop-filter: blur(2px);
        }

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


          .rsvp-panel {
            width: 100vw !important;
            max-width: none !important;
          }

          .panel-content {
            padding: 1.5rem !important;
            padding-top: 1rem !important;
            padding-bottom: 4rem !important;
            /* Ensure smooth scrolling on mobile */
            -webkit-overflow-scrolling: touch;
          }

          .rsvp-panel {
            /* Improve mobile scrolling performance */
            -webkit-overflow-scrolling: touch !important;
            /* Prevent zoom on form inputs on iOS */
            -webkit-text-size-adjust: 100%;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .rsvp-header h2 {
            font-size: clamp(2.5rem, 8vw, 3.5rem);
          }

          .deadline-notice {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .deadline-icon {
            font-size: 1.5rem;
          }

          .radio-group {
            gap: 0.75rem;
          }

          .radio-label {
            font-size: 1rem;
            padding: 0.75rem;
          }


          .marquee-container {
            height: 60px;
            padding-top: 0.8rem;
          }
        }
      `}</style>
    </>
  );
};

export default SimpleFooter;