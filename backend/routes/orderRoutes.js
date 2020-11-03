import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered
} from "../controllers/orderController.js";
import Router from "express";
import { protect, admin } from "../middleware/authMiddleWare.js";
const router = Router();
// route to get order for the admin
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
// route of my orders
router.route("/myorders").get(protect, getMyOrders);
//route of the order by id
router.route("/:id").get(protect, getOrderById);
//payment route
router.route("/:id/pay").put(protect, updateOrderToPaid);
//delivered route by the admin only
router.route("/:id/deliver").put(protect,admin, updateOrderToDelivered);

export default router;
