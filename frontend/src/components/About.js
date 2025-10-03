    // src/components/About.js
    import React from "react";
    import "./About.css";

    export default function About() {
    return (
        <section className="about-section" id="about">
        <div className="about-container">
            <h2 className="about-heading">About us</h2>
            <div className="about-content">
            <div className="about-text">
                <h4 className="about-subheading">Our Story</h4>
                <h3 className="about-title">Kyiv LuxeBouquets</h3>
                <p className="about-description">
                We are a modern local floral studio, which specializes in the
                design and delivery of unique bouquets. We have the best florists
                who carefully select each look, our studio cooperates directly
                with farms for growing different flowers, so we always have fresh
                flowers, which are collected by our florists in exquisite
                bouquets. We have a collection of fresh bouquets, collections of
                dried bouquets, house plants, as well as fragrant candles from
                luxury brands to create the perfect atmosphere. Make someone's day
                amazing by sending flowers, plants and gifts the same or next day.
                Ordering flowers online has never been easier.
                </p>
                <button className="about-button">Learn More</button>
            </div>
            </div>
        </div>
        </section>
    );
    }
