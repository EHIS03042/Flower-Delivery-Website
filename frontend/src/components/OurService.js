    // src/components/OurService.js
    import React from "react";
    import "./OurService.css";

    export default function OurService() {
    return (
        <section className="service">
        <div className="service__container">
            <h2 className="service__heading">Our Service</h2>

            {/* 🌸 Flower Subscriptions */}
            <div className="service__card">
            <div className="service__image-wrapper">
                <img
                src="/images/home/flower-subscription.png"
                alt="Flower Subscription"
                className="service__image"
                />
            </div>
            <div className="service__content">
                <p className="service__label">Service</p>
                <h3 className="service__title">Flower Subscriptions</h3>
                <p className="service__text">
                Experience the convenience and savings of regular flower deliveries
                with our flexible subscription service – up to 30% more profitable
                than one-time purchases.
                </p>
                <button className="service__button">Subscribe Now</button>
            </div>
            </div>

            {/* 💒 Wedding & Event Decor */}
            <div className="service__card service__card--overlay">
            <div className="service__image-wrapper">
                <img
                src="/images/home/wedding-decor.png"
                alt="Wedding & Event Decor"
                className="service__image"
                />
                <div className="service__overlay">
                <p className="service__label service__label--light">Service</p>
                <h3 className="service__title service__title--light">
                    Wedding & Event Decor
                </h3>
                <p className="service__text service__text--light">
                    Let our team of expert florists and designers create stunning,
                    on-trend floral décor for your special day. Trust us to bring
                    your vision to life.
                </p>
                <button className="service__button service__button--light">
                    Inquire Now
                </button>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
    }
