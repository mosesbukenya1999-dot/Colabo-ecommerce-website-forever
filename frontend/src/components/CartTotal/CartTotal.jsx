import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Title from '../Title/Title';

const CartTotal = () => {
    const { getCartAmount, currency, delivery_fee } = useContext(ShopContext);
    return (
        <div className=' w-100 container'>
            <div className=" fw-4">
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className="d-flex flex-column gap-3 mt-4">
                <div className="d-flex justify-content-between">
                    <p>SubTotal</p>
                    <p>{currency}{getCartAmount()}.00</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}</p>
                </div>
                <hr />
                <div className=" d-flex justify-content-between">
                    <b>Total</b>
                    <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
                </div>
            </div>

        </div>
    )
}

export default CartTotal