import React, { useContext, useEffect, useState } from 'react';
import "./LatestProducts.css";
import { ShopContext } from '../../context/ShopContext';
import ProductItem from '../productItem/ProductItem';
import { FaMale, FaFemale, FaChild, FaShoePrints } from 'react-icons/fa';
import { MdWatch } from "react-icons/md"; 
import { AiOutlineAppstore } from 'react-icons/ai';

const LatestProducts = () => {
    const { products, loading, error, fetchProducts } = useContext(ShopContext);

    const [filteredProducts, setFilteredProducts] = useState([]);


    useEffect(() => {
        let updated = [...products];


 

        setFilteredProducts(updated.slice(0,4));
    }, [products]);


    return (
        <div className='container product-see'>


            {/* TITLE */}
            <h1 className="title">Latest Products</h1>

            {/* LOADING */}
            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading products, please wait...</p>
                </div>
            )}

            {/* ERROR */}
            {error && (
                <div className="error">
                    <p>{error}</p>
                    <button onClick={fetchProducts}>Retry</button>
                </div>
            )}

            {/* PRODUCTS */}
            {!loading && !error && (
                <div className="products-grid">
                    {filteredProducts.map((item, index) => (
                        <ProductItem
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            images={item.images}
                            category={item.category}
                            delay={index * 80} // stagger effect
                        />
                    ))}
                    {filteredProducts.length === 0 && <p className="no-products">No products found.</p>}
                </div>
            )}
        </div>
    );
};

export default LatestProducts;