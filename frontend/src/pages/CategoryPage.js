        // src/pages/CategoryPage.js
    import React, { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    // ⬇️ Use the shared axios client so we never hardcode localhost/front-end URLs
    import api from "../utils/api";
    import { toOptimizedCloudinary, buildSrcSet } from "../utils/cloudinary";
    import { addToCart as addCart } from "../utils/cart";
    import { useAuth } from "../authContext";
    import "./CategoryPage.css";

    export default function CategoryPage() {
    const { slug } = useParams();
    const { token, setShowAuth } = useAuth();

    // ✅ Slug → display name used by your DB/category filter
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

    // ✅ Fetch products from *backend API* using the shared client
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            // Build relative path; `api` already knows the baseURL (/api)
            const path =
            categoryName === "All Flowers"
                ? `/flowers`
                : `/flowers?category=${encodeURIComponent(categoryName)}`;

            const { data } = await api.get(path);

            // Be defensive about the payload shape
            setProducts(Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : []);
        } catch (err) {
            console.error("❌ Error fetching category products:", err?.response?.data || err?.message || err);
            setProducts([]); // fail gracefully
        } finally {
            setLoading(false);
        }
        };

        fetchProducts();
    }, [slug, categoryName]);

    // ✅ Client-side filter (keep it lenient to tolerate DB casing/spaces/hyphens)
    const normalized = (s) => String(s || "").toLowerCase().replace(/\s|-/g, "");
    const filteredProducts = products.filter(
        (p) =>
        categoryName === "All Flowers" ||
        (p.category && normalized(p.category) === normalized(categoryName))
    );

    // ✅ Add to cart (require auth)
    const onAdd = (p) => {
        if (!token) return setShowAuth(true);
        addCart(p, 1);
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
                        ${Number(p.price || 0).toFixed(2)}
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
