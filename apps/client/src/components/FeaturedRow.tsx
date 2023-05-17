
import axios from "axios";
import { useState, useEffect } from "react";
import { useShoppingCart } from "../contexts/CartContext";
import { Product } from "../types/customTypes";

interface data {
  id: number
  name: string
  price: number
  size: string
  images: string[]
  description: string
  stockQuantity: number
  featured: boolean
  newArrivals: boolean
}


const FeaturedRow = ({ id }: Product) => {
  const [data, setData] = useState<data[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/featured-products")
      .then((response) => setData(response.data));
  }, []);

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseItemQuantity,
    removeFromCart,
    
  } = useShoppingCart();

  return (
    <div>
      <h2 className="text-4xl font-bold pt-4">Featured</h2>
      <div className="flex gap-5">
        {data.map((item, index) => (

          <div className="max-w-[120px] my-8" key={`featured-row-${item.id}`}>
            <h1>{item?.name}</h1>
            <h3>{getItemQuantity(item.id)}</h3>
            <div>
              <img src={item.images[index]} alt="" />
              <button
                onClick={() => increaseCartQuantity(item.id)}
                className="border border-black m-2 px-1 py-2 bg-black text-white font-bold "
              >
                Add to Cart
              </button>
              <button
                onClick={() => decreaseItemQuantity(item.id)}
                className="border border-black m-2 px-1 py-2 bg-red-700 text-white font-bold "
              >
                Remove From Cart
              </button>


            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedRow
