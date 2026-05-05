import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Title from '../Title/Title';
import ProductsItem from '../ProductsItem/ProductsItem';

const RelatedProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => category === item.category);

            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            setRelated(productsCopy.slice(0, 5))

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    return (
        <div className=' my-5'>

            <div className=" text-center py-3">
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
                <div className="products">
                    {related.map((item, index) => (
                        <ProductsItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RelatedProducts