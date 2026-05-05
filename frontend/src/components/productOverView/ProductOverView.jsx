// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../../context/ShopContext";
// import ProductItem from "../productItem/ProductItem";
// import "./productOverView.css";

// const ProductOverView = () => {

//     const { products } = useContext(ShopContext);

//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     const [visibleCount, setVisibleCount] = useState(8);

//     const [sortType,setSortType] = useState("relevant")

//     // handle category change
//     const handleCategory = (value) => {
//         setSelectedCategory(value);
//         setVisibleCount(8); // reset pagination
//     };

//     const sortProducts = ()=>{
//         let fpCopy = filteredProducts.slice();
        
//         switch (sortType) {
//             case "low-high":
//                 setFilteredProducts(fpCopy.sort((a,b)=> (a.price-b.price)));
//                 break;
        
//                 case "high-low":
//                 setFilteredProducts(fpCopy.sort((a,b)=> (b.price-a.price)));
//                 break;
        
//             default:
//                 applyFilters()
//                 break;
//         }
//     }

//     const applyFilters = ()=>{
//         let productCopy = [...products];

//         if (selectedCategory !== "All") {
//             productCopy = productCopy.filter(
//                 item => item.category === selectedCategory
//             );
//         }

//         setFilteredProducts(productCopy);
//     }

//     // filter products
//     useEffect(() => {
//         applyFilters()
//     }, [selectedCategory, products]);

//     useEffect(()=>{
//         sortProducts()
//     },[sortType])

//     // visible products for UI
//     const visibleProducts = filteredProducts.slice(0, visibleCount);

//     return (
//         <div className="overview-sect mb-5">

//             {/* FILTER BAR */}
//             <div className="filter-bar d-flex justify-content-between align-items-center flex-wrap">

//                 <div className="d-flex gap-4 flex-wrap">

//                     <button
//                         className={`filter-btn ${selectedCategory === "All" ? "active" : ""}`}
//                         onClick={() => handleCategory("All")}
//                     >
//                         All Products
//                     </button>

//                     <button
//                         className={`filter-btn ${selectedCategory === "Kids" ? "active" : ""}`}
//                         onClick={() => handleCategory("Kids")}
//                     >
//                         Kids
//                     </button>

//                     <button
//                         className={`filter-btn ${selectedCategory === "Men" ? "active" : ""}`}
//                         onClick={() => handleCategory("Men")}
//                     >
//                         Men
//                     </button>

//                     <button
//                         className={`filter-btn ${selectedCategory === "Women" ? "active" : ""}`}
//                         onClick={() => handleCategory("Women")}
//                     >
//                         Women
//                     </button>

//                     <button
//                         className={`filter-btn ${selectedCategory === "Shoe" ? "active" : ""}`}
//                         onClick={() => handleCategory("Shoe")}
//                     >
//                         Shoes
//                     </button>

//                     <button
//                         className={`filter-btn ${selectedCategory === "Watch" ? "active" : ""}`}
//                         onClick={() => handleCategory("Watch")}
//                     >
//                         Watches
//                     </button>

//                 </div>

//                 {/* SORT (UI only for now) */}
//                 <select onChange={(e)=>setSortType(e.target.value)}>
//                     <option value="relevant">Relevant</option>
//                     <option value="low-high">Low - High</option>
//                     <option value="high-low">High - Low</option>
//                 </select>

//             </div>

//             {/* TITLE */}
//             <h1 className="title">Product Overview</h1>

//             {/* PRODUCTS GRID */}
//             <div className="products" key={selectedCategory}>
//                 {visibleProducts.map((item) => (
//                     <ProductItem
//                         key={item._id}
//                         id={item._id}
//                         name={item.name}
//                         price={item.price}
//                         category={item.category}
//                         image={item.images}
//                     />
//                 ))}
//             </div>

//             {/* LOAD MORE */}
//             {visibleCount < filteredProducts.length && (
//                 <div className="load-more">
//                     <button onClick={() => setVisibleCount(prev => prev + 8)}>
//                         Load More
//                     </button>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default ProductOverView;