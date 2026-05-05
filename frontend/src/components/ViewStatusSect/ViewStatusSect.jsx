import React, { useContext, useEffect, useState } from 'react'
import "./ViewStatusSect.css";
import { ShopContext } from '../../context/ShopContext';
import { useParams } from 'react-router-dom';

const ViewStatusSect = () => {

    const [status,setStatus] = useState("Description");

    const {products} = useContext(ShopContext);

    const [productData,setProductData] = useState(false)

    const {productId} = useParams()

    const fetchProducts = () => {
    const product = products.find(
      (p) => p._id.toString() === productId.toString()
    );

    if (product) {
      setProductData(product);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products, productId]);

  if (!productData) return <div className="empty">No Product Found</div>;

  return (
    <div className="view-status">
    <div className="tabs">
        <div className="under-line-two"></div>
    {["Description", "Specification", "Reviews"].map((item) => (
      <span
        key={item}
        onClick={() => setStatus(item)}
        className={`tab ${status === item ? "active" : ""}`}
      >
        {item} {item === "Reviews" && "(2)"}
      </span>
    ))}
    <div className="under-line-two"></div>
  </div>

  <div className="tab-content">
    {status === "Description" && <p>{productData.description}</p>}
    {status === "Specification" && <p>Specification will be here</p>}
    {status === "Reviews" && <p>Reviews will be here</p>}
  </div>
</div>
  )
}

export default ViewStatusSect