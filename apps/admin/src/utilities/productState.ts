interface ProductState {
  name: string;
  size: string;
  price: number;
  images: string[];
  description: string;
  stockQuantity: number;
  featured: boolean;
  newArrivals: boolean;
  category: string;
}

export const initialProductState: ProductState = {
  name: "",
  price: 0,
  size: "",
  images: [],
  description: "",
  stockQuantity: 0,
  featured: false,
  newArrivals: false,
  category: "",
};

export const resetProductState = (): ProductState => {
  return initialProductState;
};
