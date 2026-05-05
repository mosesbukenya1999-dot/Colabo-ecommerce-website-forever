import express from "express";
import { addProduct, listProduct, removeProduct } from "../controllers/ProductController.js";
import uploads from "../middlewares/multer.js";


const productRouter = express.Router();

productRouter.post("/add",uploads.fields([
    {name:"image1", maxCount:1},
    {name:"image2", maxCount:1},
    {name:"image3", maxCount:1},
    {name:"image4", maxCount:1},
]),addProduct);
productRouter.get("/list",listProduct);
productRouter.post("/remove",removeProduct);


export default productRouter