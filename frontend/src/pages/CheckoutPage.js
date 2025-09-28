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
    import axios from "axios";
    import "./CheckoutPage.css";

    export default function CheckoutPage() {
    // ✅ Sample cart data — replace with actual state/context if available
    const [cartItems, setCartItems] = useState([
        {
        name: "Snowfall",
        price: 100,
        quantity: 1,
        image: "/images/featured/snowfall.png",
        },
    ]);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [email, setEmail] = useState("");

    // ✅ Stripe checkout handler
    const handleCheckout = async () => {
        try {
        console.log("✅ API URL:", process.env.REACT_APP_API_URL); // Optional: check value
        const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/create-checkout-session`,
        { items: cartItems }
        );

        
        if (data?.url) {
            window.location.href = data.url; // ✅ Redirect to Stripe checkout
        } else {
            alert("Payment session could not be created. Please try again.");
        }
        } catch (error) {
        console.error("❌ Checkout error:", error.message);
        alert("Something went wrong with the payment. Please try again.");
        }
    };

    return (
        <section className="checkout">
        <div className="checkout__container">
            {/* 🛍️ Step 1: Order Summary */}
            <div className="checkout__item">
            <img
                src={cartItems[0].image}
                alt={cartItems[0].name}
                className="checkout__image"
            />
            <div className="checkout__details">
                <h3 className="checkout__title">{cartItems[0].name}</h3>
                <p className="checkout__quantity">
                Quantity ({cartItems[0].quantity})
                </p>
            </div>
            <div className="checkout__price">${cartItems[0].price}</div>
            </div>

            <hr className="checkout__divider" />

            {/* 💸 Order Summary */}
            <div className="checkout__summary">
            <div className="checkout__row">
                <span>Subtotal</span>
                <span>${cartItems[0].price}</span>
            </div>
            <div className="checkout__row">
                <span>Shipping</span>
                <span className="checkout__shipping-note">
                Calculated at next step
                </span>
            </div>
            <div className="checkout__row checkout__total">
                <span>Total</span>
                <span>${cartItems[0].price}</span>
            </div>
            </div>

            <div className="checkout__footer">
            <button className="checkout__button">Secure Checkout 🔒</button>
            </div>

            {/* 📦 Step 2: Shipping Details */}
            <div className="checkout__form">
            <h2 className="checkout__form-title">Shipping Details</h2>

            <label>
                Address
                <input
                type="text"
                placeholder="123 Flower Street"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />
            </label>

            <label>
                City
                <input
                type="text"
                placeholder="Bloomville"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                />
            </label>

            <label>
                ZIP / Postal Code
                <input
                type="text"
                placeholder="12345"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
                />
            </label>

            <label>
                Email Address
                <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
            </div>

            {/* 💳 Step 3: Payment Section */}
            <div className="checkout__payment">
            <h2 className="checkout__form-title">Payment</h2>
            <p className="checkout__note">
                You will be redirected to a secure Stripe checkout page to complete
                your payment.
            </p>

            <button className="checkout__button payment" onClick={handleCheckout}>
                Pay Securely Now 💳
            </button>
            </div>
        </div>
        </section>
    );
    }
