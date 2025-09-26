    // src/components/Testimonials.js
    import React from "react";
    import "./Testimonials.css";

    export default function Testimonials() {
    return (
        <section className="testimonials">
        <div className="testimonials__container">
            {/* Google Reviews Label */}
            <div className="testimonials__label">
            <img
                src="/images/home/google-logo.png"
                
                alt="Google Reviews"
                className="testimonials__logo"
            />
            <p className="testimonials__subtitle">Reviews</p>
            </div>

            {/* Heading */}
            <h2 className="testimonials__heading">Our Clients say</h2>

            {/* Quote */}
            <blockquote className="testimonials__quote">
            “Ordered flowers online and they were the best bouquet! Impressed
            everyone around. Highly recommend this flower shop!”
            </blockquote>

            {/* Author */}
            <p className="testimonials__author">– Ronald Richards</p>

            {/* Carousel Dots (static for now) */}
            <div className="testimonials__dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            </div>

            {/* CTA */}
            <button className="testimonials__button">Read Reviews</button>
        </div>
        </section>
    );
    }
