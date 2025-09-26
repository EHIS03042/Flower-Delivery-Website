    import React, { useState } from "react";
    import "./ProductPage.css";

    export default function ProductPage() {
    const [quantity, setQuantity] = useState(1);

    const increaseQty = () => setQuantity(quantity + 1);
    const decreaseQty = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    return (
        <section className="product-page">
        {/* 🖼️ Product Hero */}
        <div className="product-hero">
            <img
            src="/images/featured/rosy-delight.png"
            alt="Rosy Delight"
            className="product-image"
            />
        </div>

        {/* 🌸 Product Info */}
        <div className="product-info">
            <p className="breadcrumb">Bouquets / Fresh Flowers / Quick Order</p>
            <h1 className="product-title">Rosy Delight - $100</h1>
            <p className="product-desc">
            Large exceptional bouquet composed of a selection of David Austin
            roses, known for their beauty and subtle fragrance. The bouquet is
            accompanied by seasonal foliage which will enhance these sublime
            flowers even more.
            </p>

            {/* 🧮 Quantity Selector */}
            <div className="quantity-section">
            <label htmlFor="qty">Quantity</label>
            <div className="quantity-control">
                <button onClick={decreaseQty}>-</button>
                <input type="text" value={quantity} readOnly />
                <button onClick={increaseQty}>+</button>
            </div>
            </div>

            {/* 🛒 Add to Basket */}
            <button className="add-to-basket">ADD TO BASKET</button>
        </div>

        {/* ✨ Recommendations */}
        <div className="related-section">
            <h2 className="related-title">You may also like...</h2>
            <div className="related-grid">
            <div className="related-item">
                <img src="/images/product/rattan-grapefruit.png" alt="" />
                <h3>Rattan Grapefruit</h3>
                <p className="price">Price $45</p>
            </div>

            <div className="related-item">
                <img src="/images/product/cedar-lavender.png" alt="" />
                <h3>Cedar & Lavender</h3>
                <p className="price">Price $64</p>
            </div>

            <div className="related-item">
                <img src="/images/product/lime-matcha.png" alt="" />
                <h3>Lime & Matcha</h3>
                <p className="price">Price $45</p>
            </div>

            <div className="related-item">
                <img src="/images/product/ocean-mist.png" alt="" />
                <h3>Ocean Mist</h3>
                <p className="price">Price $55</p>
            </div>
            </div>
        </div>
        </section>
    );
    }
