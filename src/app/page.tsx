import HeroSection from "../components/HeroSection";
import OptimizedMiddleSection from "../components/OptimizedMiddleSection";
import TimelineSection from "../components/TimelineSection";
import VenueSection from "../components/VenueSection";
import PhotoSection from "../components/PhotoSection";
import FAQSection from "../components/FAQSection";
import SimpleFooter from "../components/SimpleFooter";
import BackgroundColorManager from "../components/BackgroundColorManager";

export default function Home() {
  return (
    <>
      <BackgroundColorManager />
      <HeroSection />

      {/* Spacer for fixed hero section */}
      <div style={{ height: '100vh' }}></div>

      {/* Content that overlaps the hero */}
      <div className="page-content" style={{
        position: 'relative',
        zIndex: 10,
        background: '#faf9f6',
        borderTopLeftRadius: 'clamp(20px, 5vw, 40px)',
        borderTopRightRadius: 'clamp(20px, 5vw, 40px)',
        paddingTop: 'clamp(40px, 8vw, 60px)',
        paddingBottom: '0',
        width: '100%',
        margin: 0,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        minHeight: '100vh'
      }}>
        <OptimizedMiddleSection />
        <div style={{ height: '4vh' }}></div>
        <TimelineSection />
        <div style={{ height: '8vh' }}></div>
        <VenueSection />
        <div style={{ height: '8vh' }}></div>
        <PhotoSection />
        <div style={{ height: '4vh' }}></div>
        <FAQSection />
        <div style={{ height: '4vh' }}></div>

        {/* Footer at the bottom of content */}
        <SimpleFooter />
      </div>
    </>
  );
}
