export interface IProduct {
  cartId?: number;
  category: ICategory;
  categoryId: number;
  createdAt: Date;
  description: string;
  favouriteId?: number;
  featured: boolean;
  id: number;
  images: string[];
  name: string;
  newArrivals: boolean;
  price: number;
  size: string;
  stockQuantity: number;
  updatedAt: Date;
  userId?: number;
}
type ICategory = {
  id: number;
  name: string;
};
