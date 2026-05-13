import React, { useContext, useEffect, useState } from 'react';
import "./ProductSee.css";
import { ShopContext } from '../../context/ShopContext';
import ProductItem from '../productItem/ProductItem';

const ProductSee = () => {
    const { products, loading, error, fetchProducts } = useContext(ShopContext);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortOption, setSortOption] = useState("relevant");

    useEffect(() => {
        let updated = [...products];

        // FILTER
        if (activeCategory !== "All") {
            updated = updated.filter(p => p.category === activeCategory);
        }

        // SORT
        if (sortOption === "low-high") updated.sort((a, b) => a.price - b.price);
        else if (sortOption === "high-low") updated.sort((a, b) => b.price - a.price);

        setFilteredProducts(updated);
    }, [products, activeCategory, sortOption]);

    return (
        <div className='container product-see'>

            {/* FILTER BAR */}
            <div className="filter-bar">
                <div className="filter-buttons">
                    {["All", "Kids", "Men", "Women", "Shoes", "Watches"].map(cat => (
                        <button
                            key={cat}
                            className={activeCategory === cat ? "active text-white" : "text-dark"}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* SORT */}
                <select className=' sort' onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                    <option value="relevant">Sort By:Relevant</option>
                    <option value="low-high">Sort By: Low - High</option>
                    <option value="high-low">Sort By: High - Low</option>
                </select>
            </div>

            {/* TITLE */}
            <h1 className="title">Product Overview</h1>

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

export default ProductSee;