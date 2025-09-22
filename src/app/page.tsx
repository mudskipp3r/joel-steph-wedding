import HeroBanner from "../components/HeroBanner";
import MiddleSection from "../components/MiddleSection";
import ScheduleSection from "../components/ScheduleSection";
import ScrollAnimationSection from "../components/ScrollAnimationSection";
import PhotoCarousel from "../components/PhotoCarousel";
import RSVPSection from "../components/RSVPSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="page-content">
        <HeroBanner
          title="Joel & Stephanie"
          subtitle="Save the Date"
        />
        <MiddleSection />
        <ScheduleSection />
        <ScrollAnimationSection />
        <PhotoCarousel />
        <RSVPSection />
        <FAQSection />
      </div>

      {/* Footer trigger - creates space to trigger footer drawer after FAQ */}
      <div className="footer-trigger" style={{ height: '100vh' }}></div>
      <Footer />
    </>
  );
}
