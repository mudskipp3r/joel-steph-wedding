'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SimpleFooter: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const footer = footerRef.current;
    const marqueeText = marqueeRef.current;

    if (footer && marqueeText) {
      // Set initial state - footer starts off-screen
      gsap.set(footer, {
        yPercent: 100
      });

      // Marquee animation
      gsap.to(marqueeText, {
        x: '-50%',
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      // Scroll-linked animation (scrub effect)
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Calculate scroll position relative to bottom
        const scrollBottom = scrollTop + windowHeight;
        const startThreshold = documentHeight - (windowHeight * 0.5); // Start at 50vh from bottom
        const endThreshold = documentHeight; // End at very bottom

        // Calculate progress between start and end thresholds
        if (scrollBottom >= startThreshold) {
          const progress = Math.min(1, (scrollBottom - startThreshold) / (endThreshold - startThreshold));

          // Map progress to footer position (100% hidden to 0% visible)
          const yPercent = 100 - (progress * 100);

          gsap.set(footer, {
            yPercent: yPercent
          });
        } else {
          // Keep footer hidden when above threshold
          gsap.set(footer, {
            yPercent: 100
          });
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for plus one code
    if (formData.hasPlusOne && !formData.plusOneCode.trim()) {
      alert('Please enter your plus one code to bring a guest.');
      return;
    }

    // This will be connected to Netlify Forms or backend
    console.log('RSVP Form Data:', formData);
    alert('Thank you for your RSVP! We will be in touch soon.');
  };

  return (
    <div
      ref={footerRef}
      className="simple-footer"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100vh', // Changed to full height for RSVP form
        background: '#FFF0E2', // Use the RSVP section background color
        zIndex: 20,
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        overflowY: 'auto'
      }}
    >
      <div className="footer-content">
        {/* RSVP Form */}
        <div className="rsvp-section">
          <div className="rsvp-header">
            <h2>RSVP</h2>
            <p>We can't wait to celebrate with you! Please let us know if you'll be joining us for our special day.</p>
          </div>

          <div className="deadline-notice">
            <div className="deadline-icon">⏰</div>
            <div className="deadline-text">
              <strong>RSVP Deadline: 6th December 2025</strong>
              <span>Please respond by this date to help us plan the perfect celebration</span>
            </div>
          </div>

          <form className="rsvp-form" onSubmit={handleSubmit} data-netlify="true" name="wedding-rsvp">
            <input type="hidden" name="form-name" value="wedding-rsvp" />

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
                    Yes, I'll be there! 🎉
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
                    Sorry, can't make it 💔
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
                      />
                      <small>This code was provided to you by the bride and groom</small>
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

            <button type="submit" className="rsvp-submit">
              {formData.attendance === 'yes' ? '✨ Send RSVP' : '💌 Send Response'}
            </button>
          </form>
        </div>

        {/* Thank You Message at bottom */}
        <div className="footer-main">
          <h3>Thank You</h3>
          <p>We can't wait to celebrate with you on our special day. Your presence is the greatest gift of all.</p>
        </div>

        <div className="marquee-container">
          <div ref={marqueeRef} className="marquee-wrapper">
            <span className="marquee-text">
              Stephanie & Joel • Stephanie & Joel •
            </span>
            <span className="marquee-text">
              Stephanie & Joel • Stephanie & Joel •
            </span>
          </div>
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
          padding: 1rem 1.25rem;
          border: 2px solid #e1e8ed;
          border-radius: 12px;
          font-size: 1rem;
          font-family: 'Instrument Sans', sans-serif;
          background: white;
          transition: all 0.3s ease;
          outline: none;
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

        .rsvp-submit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1.25rem 2.5rem;
          font-size: 1.2rem;
          font-weight: 600;
          font-family: 'Instrument Sans', sans-serif;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
          align-self: center;
          min-width: 200px;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .rsvp-submit:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }

        .rsvp-submit:active {
          transform: translateY(-1px);
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

        @media (max-width: 768px) {
          .footer-content {
            padding: 2rem 1rem;
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

          .rsvp-submit {
            padding: 1rem 2rem;
            font-size: 1.1rem;
          }

          .marquee-container {
            height: 60px;
            padding-top: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SimpleFooter;