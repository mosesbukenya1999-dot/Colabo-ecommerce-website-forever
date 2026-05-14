import React, { useContext, useEffect, useState } from "react";
import { Navbar as BSNavbar, Nav, Container } from "react-bootstrap";
import { Search, Cart, Heart, X } from "react-bootstrap-icons";
import "./Navbar.css";
import { ShopContext } from "../../context/ShopContext";

const AppNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { getCartCount, token, setToken, setCartItems, navigate } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setExpanded(false);

  return (
    <BSNavbar
      className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
      expand="lg"
      expanded={expanded}
    >
      <Container>
        {/* BRAND */}
        <BSNavbar.Brand className="fw-bold text-black">
          <a href="/" className="text-decoration-none text-black">
            COZA <span className="fw-medium store-text">STORE</span>
          </a>
        </BSNavbar.Brand>

        {/* CART (MOBILE) */}
        <a href="/cart" className="cart-container d-md-none" onClick={closeMenu}>
          <Cart className="nav-icon text-secondary" />
          <p>{getCartCount()}</p>
        </a>

        {/* TOGGLE */}
        <BSNavbar.Toggle
          aria-controls="main-nav"
          onClick={() => setExpanded(!expanded)}
          className="hamburger"
        />

        <BSNavbar.Collapse id="main-nav">
          {/* CLOSE BUTTON (MOBILE ONLY) */}
          <div className="mobile-close d-lg-none">
            <X onClick={closeMenu} />
          </div>

          {/* NAV LINKS */}
          <Nav className="me-auto ms-auto nav-links">
            <a href="/" className="nav-link" onClick={closeMenu}>Home</a>
            <a href="/shop" className="nav-link" onClick={closeMenu}>Shop</a>
            <a href="/features" className="nav-link position-relative" onClick={closeMenu}>
              Features
              <span className="hot-badge">HOT</span>
            </a>
            <a href="/blog" className="nav-link" onClick={closeMenu}>Blog</a>
            <a href="/about" className="nav-link" onClick={closeMenu}>About</a>
            <a href="/contact" className="nav-link" onClick={closeMenu}>Contact</a>
          </Nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="nav-actions">
            <Search className="nav-icon" />

            {/* CART */}
            <a href="/cart" className="cart-container" onClick={closeMenu}>
              <Cart className="nav-icon" />
              <p>{getCartCount()}</p>
            </a>

            <Heart className="nav-icon" />

            {/* LOGIN / LOGOUT (MOBILE) */}
            {token === "" ? (
              <a href="/login" className="mobile-login-btn d-lg-none" onClick={closeMenu}>
                Login
              </a>
            ) : (
              <a href="/login" className="mobile-login-btn d-lg-none" onClick={logout}>
                Logout
              </a>
            )}
          </div>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default AppNavbar;