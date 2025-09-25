    import React from "react";
    import "./HeroBanner.css";

    export default function HeroBanner() {
    return (
        <section className="hero">
        <div className="hero__content">
            <h1>Fresh Flowers, Fast Delivery</h1>
            <p>Seasonal bouquets and gifts to brighten any day.</p>
            <a href="/category/fresh" className="btn btn--primary">Shop Now</a>
        </div>
        </section>
    );
    }
