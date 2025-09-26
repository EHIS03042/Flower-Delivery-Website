    // src/components/HeroBanner.js
    import React from "react";
    import "./HeroBanner.css";

    export default function HeroBanner() {
    return (
        <section className="hero">
        {/* 🌸 Top Section — Title + Tagline */}
        <div className="hero__content">
            <h1 className="hero__title">
            Kyiv <br />
            <span className="hero__brand">LuxeBouquets<sup>®</sup></span>
            </h1>

            <p className="hero__subtitle">
            Discover Uniquely Crafted Bouquets and Gifts for Any Occasion: <br />
            Spread Joy with Our <em>Online Flower Delivery Service</em>
            </p>
        </div>

        {/* 🌿 Secondary Section — Image + Divider + Paragraph */}
        <div className="hero__image-section">
            {/* Left: Image */}
            <div className="hero__image-wrapper">
            <img
                src="/images/home/hero.jpg"
                alt="Customer enjoying a fresh bouquet"
                className="hero__image"
                loading="lazy"
            />
            </div>

            {/* Middle: Divider */}
            <div className="hero__divider" aria-hidden="true"></div>

            {/* Right: Supporting description */}
            <div className="hero__description">
            <p>
                Experience the joy of giving with our modern floral studio. <br />
                Order online and send fresh flowers, plants, and gifts today.
            </p>
            </div>
        </div>
        </section>
    );
    }
