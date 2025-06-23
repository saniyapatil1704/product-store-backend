import mongoose from "mongoose";
import Product from "../models/product.models.js";

// Get all products from the database
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Fetch all products
    res.status(200).json({ success: true, data: products }); // Send products in response
  } catch (error) {
    console.log("Error fetching products", error.message); // Log the error
    res.status(500).json({ success: false, message: "Server Error" }); // Send error response
  }
};

// Create a new product
export const createProducts = async (req, res) => {
  const product = req.body; // Get product data from request

  // Check if all required fields are provided
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  const newProduct = new Product(product); // Create new product instance

  try {
    await newProduct.save(); // Save the product to the database
    res.status(201).json({ success: true, data: newProduct }); // Send success response
  } catch (error) {
    console.error("Error creating product:", error.message); // Log the error
    res.status(500).json({ success: false, message: "Server Error" }); // Send error response
  }
};

// Update an existing product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params; // Get product ID from URL
  const product = req.body; // Get updated product data from request

  // Validate if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    // Update the product and return the new version
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct }); // Send updated product in response
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" }); // Send error response
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params; // Get product ID from URL

  // Validate if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    await Product.findByIdAndDelete(id); // Delete the product
    res.status(200).json({ success: true, message: "Product deleted" }); // Send success response
  } catch (error) {
    console.error("Error deleting product:", error.message); // Log the error
    res.status(500).json({ success: false, message: "Server Error" }); // Send error response
  }
};
