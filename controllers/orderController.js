import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import sellerApplicationModel from "../models/sellerApplicationModel.js";
import transporter from "../config/email.js";
import dotenv from "dotenv";

dotenv.config();

// -------------------- PLACE ORDER --------------------
const placeOrder = async (req, res) => {
  try {
    const { items, address, amount } = req.body;
    const userId = req.user.id;

    if (!items?.length) {
      return res.json({ success: false, message: "No items in order" });
    }

    // ---------------- CHECK STOCK ----------------
    for (const item of items) {
      const product = await productModel.findById(item._id);
      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }

      const key = item.size || "default";

      const variant = product.variants?.find(
        (v) => (v.size || "default") === key
      );

      if (!variant) {
        return res.json({
          success: false,
          message: `Variant not found for ${item.name}`,
        });
      }

      if (variant.stock < item.quantity) {
        return res.json({
          success: false,
          message: `Not enough stock for ${item.name}`,
        });
      }
    }

    // ---------------- REDUCE STOCK ----------------
    for (const item of items) {
      const key = item.size || "default";

      await productModel.updateOne(
        { _id: item._id, "variants.size": key },
        {
          $inc: {
            "variants.$.stock": -item.quantity,
          },
        }
      );
    }

    // ---------------- SAFE ITEMS ----------------
    const safeItems = items.map((item) => ({
      _id: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price || 0,
      size: item.size || "default",
      sellerApplicationId: item.sellerApplicationId || null,
    }));

    // ---------------- CREATE ORDER ----------------
    const order = await orderModel.create({
      userId,
      items: safeItems,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      status: "pending",
      date: Date.now(),
    });

    const customer = await userModel.findById(userId);

    // ---------------- ADMIN EMAIL (IMPROVED) ----------------
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: "🛒 New Order Received",

      text: `
🚨 NEW ORDER ALERT 🚨

Order ID: ${order._id}

👤 CUSTOMER DETAILS
Name: ${customer.name}
Email: ${customer.email}
Phone: ${address.phone || "N/A"}

📍 ADDRESS
Street: ${address.street}
City: ${address.city}
State: ${address.state}
Country: ${address.country}
ZIP: ${address.zip}

💰 TOTAL: ${amount}

🛍️ ITEMS:
${safeItems
  .map(
    (i) =>
      `- ${i.name}
  Size: ${i.size}
  Qty: ${i.quantity}
  Price: ${i.price}`
  )
  .join("\n\n")}
      `,
    });

    // ---------------- CUSTOMER EMAIL ----------------
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: customer.email,
      subject: "✅ Order Confirmation",

      text: `
Thank you for your order!

Order ID: ${order._id}
Total: ${amount}

Items:
${safeItems.map((i) => `${i.name} x${i.quantity}`).join("\n")}
      `,
    });

    // ---------------- CLEAR CART ----------------
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// ---------------- OTHER FUNCTIONS ----------------
const placeOrderStripe = async (req, res) => {
  res.json({ success: false, message: "Stripe not implemented" });
};

const placeOrderRazorpay = async (req, res) => {
  res.json({ success: false, message: "Razorpay not implemented" });
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    res.json({ success: true, message: "Status updated" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const userOrders = async (req, res) => {
  const orders = await orderModel.find({ userId: req.user.id });
  res.json({ success: true, orders });
};

const allOrders = async (req, res) => {
  const orders = await orderModel.find({});
  res.json({ success: true, orders });
};

const sellerOrders = async (req, res) => {
  const seller = await sellerApplicationModel.findOne({
    userId: req.user.id,
    status: "approved",
  });

  if (!seller) {
    return res.json({ success: false, message: "Not a seller" });
  }

  const orders = await orderModel.find({});

  const filtered = orders
    .map((order) => {
      const items = order.items.filter(
        (i) => i.sellerApplicationId?.toString() === seller._id.toString()
      );

      if (!items.length) return null;

      return { ...order._doc, items };
    })
    .filter(Boolean);

  res.json({ success: true, orders: filtered });
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  updateStatus,
  userOrders,
  allOrders,
  sellerOrders,
};