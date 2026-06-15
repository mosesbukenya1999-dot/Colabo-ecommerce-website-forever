import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";

import connectDB from "./config/mongoDB.js";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import cartRouter from "./routers/cartRouter.js";
import orderRouter from "./routers/orderRouter.js";
import reviewRouter from "./routers/reviewRouter.js";
import sellerRouter from "./routers/sellerRouter.js";
import storeRouter from "./routers/storeRouter.js";
import stockRouter from "./routers/stockRouter.js";

const app = express();
const port = process.env.PORT || 4000;

// middleware (CORS FIRST)
app.use(cors({
  origin: "*", // or your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

/* // static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); */

// routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);

app.use("/api/sellers", sellerRouter);
app.use("/api/store", storeRouter);
app.use("/api/stock", stockRouter)

// test route
app.get("/", (req, res) => {
  res.send("API is Working");
});

// start server ONLY after DB connects
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server running on port " + port);
    });
  })
  .catch((err) => {
    console.log("DB ERROR:", err);
  });