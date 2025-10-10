        //  Recoding For Stripe
        // src/pages/CheckoutPage.js
    import React, { useEffect, useMemo, useState } from "react";
    import "./CheckoutPage.css";
    import api from "../utils/api";
    import { getCart, updateQty, removeFromCart, clearCart } from "../utils/cart";

    export default function CheckoutPage() {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [email, setEmail] = useState("");

    // Load cart once when the page mounts
    useEffect(() => {
        setCart(getCart());
    }, []);

    const subtotal = useMemo(
        () =>
        cart.reduce(
            (sum, it) => sum + Number(it.price || 0) * (it.quantity || 1),
            0
        ),
        [cart]
    );

    const handleQty = (id, qty) => {
        const next = updateQty(id, qty);
        setCart(next);
    };

    const handleRemove = (id) => {
        const next = removeFromCart(id);
        setCart(next);
    };

    const handleCheckout = async () => {
        if (!cart.length) {
        alert("Your cart is empty.");
        return;
        }

        try {
        // Call your backend to create a Stripe Checkout session
        const { data } = await api.post("/payment/create-checkout-session", {
            items: cart.map((it) => ({
            name: it.name,
            price: Number(it.price),
            quantity: it.quantity || 1,
            image: it.image || "",
            })),
            // Optional: attach shipping/contact for future use
            shipping: { address, city, zip, email },
        });

        if (data?.url) {
            window.location.href = data.url; // redirect to Stripe
        } else {
            alert("Unable to start checkout. Please try again.");
        }
        } catch (err) {
        console.error("Checkout error:", err?.response?.data || err);
        alert(err?.response?.data?.error || "Payment failed to initialize.");
        }
    };

    return (
        <section className="checkout">
        <div className="checkout__container">
            {/* Items */}
            <div className="checkout__items">
            <h2 className="checkout__title">Your Basket</h2>

            {!cart.length ? (
                <p>Your cart is empty.</p>
            ) : (
                cart.map((it) => (
                <div className="checkout__item" key={it._id || it.id}>
                    <img
                    src={it.image || "/images/placeholder.png"}
                    alt={it.name}
                    className="checkout__image"
                    />
                    <div className="checkout__details">
                    <h3 className="checkout__title">{it.name}</h3>
                    <div className="checkout__qty">
                        <button
                        onClick={() =>
                            handleQty(it._id || it.id, (it.quantity || 1) - 1)
                        }
                        aria-label="Decrease quantity"
                        >
                        -
                        </button>
                        <span>{it.quantity || 1}</span>
                        <button
                        onClick={() =>
                            handleQty(it._id || it.id, (it.quantity || 1) + 1)
                        }
                        aria-label="Increase quantity"
                        >
                        +
                        </button>
                    </div>
                    </div>
                    <div className="checkout__price">
                    ${(Number(it.price || 0) * (it.quantity || 1)).toFixed(2)}
                    </div>
                    <button
                    className="checkout__remove"
                    onClick={() => handleRemove(it._id || it.id)}
                    >
                    Remove
                    </button>
                </div>
                ))
            )}

            {cart.length > 0 && (
                <div className="checkout__summary">
                <div className="checkout__row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="checkout__row">
                    <span>Shipping</span>
                    <span className="checkout__shipping-note">
                    Calculated at next step
                    </span>
                </div>
                <div className="checkout__row checkout__total">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                </div>
            )}
            </div>

            {/* Shipping / Contact */}
            <div className="checkout__forms">
            <h2 className="checkout__form-title">Shipping Details</h2>

            <label>
                Address
                <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
            </label>

            <label>
                City
                <input value={city} onChange={(e) => setCity(e.target.value)} />
            </label>

            <label>
                ZIP / Postal Code
                <input value={zip} onChange={(e) => setZip(e.target.value)} />
            </label>

            <label>
                Email
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            <h2 className="checkout__form-title">Payment</h2>
            <p className="checkout__note">
                You will be redirected to a secure Stripe checkout page to complete
                your payment.
            </p>

            <button className="checkout__button payment" onClick={handleCheckout}>
                Pay Securely Now 💳
            </button>

            <button
                className="checkout__button secondary"
                onClick={() => {
                clearCart();
                setCart([]);
                }}
            >
                Clear Cart
            </button>
            </div>
        </div>
        </section>
    );
    }
