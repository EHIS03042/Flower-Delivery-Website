    import React from "react";
    import "./CategoryShowcase.css";
    import { Link } from "react-router-dom";

    const items = [
    { slug: "fresh", title: "Fresh Flowers", img: "/cat-fresh.jpg" },
    { slug: "dry", title: "Dry Flowers", img: "/cat-dry.jpg" },
    { slug: "gifts", title: "Gifts", img: "/cat-gifts.jpg" },
    ];

    export default function CategoryShowcase() {
    return (
        <section className="section">
        <div className="section__head">
            <h2>Shop by Category</h2>
        </div>
        <div className="grid">
            {items.map(c => (
            <Link to={`/category/${c.slug}`} className="categoryCard" key={c.slug}>
                <img src={c.img} alt={c.title} loading="lazy" />
                <span>{c.title}</span>
            </Link>
            ))}
        </div>
        </section>
    );
    }
