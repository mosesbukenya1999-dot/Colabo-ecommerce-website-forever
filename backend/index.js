import path from "path";
import cors from "cors";
import express from "express";
import "dotenv/config";
import productRouter from "./routers/productRouter.js";
import connectDB from "./config/mongoDB.js";


const port = process.env.PORT || 4000;

connectDB()
const app = express();

app.use("/uploads", express.static(path.join(process.cwd(),"uploads")))

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API Is Working")
})

app.use("/api/products", productRouter)

app.listen(port,()=>{
    console.log("Server is Running on port "+port);
})