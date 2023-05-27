import express from "express";
import ProductController from "./controllers/products.controller";
import CategoryController from "./controllers/category.controller";
import UserController from "./controllers/users.controller";
import Stripe from "stripe";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import cloudinary from "../cloud/cloudinary";
import dotenv from "dotenv";
import OrderController from "./controllers/orders.controller";
import userAuthorizationMiddleware from "./middleware/userAuthorization";


dotenv.config();
const upload = multer({ dest: "uploads/" });
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const secretKey = process.env.STRIPE_SECRET_KEY;

// product routes
router.post("/product", ProductController.createProduct);
router.get("/product", ProductController.getAllProducts);
router.get("/product/:id", ProductController.getProductById);
router.get("/featured-products", ProductController.getFeaturedProducts);
router.get("/new-arrivals", ProductController.getNewArrivals);
router.put("/product/:productId", ProductController.updateProduct);
router.delete("/product/:productId", ProductController.deleteProduct);
router.post("/allProductsId", ProductController.getAllProductById);

//User Routes
//login in and authorization routes
router.get(
  "/users/me",
  userAuthorizationMiddleware,
  UserController.getAuthenticatedUser
);
router.get("/users/login", UserController.loginUser);

router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.get("/users", UserController.findAllUsers);
router.get("/users/:id", UserController.findById);
router.delete("/users/:userId", UserController.deleteUser);

//Category Routes
router.post("/category", CategoryController.createCategory);
router.get("/category/:categoryname", CategoryController.findCategory);
router.delete("/category/:id", CategoryController.deleteCategory);

//Order routes
router.get("/orders", OrderController.getAllOrders);
router.post("/orders", OrderController.createOrder);
router.delete("/orders/:id", OrderController.deleteOrder);
router.put("/orders/:id", OrderController.updateOrder);

//payment route for stripe
router.post("/payment", async (req, res) => {
  try {
    const { amount, id } = req.body;
    if (!secretKey) {
      throw Error;
    }
    const stripe = new Stripe(secretKey, {
      apiVersion: "2022-11-15", // Replace with your desired API version
    });

    const payment = await stripe.paymentIntents.create({
      //ADD MORE!!!
      amount,
      currency: "USD",
      payment_method: id,
      confirm: true,
    });
    res.status(200).json({ payment: payment });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/upload", upload.array("files"), async (req, res) => {
  const files: Express.Multer.File[] = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res.status(400).json({ error: "No files were uploaded" });
  }

  try {
    const uploadedPromises = files.map((file) => {
      const formData = new FormData();
      formData.append("file", fs.createReadStream(file.path), {
        filename: file.originalname,
      });
      return axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload?upload_preset=ofbmy8vl`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    });
    const uploadedResults = await Promise.all(uploadedPromises);
    const proccessedResults = uploadedResults.map((result) => {
      return {
        data: result.data.secure_url,
      };
    });

    return res.status(200).json(proccessedResults);
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
    return res
      .status(500)
      .json({ error: "Failed to upload files to Cloudinary" });
  }
});

export default router;
