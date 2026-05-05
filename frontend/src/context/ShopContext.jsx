import axios from 'axios';
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {products  } from "../assets/assets";


// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false)


    const [cartItems,setCartItems] = useState([]);

    const [products,setProducts] = useState([]);

    const addToCart = async(itemId,sizes)=>{
        if (!sizes) {
            return alert("Please Select Size!!")
        };

        const cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][sizes]) {
                cartData[itemId][sizes]+=1
            } else {
                cartData[itemId][sizes]=1
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][sizes]=1
        }

        setCartItems(cartData);
       

    }

    const getCartCount = ()=>{
        let cartCount = 0;

        for(const items in cartItems){
            for(const item in cartItems[items]){
                if (cartItems[items][item]>0) {
                    cartCount+= cartItems[items][item]
                    
                }
            }
        }

        return cartCount;

    }

    const updateQuantity = async(itemId,sizes,quantity)=>{
        const cartData = structuredClone(cartItems);

        cartData[itemId][sizes]=quantity;

        setCartItems(cartData)

    }

    const fetchProducts = async()=>{
        try {
            const res = await axios.get(backendUrl+ "/api/products/list");
            setProducts(res.data.products)
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[])

    const value = {
        products,
        currency,
        delivery_fee,
        backendUrl,
        addToCart,
        cartItems,
        setCartItems,
        updateQuantity,
        getCartCount
    };


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;