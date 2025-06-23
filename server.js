import express from "express";
import dotnev from "dotenv";
import { connectDB } from "./config/db.js";
// import Product from "./models/product.models.js";
// import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";


dotnev.config();

const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products",productRoutes)

app.listen(5000, () => {
  connectDB();
  console.log("Server startes at http://localhost:"+ PORT);
});

// rrQT2P3oSPeLL00U
