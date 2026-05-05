import React, { useContext, useEffect, useState } from "react";
import { Navbar as BSNavbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Search, Cart, Heart } from "react-bootstrap-icons";
import "./Navbar.css";
import { ShopContext } from "../../context/ShopContext";

const AppNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const {getCartCount}= useContext(ShopContext)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <BSNavbar
      className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
      expand="lg"
    >
      <Container>
        <BSNavbar.Brand className="fw-bold text-black">
          COZA <span className="text-secondary fw-medium">STORE</span>
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="main-nav" />

        <BSNavbar.Collapse id="main-nav">
          <Nav className="me-auto ms-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/shop" className="nav-link">Shop</NavLink>

            <NavLink to="/features" className="nav-link position-relative">
              Features
              <span className="hot-badge">HOT</span>
            </NavLink>

            <NavLink to="/blog" className="nav-link">Blog</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
          </Nav>

          <div className="d-flex gap-3 align-items-center">
            <Search className="nav-icon" />
            <NavLink to={"/cart"} className=" cart-container">
            <Cart className="nav-icon" />
              <p>{getCartCount()}</p>
            </NavLink>
            <Heart className="nav-icon" />
          </div>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default AppNavbar;