import Banner           from "@/components/Banner";
import MarqueeSection   from "@/components/MarqueeSection";
import FeaturedBooks    from "@/components/FeaturedBooks";
import WhyChooseUs      from "@/components/WhyChooseUs";
import ExploreCategories from "@/components/ExploreCategories";

export default function HomePage() {
  return (
    <>
      <Banner />
      <MarqueeSection />
      <FeaturedBooks />
      <WhyChooseUs />
      <ExploreCategories />
    </>
  );
}
