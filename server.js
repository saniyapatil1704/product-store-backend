import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
// import Product from "./models/product.models.js";
// import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products",productRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
  });
});

// rrQT2P3oSPeLL00U
