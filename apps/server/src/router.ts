import express from "express";
const router = express.Router();
import ProductController from "./controllers/products.controller";
import CategoryController from "./controllers/category.controller";
import UserController from "./controllers/users.controller";

// product routes
router.post("/product", ProductController.createProduct);
router.get("/product", ProductController.getAllProducts);
router.get("/product/:id", ProductController.getProductById);
router.get("/featured-products", ProductController.getFeaturedProducts);
router.get("/new-arrivals", ProductController.getNewArrivals);

router.put("/product/:productId", ProductController.updateProduct);
router.delete("/product/:productId", ProductController.deleteProduct);

//User Routes
router.post("/users", UserController.createUser);
router.get("/users", UserController.findAllUsers);
router.get("/users/:id", UserController.findById);
router.delete("/users/:userId", UserController.deleteUser);

//Category Routes
router.post("/category", CategoryController.createCategory);
router.get("/category/:categoryname", CategoryController.findCategory);
router.delete("/category/:id", CategoryController.deleteCategory);

export default router;
