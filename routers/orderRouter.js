import express from "express";
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, sellerOrders, updateStatus, userOrders } from "../controllers/orderController.js";
import userAuth from "../middlewares/userAuth.js";
import adminAuth from "../middlewares/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/placeorder", userAuth,placeOrder);
orderRouter.post("/stripe", userAuth,placeOrderStripe);
orderRouter.post("/razorpay", userAuth,placeOrderRazorpay); 

orderRouter.post("/userorders", userAuth,userOrders);
orderRouter.post("/sellerorders", userAuth, sellerOrders);

orderRouter.post("/update", adminAuth,updateStatus);
orderRouter.post("/list", adminAuth,allOrders);

export default orderRouter