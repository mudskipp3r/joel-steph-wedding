import HeroSection from "../components/HeroSection";
import OptimizedMiddleSection from "../components/OptimizedMiddleSection";
import OptimizedTimelineSection from "../components/OptimizedTimelineSection";
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
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        paddingTop: '60px',
        paddingBottom: '0',
        width: '100%',
        margin: 0,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <OptimizedMiddleSection />
        <div style={{ height: '8vh' }}></div>
        <OptimizedTimelineSection />
        <div style={{ height: '8vh' }}></div>
        <VenueSection />
        <div style={{ height: '8vh' }}></div>
        <PhotoSection />
        <div style={{ height: '8vh' }}></div>
        <FAQSection />
        <div style={{ height: '8vh' }}></div>

        {/* Footer at the bottom of content */}
        <SimpleFooter />
      </div>
    </>
  );
}
