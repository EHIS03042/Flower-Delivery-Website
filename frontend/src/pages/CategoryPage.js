    // ✅ src/pages/CategoryPage.js
    import React, { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import { toOptimizedCloudinary, buildSrcSet } from "../utils/cloudinary";
    import { addToCart as addCart } from "../utils/cart";
    import { useAuth } from "../authContext";
    import "./CategoryPage.css";

    export default function CategoryPage() {
    const { slug } = useParams();
    const { token, setShowAuth } = useAuth();

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

    // ✅ Use a safe API base (avoid /api/api when REACT_APP_API_URL already includes /api)
    const API_BASE_RAW =
        process.env.API_BASE || "http://localhost:3001/";
    const API_BASE = API_BASE_RAW.replace(/\/+$/, "");

    // ✅ Fetch products from backend (all or filtered)
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const url =
            categoryName === "All Flowers"
                ? `${API_BASE_RAW}/api/flowers`
                : `${API_BASE_RAW}/api/flowers?category=${encodeURIComponent(categoryName)}`;

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

    // ✅ Add to Cart handler (requires auth)
    const onAdd = (p) => {
        if (!token) {
        setShowAuth(true);
        return;
        }
        addCart(p, 1);
        // optional toast; simple alert for now
        alert(`Added "${p?.name || "item"}" to cart`);
    };

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
                <div className="featured-card" key={p._id || p.id}>
                    <img
                    src={optimizedUrl}
                    srcSet={srcSet || undefined}
                    sizes="(max-width: 600px) 100vw, 300px"
                    alt={p.name || "Product"}
                    className="featured-img"
                    loading="lazy"
                    decoding="async"
                    />
                    <div className="featured-meta">
                    <h3 className="featured-name">
                        {p.name?.replaceAll('"', "") || "Untitled"}
                    </h3>
                    <p className="featured-price">
                        ${Number(p.price).toFixed(2)}
                    </p>
                    <button
                        className="btn btn--primary"
                        onClick={() => onAdd(p)}
                        aria-label={`Add ${p?.name || "item"} to cart`}
                    >
                        Add to Cart
                    </button>
                    </div>
                </div>
                );
            })}
            </div>
        )}
        </section>
    );
    }
