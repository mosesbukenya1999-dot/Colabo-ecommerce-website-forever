import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;

    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false); // new
    const [error, setError] = useState(null); // new

    const addToCart = (itemId, sizes) => {
        if (!sizes) return alert("Please select a size!");

        const cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][sizes]) cartData[itemId][sizes] += 1;
            else cartData[itemId][sizes] = 1;
        } else {
            cartData[itemId] = { [sizes]: 1 };
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

    

    const [toast, setToast] = useState(null);

const showToast = (message, type = "error") => {
    setToast({ message, type });
};

// Update fetchProducts
const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
        const res = await axios.get(backendUrl + "/api/products/list", {
            headers: { "Cache-Control": "no-cache" },
        });
        setProducts(res.data.products);
    } catch (err) {
        console.error(err);
        const message = !err.response
            ? "Network error! Check your internet connection or server URL."
            : "Failed to load products. Server returned an error.";
        setError(message);
        showToast(message, "error"); // 🚀 show toast instead of alert
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
        fetchProducts // in case you want retry button
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;