    import React, { useContext, useState } from "react";
    import { Link, NavLink } from "react-router-dom";
    import { AuthContext } from "../authContext";
    import "./Navbar.css";

    export default function Navbar() {
    const { token, logout, setShowAuth } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    return (
        <header className="nav">
        <div className="nav__inner">
            <Link to="/" className="nav__brand">Flower<span>Hub</span></Link>

            <nav className={`nav__links ${open ? "is-open" : ""}`}>
            <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/category/fresh" onClick={() => setOpen(false)}>Category</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/checkout" onClick={() => setOpen(false)}>Checkout</NavLink>
            {!token ? (
                <button className="btn btn--primary" onClick={() => { setOpen(false); setShowAuth(true); }}>
                Sign in / Sign up
                </button>
            ) : (
                <button className="btn" onClick={() => { setOpen(false); logout(); }}>Sign out</button>
            )}
            </nav>

            <button className="nav__toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
        </div>
        </header>
    );
    }
