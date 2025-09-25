    // CheckoutPage.js (STEP 1 Only)
    import React, { useContext, useState } from "react";
    import { AuthContext } from "../authContext";

    export default function CheckoutPage() {
    const { token, setShowAuth } = useContext(AuthContext);
    const [form, setForm] = useState({ name:"", email:"", address:"", city:"", phone:"" });

    if (!token) {
        return (
        <section className="section">
            <h1 className="title">Checkout</h1>
            <p className="muted">Please sign in to continue.</p>
            <button className="btn btn--primary" onClick={() => setShowAuth(true)}>Sign in</button>
        </section>
        );
    }

    const submit = (e) => {
        e.preventDefault();
        alert("STEP 1 (shipping details) captured. To be continued in next milestones.");
    };

    return (
        <section className="section">
        <h1 className="title">Checkout – Shipping Details</h1>
        <form className="form" onSubmit={submit}>
            <input placeholder="Full Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
            <input placeholder="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
            <div className="form__row">
            <input placeholder="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
            <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            </div>
            <button className="btn btn--primary">Continue</button>
        </form>
        </section>
    );
    }
