import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import ProductRow from "../components/ProductRow";
import { AnimatePresence } from "framer-motion";

const HomePage = () => {
  return (
    <div>
      <AnimatePresence>
        <HeroSection />
        <CategorySection />
        <ProductRow type={"featured-products"} />
        <ProductRow type={"new-arrivals"} />
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
