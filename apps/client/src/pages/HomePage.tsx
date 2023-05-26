import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import ProductRow from "../components/ProductRow";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <ProductRow type={"featured-products"} />
      <ProductRow type={"new-arrivals"} />
    </div>
  );
};

export default HomePage;
