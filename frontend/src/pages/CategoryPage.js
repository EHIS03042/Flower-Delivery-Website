    // src/pages/CategoryPage.js
    import React from "react";
    import FeaturedProducts from "../components/FeaturedProducts";
    import "./CategoryPage.css";

    export default function CategoryPage() {
    return (
        <section className="category-page">
        <h1 className="category-title">Our Featured Flowers</h1>
        <FeaturedProducts />
        </section>
    );
    }
