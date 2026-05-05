import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Cart = () => {

    const {cartItems, products,currency} = useContext(ShopContext);

    const [cartData,setCartData] = useState([]);

    useEffect(()=>{

      let tempData =[];

      if (products.length>0) {
        for(const productId in cartItems){
          for(const sizes in cartItems[productId]){
            try {
              tempData.push({
                _id: productId,
                sizes: sizes,
                quantity: cartItems[productId][sizes]
              })
            } catch (error) {
              
            }
          }
      }
      }

      setCartData(tempData);

    },[cartItems,products])

  return (
    <div style={{marginTop:"170px"}} className=' container cart-sect'>
        <div className="row">
          <div className="col-8">
            <div style={{gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr"}} className="d-grid">
                <b>Image</b>
                <b>Product Name</b>
                <b>Quantity</b>
                <b>Unit Price</b>
                <b>Total</b>
                <b>Remove</b>
            </div>
            {
                cartData.map((item,index)=> {
                  const productData = products.find((product)=> product._id===item._id);
                  console.log(productData);

                  return (
                    <div key={index}>
                        <div style={{gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr"}} className="d-grid">
                          <img style={{width:"100px"}} src={productData.images[0]} alt="" />
                          <p>{productData.name}</p>
                          <input value={item.quantity} min={1} type="number" />
                          <div className="d-flex gap-2">
                              <p>{currency}{productData.price} x {item.quantity}</p>
                          </div>
                          <p>{currency}{100.00}</p>
                          <p>x</p>
                        </div>
                    </div>
                  )

                })
              }
          </div>

          <div className="col-4">
              
          </div>
        </div>
    </div>
  )
}

export default Cart