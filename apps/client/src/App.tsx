import CategoryPage from "./components/CategoryPage";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { CartProvider } from "./contexts/CartContext";
import Checkout from "./components/Checkout";
import ProductDetails from "./components/pages/ProductDetails";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/:productId" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
