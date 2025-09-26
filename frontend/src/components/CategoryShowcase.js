    // src/components/CategoryShowcase.js
    import React from "react";
    import "./CategoryShowcase.css";
    import { Link } from "react-router-dom";

    const categories = [
    {
        slug: "fresh-flowers",
        title: "Fresh Flowers",
        img: "/images/home/fresh-flowers.png",
    },
    {
        slug: "dried-flowers",
        title: "Dried Flowers",
        img: "/images/home/dried-flowers.png",
    },
    {
        slug: "live-plants",
        title: "Live Plants",
        img: "/images/home/live-plants.png",
    },
    {
        slug: "aroma-candles",
        title: "Aroma Candles",
        img: "/images/home/aroma-candles.png",
    },
    {
        slug: "fresheners",
        title: "Fresheners",
        img: "/images/home/fresheners.png",
    },
    ];

    export default function CategoryShowcase() {
    return (
        <section className="category-section">
        <div className="category-grid">
            {categories.map((cat, index) => (
            <div
                className={`category-row ${
                index % 2 !== 0 ? "reverse" : ""
                }`}
                key={cat.slug}
            >
                {/* Text column */}
                <div className="category-text">
                <h3 className="category-title">{cat.title}</h3>
                <Link to={`/category/${cat.slug}`} className="category-link">
                    Shop now →
                </Link>
                </div>

                {/* Image column */}
                <div className="category-image">
                <img
                    src={cat.img}
                    alt={cat.title}
                    className="category-img"
                    loading="lazy"
                />
                </div>
            </div>
            ))}
        </div>
        </section>
    );
    }
