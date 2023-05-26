import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../index.css";
import { useShoppingCart } from "../contexts/CartContext";
import { useWindowSize } from "react-use";
import { Link } from "react-router-dom";
import { IData } from "../types";
const ProductRow = (props: any) => {
  const title =
    props.type === "featured-products" ? "Featured" : "New Arrivals";
  const [data, setData] = useState<IData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { decreaseItemQuantity, increaseCartQuantity, cartItems } =
    useShoppingCart();
  function handleAddToCart(item: IData) {
    if (!cartItems.some((el) => el.id === item.id)) {
      increaseCartQuantity(item.id, item.price);
    } else {
      decreaseItemQuantity(item.id, item.price);
    }
  }
  const windowSize = useWindowSize();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/${props.type}`)
      .then((response) => setData(response.data));
  }, []);

  //SROOLLS
  const scrollLeft = () => {
    let scrollAmount = -100;

    if (windowSize.width > 640) {
      scrollAmount = -1000;
    }
    console.log(scrollAmount);
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    let scrollAmount = 100;

    if (windowSize.width > 640) {
      scrollAmount = 1000;
    }
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className=" mt-9 min-h-[280px] md:min-h-0">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold pt-4 mb-4">{title}</h2>
      </div>

      <div className="media-scroller snaps-inline" ref={containerRef}>
        {data.map((item) => {
          return (
            <div
              key={`featured_${item.id}`}
              className="min-w-[250px]  relative media-element shadow-lg hover:shadow-xl cursor-pointer"
            >
              <button
                onClick={() => {
                  handleAddToCart(item);
                }}
                className="flex absolute right-2 bottom-2 rounded-md items-center justify-center hover:bg-gray-100 h-[35px] w-[35px]"
              >
                {!cartItems.some((el) => el.id === item.id) ? (
                  <img
                    className="h-[20px] w-[20px] "
                    src="../../plusSign.png"
                    alt=""
                  />
                ) : (
                  <img
                    className="animate-fadeIn  h-[20px] w-[20px]"
                    src="../../tick.png"
                    alt=""
                  />
                )}
              </button>
              <div className="">
                <Link to={`/product/${item.id}`}>
                  {" "}
                  <img
                    className="w-[320px] h-[180px] rounded-t-md object-cover"
                    src={item.images[0]}
                    alt={`Product Image ${item.id + 1}`}
                  />
                </Link>
              </div>

              <div className="p-3">
                <h1 className="font-bold text-center">
                  {item.name.length > 30
                    ? `${item?.name.slice(0, 30)}...`
                    : item.name}
                </h1>
                <h2 className="text-gray-300 text-center">${item.price}</h2>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex ml-5 mr-5 justify-between ">
        <button className="w-10 font-bold" onClick={scrollLeft}>
          <img
            className="arrowButton hidden sm:block h-[40px] w-[40px]"
            src="../../arrowL.png"
            alt=""
          />
        </button>

        <button className="w-10 font-bold" onClick={scrollRight}>
          <img
            className="arrowButton hidden sm:block sm:h-[40px] sm:w-[40px]"
            src="../../arrowR.png"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default ProductRow;
