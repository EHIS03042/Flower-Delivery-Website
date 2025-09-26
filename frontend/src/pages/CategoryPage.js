    // ✅ src/pages/CategoryPage.js
    import React from "react";
    import FeaturedProducts from "../components/FeaturedProducts";
    import "./CategoryPage.css";

    export default function CategoryPage() {
    // ✅ Static frontend products (Figma-aligned)
    const products = [
        { name: "Snowfall", price: 70, image: "/images/featured/snowfall.png" },
        { name: "Pink Elegance", price: 70, image: "/images/featured/pink-elegance.png" },
        { name: "Autumn Symphony", price: 70, image: "/images/featured/autumn-symphony.png" },
        { name: "Serenity", price: 89, image: "/images/featured/serenity.png" },
        { name: "Mystical Majesty", price: 80, image: "/images/featured/mystical-majesty.png" },
        { name: "Dawn’s Delight", price: 70, image: "/images/featured/dawns-delight.png" },
        { name: "Rustic Charm", price: 70, image: "/images/featured/rustic-charm.png" },
        { name: "Rosy Delight", price: 70, image: "/images/featured/rosy-delight.png" },
        { name: "Blue Harmony", price: 55, image: "/images/featured/blue-harmony.png" },
        { name: "Blazing Blossoms", price: 70, image: "/images/featured/blazing-blossoms.png" },
    ];

    return (
        <section className="category-page">
        <div className="category-header">
            <h1 className="category-title">All Flowers</h1>
            <p className="category-subtitle">
            Explore our exquisite collection of bouquets, plants, and floral gifts.
            </p>
        </div>

        <div className="grid featured-grid">
            {products.map((p, idx) => (
            <div className="featured-card" key={idx}>
                <img src={p.image} alt={p.name} className="featured-img" />
                <h3 className="featured-name">{p.name}</h3>
                <p className="featured-price">${p.price}</p>
            </div>
            ))}
        </div>
        </section>
    );
    }
