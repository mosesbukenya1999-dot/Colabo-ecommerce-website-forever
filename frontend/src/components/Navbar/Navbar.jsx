import React, { useContext, useEffect, useState } from "react";
import { Navbar as BSNavbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Search, Cart, Heart, X } from "react-bootstrap-icons";
import "./Navbar.css";
import { ShopContext } from "../../context/ShopContext";

const AppNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { getCartCount,token,setToken,setCartItems,navigate } = useContext(ShopContext);

  const logout = ()=> {
    navigate("/login")
    localStorage.removeItem("token")
    setToken("");
    setCartItems({});
  }

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
          COZA <span className=" fw-medium store-text">STORE</span>
        </BSNavbar.Brand>

        {/* CART */}
        <NavLink to="/cart" className="cart-container d-md-none" onClick={closeMenu}>
              <Cart className="nav-icon text-secondary" />
              <p className="">{getCartCount()}</p>
        </NavLink>

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

            <NavLink to="/" className="nav-link" onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink to="/shop" className="nav-link" onClick={closeMenu}>
              Shop
            </NavLink>

            <NavLink to="/features" className="nav-link position-relative" onClick={closeMenu}>
              Features
              <span className="hot-badge">HOT</span>
            </NavLink>

            <NavLink to="/blog" className="nav-link" onClick={closeMenu}>
              Blog
            </NavLink>

            <NavLink to="/about" className="nav-link" onClick={closeMenu}>
              About
            </NavLink>

            <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
              Contact
            </NavLink>
          </Nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="nav-actions">

            <Search className="nav-icon" />

            {/* CART */}
            <NavLink to="/cart" className="cart-container" onClick={closeMenu}>
              <Cart className="nav-icon" />
              <p>{getCartCount()}</p>
            </NavLink>

            <Heart className="nav-icon" />

            {/* 🔐 LOGIN (ONLY MOBILE) */}

              {
                token=== ""? 
            <NavLink
              to="/login"
              className="mobile-login-btn d-lg-none"
              onClick={closeMenu}
            >
              Login
            </NavLink>
                : (
                  <NavLink
              to="/login"
              className="mobile-login-btn d-lg-none"
              onClick={logout}
            >
              Logout
            </NavLink>
                )
              }


          </div>

        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default AppNavbar;