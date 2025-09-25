    import React from "react";
    import "./PromotionalBanner.css";

    export default function PromotionalBanner() {
    return (
        <section className="promo">
        <div className="promo__inner">
            <h3>Same-Day Delivery Available</h3>
            <p>Order before 2 PM and we’ll deliver today in select cities.</p>
            <a href="/category/fresh" className="btn">Explore</a>
        </div>
        </section>
    );
    }
