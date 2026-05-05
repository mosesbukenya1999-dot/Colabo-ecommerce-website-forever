import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";

import connectDB from "./config/mongoDB.js";
import productRouter from "./routers/productRouter.js";

const app = express(); // ✅ MUST COME FIRST

const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

// static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// routes
app.use("/api/products", productRouter);

// test route
app.get("/", (req, res) => {
  res.send("API is Working");
});

// connect DB + start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is Running on port " + port);
    });
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });