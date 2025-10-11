        //     // src/components/Navbar.js
        // import React, { useState } from "react";
        // import { Link } from "react-router-dom";
        // import { useAuth } from "../authContext";
        // import { FiShoppingBag } from "react-icons/fi";
        // import "./Navbar.css";

        // export default function Navbar() {
        // const { user, logout, setShowAuth } = useAuth();
        // const [isOpen, setIsOpen] = useState(false);

        // const toggleMenu = () => setIsOpen(!isOpen);
        // const closeMenu = () => setIsOpen(false);

        // return (
        //     <nav className="navbar">
        //     <div className="navbar__container">
        //         {/* Left: Hamburger Menu Button */}
        //         <div
        //         className={`navbar__toggle ${isOpen ? "active" : ""}`}
        //         onClick={toggleMenu}
        //         aria-label="Toggle navigation"
        //         >
        //         <span className="bar"></span>
        //         <span className="bar"></span>
        //         <span className="bar"></span>
        //         </div>

        //         {/* Center: Logo (clickable) */}
        //         <div className="navbar__center">
        //         <Link to="/" className="navbar__logo" onClick={closeMenu}>
        //             {/* Optional logo text or img */}
        //         </Link>
        //         </div>

        //         {/* Right: Cart Icon */}
        //         <div className="navbar__right">
        //         <Link to="/checkout" className="navbar__cart" onClick={closeMenu}>
        //             <FiShoppingBag size={24} />
        //         </Link>
        //         </div>
        //     </div>

        //     {/* Slide-out Menu (Mobile) */}
        //     <ul className={`navbar__menu ${isOpen ? "open" : ""}`}>
        //         <li>
        //         <Link to="/" onClick={closeMenu}>
        //             Home
        //         </Link>
        //         </li>
        //         <li>
        //         <Link to="/category" onClick={closeMenu}>
        //             Categories
        //         </Link>
        //         </li>
        //         {/* ✅ NEW: Product Page */}
        //         <li>
        //         <Link to="/product" onClick={closeMenu}>
        //             Products
        //         </Link>
        //         </li>
        //         <li>
        //         <Link to="/about" onClick={closeMenu}>
        //             About Us
        //         </Link>
        //         </li>
        //         <li>
        //         <Link to="/checkout" onClick={closeMenu}>
        //             Checkout
        //         </Link>
        //         </li>

        //         {/* Auth Button */}
        //         <li className="navbar__auth">
        //         {user ? (
        //             <button
        //             onClick={() => {
        //                 logout();
        //                 closeMenu();
        //             }}
        //             >
        //             Logout
        //             </button>
        //         ) : (
        //             <button
        //             onClick={() => {
        //                 setShowAuth(true);
        //                 closeMenu();
        //             }}
        //             >
        //             Sign In
        //             </button>
        //         )}
        //         </li>
        //     </ul>
        //     </nav>
        // );
        // }

        // src/components/Navbar.js
    import React, { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import { useAuth } from "../authContext";
    import { FiShoppingBag } from "react-icons/fi";
    import { getCart } from "../utils/cart";
    import "./Navbar.css";

    export default function Navbar() {
    const { user, logout, setShowAuth } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    // 🛒 cart badge
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        const update = () => {
        const items = getCart();
        setCartCount(items.reduce((n, it) => n + (it.quantity || 1), 0));
        };
        update();

        // refresh on window focus (returning from other pages / Stripe)
        window.addEventListener("focus", update);

        // refresh when another tab updates localStorage
        const onStorage = (e) => {
        if (e.key === "fdw_cart") update();
        };
        window.addEventListener("storage", onStorage);
        window.addEventListener("cart:updated", update);


        return () => {
        window.removeEventListener("focus", update);
        window.removeEventListener("storage", onStorage);
        window.removeEventListener("cart:updated", update);
        };
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="navbar">
        <div className="navbar__container">
            {/* Left: Hamburger Menu Button */}
            <div
            className={`navbar__toggle ${isOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
            >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
            </div>

            {/* Center: Logo (clickable) */}
            <div className="navbar__center">
            <Link to="/" className="navbar__logo" onClick={closeMenu}>
                {/* Optional logo text or <img src="/logo.svg" alt="Logo" /> */}
            </Link>
            </div>

            {/* Right: Cart Icon + Badge */}
            <div className="navbar__right">
            <Link to="/checkout" className="navbar__cart" onClick={closeMenu} aria-label="Open cart/checkout">
                <FiShoppingBag size={24} />
                {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
            </Link>
            </div>
        </div>

        {/* Slide-out Menu (Mobile) */}
        <ul className={`navbar__menu ${isOpen ? "open" : ""}`}>
            <li>
            <Link to="/" onClick={closeMenu}>
                Home
            </Link>
            </li>
            <li>
            <Link to="/category" onClick={closeMenu}>
                Categories
            </Link>
            </li>
            {/* Product listing page (optional) */}
            <li>
            <Link to="/product" onClick={closeMenu}>
                Products
            </Link>
            </li>
            <li>
            <Link to="/about" onClick={closeMenu}>
                About Us
            </Link>
            </li>
            <li>
            <Link to="/checkout" onClick={closeMenu}>
                Checkout
            </Link>
            </li>

            {/* Auth Button */}
            <li className="navbar__auth">
            {user ? (
                <button
                onClick={() => {
                    logout();
                    closeMenu();
                }}
                className="btn btn--ghost"
                >
                Logout
                </button>
            ) : (
                <button
                onClick={() => {
                    setShowAuth(true);
                    closeMenu();
                }}
                className="btn btn--primary"
                >
                Sign In
                </button>
            )}
            </li>
        </ul>
        </nav>
    );
    }
