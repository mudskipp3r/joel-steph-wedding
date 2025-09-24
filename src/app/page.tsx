'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import OptimizedMiddleSection from "../components/OptimizedMiddleSection";
import TimelineSection from "../components/TimelineSection";
import VenueSection from "../components/VenueSection";
import PhotoSection from "../components/PhotoSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import RSVPSlideout from "../components/RSVPSlideout";
import BackgroundColorManager from "../components/BackgroundColorManager";

export default function Home() {
  const [isRSVPFormOpen, setIsRSVPFormOpen] = useState(false);

  const openRSVPForm = () => setIsRSVPFormOpen(true);
  const closeRSVPForm = () => setIsRSVPFormOpen(false);

  // Footer reveal animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = document.getElementById('rsvp');
    const pageContent = document.querySelector('.page-content');

    if (footer && pageContent) {
      // Start with footer visible at bottom but slide up on scroll
      gsap.set(footer, { y: 0 }); // Make footer visible by default

      // Create scroll trigger for subtle footer reveal effect
      ScrollTrigger.create({
        trigger: pageContent,
        start: 'bottom bottom+=200',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Subtle slide up effect
          gsap.to(footer, {
            y: -10 * progress,
            duration: 0.2,
            ease: 'power1.out'
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === pageContent) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <Navigation
        isRSVPFormOpen={isRSVPFormOpen}
        onOpenRSVPForm={openRSVPForm}
      />
      <BackgroundColorManager />
      <div id="hero">
        <HeroSection />
      </div>

      {/* Spacer for fixed hero section */}
      <div style={{ height: '100vh' }}></div>

      {/* Content that overlaps the hero */}
      <div className="page-content" style={{
        position: 'relative',
        zIndex: 10,
        background: '#F0E9E1',
        borderTopLeftRadius: 'clamp(20px, 5vw, 40px)',
        borderTopRightRadius: 'clamp(20px, 5vw, 40px)',
        paddingTop: 'clamp(40px, 8vw, 60px)',
        paddingBottom: '0',
        width: '100%',
        margin: 0,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        minHeight: '100vh'
      }}>
        <div id="our-story">
          <OptimizedMiddleSection />
        </div>
        <div style={{ height: '4vh' }}></div>
        <div id="timeline">
          <TimelineSection />
        </div>
        <div style={{ height: '8vh' }}></div>
        <div id="venues">
          <VenueSection />
        </div>
        <div style={{ height: '8vh' }}></div>
        <PhotoSection />
        <div style={{ height: '4vh' }}></div>
        <FAQSection />
        {/* Extra spacing to allow footer to be revealed underneath */}
        <div style={{ height: '200px' }}></div>
      </div>

      {/* Footer positioned underneath to be revealed by scroll */}
      <div id="rsvp" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5
      }}>
        <Footer onOpenRSVPForm={openRSVPForm} />
      </div>

      {/* RSVP Slideout - positioned at top level */}
      <RSVPSlideout
        isOpen={isRSVPFormOpen}
        onClose={closeRSVPForm}
      />
    </>
  );
}
