import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Title from '../Title/Title';
import ProductItem from '../productItem/ProductItem';
import "./RelatedProducts.css";

const RelatedProducts = ({ category }) => {

    const { products } = useContext(ShopContext);

    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice();

            productCopy = productCopy.filter(item => item.category === category)

            setRelated(productCopy.slice(0, 4))

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    return (

<div className='related-sect vw-100'>
<div className="container">
        <h1 className=' text-header'>Related Products</h1>

    <div className="products-grid">
        {related.map((item) => (
            <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            category={item.category}
            images={item.images}
        />
        ))}
    </div>
</div>
</div>
    )
}

export default RelatedProducts