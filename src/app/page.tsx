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
import TestForm from "../components/TestForm";

export default function Home() {
  const [isRSVPFormOpen, setIsRSVPFormOpen] = useState(false);
  const [isTestFormOpen, setIsTestFormOpen] = useState(false);

  const openRSVPForm = () => setIsRSVPFormOpen(true);
  const closeRSVPForm = () => setIsRSVPFormOpen(false);

  const openTestForm = () => setIsTestFormOpen(true);
  const closeTestForm = () => setIsTestFormOpen(false);


  return (
    <div style={{ overflowX: 'hidden', width: '100%' }}>
      <Navigation
        isRSVPFormOpen={isRSVPFormOpen}
        onOpenRSVPForm={openRSVPForm}
        onOpenTestForm={openTestForm}
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
        <div style={{ height: '4vh' }}></div>

        {/* Footer inside content container */}
        <div id="rsvp">
          <Footer onOpenRSVPForm={openRSVPForm} />
        </div>
      </div>

      {/* RSVP Slideout - positioned at top level */}
      <RSVPSlideout
        isOpen={isRSVPFormOpen}
        onClose={closeRSVPForm}
      />

      {/* Test Form - positioned at top level */}
      <TestForm
        isOpen={isTestFormOpen}
        onClose={closeTestForm}
      />
    </div>
  );
}
