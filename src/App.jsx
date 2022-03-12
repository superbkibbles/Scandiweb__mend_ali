import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import TheLayout from "./container/TheLayout";
import CartPage from "./pages/cart/CartPage";
import AllProductsPage from "./pages/allProducts/allProductsPage";
import ProductPage from "./pages/product/ProductPage";

import TechPage from "./pages/techPage/TechPage";
import ClothesPage from "./pages/clothesPage/ClothesPage";

class App extends React.Component {
  render() {
    return (
      <TheLayout>
        <Routes>
          <Route exact path="/all" element={<AllProductsPage />} />
          <Route exact path="/all/product/:id" element={<ProductPage />} />
          <Route exact path="/tech" element={<TechPage />} />
          <Route exact path="/tech/product/:id" element={<ProductPage />} />
          <Route exact path="/clothes/product/:id" element={<ProductPage />} />
          <Route exact path="/clothes" element={<ClothesPage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route element={() => <h1>NOT FOUND</h1>} />
          <Route exact path="/" element={<Navigate replace to="/all" />} />
        </Routes>
      </TheLayout>
    );
  }
}

export default App;
