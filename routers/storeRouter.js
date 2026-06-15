import express from "express";
import { getStoreById } from "../controllers/storeController.js";

const storeRouter = express.Router();

// GET SINGLE STORE + PRODUCTS
storeRouter.get("/:storeId", getStoreById);

export default storeRouter;