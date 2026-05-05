import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Title from '../Title/Title';
import ProductsItem from '../ProductsItem/ProductsItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item => (item.bestseller)));

        setBestSeller(bestProduct.slice(0, 5))
    }, [products])


    return (
        <div className='my-5'>
            <div className='text-center py-3'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className=' m-auto mb-4'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit non magnam
                </p>
            </div>

            <div className="products">
                {
                    bestSeller.map((item, index) => (
                        <ProductsItem

                            key={index} id={item._id} image={item.image} name={item.name} price={item.price}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller