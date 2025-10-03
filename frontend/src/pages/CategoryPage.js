    // ✅ src/pages/CategoryPage.js
    import React, { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import { toOptimizedCloudinary, buildSrcSet } from "../utils/cloudinary";
    import "./CategoryPage.css";

    export default function CategoryPage() {
    const { slug } = useParams();

    // ✅ Map slug → category display name
    const categoryMap = {
        "fresh-flowers": "Fresh Flowers",
        "dried-flowers": "Dried Flowers",
        "live-plants": "Live Plants",
        "aroma-candles": "Aroma Candles",
        "fresheners": "Fresheners",
    };

    const categoryName = categoryMap[slug] || "All Flowers";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";

    // ✅ Fetch products from backend (all or filtered)
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const url =
            categoryName === "All Flowers"
                ? `${API_BASE}/api/flowers`
                : `${API_BASE}/api/flowers?category=${encodeURIComponent(categoryName)}`;

            const res = await axios.get(url);
            setProducts(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("❌ Error fetching category products:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchProducts();
    }, [slug, categoryName, API_BASE]);

    // ✅ Normalize and filter products by category (to handle DB variations)
    const filteredProducts = products.filter(
        (p) =>
        categoryName === "All Flowers" ||
        (p.category &&
            p.category.toLowerCase().replace(/\s|-/g, "") ===
            categoryName.toLowerCase().replace(/\s|-/g, ""))
    );

    if (loading) {
        return (
        <section className="category-page">
            <div className="category-header">
            <h1 className="category-title">{categoryName}</h1>
            <p className="category-subtitle">Loading products...</p>
            </div>
        </section>
        );
    }

    return (
        <section className="category-page">
        <div className="category-header">
            <h1 className="category-title">{categoryName}</h1>
            <p className="category-subtitle">
            Explore our exquisite collection of {categoryName.toLowerCase()}.
            </p>
        </div>

        {filteredProducts.length === 0 ? (
            <div className="empty-state">
            <p>No products found in this category yet.</p>
            </div>
        ) : (
            <div className="grid featured-grid">
            {filteredProducts.map((p) => {
                const optimizedUrl = toOptimizedCloudinary(p.image);
                const srcSet = buildSrcSet(p.image);
                return (
                <div className="featured-card" key={p._id}>
                    <img
                    src={optimizedUrl}
                    srcSet={srcSet || undefined}
                    sizes="(max-width: 600px) 100vw, 300px"
                    alt={p.name}
                    className="featured-img"
                    loading="lazy"
                    decoding="async"
                    />
                    <h3 className="featured-name">
                    {p.name?.replaceAll('"', "") || "Untitled"}
                    </h3>
                    <p className="featured-price">
                    ${Number(p.price).toFixed(2)}
                    </p>
                </div>
                );
            })}
            </div>
        )}
        </section>
    );
    }
