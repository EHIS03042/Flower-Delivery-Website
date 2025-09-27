        // // src/components/NavBar.js
        // import React, { useState } from "react";
        // import { Link } from "react-router-dom";
        // import { useAuth } from "../authContext";
        // import { FiShoppingBag } from "react-icons/fi";
        // import "./Navbar.css";

        // export default function NavBar() {
        // const { user, logout, setShowAuth } = useAuth();
        // const [isOpen, setIsOpen] = useState(false);

        // const toggleMenu = () => setIsOpen(!isOpen);
        // const closeMenu = () => setIsOpen(false);

        // return (
        //     <nav className="navbar">
        //     <div className="navbar__container">

        //         {/* Left: Hamburger */}
        //         <div
        //         className={`navbar__toggle ${isOpen ? "active" : ""}`}
        //         onClick={toggleMenu}
        //         aria-label="Toggle navigation"
        //         >
        //         <span className="bar"></span>
        //         <span className="bar"></span>
        //         <span className="bar"></span>
        //         </div>

        //         {/* Middle: optional logo / blank center */}
        //         <div className="navbar__center">
        //         <Link to="/" className="navbar__logo" onClick={closeMenu}>
        //             {/* Could also leave blank if design requires */}
        //         </Link>
        //         </div>

        //         {/* Right: Cart / Bag */}
        //         <div className="navbar__right">
        //         <Link to="/checkout" className="navbar__cart" onClick={closeMenu}>
        //             <FiShoppingBag size={24} />
        //         </Link>
        //         </div>
        //     </div>

        //     {/* Slide-Out Menu */}
        //     <ul className={`navbar__menu ${isOpen ? "open" : ""}`}>
        //         <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        //         <li><Link to="/category" onClick={closeMenu}>Categories</Link></li>
        //         <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
        //         <li><Link to="/checkout" onClick={closeMenu}>Checkout</Link></li>
        //         <li className="navbar__auth">
        //         {user ? (
        //             <button onClick={() => { logout(); closeMenu(); }}>Logout</button>
        //         ) : (
        //             <button onClick={() => { setShowAuth(true); closeMenu(); }}>Sign In</button>
        //         )}
        //         </li>
        //     </ul>
        //     </nav>
        // );
        // }

        // ReCode
        // src/components/Navbar.js
    import React, { useState } from "react";
    import { Link } from "react-router-dom";
    import { useAuth } from "../authContext";
    import { FiShoppingBag } from "react-icons/fi";
    import "./Navbar.css";

    export default function Navbar() {
    const { user, logout, setShowAuth } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

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
            >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
            </div>

            {/* Center: Logo (clickable) */}
            <div className="navbar__center">
            <Link to="/" className="navbar__logo" onClick={closeMenu}>
                {/* Optional logo text or img */}
            </Link>
            </div>

            {/* Right: Cart Icon */}
            <div className="navbar__right">
            <Link to="/checkout" className="navbar__cart" onClick={closeMenu}>
                <FiShoppingBag size={24} />
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
            {/* ✅ NEW: Product Page */}
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
                >
                Logout
                </button>
            ) : (
                <button
                onClick={() => {
                    setShowAuth(true);
                    closeMenu();
                }}
                >
                Sign In
                </button>
            )}
            </li>
        </ul>
        </nav>
    );
    }
