import HeroBanner from "../components/HeroBanner";
import MiddleSection from "../components/MiddleSection";
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
      <ScrollAnimationSection />
      <PhotoCarousel />
    </div>
  );
}
