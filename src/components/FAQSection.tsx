'use client';

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    {
      question: "What is the dress code?",
      answer: "We're going for cocktail attire! Think dressy but comfortable. Ladies, feel free to wear a nice dress or dressy separates. Gentlemen, a suit or dress shirt with slacks would be perfect. Please avoid white (that's for the bride!) and overly casual clothing like jeans or sneakers.",
      category: "General"
    },
    {
      question: "When should I RSVP by?",
      answer: "Please RSVP by March 15th, 2025. This helps us finalize numbers with our caterer and venue. If your plans change after you RSVP, please let us know as soon as possible!",
      category: "General"
    },
    {
      question: "Can I bring a plus-one?",
      answer: "Due to venue capacity, we're only able to accommodate the guests specifically named on your invitation. If you have any questions about your invitation, please reach out to us directly.",
      category: "General"
    },
    {
      question: "What time should I arrive for the ceremony?",
      answer: "Please arrive at least 30 minutes before the ceremony starts at 3:00 PM. This gives you time to find parking, get seated, and settle in before we begin.",
      category: "Ceremony"
    },
    {
      question: "Can I take photos during the ceremony?",
      answer: "We're having an unplugged ceremony, so please keep phones and cameras away during the 'I do's. Our professional photographer will capture everything! Feel free to take photos during cocktail hour and the reception.",
      category: "Ceremony"
    },
    {
      question: "Will there be an open bar?",
      answer: "Yes! We'll have beer, wine, and signature cocktails available throughout the reception. We want everyone to celebrate and have a great time!",
      category: "Reception"
    },
    {
      question: "What if I have dietary restrictions?",
      answer: "Please let us know about any dietary restrictions when you RSVP. Our caterer can accommodate most dietary needs including vegetarian, vegan, and gluten-free options.",
      category: "Reception"
    },
    {
      question: "Are children welcome?",
      answer: "We love your little ones, but we've decided to have an adult-only celebration. We hope this gives you a chance to relax and enjoy the evening! If you need help arranging childcare, please let us know.",
      category: "Reception"
    },
    {
      question: "Where should I park?",
      answer: "There's plenty of free parking available at both the ceremony and reception venues. Detailed parking information will be provided with your invitation.",
      category: "Travel"
    },
    {
      question: "Is there transportation between venues?",
      answer: "The ceremony and reception venues are about 20 minutes apart by car. We recommend arranging your own transportation or carpooling with other guests.",
      category: "Travel"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.faq-section');
    const faqItems = document.querySelectorAll('.faq-item');

    const triggers: ScrollTrigger[] = [];

    if (section && faqItems.length > 0) {
      const staggerTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        animation: gsap.fromTo(faqItems, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out'
        })
      });
      triggers.push(staggerTrigger);
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger?.classList?.contains('faq-section')) {
          trigger.kill();
        }
      });
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

  // Show all FAQ items without filtering
  const allFAQs = faqData;

  return (
    <section
      className="faq-section"
      style={{
        position: 'relative',
        zIndex: 3,
        background: 'transparent',
        padding: '80px 20px',
        minHeight: '100vh'
      }}
    >
      <div className="faq-container">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about our special day.<br/>
             Can't find what you're looking for? <a href="mailto:joel.steph@wedding.com">Contact us</a></p>
        </div>

        <div className="faq-list">
          {allFAQs.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openItems.includes(index) ? 'open' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span className="faq-icon-left">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </span>
                <span className="faq-text">{item.question}</span>
                <span className="faq-icon-right">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points={openItems.includes(index) ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                  </svg>
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
          font-family: 'Instrument Sans', sans-serif;
        }

        .faq-container {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .faq-header h2 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 400;
          color: #1a1a1a;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .faq-header p {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1.1rem;
          color: #666;
          line-height: 1.6;
        }

        .faq-header a {
          color: #F58E7F;
          text-decoration: underline;
          transition: opacity 0.3s ease;
        }

        .faq-header a:hover {
          opacity: 0.8;
        }

        .category-pills {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .faq-item {
          background: linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #ffffff 100%);
          border: 1px solid rgba(255, 107, 107, 0.1);
          border-bottom: none;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .faq-item:first-child {
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }

        .faq-item:last-child {
          border-bottom: 1px solid rgba(255, 107, 107, 0.1);
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
        }

        .faq-question {
          width: 100%;
          padding: 24px 28px;
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 18px;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: #1a1a1a;
          transition: all 0.2s ease;
        }

        .faq-question:hover {
          background: rgba(255, 107, 107, 0.05);
        }

        .faq-question.open {
          background: rgba(255, 107, 107, 0.05);
        }

        .faq-icon-left {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FF6B6B;
        }

        .faq-icon-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FF6B6B;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-text {
          flex: 1;
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: rgba(255, 107, 107, 0.02);
        }

        .faq-answer.open {
          max-height: 500px;
        }

        .faq-answer-content {
          padding: 0 28px 24px 66px;
          color: #666;
          line-height: 1.6;
          font-size: 1rem;
          font-family: 'Instrument Sans', sans-serif;
        }

        @media (max-width: 768px) {
          .faq-section {
            padding: 60px 15px;
          }

          .faq-header h2 {
            font-size: 2rem;
          }

          .faq-question {
            padding: 18px 20px;
            font-size: 0.95rem;
          }

          .faq-answer-content {
            padding: 0 20px 18px 52px;
            font-size: 0.9rem;
          }

          .category-pills {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default FAQSection;