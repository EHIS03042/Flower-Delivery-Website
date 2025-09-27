    // src/pages/AboutUsPage.js
    import React from "react";
    import "./AboutUsPage.css";
    import { FaInstagram, FaPinterest, FaFacebookF, FaTwitter } from "react-icons/fa";

    export default function AboutUsPage() {
    return (
        <section className="aboutus">
        {/* ===== HERO SECTION ===== */}
        <div className="aboutus-hero">
            <h2 className="aboutus-heading">Our Story <br />About </h2>
            <h1 className="aboutus-title">Kyiv LuxeBouquets</h1>
            <p className="aboutus-subtitle">
            Discover uniquely crafted bouquets and gifts for any occasion. Spread joy with our
            <strong> Online Flower Delivery Service.</strong>
            </p>

            <div className="social-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaPinterest /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            </div>
        </div>

        {/* ===== FOUNDER SECTION ===== */}
        <div className="aboutus-section">
            <img src="/images/about/founder.png" alt="Founder" className="aboutus-img" />
            <div className="aboutus-text">
            <h3>Our Founder’s Passion</h3>
            <p>
                Kyiv LuxeBouquets was founded in 2010 by Nataliia Zelenko with the goal of bringing unique
                and bespoke floral creations to the people of Kyiv. Nataliia has always had a passion for
                flowers and design, and she wanted to create a local brand that would reflect her vision of
                beautiful and timeless bouquets.
            </p>
            </div>
        </div>

        {/* ===== CRAFTED BOUQUETS ===== */}
        <div className="aboutus-section reverse">
            <img src="/images/about/bouquets.png" alt="Bouquets" className="aboutus-img" />
            <div className="aboutus-text">
            <h3>Expertly Crafted Bouquets</h3>
            <p>
                At Kyiv LuxeBouquets, we take pride in our team of talented and experienced florists who
                carefully select each bloom, ensuring that only the freshest and most stunning flowers make
                it into our bouquets. We work directly with farms to source the highest quality flowers, and
                our skilled florists expertly craft each bouquet to perfection.
            </p>
            </div>
        </div>

        {/* ===== GIFTS & AMBIENCE ===== */}
        <div className="aboutus-section">
            <img src="/images/about/ambience.png" alt="Ambience" className="aboutus-img" />
            <div className="aboutus-text">
            <h3>Bouquets, Gifts & Ambiance</h3>
            <p>
                In addition to our stunning bouquets, we also offer curated gift collections, house plants,
                and fragrant candles from luxury brands to create the perfect ambiance. We believe that
                sending flowers, plants, and gifts should be easy and stress-free, which is why we offer same
                or next-day delivery throughout Kyiv.
            </p>
            </div>
        </div>

        {/* ===== DAILY IMPACT ===== */}
        <div className="aboutus-section reverse">
            <img src="/images/about/everyday.png" alt="Making Everyday Special" className="aboutus-img" />
            <div className="aboutus-text">
            <h3>Making Every Day Special</h3>
            <p>
                Our mission is simple: to make every day special and memorable for our customers. We are
                dedicated to providing the highest quality flowers, exceptional customer service, and a
                seamless ordering experience that will give you full confidence and satisfaction with your
                LuxeBouquets. We aim to brighten your surroundings and bring joy and happiness to your life
                with our beautiful bouquets and gifts.
            </p>
            </div>
        </div>

        {/* ===== CTA SECTION ===== */}
        <div className="aboutus-cta">
            <h2>Discover Our Beautiful Bouquets</h2>
            <p>
            Explore our collection of exquisite bouquets and surprise your loved ones with the perfect
            gift. Click the button below to start shopping.
            </p>
            <button className="cta-btn">Shop Now</button>
        </div>
        </section>
    );
    }
