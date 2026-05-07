import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;

    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false); // new
    const [error, setError] = useState(null); // new

    const [quantity, setQuantity] = useState(1);

    const navigate= useNavigate()

    const addToCart = (itemId, sizes, quantity = 1) => {
        if (!sizes) return alert("Please select a size!");
    
        const cartData = structuredClone(cartItems);
    
        if (cartData[itemId]) {
            if (cartData[itemId][sizes]) cartData[itemId][sizes] += quantity;
            else cartData[itemId][sizes] = quantity;
        } else {
            cartData[itemId] = { [sizes]: quantity };
        }
    
        setCartItems(cartData);
    };

    const getCartCount = () => {
        let cartCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                cartCount += cartItems[items][item];
            }
        }
        return cartCount;
    };

    const updateQuantity = (itemId, sizes, quantity) => {
        const cartData = structuredClone(cartItems);
        cartData[itemId][sizes] = quantity;
        setCartItems(cartData);
    };

    

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const res = await axios.get(backendUrl + "/api/products/list", {
                headers: { 'Cache-Control': 'no-cache' }
            });
            setProducts(res.data.products);
        } catch (err) {
            console.error(err);
            if (!err.response) {
                setError("Network error! Check your internet connection or server URL.");
            } else {
                setError("Failed to load products. Server returned an error.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const value = {
        products,
        currency,
        delivery_fee,
        backendUrl,
        addToCart,
        cartItems,
        setCartItems,
        updateQuantity,
        getCartCount,
        loading, // new
        error,   // new
        fetchProducts, // in case you want retry button,
        navigate
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;