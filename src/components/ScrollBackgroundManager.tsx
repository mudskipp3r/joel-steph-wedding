'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollBackgroundManagerProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ScrollBackgroundManager: React.FC<ScrollBackgroundManagerProps> = ({ containerRef }) => {
  const managerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // Simple elegant color scheme with dramatic timeline
    const sectionColors = {
      'our-story': '#F5F4F2',      // Soft off-white
      'timeline': '#1A2B42',       // Deep navy blue - dramatic background
      'venues': '#F5F4F2',         // Soft off-white
      'photo-section': '#F9F7F5',  // Warm white
      'faq-section': '#F5F4F2',    // Soft off-white
      'rsvp': '#F5F4F2'           // Soft off-white for footer background
    };

    const container = containerRef.current;

    // Get all section elements
    const sections = Object.keys(sectionColors).map(id => ({
      id,
      element: document.getElementById(id),
      color: sectionColors[id as keyof typeof sectionColors]
    })).filter(section => section.element);

    // Create scroll-based color interpolation with responsive behavior
    const updateBackgroundColor = () => {
      const scrollY = window.scrollY;
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

      let activeSection = sections[0];
      let nextSection = null;
      let progress = 0;

      // Responsive trigger points - more sensitive on mobile for better UX
      const triggerOffset = isMobile ? 0.2 : isTablet ? 0.25 : 0.3;

      // Find the current and next sections based on scroll position
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const elementTop = scrollY + rect.top;
          const elementBottom = elementTop + rect.height;
          const triggerPoint = elementTop - window.innerHeight * triggerOffset;

          if (scrollY >= triggerPoint) {
            activeSection = section;
            if (i < sections.length - 1) {
              nextSection = sections[i + 1];
              const nextRect = nextSection.element?.getBoundingClientRect();
              if (nextRect) {
                const nextTriggerPoint = scrollY + nextRect.top - window.innerHeight * triggerOffset;
                const sectionLength = nextTriggerPoint - triggerPoint;
                progress = Math.min(1, Math.max(0, (scrollY - triggerPoint) / sectionLength));
              }
            }
          }
        }
      }

      // Set background color immediately without animation to prevent stuttering
      container.style.backgroundColor = activeSection.color;

      // Handle timeline text color with responsive considerations
      const timelineEl = document.getElementById('timeline');
      if (timelineEl) {
        const elements = timelineEl.querySelectorAll('*') as NodeListOf<HTMLElement>;
        // Dark navy background gets light text, other light backgrounds get dark text
        const color = activeSection.id === 'timeline' ? '#F5F5F5' : '#2c3e50';
        elements.forEach(el => {
          el.style.color = color;
        });

        // On mobile, ensure timeline content is properly visible
        if (isMobile && activeSection.id === 'timeline') {
          const timelineContent = timelineEl.querySelector('.timeline-content') as HTMLElement;
          if (timelineContent) {
            timelineContent.style.background = 'transparent';
          }
        }
      }

      // Handle venues section title color - light on dark background, dark on light background
      const venuesEl = document.getElementById('venues');
      if (venuesEl) {
        const venuesTitle = venuesEl.querySelector('h2');
        if (venuesTitle) {
          // If we're still on the timeline section (dark), make venues title light
          // Otherwise, make it dark (when background transitions to light)
          const venuesColor = activeSection.id === 'timeline' ? '#F5F5F5' : '#2c3e50';
          venuesTitle.style.color = venuesColor;
          venuesTitle.style.transition = 'color 0.5s ease';
        }
      }
    };

    // Create a single ScrollTrigger with optimized performance
    const mainTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: updateBackgroundColor,
      onRefresh: updateBackgroundColor,
      markers: false,
      invalidateOnRefresh: true,
    });

    // Handle responsive changes
    const handleResize = () => {
      // Debounce resize events
      clearTimeout((window as any).resizeTimeout);
      (window as any).resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        updateBackgroundColor();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Initial call to set the correct color
    updateBackgroundColor();

    // Special handling for PhotoSection which doesn't have an ID
    const photoSection = document.querySelector('.photo-section') ||
                        document.querySelector('[class*="photo"]') ||
                        // Fallback: find element between venues and FAQ
                        (() => {
                          const venuesEl = document.getElementById('venues');
                          const faqEl = document.querySelector('[class*="faq"]');
                          if (venuesEl && faqEl) {
                            let current = venuesEl.nextElementSibling;
                            while (current && current !== faqEl) {
                              const htmlElement = current as HTMLElement;
                              if (current.tagName.toLowerCase() !== 'div' ||
                                  !htmlElement.style.height ||
                                  !htmlElement.style.height.includes('vh')) {
                                return current;
                              }
                              current = current.nextElementSibling;
                            }
                          }
                          return null;
                        })();

    if (photoSection) {
      ScrollTrigger.create({
        trigger: photoSection as Element,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(container, {
            backgroundColor: sectionColors['photo-section'],
            duration: 0.8,
            ease: "power2.out"
          });
        },
        onEnterBack: () => {
          gsap.to(container, {
            backgroundColor: sectionColors['photo-section'],
            duration: 0.8,
            ease: "power2.out"
          });
        },
        markers: false
      });
    }

    // FAQ section fallback (in case it doesn't have an ID)
    const faqSection = document.querySelector('[class*="faq"]') ||
                      document.querySelector('section:last-of-type');

    if (faqSection && faqSection.id !== 'rsvp') {
      ScrollTrigger.create({
        trigger: faqSection as Element,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(container, {
            backgroundColor: sectionColors['faq-section'],
            duration: 0.8,
            ease: "power2.out"
          });
        },
        onEnterBack: () => {
          gsap.to(container, {
            backgroundColor: sectionColors['faq-section'],
            duration: 0.8,
            ease: "power2.out"
          });
        },
        markers: false
      });
    }

    // Cleanup function
    return () => {
      // Clean up main trigger
      mainTrigger?.kill();

      // Clean up resize event listeners
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);

      // Clear any pending timeouts
      clearTimeout((window as any).resizeTimeout);

      // Clean up any remaining ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, [containerRef]);

  return <div ref={managerRef} style={{ display: 'none' }} />;
};

export default ScrollBackgroundManager;