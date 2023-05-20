//Context and Provider are concepts that allow you to share data between components without passing props explicitly at each level of the component tree. They are part of the Context API provided by React.

import { createContext, useContext, ReactNode, useState } from "react";
import { useLocaLStorage } from "../hooks/useLocalStorage";
type CartContext = {
  cartQuantity: number;
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number, price: number) => void; //adding to the cart also
  decreaseItemQuantity: (id: number, price: number) => void;
  removeFromCart: (id: number) => void;
  blurApplied: boolean;
  setBlurApplied: React.Dispatch<React.SetStateAction<boolean>>;
};

// Creating a new context called CartContext and assigning it an initial value of an empty object
const CartContext = createContext({} as CartContext);

// Creating a custom hook called useShoppingCart that returns the current value of the CartContext instead of writing in the frontend all the time useContext(CartContext)
export function useShoppingCart() {
  return useContext(CartContext);
}

// Typescript essential
type cartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number; //we have the id so we have all the information
  quantity: number;
  price: number;
};

// Creating a cartProvider component that takes in 'children' as props and wraps them in the CartContext.Provider -->app.tsx
// providing an empty object as the value for the CartContext.

//the value here is the most importand thing. This is what we want to extract form here and be avaialble to all of our routes.
export function CartProvider({ children }: cartProviderProps) {
  const [cartItems, setCartItems] = useLocaLStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [blurApplied, setBlurApplied] = useState<boolean>(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number, price: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == undefined) {
        return [...currItems, { id, quantity: 1, price }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: item.price,
            };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity == 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
              price: item.price,
            };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    return setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }
  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        blurApplied,
        setBlurApplied,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
