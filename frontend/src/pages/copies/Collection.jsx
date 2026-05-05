import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title/Title';
import ProductsItem from '../components/ProductsItem/ProductsItem';

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [filterProducts, setFilterProducts] = useState([]);


    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    const [sortType, setSortType] = useState("relavent")

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }

        else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }



    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category))
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory))
        }

        setFilterProducts(productsCopy)
    }

    const sortProduct = () => {

        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case "low-high":
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
                break;

            case "high-low":
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
                break;

            default:
                applyFilter();
                break;
        }

    }

    /* 
        useEffect(() => {
            setFilterProducts(products)
        }, [products]); */


    useEffect(() => {
        applyFilter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, subCategory, search, showSearch]);

    useEffect(() => {
        sortProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType])



    return (
        <div className='d-flex gap-2 pt-5 border-top'>

            {/* FILTER OPTIONS */}
            <div className="flex-grow-1">
                <p className=" my-2 fw-medium">FILTERS</p>
                {/* CTAEGORY FILTER */}
                <div className=" border px-5 py-3 mt-3 w-50">
                    <p className=' mb-3 fw-medium'>CATEGORIES</p>
                    <div className=' d-flex flex-column gap-1 text-secondary'>
                        <p className=' d-flex gap-2'>
                            <input className=' w-3' value={'Men'} onChange={toggleCategory} type="checkbox" />Men
                        </p>
                        <p className=' d-flex gap-2'>
                            <input className=' w-3' value={'Women'} onChange={toggleCategory} type="checkbox" />Women
                        </p>
                        <p className=' d-flex gap-2'>
                            <input className=' w-3' value={'Kids'} onChange={toggleCategory} type="checkbox" />Kids
                        </p>
                    </div>
                </div>

                {/* SUBCATEGORY FILTER */}
                <div className=" border px-5 py-3 my-3 w-25">
                    <p className=' mb-3 fw-medium'>TYPE</p>
                    <div className=' d-flex flex-column gap-1 text-secondary'>
                        <p className=' d-flex gap-2'>
                            <input className=' w-3' value={'Topwear'} onChange={toggleSubCategory} type="checkbox" />TopWear
                        </p>
                        <p className=' d-flex gap-2'>
                            <input className=' w-3' value={'Bottomwear'} onChange={toggleSubCategory} type="checkbox" />Bottomwear
                        </p>
                        <p className=' d-flex gap-2'>
                            <input className=' w-3' value={'Winterwear'} onChange={toggleSubCategory} type="checkbox" />Winterwear
                        </p>
                    </div>
                </div>
            </div>


            {/* RIGHTSIDE */}
            <div className=" flex-grow-1">
                <div className=" d-flex justify-content-between mb-5">
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />
                    {/* Product sort */}
                    <select onChange={(e) => setSortType(e.target.value)} className=' border border-secondary px-1'>
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* MAP PRODUCTS */}
                <div className="products">
                    {
                        filterProducts.map((item, index) => {
                            return (
                                <ProductsItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                            )
                        })
                    }
                </div>

            </div>


        </div>
    )
}

export default Collection