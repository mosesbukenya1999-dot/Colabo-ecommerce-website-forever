import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newPlacer.css";
import CartTotal from "../CartTotal/CartTotal";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    // Here you would normally validate + submit the form
    navigate("/orders");
  };

  return (
    <div className="real-container">
      <div className="placeorder-container">
        <h2 className="page-title">Place Your Order</h2>

        <div className="form-container">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
          />
          <input
            type="text"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            placeholder="ZIP Code"
          />

          <button className="placeorder-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>

      </div>
        <div>
          <CartTotal />
        </div>
    </div>
  );
};

export default PlaceOrder;
