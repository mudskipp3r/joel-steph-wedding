import HeroBanner from "../components/HeroBanner";
import MiddleSection from "../components/MiddleSection";
import ScheduleSection from "../components/ScheduleSection";
import ScrollAnimationSection from "../components/ScrollAnimationSection";
import PhotoCarousel from "../components/PhotoCarousel";
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

        {/* Footer trigger - creates space to trigger footer drawer at very bottom */}
        <div className="footer-trigger" style={{ height: '100vh' }}></div>
      </div>
      <Footer />
    </>
  );
}
