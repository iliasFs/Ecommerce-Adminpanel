import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import ProductRow from "../components/ProductRow";
import ProductDetails from "./ProductDetails";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <ProductRow type={"featured-products"} />
      <ProductRow type={"new-arrivals"} />
      <ProductDetails />
    </div>
  );
};

export default HomePage;
