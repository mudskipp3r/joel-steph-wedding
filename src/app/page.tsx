import HeroSection from "../components/HeroSection";
import MiddleSection from "../components/MiddleSection";
import ScheduleSection from "../components/ScheduleSection";
import TimelineSection from "../components/TimelineSection";
import VenueSection from "../components/VenueSection";
import PhotoSection from "../components/PhotoSection";
import RSVPSection from "../components/RSVPSection";
import FAQSection from "../components/FAQSection";
import SimpleFooter from "../components/SimpleFooter";
import BackgroundColorManager from "../components/BackgroundColorManager";

export default function Home() {
  return (
    <>
      <BackgroundColorManager />
      <HeroSection />
      <SimpleFooter />

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
        minHeight: '100vh',
        paddingBottom: '50vh',
        width: '100%',
        margin: 0,
        overflow: 'hidden'
      }}>
        <MiddleSection />
        <TimelineSection />
        <VenueSection />
        <PhotoSection />
        <RSVPSection />
        <FAQSection />
      </div>
    </>
  );
}
