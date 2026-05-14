import express from "express";
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders } from "../controllers/orderController.js";
import userAuth from "../middlewares/userAuth.js";

const orderRouter = express.Router();

orderRouter.post("/placeorder", userAuth,placeOrder);
orderRouter.post("/stripe", userAuth,placeOrderStripe);
orderRouter.post("/razorpay", userAuth,placeOrderRazorpay);

orderRouter.post("/userorders", userAuth,userOrders);

orderRouter.post("/update", updateStatus);
orderRouter.post("/list", allOrders);

export default orderRouter