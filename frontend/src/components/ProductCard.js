    import React, { useContext } from "react";
    import "./ProductCard.css";
    import { Link } from "react-router-dom";
    import { AuthContext } from "../authContext";

    export default function ProductCard({ product }) {
    const { token, setShowAuth } = useContext(AuthContext);

    const addToCart = () => {
        if (!token) return setShowAuth(true);
        // TODO: call backend cart API
        alert("Added to cart (stub)");
    };

    return (
        <div className="pCard">
        <Link to={`/product/${product._id}`}>
            <img
            src={product.image ? product.image.replace("/upload/", "/upload/f_auto,q_auto/") : "/placeholder.png"}
            alt={product.name}
            loading="lazy"
            />
        </Link>
        <div className="pCard__info">
            <h4>{product.name}</h4>
            <p className="pCard__price">${Number(product.price).toFixed(2)}</p>
            <button className="btn btn--primary" onClick={addToCart}>Add to cart</button>
        </div>
        </div>
    );
    }
