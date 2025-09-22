import HeroBanner from "../components/HeroBanner";
import MiddleSection from "../components/MiddleSection";
import ScheduleSection from "../components/ScheduleSection";
import ScrollAnimationSection from "../components/ScrollAnimationSection";
import PhotoCarousel from "../components/PhotoCarousel";

export default function Home() {
  return (
    <div>
      <HeroBanner
        title="Joel & Stephanie"
        subtitle="Save the Date"
      />
      <MiddleSection />
      <ScheduleSection />
      <ScrollAnimationSection />
      <PhotoCarousel />
    </div>
  );
}
