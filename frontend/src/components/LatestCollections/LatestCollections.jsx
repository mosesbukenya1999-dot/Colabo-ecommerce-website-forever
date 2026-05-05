import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Title from '../Title/Title';
import ProductsItem from '../ProductsItem/ProductsItem';
import "./LatestCollections.css";

const LatestCollections = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])

    return (
        <div className=' my-5'>
            <div className="text-center mb-3">
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className=" m-auto text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate perspiciatis nesciunt minima minus</p>
            </div>

            {/* REndering producs */}
            <div className="products mx-5">
                {
                    latestProducts.map((item, index) => (
                        <ProductsItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestCollections