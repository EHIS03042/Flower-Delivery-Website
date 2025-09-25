    import React, { useEffect, useState } from "react";
    import "./FeaturedProducts.css";
    import api from "../utils/api";
    import ProductCard from "./ProductCard";

    export default function FeaturedProducts() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.get("/flowers").then(({ data }) => {
        setItems(Array.isArray(data) ? data.slice(0, 8) : []);
        });
    }, []);

    return (
        <section className="section">
        <div className="section__head">
            <h2>Featured Products</h2>
        </div>
        <div className="grid">
            {items.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
        </section>
    );
    }
