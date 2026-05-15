import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newPlacer.css";
import CartTotal from "../CartTotal/CartTotal";
import { ShopContext } from "../../context/ShopContext";

import { FaPaypal, FaStripe, FaMoneyBillWave } from "react-icons/fa";
import axios from "axios";

const Loader = () => (
  <div className="loader-overlay">
    <div className="loader"></div>
    <p className="loader-text">Placing your order...</p>
  </div>
);

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    setCartItems,
    token,
    backendUrl,
    cartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [placingOrder, setPlacingOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // default: Cash on Delivery

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePlaceOrder = async () => {
    try {
      setPlacingOrder(true);

      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          let itemInfo = structuredClone(
            products.find((product) => product._id === items)
          );

          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }

      let orderData = {
        address: form,
        amount: getCartAmount() + delivery_fee,
        items: orderItems,
      };

      switch (paymentMethod) {
        case "cod":
          const res = await axios.post(
            backendUrl + "/api/orders/placeorder",
            orderData,
            { headers: { token } }
          );
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            alert(res.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while placing the order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="real-container-two mt-5 py-5">
      {/* Loader Overlay */}
      {placingOrder && <Loader />}

      <div className="placeorder-container">
        <h2 className="page-title">Place Your Order</h2>

        <div className="form-container-two">
          {/* User Info Form */}
          {[
            { name: "name", placeholder: "Full Name", type: "text" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "phone", placeholder: "Phone Number", type: "tel" },
            { name: "country", placeholder: "Country", type: "text" },
            { name: "street", placeholder: "Street", type: "text" },
            { name: "city", placeholder: "City", type: "text" },
            { name: "state", placeholder: "State", type: "text" },
            { name: "zip", placeholder: "ZIP Code", type: "text" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
          ))}

          {/* Payment Method */}
          <div className="payment-method">
            <h4>Payment Method</h4>

            <label
              className={`payment-option ${
                paymentMethod === "cod" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <FaMoneyBillWave size={20} className="me-2" /> Cash on Delivery
            </label>

            <label
              className={`payment-option ${
                paymentMethod === "paypal" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
              <FaPaypal size={20} className="me-2 text-primary" /> PayPal
            </label>

            <label
              className={`payment-option ${
                paymentMethod === "stripe" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
              />
              <FaStripe size={20} className="me-2 text-success" /> Stripe
            </label>
          </div>

          <button
            className="placeorder-btn"
            onClick={handlePlaceOrder}
            disabled={placingOrder}
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="cart-summary-container">
        <CartTotal delivery_fee={delivery_fee} />
      </div>
    </div>
  );
};

export default PlaceOrder;