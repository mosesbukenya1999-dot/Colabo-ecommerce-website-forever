import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";
import userAuth from "../middlewares/userAuth.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productId", userAuth,addReview);
reviewRouter.get("/:productId", getReviews);


export default reviewRouter;