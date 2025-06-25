import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ use import not require
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://product-store-murex.vercel.app", // ✅ allow Vercel frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", productRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
  });
});
