    import React, { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import api from "../utils/api";
    import ProductCard from "../components/ProductCard";

    export default function CategoryPage() {
    const { slug } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        // If backend supports query: /flowers?category=slug
        api.get(`/flowers?category=${slug}`).then(({ data }) => {
        setItems(Array.isArray(data) ? data : []);
        });
    }, [slug]);

    return (
        <section className="section">
        <div className="section__head">
            <h1 className="title capitalize">{slug} Flowers</h1>
        </div>
        <div className="grid">
            {items.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
        </section>
    );
    }
