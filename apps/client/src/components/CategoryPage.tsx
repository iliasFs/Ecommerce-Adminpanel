import { useEffect, useState } from "react";
import clientAPI from "../library/clientAPI";
import { IData, IProduct } from "../types";
import FilterModal from "./FilterModal";
import { Link, useParams } from "react-router-dom";
import { useShoppingCart } from "../contexts/CartContext";
import "../index.css";


function CategoryPage() {
  const [categoryList, setCategoryList] = useState<IProduct[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);

  const params = useParams();
  const { decreaseItemQuantity, increaseCartQuantity, cartItems } =
    useShoppingCart();
  function handleAddToCart(item: IData) {
    if (!cartItems.some((el) => el.id === item.id)) {
      increaseCartQuantity(item.id, item.price);
    } else {
      decreaseItemQuantity(item.id, item.price);
    }
  }
  let currentParam = params.categoryName;
  const endPoint =
    currentParam === "men"
      ? "men"
      : currentParam === "women"
      ? "women"
      : "kids";

  async function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setMinPrice(parseInt(e.target.value));
    const res = await clientAPI.fetchCategory(endPoint);
    const filtered = res.products.filter((prod) => {
      return prod.price >= minPrice;
    });
    setCategoryList(filtered);
  }

  async function reloadRecipes() {
    const res = await clientAPI.fetchCategory(endPoint);

    setCategoryList(res.products);
  }
  useEffect(() => {
    reloadRecipes();
  }, []);
 

  async function handleFilterClick(filterBy: string) {
    const res = await clientAPI.fetchCategory(endPoint);
    let filtered;
    if (filterBy === "Desc") {
      filtered = res.products.sort((a, b) => b.price - a.price);
    } else if (filterBy === "Asc") {
      filtered = res.products.sort((a, b) => a.price - b.price);
    } else {
      filtered = res.products.filter((prod) => {
        if (filterBy === "All") {
          return true;
        }
        if (filterBy === "Featured") {
          return prod.featured === true;
        }
        if (filterBy === "New Arraivals") {
          return prod.newArrivals === true;
        }
      });
    }
    if (filtered) {
      setCategoryList(filtered);
    }
  }
return (
    <main className=" overflow-x-0 min-w-[360px] flex flex-col my-3 items-center xl:flex-row xl:items-start">
      <FilterModal
        handleFilterClick={handleFilterClick}
        handlePriceChange={handlePriceChange}
        minPrice={minPrice}
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-10 xl:m-5 min-h-screen">
        {categoryList.map((item) => {
          return (
            <div className="min-w-[300px] max-h-[300px] mx-auto  bg-white rounded-lg shadow-md">
              <Link className="bg-red-400" to={`/product/${item.id}`}>
                <img
                  className="w-full h-48 object-cover object-top rounded-t-lg"
                  src={item.images[0]}
                  alt={`Product Image ${item.id + 1}`}
                />
              </Link><div className="p-4">
                <h1 className="text-xl font-semibold text-gray-800">
                  {item.name.length > 20
                    ? `${item?.name.slice(0, 20)}...`
                    : item.name}
                </h1>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-gray-700 ml-3">${item.price}</p>
                  <button
                    onClick={() => {
                      handleAddToCart(item);
                    }}
                    className="hover:bg-gray-100 p-2 mr-3 rounded-xl"
                  >
                    {!cartItems.some((el) => el.id === item.id) ? (
                      <img
                        className="h-[20px] w-[20px]"
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
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </main>
  );
}

export default CategoryPage;
