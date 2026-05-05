import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');

    const [size, setSize] = useState('');

    const fetchProductData = async () => {

        products.map((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage(item.image[0])

                return null;
            }
        })

    }

    useEffect(() => {
        fetchProductData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId, products])

    return productData ? (
        <div className=' border-top pt-5'>
            {/* productdata */}
            <div className=' d-flex gap-2'>
                {/* productimages */}
                <div className=" d-flex gap-5">
                    <div className="d-flex flex-column overflow-auto justify-content-between">
                        {
                            productData.image.map((item, index) => (
                                <img onClick={() => setImage(item)} key={index} src={item} alt="" style={{ width: '80px' }} className=" mb-1" />
                            ))
                        }
                    </div>
                    <div className="">
                        <img src={image} alt="" style={{ width: '400px' }} className="" />
                    </div>
                </div>

                {/* Product info */}
                <div className="flex-grow-1">
                    <h2 className=' fw-medium text-secondary text-center'>{productData.name}</h2>
                    <div className=" d-flex align-items-center justify-content-center gap-1 mt-1">
                        <img src={assets.star_icon} alt="" className="" />
                        <img src={assets.star_icon} alt="" className="" />
                        <img src={assets.star_icon} alt="" className="" />
                        <img src={assets.star_icon} alt="" className="" />
                        <img src={assets.star_dull_icon} alt="" className="" />
                        <p className=' px-1 align-items-center justify-content-center'>(122)</p>
                    </div>
                    <p className=' mt-5 fw-medium text-center'>{currency}{productData.price}</p>
                    <p className=' mt-5 w-50'>{productData.description}</p>

                    <div className=" d-flex flex-column gap-4">
                        <p>Select Size</p>
                        <div className="d-flex gap-3">
                            {productData.sizes.map((item, index) => (
                                <button onClick={() => setSize(item)} className={`btn bg-light ${item === size ? ' btn btn-outline-dark' : ''}`} key={index}>{item}</button>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => addToCart(productData._id, size)} className="btn btn-dark mt-4 px-4 rounded-2">ADD TO CART</button>
                    <hr className=' mt-5 w-100' />
                    <div className=" text-secondary d-flex flex-column gap-2">
                        <p className="">100% Original product.</p>
                        <p className="">Cash on delivery on this product.</p>
                        <p className="">Easy return and exchange policy within 7 Days.</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mt-5 gap-0 mb-0">
                <div className="d-flex">
                    <p className=" border py-3">Description</p>
                    <p className=" border py-3">Reviews(122)</p>
                </div>
                <div className="d-flex flex-column px-5 gap3 border">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae voluptatibus, quos est assumenda, perferendis vero a asperiores quo cupiditate odit ipsa velit ex, doloribus quas. Eius facilis velit veniam sequi?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad commodi architecto facilis ut temporibus! Expedita nemo quasi a sapiente qui, id nostrum distinctio ab dolor provident sequi ad sunt dignissimos.</p>
                </div>
            </div>

            {/* Relatedproducts */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : <div className=' opacity-0'>

    </div>
}

export default Product