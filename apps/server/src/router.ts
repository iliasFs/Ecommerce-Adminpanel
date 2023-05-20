import express from "express";
const router = express.Router();
import ProductController from "./controllers/products.controller";
import CategoryController from "./controllers/category.controller";
import UserController from "./controllers/users.controller";
import Stripe from "stripe";

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
router.post("/users", UserController.createUser);
router.get("/users", UserController.findAllUsers);
router.get("/users/:id", UserController.findById);
router.delete("/users/:userId", UserController.deleteUser);

//Category Routes
router.post("/category", CategoryController.createCategory);
router.get("/category/:categoryname", CategoryController.findCategory);
router.delete("/category/:id", CategoryController.deleteCategory);
const secretKey = process.env.STRIPE_SECRET_KEY;

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

export default router;
