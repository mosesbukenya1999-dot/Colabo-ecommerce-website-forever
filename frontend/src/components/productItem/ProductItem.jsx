import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import "./ProductItem.css";

const ProductItem = ({ name, images = [], price, category, id, delay = 0 }) => {
  const { currency } = useContext(ShopContext);

  return (
    <a 
      href={`/products/${id}`} 
      style={{ animationDelay: `${delay}ms` }} 
      className='card-container fade-in'
    >

      {/* IMAGE */}
      <div className="card-image">
        <img src={images?.[0] || "/placeholder.png"} alt={name} />
      </div>

      {/* QUICK VIEW */}
      <button className="btn-view">Quick View</button>

      {/* HEART */}
      <button className="heart-btn">
        <i className="bi bi-heart"></i>
      </button>

      {/* CONTENT */}
      <div className="card-content">
        <div className="left">
          <span className="card-name">{name}</span>
          <span className="card-price">{currency}{price}</span>
        </div>

        <div className="right">
          <span className="card-category">{category}</span>
        </div>
      </div>

    </a>
  );
}

export default ProductItem;