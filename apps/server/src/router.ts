import express from "express";
const router = express.Router();
import ProductController from "./controllers/products.controller";
import CategoryController from "./controllers/category.controller";

router.post("/product", ProductController.createProduct);

router.post("/category", CategoryController.createCategory);
router.get("/category/:categoryname", CategoryController.findCategory);
router.delete("/category/:id", CategoryController.deleteCategory);

export default router;
