'use client';

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    {
      question: "What is the dress code?",
      answer: "We're going for cocktail attire! Think dressy but comfortable. Ladies, feel free to wear a nice dress or dressy separates. Gentlemen, a suit or dress shirt with slacks would be perfect. Please avoid white (that's for the bride!) and overly casual clothing like jeans or sneakers."
    },
    {
      question: "When should I RSVP by?",
      answer: "Please RSVP by [DATE]. This helps us finalize numbers with our caterer and venue. If your plans change after you RSVP, please let us know as soon as possible!"
    },
    {
      question: "Can I bring a plus-one?",
      answer: "Due to venue capacity, we're only able to accommodate the guests specifically named on your invitation. If you have any questions about your invitation, please reach out to us directly."
    },
    {
      question: "Will there be an open bar?",
      answer: "Yes! We'll have beer, wine, and signature cocktails available throughout the reception. We want everyone to celebrate and have a great time!"
    },
    {
      question: "Is the venue wheelchair accessible?",
      answer: "Yes, both the ceremony and reception venues are fully wheelchair accessible. If you have any specific accessibility needs, please let us know when you RSVP so we can ensure everything is accommodated."
    },
    {
      question: "What if it rains?",
      answer: "We have a beautiful indoor backup plan at the same venue! The celebration will be just as magical rain or shine."
    },
    {
      question: "Are children welcome?",
      answer: "We love your little ones, but we've decided to have an adult-only celebration. We hope this gives you a chance to relax and enjoy the evening! If you need help arranging childcare, please let us know."
    },
    {
      question: "Where should I park?",
      answer: "There's plenty of free parking available at the venue. Valet service will also be provided for your convenience."
    },
    {
      question: "Can I take photos during the ceremony?",
      answer: "We're having an unplugged ceremony, so please keep phones and cameras away during the 'I do's. Our professional photographer will capture everything! Feel free to take photos during cocktail hour and the reception."
    },
    {
      question: "Do you have a gift registry?",
      answer: "Your presence is the only present we need! If you'd like to give a gift, we've set up a small registry at [STORE] or would greatly appreciate contributions to our honeymoon fund."
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.faq-section');
    const faqItems = document.querySelectorAll('.faq-item');

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = [];

    if (section && faqItems.length > 0) {
      // Stagger animation for FAQ items
      const staggerTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        animation: gsap.fromTo(faqItems, {
          opacity: 0,
          y: 30
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        })
      });
      triggers.push(staggerTrigger);
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenItems(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about our special day</p>
        </div>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openItems.includes(index) ? 'open' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.question}</span>
                <span className="faq-icon">
                  {openItems.includes(index) ? '−' : '+'}
                </span>
              </button>

              <div className={`faq-answer ${openItems.includes(index) ? 'open' : ''}`}>
                <div className="faq-answer-content">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          min-height: 100vh;
          background: transparent;
          padding: 80px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .faq-container {
          max-width: 900px;
          width: 100%;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .faq-header h2 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 15px;
          letter-spacing: -0.02em;
        }

        .faq-header p {
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: #555;
          line-height: 1.6;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .faq-item {
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .faq-question {
          width: 100%;
          padding: 25px 30px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: rgba(102, 126, 234, 0.05);
        }

        .faq-question.open {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
        }

        .faq-icon {
          font-size: 1.5rem;
          font-weight: bold;
          color: #667eea;
          transition: all 0.3s ease;
          min-width: 30px;
          text-align: center;
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .faq-answer.open {
          max-height: 500px;
        }

        .faq-answer-content {
          padding: 0 30px 30px 30px;
          color: #555;
          line-height: 1.7;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .faq-section {
            padding: 60px 15px;
          }

          .faq-question {
            padding: 20px 25px;
            font-size: 1rem;
          }

          .faq-answer-content {
            padding: 0 25px 25px 25px;
            font-size: 0.95rem;
          }

          .faq-header h2 {
            font-size: clamp(2rem, 8vw, 3rem);
          }

          .faq-header p {
            font-size: 1rem;
          }

          .faq-icon {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default FAQSection;