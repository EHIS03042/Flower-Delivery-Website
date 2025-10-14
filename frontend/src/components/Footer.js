    // src/components/Footer.js
    import React from "react";
    import "./Footer.css";
    import { FaInstagram, FaPinterestP, FaFacebookF, FaTwitter, FaTelegramPlane } from "react-icons/fa";

    export default function Footer() {
    return (
        <footer className="footer">
        {/* === Reminder Section === */}
        <div className="footer__reminder">
            <p className="footer__reminder-text">
            Remember to offer beautiful flowers from Kyiv LuxeBouquets Valentines Day, Mothers Day, Christmas…
            <br />
            Reminds you 7 days before. No spam or sharing your address
            </p>
            <form className="footer__form">
            <input
                type="email"
                placeholder="Your Email"
                className="footer__input"
            />
            <button type="submit" className="footer__button">Remind</button>
            </form>
        </div>

        <div className="footer__grid">
            {/* === Contact Info === */}
            <div className="footer__column">
            <h3 className="footer__title">Contact Us</h3>
            <p className="footer__info"><strong>Address:</strong><br />15/4 Khreshchatyk Street, Kyiv</p>
            <p className="footer__info"><strong>Phone:</strong><br />+380980099777</p>
            <p className="footer__info"><strong>General Enquiry:</strong><br />Kiev.Florist.Studio@gmail.com</p>

            <h4 className="footer__subtitle">Follow Us</h4>
            <div className="footer__socials">
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaPinterestP /></a>
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaTelegramPlane /></a>
            </div>
            </div>

            {/* === Shop Links === */}
            <div className="footer__column">
            <h3 className="footer__title">Shop</h3>
            <ul className="footer__links">
                <li><a href="#">All Products</a></li>
                <li><a href="#">Fresh Flowers</a></li>
                <li><a href="#">Dried Flowers</a></li>
                <li><a href="#">Live Plants</a></li>
                <li><a href="#">Designer Vases</a></li>
                <li><a href="#">Aroma Candles</a></li>
                <li><a href="#">Freshener Diffuser</a></li>
            </ul>

            <h4 className="footer__subtitle">Service</h4>
            <ul className="footer__links">
                <li><a href="#">Flower Subscription</a></li>
                <li><a href="#">Wedding & Event Decor</a></li>
            </ul>
            </div>

            {/* === About Links === */}
            <div className="footer__column">
            <h3 className="footer__title">About Us</h3>
            <ul className="footer__links">
                <li><a href="#">Our story</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Shipping & returns</a></li>
                <li><a href="#">Terms & conditions</a></li>
                <li><a href="#">Privacy policy</a></li>
            </ul>
            </div>
        </div>
        </footer>
    );
    }
