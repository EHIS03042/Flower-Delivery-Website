    // src/components/ProductCard.js
    import React from "react";
    import "./ProductCard.css";
    import { Link } from "react-router-dom";
    import { useAuth } from "../authContext"; // ✅ use the custom hook instead

    export default function ProductCard({ product }) {
    const { token, setShowAuth } = useAuth(); // ✅ pulled from hook

    const addToCart = () => {
        if (!token) {
        // ✅ Prompt login if user not authenticated
        setShowAuth(true);
        return;
        }

        // ✅ Stub for backend API integration
        alert(`✅ ${product.name} added to cart!`);
        // TODO: Call backend cart API here (e.g., POST /api/cart)
    };

    return (
        <div className="pCard">
        <Link
            to={`/product/${product._id}`}
            aria-label={`View details for ${product.name}`}
        >
            <img
            src={
                product.image
                ? product.image.replace("/upload/", "/upload/f_auto,q_auto/")
                : "/placeholder.png"
            }
            alt={product.name || "Flower product"}
            loading="lazy"
            className="pCard__img"
            />
        </Link>

        <div className="pCard__info">
            <h4 className="pCard__title">{product.name}</h4>
            <p className="pCard__price">
            ${Number(product.price || 0).toFixed(2)}
            </p>
            <button
            className="btn btn--primary"
            onClick={addToCart}
            aria-label={`Add ${product.name} to cart`}
            >
            Add to Cart
            </button>
        </div>
        </div>
    );
    }
