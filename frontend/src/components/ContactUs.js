    // src/components/ContactUs.js
    import React, { useState } from "react";
    import "./ContactUs.css";
    import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

    export default function ContactUs() {
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (phone.trim() === "") {
        alert("Please enter a valid phone number");
        return;
        }
        alert(`We will call you back on ${phone}`);
        setPhone("");
    };

    return (
        <section className="contact">
        <div className="contact__container">

            {/* 📞 Call Back Section */}
            <div className="contact__callback">
            <h2 className="contact__title">To Contact Us</h2>
            <p className="contact__subtitle">We will call you back</p>

            <form className="contact__form" onSubmit={handleSubmit}>
                <input
                type="tel"
                placeholder="+380 XX XXX XX XX"
                className="contact__input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit" className="contact__button">
                Book a Call
                </button>
            </form>
            </div>

            {/* ☎️ Phone Numbers */}
            <div className="contact__section">
            <h3 className="contact__heading">Phone</h3>
            <div className="contact__phone-list">
                <div className="contact__phone-item">
                <FaPhoneAlt className="contact__icon" />
                <a href="tel:+380980099777">+380980099777</a>
                </div>
                <div className="contact__phone-item">
                <FaPhoneAlt className="contact__icon" />
                <a href="tel:+380980099111">+380980099111</a>
                </div>
            </div>
            </div>

            {/* 📍 Address */}
            <div className="contact__section">
            <h3 className="contact__heading">Address</h3>
            <p className="contact__hours">Opening hours: 8 to 11 p.m.</p>
            <div className="contact__address">
                <FaMapMarkerAlt className="contact__icon" />
                <p>15/4 Khreshchatyk Street, Kyiv</p>
            </div>
            </div>
        </div>
        </section>
    );
    }
