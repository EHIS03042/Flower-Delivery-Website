    // src/components/FeaturedProducts.js
    import React from "react";
    import "./FeaturedProducts.css";

    const products = [
    { name: "Snowfall", price: 70, image: "/images/featured/snowfall.png" },
    { name: "Pink Elegance", price: 70, image: "/images/featured/pink-elegance.png" },
    { name: "Autumn Symphony", price: 75, image: "/images/featured/autumn-symphony.png" },
    { name: "Serenity", price: 89, image: "/images/featured/serenity.png" },
    { name: "Mystical Majesty", price: 80, image: "/images/featured/mystical-majesty.png" },
    { name: "Dawns Delight", price: 70, image: "/images/featured/dawns-delight.png" },
    { name: "Rustic Charm", price: 70, image: "/images/featured/rustic-charm.png" },
    { name: "Rosy Delight", price: 70, image: "/images/featured/rosy-delight.png" },
    { name: "Blue Harmony", price: 55, image: "/images/featured/blue-harmony.png" },
    { name: "Blazing Blossoms", price: 70, image: "/images/featured/blazing-blossoms.png" },
    ];

    export default function FeaturedProducts() {
    return (
        <section className="featured-section">
        <h2 className="featured-title">Featured Products</h2>
        <div className="featured-grid">
            {products.map((p, idx) => (
            <div key={idx} className="featured-card">
                <div className="featured-img-wrapper">
                <img src={p.image} alt={p.name} className="featured-img" />
                </div>
                <h3 className="featured-name">{p.name}</h3>
                <p className="featured-price">${p.price}</p>
            </div>
            ))}
        </div>
        </section>
    );
    }
