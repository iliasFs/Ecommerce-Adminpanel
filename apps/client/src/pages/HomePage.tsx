import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import FeaturedRow from "../components/FeaturedRow";
import NewArrivalsRow from "../components/NewArrivalsRow";
import ProductDetails from "./ProductDetails";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedRow />
      <NewArrivalsRow />
      <ProductDetails />
    </div>
  );
};

export default HomePage;
