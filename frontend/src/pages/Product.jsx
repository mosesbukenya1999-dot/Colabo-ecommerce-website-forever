import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import "./CSS/product.css";
import ViewStatusSect from "../components/ViewStatusSect/ViewStatusSect";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const {
    products,
    currency,
    addToCart,
    updateQuantity,
    cartItems,
    navigate,
    error: contextError,
  } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [sizes, setSizes] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  // Simulate 2-second loader when page first appears
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!pageLoading) {
      window.scrollTo(0, 0);
    }
  }, [pageLoading]);

  // Fetch product info from products array
  useEffect(() => {
    if (products.length === 0) return;

    const product = products.find(
      (p) => p._id.toString() === productId.toString()
    );

    if (product) {
      setProductData(product);
      setImage(product.images[0]);
    } else {
      setProductData(null);
    }
  }, [products, productId]);

  // Sync quantity with cart for selected size
  /* useEffect(() => {
    if (size && cartItems[productId]?.[size]) {
      setQuantity(cartItems[productId][size]);
    } else {
      setQuantity(1);
    }
  }, [cartItems, productId, size]); */

  // Go back handler with small loader (optional)
  const goBack = () => {
    setPageLoading(true);
    setTimeout(() => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }, 1000);
  };

  // Show loader first
  if (pageLoading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // Show error if API error exists
  if (contextError) {
    return (
      <div className="empty" style={{ color: "red" }}>
        {contextError}
      </div>
    );
  }

  // Show error if product not found
  if (!productData) {
    return (
      <div className="empty" style={{ color: "red" }}>
        Product Not Found
      </div>
    );
  }

  return (
    <div className="">
      <div className="breadcrum-icon">
        <button className="btn-back" onClick={goBack}>
          <i className="bi bi-chevron-left me-1"></i>Back
        </button>
      </div>

      <div className="product-page">
        {/* Thumbnails */}
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

        {/* Main image */}
        <div className="product-image">
          <img src={image} alt="" />
        </div>

        {/* Details */}
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

          {/* Sizes */}
          <div className="sizes d-flex">
            <span className=" fw-bold">Select Size:</span>
            <div>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSizes(item)}
                  className={sizes === item ? "active" : ""}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="actions border-bottom py-3">
            {/* <div className="qty fw-bold d-flex align-items-center">
              <button
                className="btn-qty"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity((prev) => prev - 1);
                    updateQuantity(productId, size, quantity - 1);
                  }
                }}
              >
                -
              </button>
              <span className="mx-2">{quantity}</span>
              <button
                className="btn-qty"
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                  updateQuantity(productId, size, quantity + 1);
                }}
              >
                +
              </button>
            </div> */}

            <button
              onClick={() => addToCart(productData._id, sizes)}
              className="add-cart"
            >
              <i className="bi bi-cart me-2"></i>Add to Cart
            </button>

            <div className="whish-list-icon">
              <i className="bi bi-bookmark"></i>
              <p className="text-whish ">Add to WhishList</p>
            </div>
          </div>

          <p className="promo">
            <span className=" text-dark">Available: </span>🚚 Free Shipping
            Available
          </p>
        </div>
      </div>

      <div className="below-part">
        <ViewStatusSect />
        <RelatedProducts category={productData.category} />
      </div>
    </div>
  );
};

export default Product;