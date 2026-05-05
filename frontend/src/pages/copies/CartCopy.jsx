import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal/CartTotal';

const Cart = () => {

    const { products, currency, cartItems, upDateQuantity, navigate } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item]
                    })
                }
            }
        }

        setCartData(tempData);

    }, [cartItems])

    return (
        <div className=' border-top pt-5'>

            <div className=" mb-4">
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div>
                {
                    cartData.map((item, index) => {

                        const productData = products.find((product) => product._id === item._id);

                        return (
                            <div key={index} className=" py-5 border-top text-secondary d-flex gap-3 align-items-center">
                                <div className=" d-flex align-items-start">
                                    <img style={{ width: '80px' }} src={productData.image[0]} alt="" />
                                    <div>
                                        <p className=' fw-medium'>{productData.name}</p>
                                        <div className=" d-flex align-items-center gap-2 mt-2">
                                            <p>{currency}{productData.price}</p>
                                            <p className=' px-3 border bg-light'>{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : upDateQuantity(item._id, item.size, Number(e.target.value))} className=' border ' type="number" min={1} defaultValue={item.quantity} />
                                <img onClick={() => upDateQuantity(item._id, item.size, 0)} style={{ width: '30px', cursor: 'pointer' }} className='' src={assets.bin_icon} alt="" />
                            </div>
                        )

                    })
                }
            </div>

            <div className=" d-flex justify-content-end my-5">
                <div className=" w-100">
                    <CartTotal />

                    <div className=" w-100 text-end mt-4">
                        <button onClick={() => navigate("/place-order")} className="btn btn-dark">PROCEED TO CHECKOUT</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Cart