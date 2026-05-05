import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { ShopContext } from '../../context/ShopContext';
import "./ProductItem.css";

const ProductItem = ({name,image,price,category,id}) => {

    const {currency} = useContext(ShopContext);

  return (
    <Link to={`/products/${id}`} className=' card-container'>
        {/* image */}
        <div className="card-image">
        <img src={image[0]} alt="" />
        </div>

        {/* quik view btn */}
        <button className="btn-view">Quick View</button>

        <div className="card-content">
    <div className="left">
        <span className="card-name">{name}</span>
        <span className="card-price">{currency}{price}</span>
    </div>

    <div className="right">
        <i className="bi bi-heart"></i>
        <span className="card-category">{category}</span>
    </div>
</div>

    </Link>
  )
}

export default ProductItem