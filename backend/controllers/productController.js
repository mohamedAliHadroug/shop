import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc fetch all products
//@route Get /api/products
//@access public req.query to get what after the ? in the url
const getProducts = asyncHandler(async (req, res) => {
  //pagination to get a number of product (12) in a single page
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1
    //we use regex to get the product even if there is a mistake in the name when searching a product
  const keyword=req.query.keyword ? {
    name : {
      $regex : req.query.keyword,
      $options : 'i'
    }
  } : {}
  //count of product
  const count = await Product.countDocuments({...keyword})
  //if we search the name we will search fo it otherwise we get all the products .find({})  we use skip to get all the product even in other page
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
  res.json({products, page, pages: Math.ceil(count / pageSize)});
});

//@desc fetch single product
//@route Get /api/products/:id
//@access public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc DELETE a product by the admin
//@route DELETE /api/products/:id
//@access private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product  removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Create a new product by the admin
//@route POST /api/products
//@access private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc Update a  product by the admin
//@route Put /api/products/:id
//@access private/admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


//@desc Create a new review
//@route Post /api/products/:id/reviews
//@access private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find( r => r.user.toString() === req.user._id.toString())
    if(alreadyReviewed){
      res.status(400)
      throw new Error('Product already reviewed')
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item)=> item.rating + acc, 0)
    / product.reviews.length
    await product.save()
    res.status(201).json({message: 'Review added'})
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});






//@desc Get top 3 rated products
//@route Get /api/products/top
//@access public

const getTopProducts = asyncHandler(async (req, res) => {
      const products = await Product.find({}).sort({rating : -1}).limit(3)
      res.json(products)
  }
);

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts};
