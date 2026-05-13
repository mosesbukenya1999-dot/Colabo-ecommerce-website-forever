import express from "express";
import { addToCart, getCart, updateCart } from "../controllers/cartController.js";
import userAuth from "../middlewares/userAuth.js";

const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCart);
cartRouter.post("/list", userAuth, getCart);
cartRouter.post("/update", userAuth, updateCart);

export default cartRouter