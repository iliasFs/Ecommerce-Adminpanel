import { useShoppingCart } from "../contexts/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Data } from "../constants/dataInterface";
import priceFormat from "../utilities/priceFormat";
type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const [data, setData] = useState<Data[]>([]);
  const { increaseCartQuantity, decreaseItemQuantity } = useShoppingCart();

  useEffect(() => {
    axios
      .get("http://localhost:8080/featured-products")
      .then((response) => setData(response.data));
  }, []);

  const item = data.find((item) => item.id === id);
  if (item == null) return null;
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
      <img src={item.images[0]} alt="item-name" className="w-16 h-16 rounded" />
      <div className="flex flex-col flex-grow">
        <span className="font-bold">{item.name}</span>
        <span className="text-gray-500">{priceFormat(item.price)}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => decreaseItemQuantity(item.id, item.price)}
          className="px-2 py-1 text-sm text-white font-bold bg-[#1D3557] rounded"
        >
          -
        </button>
        <span className="text-sm">{quantity}</span>
        <button
          onClick={() => increaseCartQuantity(item.id, item.price)}
          className="px-2 py-1 text-sm text-white font-bold bg-[#1D3557] rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
