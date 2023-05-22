import {
  Cart,
  CartProduct,
  Category,
  Favourite,
  Prisma,
  User,
} from "@prisma/client";

import prisma from "../lib/prisma";

class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public size: string,
    public images: string[],
    public description: string,
    public stockQuantity: number,
    public featured: boolean,
    public newArrivals: boolean,
    public category?: Partial<Category>,
    public user?: Partial<User>,
    public favourite?: Partial<Favourite>,
    public cart?: Partial<Cart>,
    public cartProduct?: Partial<CartProduct>
  ) {}

  static async create(
    newProductName: string,
    newPrice: number,
    newSize: string,
    newImages: string[],
    newDescription: string,
    newStockQuantity: number,
    newFeatured: boolean,
    isNewArrival: boolean,
    newCategory: string
  ): Promise<Product> {
    const {
      id,
      name,
      price,
      size,
      images,
      description,
      stockQuantity,
      featured,
      newArrivals,
      category,
    } = await prisma.product.create({
      data: {
        name: newProductName,
        price: newPrice,
        size: newSize,
        images: {
          set: newImages,
        },
        description: newDescription,
        stockQuantity: newStockQuantity,
        featured: newFeatured,
        newArrivals: isNewArrival,
        category: {
          connect: {
            name: newCategory,
          },
        },
      },
      include: {
        category: true,
      },
    });

    return new Product(
      id,
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
  }
  static async getAllProducts(): Promise<Product[]> {
    return await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  // get single product
  static async getProductsById(productId: number) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true },
    });

    return product;
  }

  static async updateProduct(
    id: number,
    newProductName: string,
    newPrice: number,
    newSize: string,
    newImages: string[],
    newDescription: string,
    newStockQuantity: number,
    newFeatured: boolean,
    isNewArrival: boolean,
    newCategory: string
  ) {
    const {
      name,
      price,
      size,
      images,
      description,
      stockQuantity,
      featured,
      newArrivals,
    } = await prisma.product.update({
      where: { id },
      data: {
        name: newProductName,
        price: newPrice,
        size: newSize,
        images: newImages,
        description: newDescription,
        stockQuantity: newStockQuantity,
        featured: newFeatured,
        newArrivals: isNewArrival,
        category: {
          connect: {
            name: newCategory,
          },
        },
      },
      include: {
        category: true,
      },
    });
    return new Product(
      id,
      name,
      price,
      size,
      images,
      description,
      stockQuantity,
      featured,
      newArrivals
    );
  }

  static async findFeatured(): Promise<Product[]> {
    return await prisma.product.findMany({
      where: {
        featured: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async findNewArrivals(): Promise<Product[]> {
    return await prisma.product.findMany({
      where: {
        newArrivals: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  static async deleteProduct(id: number) {
    return await prisma.product.delete({
      where: { id },
    });
  }

  static async findAllById(idArr: number[]): Promise<Product[]> {
    return await prisma.product.findMany({
      where: {
        id: {
          in: idArr,
        },
      },
    });
  }
}

export default Product;
