    import React from "react";
    import "./Footer.css";

    export default function Footer() {
    return (
        <footer className="footer">
        <div className="footer__inner">
            <div>© {new Date().getFullYear()} FlowerHub</div>
            <nav className="footer__links">
            <a href="/about">About</a>
            <a href="/category/fresh">Shop</a>
            <a href="/checkout">Checkout</a>
            </nav>
        </div>
        </footer>
    );
    }
