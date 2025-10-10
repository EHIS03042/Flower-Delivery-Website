    // src/components/ProductCard.js
    import React from "react";
    import "./ProductCard.css";
    import { Link } from "react-router-dom";
    import { useAuth } from "../authContext";
    import { addToCart as addCart } from "../utils/cart";

    export default function ProductCard({ product }) {
    const { token, setShowAuth } = useAuth();

    const addToCart = () => {
        if (!token) {
        setShowAuth(true);
        return;
        }
        addCart(product, 1);
        // optional: lightweight feedback
        // eslint-disable-next-line no-alert
        alert(`Added "${product?.name || "item"}" to cart`);
    };

    return (
        <div className="pCard">
        <Link to={`/product/${product?._id || product?.id || ""}`} className="pCard__imageWrap">
            <img src={product.image || product.img || "/images/placeholder.png"} alt={product.name || "Product"} />
        </Link>
        <div className="pCard__info">
            <h3 className="pCard__name">{product.name || "Untitled"}</h3>
            <p className="pCard__price">${Number(product.price || 0).toFixed(2)}</p>
            <button className="btn btn--primary" onClick={addToCart} aria-label={`Add ${product.name} to cart`}>
            Add to Cart
            </button>
        </div>
        </div>
    );
    }
