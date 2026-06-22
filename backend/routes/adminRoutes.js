import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../controllers/admincontroller.js";

const router = express.Router();

router.get("/stats", adminAuth, getDashboardStats);
router.get("/orders", adminAuth, getAllOrders);
router.post("/orders/update", adminAuth, updateOrderStatus);
router.get("/users", adminAuth, getAllUsers);
router.get("/products", adminAuth, getAllProducts);
router.post("/products/add", adminAuth, addProduct);
router.post("/products/edit", adminAuth, editProduct);
router.post("/products/delete", adminAuth, deleteProduct);

export default router;