import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import Router from "express";
import { protect, admin } from "../middleware/authMiddleWare.js";
const router = Router();
// route of admin to get all users
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
// protected route for the user profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
//protected route for the admin to remove a user by id and update user

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
