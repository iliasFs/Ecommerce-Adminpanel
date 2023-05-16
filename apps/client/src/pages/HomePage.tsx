import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import FeaturedRow from "../components/FeaturedRow";
import NewArrivalsRow from "../components/NewArrivalsRow";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedRow />
      <NewArrivalsRow />
    </div>
  );
};

export default HomePage;
