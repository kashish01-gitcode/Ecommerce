import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

// Dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments({ role: "user" });
    const totalOrders = await orderModel.countDocuments();
    const orders = await orderModel.find();
    const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const totalProducts = await productModel.countDocuments();

    res.json({
      success: true,
      stats: { totalUsers, totalOrders, totalRevenue, totalProducts },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { paymentStatus: status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
    const product = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: sizes ? sizes.split(",").map((s) => s.trim()) : [],
      bestseller: bestseller === "true",
    });
    await product.save();
    res.json({ success: true, message: "Product added", product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Edit product
const editProduct = async (req, res) => {
  try {
    const { productId, name, description, price, category, subCategory, sizes, bestseller } = req.body;
    await productModel.findByIdAndUpdate(productId, {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: sizes ? sizes.split(",").map((s) => s.trim()) : [],
      bestseller: bestseller === "true",
    });
    res.json({ success: true, message: "Product updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    await productModel.findByIdAndDelete(productId);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
};