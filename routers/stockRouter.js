import express from "express";
import { reduceStockAfterOrder } from "../controllers/stockController.js";
import userAuth from "../middlewares/userAuth.js";

const stockRouter = express.Router();

stockRouter.post("/reduce", userAuth, reduceStockAfterOrder);

export default stockRouter;