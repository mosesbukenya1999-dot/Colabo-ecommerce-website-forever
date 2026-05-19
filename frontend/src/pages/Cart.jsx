import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import "./CSS/cart.css";

const Cart = () => {
  const { cartItems, products, currency, updateQuantity, updatingItems } =
    useContext(ShopContext);
  const navigate = useNavigate(); // useNavigate hook
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false); // page loading state

  useEffect(() => {
    let tempData = [];
    if (products.length > 0) {
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          try {
            tempData.push({
              _id: productId,
              size: size,
              quantity: cartItems[productId][size],
            });
          } catch (error) {}
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  const goBack = () => {
    setLoading(true);
    setTimeout(() => {
      if (window.history.length > 1) {
        navigate(-1); // go back in history
      } else {
        navigate("/"); // fallback to home page
      }
    }, 500); // 0.5s delay for smooth effect
  };

  if (loading) {
    // Optional: show a simple loader while waiting
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="breadcrum-icon">
        <button className="btn-back" onClick={goBack}>
          <i className="bi bi-chevron-left me-1"></i>Back
        </button>
      </div>

      <div className="cart-page">
        <div className="cart-sect">
          <div className="cart-content">
            <div className="cart-items">
              <div className="d-grid grid-header">
                <b>Image</b>
                <b>Name</b>
                <b>Qty</b>
                <b>Size</b>
                <b>Total</b>
                <b>Remove</b>
              </div>

              {cartData.map((item, index) => {
                const productData = products.find((p) => p._id === item._id);
                if (!productData) return null;
                return (
                  <div key={index} className="d-grid cart-row">
                    <img src={productData.images[0]} alt="" />
                    <p>{productData.name}</p>
                    <input
                      type="number"
                      min={0}
                      value={item.quantity}
                      className="qty-input"
                      disabled={updatingItems[`${item._id}_${item.size}`]} // disable while updating
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value)) {
                          updateQuantity(item._id, item.size, value);
                        }
                      }}
                    />
                    <p>{item.size}</p>
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="remove-btn"
                    >
                      <i className="bi bi-trash fs-5"></i>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <h3>Summary</h3>
              <p>
                Subtotal{" "}
                <span>
                  {currency}
                  {cartData
                    .reduce((acc, item) => {
                      const product = products.find((p) => p._id === item._id);
                      return acc + (product?.price || 0) * item.quantity;
                    }, 0)
                    .toFixed(2)}
                </span>
              </p>
              <p>
                Shipping <span>Free</span>
              </p>
              <p>
                Total{" "}
                <span>
                  {currency}
                  {cartData
                    .reduce((acc, item) => {
                      const product = products.find((p) => p._id === item._id);
                      return acc + (product?.price || 0) * item.quantity;
                    }, 0)
                    .toFixed(2)}
                </span>
              </p>
              <button
                onClick={() => navigate("/place-order")}
                className="checkout-btn"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
