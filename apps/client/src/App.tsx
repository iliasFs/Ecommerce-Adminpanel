
import CategoryPage from "./components/CategoryPage";
import Layout from "./components/Layout";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { CartProvider } from "./contexts/CartContext";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/:categoryName" element= (<CategoryPage />)
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>

  );
}

export default App;
