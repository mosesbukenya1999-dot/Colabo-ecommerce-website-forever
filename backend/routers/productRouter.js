// routers/productRouter.js
import express from "express";
import { addProduct, listProduct, removeProduct } from "../controllers/ProductController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

router.get("/list", listProduct);
router.post("/remove", removeProduct);

export default router;