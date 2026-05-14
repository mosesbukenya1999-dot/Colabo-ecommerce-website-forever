import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import './CSS/Order.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token, backendUrl, currency } = useContext(ShopContext);

  const fetchOrders = async () => {
    if (!token) return;

    try {
      const res = await axios.post(
        backendUrl + '/api/orders/userorders',
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h2>Order #{order._id.slice(-6)}</h2>
              <p>
                Status:{' '}
                <span
                  className={`status ${order.status
                    .replace(/\s+/g, '-')
                    .toLowerCase()}`}
                >
                  {order.status}
                </span>
              </p>
              <button
                className="track-btn"
                onClick={() => alert(`Current Status: ${order.status}`)}
              >
                Track
              </button>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={item._id || item.productId} className="order-item">
                  <img src={item.images?.[0]} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                    <p>Price: {currency}{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <p>
                Total Amount: <strong>{currency}{order.amount}</strong>
              </p>
              <p>Payment Method: {order.paymentMethod}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;