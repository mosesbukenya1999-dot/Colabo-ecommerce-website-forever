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
    const [token, setToken] = useState("");

    const [cartLoading, setCartLoading] = useState(false); // overall cart loading
    const [updatingItems, setUpdatingItems] = useState({}); // per-item loading
    const [currentUser, setCurrentUser] = useState(null);

    const navigate = useNavigate();

    // ----- CART FUNCTIONS -----

    const addToCart = async (itemId, sizes) => {
        if (!sizes) return alert("Please select a size!");
        if (!token) return alert("You must be logged in to add to cart");

        setCartLoading(true);
        try {
            const res = await axios.post(
                `${backendUrl}/api/cart/add`,
                { itemId, sizes },
                { headers: { token } }
            );

            // update frontend after backend success
            setCartItems(prev => {
                const cartData = structuredClone(prev);
                if (cartData[itemId]) {
                    if (cartData[itemId][sizes] > 0) {
                        cartData[itemId][sizes] += 1;
                    } else {
                        cartData[itemId][sizes] = 1;
                    }
                } else {
                    cartData[itemId] = {};
                    cartData[itemId][sizes] = 1;
                }
                return cartData;
            });

            console.log("Added to cart:", res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to add item to cart. Try again!");
        } finally {
            setCartLoading(false);
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        if (!token) return alert("You must be logged in");

        const key = `${itemId}_${size}`;
        setUpdatingItems(prev => ({ ...prev, [key]: true }));

        try {
            await axios.post(
                `${backendUrl}/api/cart/update`,
                { itemId, sizes: size, quantity },
                { headers: { token } }
            );

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
        } catch (err) {
            console.error(err);
            alert("Failed to update cart. Please try again!");
        } finally {
            setUpdatingItems(prev => {
                const newState = { ...prev };
                delete newState[key];
                return newState;
            });
        }
    };

    const getCartCount = () =>
        Object.values(cartItems).reduce(
            (total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
            0
        );

    const getCartAmount = () => {
        let amount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const itemInfo = products.find(p => p._id === itemId);
                if (itemInfo) amount += itemInfo.price * cartItems[itemId][size];
            }
        }
        return amount;
    };

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
            setError(err.response ? "Failed to load products" : "Network error!");
        } finally {
            setLoading(false);
        }
    };

    const getUserCart = async () => {
        if (!token) return;
        try {
            const res = await axios.post(`${backendUrl}/api/cart/list`, {}, { headers: { token } });
            if (res.data.success) setCartItems(res.data.cartData);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const fetchCurrentUser = async () => {
        if (!token) return;
        try {
            const res = await axios.get(`${backendUrl}/api/users/me`, {
                headers: { token }
            });
            console.log(res.data);
            if (res.data.success) setCurrentUser(res.data.user);
        } catch (err) {
            console.error("Failed to fetch user:", err);
        }
    };

    useEffect(() => {
        if (token) fetchCurrentUser();
    }, [token]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (token) getUserCart();
    }, [token]);

    useEffect(() => {
        if (!token && localStorage.getItem("token")) setToken(localStorage.getItem("token"));
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
        getCartAmount,
        loading,
        error,
        fetchProducts,
        navigate,
        token,
        setToken,
        currentUser,       // <-- Add this
        setCurrentUser,    // <-- Optional, if you want to update user manually
        cartLoading,
        updatingItems
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;