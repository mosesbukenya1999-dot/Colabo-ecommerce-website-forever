import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const delivery_fee = 10;

    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // ----- CART FUNCTIONS -----

    // Add product to cart (increment by quantity)
    // Add product to cart (safe, prevents doubling)
const addToCart = (itemId, sizes) => {
    if (!sizes) return alert("Please select a size!");

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
        if (cartData[itemId][sizes]>0) {
            cartData[itemId][sizes]+=1
        } else {
            cartData[itemId][sizes]=1;
        }
    }else{
        cartData[itemId]={};
        cartData[itemId][sizes]=1
    }

    setCartItems(cartData)
    
};

    // Update quantity or remove item if quantity <= 0
    const updateQuantity = (itemId, size, quantity) => {
        setCartItems(prev => {
            const cartData = structuredClone(prev);

            if (quantity <= 0) {
                if (cartData[itemId]) {
                    delete cartData[itemId][size];
                    if (Object.keys(cartData[itemId]).length === 0) {
                        delete cartData[itemId];
                    }
                }
            } else {
                if (!cartData[itemId]) cartData[itemId] = {};
                cartData[itemId][size] = quantity;
            }

            return cartData;
        });
    };

    // Get total number of items in cart
    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, sizes) => {
            return total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
        }, 0);
    };

    const getCartAmount = ()=> {
        const amount = 0;

        for (const items in cartItems){
            for (const item in cartItems[items]){
                if (cartItems[items][item]) {
                    const itemInfo = products.find((product)=> product._id === items);
                    if (itemInfo) {
                        amount+= itemInfo.price * cartItems[items][item]
                    }else{
                        alert("No Product Is Found for Price")
                    }
                }
            }
        }

        return amount;

    }

    // ----- PRODUCTS FUNCTIONS -----

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(`${backendUrl}/api/products/list`, {
                headers: { 'Cache-Control': 'no-cache' }
            });
            setProducts(res.data.products || []);
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

    // ----- CONTEXT VALUE -----
    const value = {
        products,
        currency,
        delivery_fee,
        backendUrl,
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        getCartCount,
        loading,
        error,
        fetchProducts,
        navigate,
        getCartAmount,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;