// routers/productRouter.js
import express from "express";
import { addProduct, addSellerProduct, approveProduct, getPendingProducts, getStoreProducts, listProduct, rejectProduct, removeProduct, sellerProducts, sellerRemoveProduct } from "../controllers/ProductController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";
import userAuth from "../middlewares/userAuth.js";

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

router.post(
  "/sellerAdd",
  userAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addSellerProduct
);
router.get("/sellerList", userAuth, sellerProducts);

router.get("/list", listProduct);
router.post("/remove", adminAuth,removeProduct);
router.post("/sellerRemove", userAuth, sellerRemoveProduct);
router.get("/pendingProducts", adminAuth, getPendingProducts);

router.get("/store/:storeId", getStoreProducts);

router.post("/approveProduct", adminAuth, approveProduct);

router.post("/rejectProduct", adminAuth, rejectProduct);

export default router;