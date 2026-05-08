import React from "react";
import { Navbar as BSNavbar } from "react-bootstrap";
import blog_one from "../../assets/blog_1.png";
import blog_two from "../../assets/blog_2.jpg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-light shadow-sm mt-5">
      <div className="container py-5">
        <div className="row gx-4 gy-4">
          {/* Logo & Description */}
          <div className="col-12 col-md-6 col-lg-3">
            <BSNavbar.Brand className="fw-bold text-black fs-3">
              COZA <span className="fw-medium store-text">STORE</span>
            </BSNavbar.Brand>
            <p className="text-secondary mt-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Laudantium, consequuntur deleniti modi quae id voluptatem vel.
            </p>
          </div>

          {/* Company Links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold mb-3">COMPANY</h6>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary a-links">Home</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary a-links">About us</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary a-links">Delivery</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary a-links">Privacy policy</a></li>
            </ul>
          </div>

          {/* Blog Posts */}
          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="fw-bold mb-3">BLOG POST</h6>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start mb-3">
                <img src={blog_one} alt="" className="me-2 rounded" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                <span className="text-secondary" style={{ fontSize: "0.9rem" }}>Lorem ipsum dolor, sit amet consectetur.</span>
              </li>
              <li className="d-flex align-items-start">
                <img src={blog_two} alt="" className="me-2 rounded" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                <span className="text-secondary" style={{ fontSize: "0.9rem" }}>Consectetur adipiscing elit, sed do eiusmod.</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-6 col-lg-4">
            <h6 className="fw-bold mb-3">GET IN TOUCH</h6>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><i className="bi bi-telephone me-2"></i> +2567435768</li>
              <li><i className="bi bi-envelope me-2"></i> contact@email.com</li>
            </ul>
            <div className="mt-3">
              <a href="#" className="text-secondary me-3 fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-secondary me-3 fs-5"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-secondary me-3 fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-secondary fs-5"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <p className="text-center text-secondary mb-0" style={{ fontSize: "0.85rem" }}>
          &copy; 2026 COZA Store. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;