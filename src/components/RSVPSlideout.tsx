'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Button from './Button';

interface RSVPSlideoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const RSVPSlideout: React.FC<RSVPSlideoutProps> = ({ isOpen, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);

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
  const [errors, setErrors] = useState<{
    plusOneCode?: string;
  }>({});

  // Handle panel slide animations
  useEffect(() => {
    const panel = panelRef.current;

    if (panel) {
      if (isOpen) {
        // Hide body scrollbar and prevent scroll
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Ensure panel can scroll
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
      if (!isOpen) {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      }
    };
  }, [isOpen]);

  // RSVP Form Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Clear errors when user starts typing
    if (name === 'plusOneCode' && errors.plusOneCode) {
      setErrors(prev => ({ ...prev, plusOneCode: undefined }));
    }

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

  // Hash function for promo code validation (same as password protection)
  const hashPromoCode = async (promoCode: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(promoCode.toUpperCase().trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validation for plus one code
    if (formData.hasPlusOne && !formData.plusOneCode.trim()) {
      setErrors({ plusOneCode: 'Please enter your plus one code to bring a guest.' });
      return;
    }

    // Validate plus one code using hash comparison (same as password protection)
    if (formData.hasPlusOne && formData.plusOneCode.trim()) {
      try {
        const hashedPromoCode = await hashPromoCode(formData.plusOneCode);
        const expectedHash = process.env.NEXT_PUBLIC_PROMO_CODE_HASH?.trim();

        if (!expectedHash) {
          console.error('NEXT_PUBLIC_PROMO_CODE_HASH is not configured');
          setErrors({ plusOneCode: 'Promo code validation is not configured. Please contact support.' });
          return;
        }

        if (hashedPromoCode !== expectedHash) {
          setErrors({ plusOneCode: 'Invalid plus one code. Please check your code and try again.' });
          return;
        }
      } catch (error) {
        console.error('Promo code validation error:', error);
        setErrors({ plusOneCode: 'Error validating code. Please try again.' });
        return;
      }
    }

    try {
      // Create FormData from the form element
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

      // Submit to Netlify
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
    onClose();
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
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s ease',
          backdropFilter: 'blur(2px)'
        }}
        onClick={onClose}
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
          maxWidth: '33.33vw',
          minWidth: '400px',
          height: '100vh',
          background: 'white',
          zIndex: 999999,
          transform: 'translateX(100%)',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.2)',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
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
            onClick={onClose}
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
          paddingBottom: '3rem',
          width: '100%',
          boxSizing: 'border-box',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          minHeight: 'calc(100vh - 120px)'
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
            <form className="rsvp-form" onSubmit={handleSubmit} data-netlify="true" name="wedding-rsvp" style={{
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
                      <input
                        type="text"
                        id="plusOneCode"
                        name="plusOneCode"
                        value={formData.plusOneCode}
                        onChange={handleInputChange}
                        placeholder="Enter the code provided by Joel & Stephanie"
                        required
                        style={{
                          borderColor: errors.plusOneCode ? '#ef4444' : '#ddd',
                          borderWidth: errors.plusOneCode ? '2px' : '1px'
                        }}
                      />
                      {errors.plusOneCode && (
                        <small style={{
                          color: '#ef4444',
                          fontWeight: '500',
                          marginTop: '0.5rem'
                        }}>
                          {errors.plusOneCode}
                        </small>
                      )}
                      {!errors.plusOneCode && (
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
        /* Form Styles */
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
          font-size: 16px;
          font-family: 'Instrument Sans', sans-serif;
          background: white;
          transition: all 0.3s ease;
          outline: none;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          -webkit-appearance: none;
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

        .close-button:hover {
          color: #666 !important;
          transform: scale(1.1);
        }

        /* Backdrop overlay styles */
        .backdrop-overlay {
          -webkit-backdrop-filter: blur(2px);
        }

        @media (max-width: 768px) {
          .rsvp-panel {
            width: 100vw !important;
            max-width: none !important;
            min-width: 100vw !important;
          }

          .panel-content {
            padding: 1.5rem !important;
            padding-top: 1rem !important;
            padding-bottom: 4rem !important;
            -webkit-overflow-scrolling: touch;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .radio-group {
            gap: 0.75rem;
          }

          .radio-label {
            font-size: 1rem;
            padding: 0.75rem;
          }
        }
      `}</style>
    </>
  );
};

export default RSVPSlideout;