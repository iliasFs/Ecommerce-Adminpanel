import { Request, Response, NextFunction } from "express";
import Product from "../models/Products";
// import { S3 } from 'aws-sdk'
const ProductController = {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        price,
        size,
        images,
        description,
        stockQuantity,
        featured,
        newArrivals,
        category,
      } = req.body;
      //trying to handle images with s3
      // const s3 = new S3()
      // const uploadedImages = await Promise.all(
      //   images.map(async (image) => {
      //     const result = s3
      //       .upload({
      //         Bucket: 'our-bucket-name-should be here',
      //         Key: `${Date.now()}-${image}`,
      //         Body: image,
      //         ContentType: 'image/png',
      //       })
      //       .promise()
      //     return (await result).Location
      //   })
      // )
     
      const newProduct = await Product.create(
        name,
        price,
        size,
        images,
        description,
        stockQuantity,
        featured,
        newArrivals,
        category
      );
      res.status(201).json({ ...newProduct, category });
    } catch (error) {
      next(error);
    }
  },
  async getAllProducts(_: Request, res: Response, next: NextFunction) {
    try {
      const products = await Product.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },
  // get unique product
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await Product.getProductsById(parseInt(id));
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      if (!productId) {
        throw new Error("Missing the correct endpoint");
      }
      const {
        name,
        price,
        size,
        images,
        description,
        stockQuantity,
        featured,
        newArrivals,
        category,
      } = req.body;
      const updatedProduct = await Product.updateProduct(
        parseInt(productId),
        name,
        price,
        size,
        images,
        description,
        stockQuantity,
        featured,
        newArrivals,
        category
      );
      return res.status(201).json({ ...updatedProduct, category });
    } catch (error) {
      next(error);
    }
  },
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      if (productId === null) {
        throw new Error("Product not found");
      }
      const product = await Product.deleteProduct(parseInt(productId));
      res.json({ message: " Product deleted successfully", data: product });
    } catch (error) {
      next(error);
    }
  },
  async getFeaturedProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const featuredProducts = await Product.findFeatured();
      res.status(200).json(featuredProducts);
    } catch (error) {
      next(error);
    }
  },
  async getNewArrivals(req: Request, res: Response, next: NextFunction) {
    try {
      const newArrivals = await Product.findNewArrivals();
      res.status(200).json(newArrivals);
    } catch (error) {
      next(error);
    }
  },
};
export default ProductController;
