import { Request, Response, NextFunction } from 'express'
import Product from '../models/Products'

const ProductController = {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        price,
        size,
        images,
        description,
        category,
        stockQuantity,
        featured,
        newArrival,
      } = req.body
      const imageArray = [images]
      const newProduct = await Product.create(
        name,
        price,
        size,
        imageArray,
        description,
        stockQuantity,
        featured,
        newArrival,
        category
      )
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  },
}
export default ProductController
