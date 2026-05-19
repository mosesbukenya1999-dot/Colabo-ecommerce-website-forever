import React, { useContext, useEffect, useState } from "react";
import { Navbar as BSNavbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  Search,
  Cart,
  Heart,
  X,
  HouseDoor,
  Bag,
  Stars,
  Person,
  BoxArrowRight,
} from "react-bootstrap-icons";

import "./Navbar.css";
import { ShopContext } from "../../context/ShopContext";

const AppNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const {
    getCartCount,
    token,
    setToken,
    setCartItems,
    navigate,
    currentUser,
  } = useContext(ShopContext);

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
    <>
      {/* ================= MOBILE TOP BRAND ================= */}
      <div className="mobile-top-brand d-lg-none">
        <NavLink to="/" className="text-decoration-none logo-brand">
          COZA <span className="store-text">STORE</span>
        </NavLink>
      </div>

      {/* ================= DESKTOP NAVBAR ================= */}
      <BSNavbar
        className={`custom-navbar desktop-navbar ${scrolled ? "scrolled" : ""}`}
        expand="lg"
        expanded={expanded}
      >
        <Container>
          {/* BRAND */}
          <BSNavbar.Brand className="fw-bold text-black">
            <NavLink
              to="/"
              className="text-decoration-none text-black logo-brand"
            >
              COZA <span className="fw-medium store-text">STORE</span>
            </NavLink>
          </BSNavbar.Brand>

          {/* TOGGLE */}
          <BSNavbar.Toggle
            aria-controls="main-nav"
            onClick={() => setExpanded(!expanded)}
            className="hamburger"
          />

          <BSNavbar.Collapse id="main-nav">
            {/* CLOSE BUTTON */}
            <div className="mobile-close d-lg-none">
              <X onClick={closeMenu} />
            </div>

            {/* NAV LINKS */}
            <Nav className="me-auto ms-auto nav-links">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                onClick={closeMenu}
              >
                Shop
              </NavLink>
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active-link position-relative"
                    : "nav-link position-relative"
                }
                onClick={closeMenu}
              >
                Features <span className="hot-badge">HOT</span>
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                onClick={closeMenu}
              >
                Blog
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                onClick={closeMenu}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </Nav>

            {/* RIGHT ACTIONS */}
            <div className="nav-actions">
              <Search className="nav-icon" />
              <NavLink to="/cart" className="cart-container" onClick={closeMenu}>
                <Cart className="nav-icon" />
                <p>{getCartCount()}</p>
              </NavLink>
              <Heart className="nav-icon" />

            </div>
          </BSNavbar.Collapse>
              {token && currentUser ? (
                <div className="user-info">
                  <img
                    src={currentUser.profilePic || "/default-avatar.png"}
                    alt={currentUser.name}
                    className="profile-pic"
                  />
                  <span className="user-name ms-3">{currentUser.name}</span>
                  
                </div>
              ) : (
                <NavLink to="/login" className="nav-icon">
                  <Person />
                </NavLink>
              )}
        </Container>
      </BSNavbar>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="mobile-bottom-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "mobile-nav-item mobile-active" : "mobile-nav-item"
          }
        >   
          <HouseDoor className="mobile-bottom-icon" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "mobile-nav-item mobile-active" : "mobile-nav-item"
          }
        >
          <Bag className="mobile-bottom-icon" />
          <span>Shop</span>
        </NavLink>

        <NavLink
          to="/features"
          className={({ isActive }) =>
            isActive ? "mobile-nav-item mobile-active" : "mobile-nav-item"
          }
        >
          <div className="mobile-feature-wrapper">
            <Stars className="mobile-bottom-icon" />
            <small className="mobile-hot-badge">HOT</small>
          </div>
          <span>Features</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "mobile-nav-item mobile-active" : "mobile-nav-item"
          }
        >
          <div className="mobile-cart-wrapper">
            <Cart className="mobile-bottom-icon" />
            <div className="mobile-cart-badge">{getCartCount()}</div>
          </div>
          <span>Cart</span>
        </NavLink>

        {token && currentUser ? (
          <button className="mobile-nav-item logout-btn" onClick={logout}>
            <img
              src={currentUser.profilePic || "/default-avatar.png"}
              alt={currentUser.name}
              className="mobile-profile-pic"
            />
            <span>{currentUser.name}</span>
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "mobile-nav-item mobile-active" : "mobile-nav-item"
            }
          >
            <Person className="mobile-bottom-icon" />
            <span>Login</span>
          </NavLink>
        )}
      </div>
    </>
  );
};

export default AppNavbar; 