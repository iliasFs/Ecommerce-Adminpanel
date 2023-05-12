import { Request, Response, NextFunction } from "express";
import Category from "../models/Category";

const CategoryController = {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const newProduct = await Category.create(name);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },
  async findCategory(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.params);
      const { categoryname } = req.params;
      const newCategory = await Category.get(categoryname);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  },
  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleted = await Category.delete(Number(id));
      res.status(201).json(deleted);
    } catch (error) {
      next(error);
    }
  },
};
export default CategoryController;
