    import React from "react";
    import "./CheckoutPage.css";

    export default function CheckoutPage() {
    return (
        <section className="checkout">
        <div className="checkout__container">
            {/* 🛍️ Product Summary */}
            <div className="checkout__item">
            <img
                src="/images/featured/snowfall.png"
                alt="Snowfall Bouquet"
                className="checkout__image"
            />
            <div className="checkout__details">
                <h3 className="checkout__title">Snowfall</h3>
                <p className="checkout__quantity">Quantity (1)</p>
            </div>
            <div className="checkout__price">$100</div>
            </div>

            <hr className="checkout__divider" />

            {/* 💸 Order Summary */}
            <div className="checkout__summary">
            <div className="checkout__row">
                <span>Subtotal</span>
                <span>$100.00</span>
            </div>
            <div className="checkout__row">
                <span>Shipping</span>
                <span className="checkout__shipping-note">
                Calculated at next step
                </span>
            </div>
            <div className="checkout__row checkout__total">
                <span>Total</span>
                <span>$100.00</span>
            </div>
            </div>

            {/* 🔒 Checkout Button */}
            <div className="checkout__footer">
            <button className="checkout__button">
                Secure Checkout <span className="checkout__lock">🔒</span>
            </button>
            </div>
        </div>
        </section>
    );
    }
