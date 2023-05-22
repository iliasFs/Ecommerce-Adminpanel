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
export interface IFormState {
  email?: string;
  country: string;
  name: string;
  lastName: string;
  street: string;
  additional: string;
  postal: string;
  city: string;
  phone: string;
  amount: string;
}

export type CartItem = {
  id: number; //we have the id so we have all the information
  quantity: number;
  price: number;
};
