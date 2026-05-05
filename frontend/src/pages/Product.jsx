import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import "./CSS/product.css";
import ViewStatusSect from "../components/ViewStatusSect/ViewStatusSect";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency , addToCart,updateQuantity,cartItems,getCartCount } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProducts = () => {
    const product = products.find(
      (p) => p._id.toString() === productId.toString()
    );

    if (product) {
      setProductData(product);
      setImage(product.images[0]);
    }
  };


  /* useEffect(()=>{

    const tempData = [];

    for(const productId in cartItems){
      for(const sizes in cartItems[productId]){
        if (cartItems[productId][sizes]>0) {
          tempData.push({
            _id: productId,
            sizes:sizes,
            quantity: cartItems[productId][sizes]
          })
        }
      }
    }

    console.log(tempData);

  },cartItems) */

  useEffect(() => {
    fetchProducts();
  }, [products, productId]);

  if (!productData) return <div className="empty">No Product Found</div>;

  return (
    <div className="product-page container">
      {/* LEFT: thumbnails */}
      <div className="product-thumbnails">
        {productData.images.map((item, index) => (
          <img
            key={index}
            src={item}
            alt=""
            className={`thumb ${image === item ? "active" : ""}`}
            onClick={() => setImage(item)}
          />
        ))}
      </div>

      {/* CENTER: main image */}
      <div className="product-image">
        <img src={image} alt="" />
      </div>

      {/* RIGHT: details */}
      <div className="product-details">
        <h2>{productData.name}</h2>

        <p className="brand">
          Brand: <b>SKMEI</b>
        </p>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <i key={i} className="bi bi-star-fill"></i>
          ))}
          <span className="text-secondary ms-3">(122)</span>
        </div>

        <p className="price">
          {currency}
          {productData.price}
        </p>

        <p className="description">{productData.description}</p>

        {/* ACTIONS */}
        <div className="actions border-bottom py-3">
          <div className="qty fw-bold">Qty: 1</div>
          <button onClick={()=> addToCart(productData._id,size)} className="add-cart">
            <i className="bi bi-cart me-2"></i>Add to Cart
          </button>
          <div className="whish-list-icon">
            <i className="bi bi-heart"></i>
          </div>
        </div>

        {/* SIZE */}
        <div className="sizes d-flex">
          <span className=" fw-bold">Select Size:</span>
          <div>
            {productData.sizes.map((item, index) => (
              <button
                key={index}
                onClick={() => setSize(item)}
                className={size === item ? "active" : ""}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <p className="promo">
          <span className=" text-dark">Available: </span>🚚 Free Shipping
          Available
        </p>
      </div>

      <div className=" below-part">

            <ViewStatusSect />

            <RelatedProducts category={productData.category} />
      </div>
    </div>
  );
};

export default Product;
