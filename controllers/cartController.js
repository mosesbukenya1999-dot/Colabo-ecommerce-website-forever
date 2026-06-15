import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

// -------------------- ADD TO CART (STOCK SAFE) --------------------
const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.json({ success: false, message: "User not found" });
    if (!itemId) return res.json({ success: false, message: "Item required" });

    const product = await productModel.findById(itemId);
    if (!product) return res.json({ success: false, message: "Product not found" });

    const key = size || "default";

    const variant = product.variants?.find(
      (v) => (v.size || "default") === key
    );

    if (!variant) return res.json({ success: false, message: "Variant not found" });

    if (variant.stock <= 0) {
      return res.json({ success: false, message: "Out of stock" });
    }

    const user = await userModel.findById(userId);
    const cart = user.cartData || {};

    if (!cart[itemId]) cart[itemId] = {};

    const currentQty = cart[itemId][key] || 0;

    if (currentQty + 1 > variant.stock) {
      return res.json({
        success: false,
        message: `Only ${variant.stock} available`,
      });
    }

    cart[itemId][key] = currentQty + 1;

    await userModel.findByIdAndUpdate(userId, { cartData: cart });

    res.json({ success: true, message: "Added to cart" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// -------------------- GET CART --------------------
const getCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await userModel.findById(userId);

    res.json({ success: true, cartData: user.cartData || {} });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// -------------------- UPDATE CART --------------------
const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.user?.id;

    const key = size || "default";

    const user = await userModel.findById(userId);
    const cart = user.cartData || {};

    if (!cart[itemId]) cart[itemId] = {};

    if (quantity <= 0) {
      delete cart[itemId][key];
      if (Object.keys(cart[itemId]).length === 0) delete cart[itemId];
    } else {
      cart[itemId][key] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData: cart });

    res.json({ success: true, message: "Cart updated" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export { addToCart, getCart, updateCart };