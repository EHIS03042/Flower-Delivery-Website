            // import React from "react";
            // import "./CheckoutPage.css";

            // export default function CheckoutPage() {
            // return (
            //     <section className="checkout">
            //     <div className="checkout__container">
            //         {/* 🛍️ Product Summary */}
            //         <div className="checkout__item">
            //         <img
            //             src="/images/featured/snowfall.png"
            //             alt="Snowfall Bouquet"
            //             className="checkout__image"
            //         />
            //         <div className="checkout__details">
            //             <h3 className="checkout__title">Snowfall</h3>
            //             <p className="checkout__quantity">Quantity (1)</p>
            //         </div>
            //         <div className="checkout__price">$100</div>
            //         </div>

            //         <hr className="checkout__divider" />

            //         {/* 💸 Order Summary */}
            //         <div className="checkout__summary">
            //         <div className="checkout__row">
            //             <span>Subtotal</span>
            //             <span>$100.00</span>
            //         </div>
            //         <div className="checkout__row">
            //             <span>Shipping</span>
            //             <span className="checkout__shipping-note">
            //             Calculated at next step
            //             </span>
            //         </div>
            //         <div className="checkout__row checkout__total">
            //             <span>Total</span>
            //             <span>$100.00</span>
            //         </div>
            //         </div>

            //         {/* 🔒 Checkout Button */}
            //         <div className="checkout__footer">
            //         <button className="checkout__button">
            //             Secure Checkout <span className="checkout__lock">🔒</span>
            //         </button>
            //         </div>
            //     </div>
            //     </section>
            // );
            // }

            // Full Checkout.js Code(Step 1_Cart Summary, Step 2_Shipping Details, Step 3_Payment Platform)
            // src/pages/CheckoutPage.js
        // import React, { useState } from "react";
        // import "./CheckoutPage.css";

        // export default function CheckoutPage() {
        // const [step, setStep] = useState(1);

        // // 📦 Shipping state
        // const [shipping, setShipping] = useState({
        //     fullName: "",
        //     email: "",
        //     phone: "",
        //     address: "",
        //     city: "",
        //     zip: "",
        //     country: "",
        // });

        // // 💳 Payment state
        // const [payment, setPayment] = useState({
        //     cardName: "",
        //     cardNumber: "",
        //     expiry: "",
        //     cvv: "",
        // });

        // const handleShippingChange = (e) => {
        //     const { name, value } = e.target;
        //     setShipping({ ...shipping, [name]: value });
        // };

        // const handlePaymentChange = (e) => {
        //     const { name, value } = e.target;
        //     setPayment({ ...payment, [name]: value });
        // };

        // const nextStep = () => setStep(step + 1);
        // const prevStep = () => setStep(step - 1);

        // return (
        //     <section className="checkout">
        //     <div className="checkout__container">

        //         {/* 📊 Step Indicator */}
        //         <div className="checkout__steps">
        //         <div className={`step ${step >= 1 ? "active" : ""}`}>1. Review</div>
        //         <div className={`step ${step >= 2 ? "active" : ""}`}>2. Shipping</div>
        //         <div className={`step ${step >= 3 ? "active" : ""}`}>3. Payment</div>
        //         </div>

        //         {/* 🥇 STEP 1: Order Summary */}
        //         {step === 1 && (
        //         <>
        //             <div className="checkout__item">
        //             <img
        //                 src="/images/featured/snowfall.png"
        //                 alt="Snowfall Bouquet"
        //                 className="checkout__image"
        //             />
        //             <div className="checkout__details">
        //                 <h3 className="checkout__title">Snowfall</h3>
        //                 <p className="checkout__quantity">Quantity (1)</p>
        //             </div>
        //             <div className="checkout__price">$100</div>
        //             </div>

        //             <hr className="checkout__divider" />

        //             <div className="checkout__summary">
        //             <div className="checkout__row">
        //                 <span>Subtotal</span>
        //                 <span>$100.00</span>
        //             </div>
        //             <div className="checkout__row">
        //                 <span>Shipping</span>
        //                 <span className="checkout__shipping-note">
        //                 Calculated at next step
        //                 </span>
        //             </div>
        //             <div className="checkout__row checkout__total">
        //                 <span>Total</span>
        //                 <span>$100.00</span>
        //             </div>
        //             </div>

        //             <div className="checkout__footer">
        //             <button className="checkout__button" onClick={nextStep}>
        //                 Secure Checkout <span className="checkout__lock">🔒</span>
        //             </button>
        //             </div>
        //         </>
        //         )}

        //         {/* 🥈 STEP 2: Shipping Information */}
        //         {step === 2 && (
        //         <div className="checkout-form">
        //             <h2 className="checkout-title">Shipping Information</h2>
        //             <form>
        //             <label>
        //                 Full Name
        //                 <input
        //                 type="text"
        //                 name="fullName"
        //                 value={shipping.fullName}
        //                 onChange={handleShippingChange}
        //                 />
        //             </label>
        //             <label>
        //                 Email
        //                 <input
        //                 type="email"
        //                 name="email"
        //                 value={shipping.email}
        //                 onChange={handleShippingChange}
        //                 />
        //             </label>
        //             <label>
        //                 Phone
        //                 <input
        //                 type="tel"
        //                 name="phone"
        //                 value={shipping.phone}
        //                 onChange={handleShippingChange}
        //                 />
        //             </label>
        //             <label>
        //                 Address
        //                 <input
        //                 type="text"
        //                 name="address"
        //                 value={shipping.address}
        //                 onChange={handleShippingChange}
        //                 />
        //             </label>
        //             <div className="row">
        //                 <label>
        //                 City
        //                 <input
        //                     type="text"
        //                     name="city"
        //                     value={shipping.city}
        //                     onChange={handleShippingChange}
        //                 />
        //                 </label>
        //                 <label>
        //                 Zip Code
        //                 <input
        //                     type="text"
        //                     name="zip"
        //                     value={shipping.zip}
        //                     onChange={handleShippingChange}
        //                 />
        //                 </label>
        //             </div>
        //             <label>
        //                 Country
        //                 <input
        //                 type="text"
        //                 name="country"
        //                 value={shipping.country}
        //                 onChange={handleShippingChange}
        //                 />
        //             </label>
        //             </form>

        //             <div className="checkout-actions">
        //             <button onClick={prevStep} className="btn-secondary">
        //                 Back
        //             </button>
        //             <button onClick={nextStep} className="btn-primary">
        //                 Continue to Payment
        //             </button>
        //             </div>
        //         </div>
        //         )}

        //         {/* 🥉 STEP 3: Payment */}
        //         {step === 3 && (
        //         <div className="checkout-form">
        //             <h2 className="checkout-title">Payment Details</h2>
        //             <form>
        //             <label>
        //                 Name on Card
        //                 <input
        //                 type="text"
        //                 name="cardName"
        //                 value={payment.cardName}
        //                 onChange={handlePaymentChange}
        //                 />
        //             </label>
        //             <label>
        //                 Card Number
        //                 <input
        //                 type="text"
        //                 name="cardNumber"
        //                 value={payment.cardNumber}
        //                 onChange={handlePaymentChange}
        //                 />
        //             </label>
        //             <div className="row">
        //                 <label>
        //                 Expiry Date
        //                 <input
        //                     type="text"
        //                     name="expiry"
        //                     placeholder="MM/YY"
        //                     value={payment.expiry}
        //                     onChange={handlePaymentChange}
        //                 />
        //                 </label>
        //                 <label>
        //                 CVV
        //                 <input
        //                     type="password"
        //                     name="cvv"
        //                     value={payment.cvv}
        //                     onChange={handlePaymentChange}
        //                 />
        //                 </label>
        //             </div>
        //             </form>

        //             <div className="checkout-actions">
        //             <button onClick={prevStep} className="btn-secondary">
        //                 Back
        //             </button>
        //             <button
        //                 onClick={() => alert("✅ Order placed successfully!")}
        //                 className="btn-primary"
        //             >
        //                 Complete Order
        //             </button>
        //             </div>
        //         </div>
        //         )}
        //     </div>
        //     </section>
        // );
        // }
    //  Recoding For Stripe
        // src/pages/CheckoutPage.js
    import React, { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { loadStripe } from "@stripe/stripe-js";
    import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
    import "./CheckoutPage.css";

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    export default function CheckoutPage() {
    return (
        <Elements stripe={stripePromise}>
        <Checkout />
        </Elements>
    );
    }

    function Checkout() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    // 🔥 Simulated cart item - replace with real cart data
    const cart = [
        { id: 1, name: "Snowfall", price: 100, quantity: 1, image: "/images/featured/snowfall.png" },
    ];

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setError(null);

        try {
        // 🔥 1. Create payment session from backend
        const response = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart }),
        });

        const { clientSecret } = await response.json();

        // 🔥 2. Confirm payment on frontend
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
            card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            console.error(result.error.message);
            setError(result.error.message);
            navigate("/cart"); // ❌ Redirect to Cart if payment fails
        } else if (result.paymentIntent.status === "succeeded") {
            localStorage.removeItem("cart"); // ✅ Clear cart
            navigate("/"); // ✅ Redirect to Home
        }
        } catch (err) {
        console.error("Payment failed:", err);
        setError("Payment failed. Please try again.");
        navigate("/cart");
        } finally {
        setIsProcessing(false);
        }
    };

    return (
        <section className="checkout">
        <div className="checkout__container">

            {/* 🛍️ Step 1: Order Summary */}
            {cart.map((item) => (
            <div className="checkout__item" key={item.id}>
                <img src={item.image} alt={item.name} className="checkout__image" />
                <div className="checkout__details">
                <h3 className="checkout__title">{item.name}</h3>
                <p className="checkout__quantity">Quantity ({item.quantity})</p>
                </div>
                <div className="checkout__price">${item.price}</div>
            </div>
            ))}

            <hr className="checkout__divider" />

            {/* 💸 Step 2: Summary */}
            <div className="checkout__summary">
            <div className="checkout__row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <div className="checkout__row">
                <span>Shipping</span>
                <span className="checkout__shipping-note">Calculated at next step</span>
            </div>
            <div className="checkout__row checkout__total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
            </div>

            {/* 💳 Step 3: Payment Form */}
            <form className="checkout__payment" onSubmit={handlePayment}>
            <h2 className="checkout__section-title">Payment Information</h2>
            <CardElement className="checkout__card-element" />
            {error && <p className="checkout__error">{error}</p>}

            <button
                type="submit"
                className="checkout__button"
                disabled={!stripe || isProcessing}
            >
                {isProcessing ? "Processing..." : "Pay Now 🔒"}
            </button>
            </form>
        </div>
        </section>
    );
    }
