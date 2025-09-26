    // src/components/FollowUs.js
    import React from "react";
    import "./FollowUs.css";
    import { FaInstagram, FaPinterest, FaFacebookF, FaTwitter, FaTelegramPlane } from "react-icons/fa";

    export default function FollowUs() {
    return (
        <section className="follow">
        <div className="follow__container">

            {/* 📸 Storefront Image */}
            <div className="follow__image-wrapper">
            <img
                src="/images/home/storefront.png" // ✅ Update this path if needed
                alt="Kyiv LuxeBouquets Storefront"
                className="follow__image"
                loading="lazy"
            />
            </div>

            {/* 📱 Follow us section */}
            <div className="follow__content">
            <h2 className="follow__title">Follow us</h2>

            <div className="follow__icons">
                <a href="#" aria-label="Instagram" className="follow__icon">
                <FaInstagram />
                </a>
                <a href="#" aria-label="Pinterest" className="follow__icon">
                <FaPinterest />
                </a>
                <a href="#" aria-label="Facebook" className="follow__icon">
                <FaFacebookF />
                </a>
                <a href="#" aria-label="Twitter" className="follow__icon">
                <FaTwitter />
                </a>
                <a href="#" aria-label="Telegram" className="follow__icon">
                <FaTelegramPlane />
                </a>
            </div>
            </div>
        </div>
        </section>
    );
    }
