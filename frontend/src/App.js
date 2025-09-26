// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import AboutUsPage from "./pages/AboutUsPage";
import CheckoutPage from "./pages/CheckoutPage";
import Footer from "./components/Footer";
import { useAuth } from "./authContext";

export default function App() {
  const { showAuth } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Categories */}
          <Route path="/category/:slug" element={<CategoryPage />} />

          {/* ✅ Product pages (generic & dynamic) */}
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductPage />} />

          {/* About */}
          <Route path="/about" element={<AboutUsPage />} />

          {/* Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
      {showAuth && <AuthModal />}
    </BrowserRouter>
  );
}
