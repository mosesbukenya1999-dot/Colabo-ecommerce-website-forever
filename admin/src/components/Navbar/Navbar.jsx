import React from "react";
import {
  BsHouseDoor,
  BsBag,
  BsStars,
  BsPerson,
  BsCart,
  BsBoxArrowRight,
} from "react-icons/bs";
import "./Navbar.css";

const Navbar = ({ token, logout }) => {
  const navItems = [
    { name: "Add Product", icon: <BsHouseDoor />, href: "/" },
    { name: "List Products", icon: <BsBag />, href: "/list" },
    { name: "Orders", icon: <BsStars />, href: "/orders" },
    { name: "Customers", icon: <BsCart />, href: "/customers" },
    token
      ? { name: "Logout", icon: <BsBoxArrowRight />, href: "/login", action: logout }
      : { name: "Login", icon: <BsPerson />, href: "/login" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sidebar d-none d-lg-flex flex-column">
        <div className="sidebar-brand">COZA <span className=" text-secondary">STORE</span></div>
        <nav className="sidebar-nav">
          {navItems.map((item) =>
            item.action ? (
              <button
                key={item.name}
                className="sidebar-link logout-btn"
                onClick={item.action}
              >
                <div className="icon">{item.icon}</div>
                <span className="link-text">{item.name}</span>
              </button>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className={`sidebar-link ${
                  window.location.pathname === item.href ? "active-link" : ""
                }`}
              >
                <div className="icon">{item.icon}</div>
                <span className="link-text">{item.name}</span>
              </a>
            )
          )}
        </nav>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="mobile-bottom-nav d-flex d-lg-none">
        {navItems.map((item) =>
          item.action ? (
            <button
              key={item.name}
              className="mobile-nav-item"
              onClick={item.action}
            >
              <div className="icon">{item.icon}</div>
              <span className="link-text">{item.name}</span>
            </button>
          ) : (
            <a
              key={item.name}
              href={item.href}
              className={`mobile-nav-item ${
                window.location.pathname === item.href ? "mobile-active" : ""
              }`}
            >
              <div className="icon">{item.icon}</div>
              <span className="link-text">{item.name}</span>
            </a>
          )
        )}
      </div>
    </>
  );
};

export default Navbar;