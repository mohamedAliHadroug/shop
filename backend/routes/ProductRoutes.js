import express from "express";
import Router from "express";
import { protect, admin } from "../middleware/authMiddleWare.js";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
} from "../controllers/productController.js";

const router = Router();
//@desc fetch all products and create a new product by the admin only
//@route Get /api/products  and POST /api/products
//@access public for the creation of a product is private/admin
router.route("/").get(getProducts).post(protect, admin, createProduct);


// get top 3 rated product 
//@route Get /api/products/top
//@access public
router.get('/top', getTopProducts)


//@desc fetch all products and create a new rating of a product by the user
//@route Get /api/products  and POST /api/products/:id/reviews
//@access private for the creation of a rating  by the user
router.route("/:id/reviews").post(protect, createProductReview)

//@desc fetch single product wich can be deleted and updated by the admin only
//@route Get /api/products/:id
//@access for the delete and update of product is private/admin only
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
