import HeroSection from "../components/HeroSection";
import MiddleSection from "../components/MiddleSection";
import ScheduleSection from "../components/ScheduleSection";
import VenueSection from "../components/VenueSection";
import PhotoSection from "../components/PhotoSection";
import RSVPSection from "../components/RSVPSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
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
        background: '#8E7CC3',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        paddingTop: '60px',
        minHeight: '100vh'
      }}>
        <MiddleSection />
        <ScheduleSection />
        <VenueSection />
        <PhotoSection />
        <RSVPSection />
        <FAQSection />
      </div>

      {/* Footer trigger - creates space to trigger footer drawer after FAQ */}
      <div className="footer-trigger" style={{ height: '100vh' }}></div>
      <Footer />
    </>
  );
}
