    import React, { useEffect, useState, useContext } from "react";
    import { useParams } from "react-router-dom";
    import api from "../utils/api";
    import { AuthContext } from "../authContext";

    export default function ProductPage() {
    const { id } = useParams();
    const [p, setP] = useState(null);
    const { token, setShowAuth } = useContext(AuthContext);

    useEffect(() => {
        api.get(`/flowers/${id}`).then(({ data }) => setP(data));
    }, [id]);

    const addToCart = () => {
        if (!token) return setShowAuth(true);
        alert("Added to cart (stub)");
    };

    if (!p) return <p>Loading...</p>;

    return (
        <section className="section">
        <div className="product">
            <img
            src={p.image ? p.image.replace("/upload/", "/upload/f_auto,q_auto/") : "/placeholder.png"}
            alt={p.name}
            className="product__img"
            loading="lazy"
            />
            <div className="product__info">
            <h1 className="title">{p.name}</h1>
            <p className="muted">{p.description}</p>
            <div className="price">${Number(p.price).toFixed(2)}</div>
            <button className="btn btn--primary" onClick={addToCart}>Add to cart</button>
            </div>
        </div>
        </section>
    );
    }
