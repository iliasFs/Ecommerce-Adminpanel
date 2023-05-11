import { Cart, CartProduct, Category, Favourite, User } from '@prisma/client'

import prisma from '../lib/prisma'

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
    public user?: Partial<User>,
    public favourite?: Partial<Favourite>,
    public cart?: Partial<Cart>,
    public cartProduct?: Partial<CartProduct>,
    public category?: Partial<Category>
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
    })

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
    )
  }
}
export default Product
