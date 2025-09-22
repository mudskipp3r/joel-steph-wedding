'use client';

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const RSVPSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guestCount: '1',
    dietaryRestrictions: '',
    message: ''
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.rsvp-section');
    const formContainer = document.querySelector('.rsvp-form-container');

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];

    if (section && formContainer) {
      // Fade in animation for the form
      const fadeInTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        animation: gsap.fromTo(formContainer, {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        })
      });
      triggers.push(fadeInTrigger);
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be connected to Netlify Forms later
    console.log('RSVP Form Data:', formData);
    alert('Thank you for your RSVP! We will be in touch soon.');
  };

  return (
    <section className="rsvp-section">
      <div className="rsvp-form-container">
        <div className="rsvp-header">
          <h2>RSVP</h2>
          <p>We can't wait to celebrate with you! Please let us know if you'll be joining us.</p>
        </div>

        <form className="rsvp-form" onSubmit={handleSubmit} data-netlify="true" name="wedding-rsvp">
          <input type="hidden" name="form-name" value="wedding-rsvp" />

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="attendance">Will you be attending? *</label>
              <select
                id="attendance"
                name="attendance"
                value={formData.attendance}
                onChange={handleInputChange}
                required
              >
                <option value="">Please select</option>
                <option value="yes">Yes, I'll be there!</option>
                <option value="no">Sorry, can't make it</option>
              </select>
            </div>

            {formData.attendance === 'yes' && (
              <div className="form-group">
                <label htmlFor="guestCount">Number of Guests</label>
                <select
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
            )}
          </div>

          {formData.attendance === 'yes' && (
            <div className="form-group">
              <label htmlFor="dietaryRestrictions">Dietary Restrictions or Allergies</label>
              <input
                type="text"
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                placeholder="Please let us know about any dietary needs"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="message">Special Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Any special message for the happy couple?"
              rows={4}
            />
          </div>

          <button type="submit" className="rsvp-submit">
            Send RSVP
          </button>
        </form>
      </div>

      <style jsx>{`
        .rsvp-section {
          min-height: 100vh;
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
        }

        .rsvp-form-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 60px 50px;
          max-width: 800px;
          width: 100%;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .rsvp-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .rsvp-header h2 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 15px;
          letter-spacing: -0.02em;
        }

        .rsvp-header p {
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: #555;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .rsvp-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 600;
          color: #2c3e50;
          font-size: 1rem;
          letter-spacing: 0.02em;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 15px 20px;
          border: 2px solid #e1e8ed;
          border-radius: 12px;
          font-size: 1rem;
          font-family: inherit;
          background: white;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .rsvp-submit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 18px 40px;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
          align-self: center;
          min-width: 200px;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .rsvp-submit:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        .rsvp-submit:active {
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .rsvp-form-container {
            padding: 40px 30px;
            margin: 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .rsvp-header h2 {
            font-size: clamp(2rem, 8vw, 3rem);
          }

          .rsvp-header p {
            font-size: 1rem;
          }

          .form-group input,
          .form-group select,
          .form-group textarea {
            padding: 12px 16px;
          }

          .rsvp-submit {
            padding: 15px 35px;
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default RSVPSection;