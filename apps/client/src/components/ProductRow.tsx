import axios from "axios";
import { useState, useEffect } from "react";
import "../index.css";
import { useShoppingCart } from "../contexts/CartContext";

interface data {
  id: number;
  name: string;
  price: number;
  size: string;
  images: string[];
  description: string;
  stockQuantity: number;
  featured: boolean;
  newArrivals: boolean;
}

const ProductRow = (props: any) => {
  const title =
    props.type === "featured-products" ? "Featured" : "New Arrivals";
  const [data, setData] = useState<data[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/${props.type}`)
      .then((response) => setData(response.data));
  }, []);

  const { getItemQuantity, increaseCartQuantity, decreaseItemQuantity } =
    useShoppingCart();

  return (
    <div className="mt-9 min-h-[480px] md:min-h-0">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold pt-4 mb-4">{title}</h2>
      </div>

      <div className="media-scroller snaps-inline">
        {data.map((item) => {
          return (
            <div
              key={`featured_${item.id}`}
              className="flex mb-10 flex-row min-w-[80vw] md:min-w-0 media-element shadow-xl hover:shadow-2xl cursor-pointer"
            >
              <img
                src={item.images[0]}
                alt={`Product Image ${item.id + 1}`}
                className="flex-1 rounded-xl w-[150px] h-[270px]"
              />

              <div>
                <h1 className="font-bold text-center">{`${item?.name.slice(
                  0,
                  30
                )}...`}</h1>
                <h2 className="text-gray-300 text-center">{item.price}</h2>
                <div className="flex justify-center gap-20 items-center ">
                  <button
                    onClick={() => decreaseItemQuantity(item.id, item.price)}
                    className="text-gray-300 font-bold p-2 text-4xl "
                  >
                    -
                  </button>
                  <span className="opacity-75 top-0 right-0 bg-[#1D3557] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    {getItemQuantity(item.id)}
                  </span>{" "}
                  <button
                    onClick={() => increaseCartQuantity(item.id, item.price)}
                    className="text-gray-300 font-bold p-2 text-4xl "
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductRow;
