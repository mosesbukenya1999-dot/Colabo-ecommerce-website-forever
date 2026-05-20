// routers/productRouter.js
import express from "express";
import { addProduct, listProduct, removeProduct } from "../controllers/ProductController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.post(
  "/add",adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

router.get("/list", adminAuth,listProduct);
router.post("/remove", adminAuth,removeProduct);

export default router;