import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

// ✅ CORS MUST BE VERY EARLY
app.use(cors({
  origin: "https://product-store-murex.vercel.app", // ✅ your Vercel frontend only
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// ✅ Preflight handler (optional but safe)
app.options("*", cors());

app.use(express.json());

// ✅ Routes
app.use("/api/products", productRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 API is live and CORS is working!");
});

const PORT = process.env.PORT || 5000;

// ✅ Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
