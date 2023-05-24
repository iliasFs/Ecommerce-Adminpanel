import { useEffect, useState } from "react";
import clientAPI from "../library/clientAPI";
import { IProduct } from "../types";
import FilterModal from "./FilterModal";
import { Link, useParams } from "react-router-dom";


function CategoryPage() {
  const params = useParams();
  let currentParam = params.categoryName;
  const endPoint =
    currentParam === "men"
      ? "men"
      : currentParam === "women"
      ? "women"
      : "kids";

  const [categoryList, setCategoryList] = useState<IProduct[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);

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
    <main className="w-[80%] m-auto gap-12 flex">
      <div>
        <div>
          <FilterModal handleFilterClick={handleFilterClick} />
        </div>
        <div>
          <input type="range" min={0} max={50} onChange={handlePriceChange} />
          <label>{minPrice}</label>
        </div>
      </div>
      <div className="mt-9 min-h-[480px]">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryList.map((product) => {
         const {id,images,name,price} = product
          
          return (
            <Link key={id} to={`/product/${id}`} className="product">
          <div
          key={`featured_${id}`}
          className="flex mb-10 flex-row min-w-[80vw] md:min-w-0 media-element shadow-xl hover:shadow-2xl cursor-pointer"
        >
          <img
            src={images[0]}
            alt={`Product Image ${id + 1}`}
            className="flex-1 rounded-xl w-[150px] h-[270px]"
          />

          <div className="flex flex-col justify-center items-center gap-8 p-4 bg-gray-200 rounded-md box-border cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110">
            <h1 className="font-bold text-center w-[200px] max-w-[50%]">{`${name.slice(0, 25)}...`}</h1>
            <h2 className="text-center text-gray-500">€{price}</h2>
            <div className="flex justify-center gap-20 items-center">
              <span className="opacity-75 top-0 right-0 bg-blue-700 text-white py-2 px-6 rounded-md flex items-center justify-center text-sm">
                More...
              </span>
            </div>
          </div>
        </div> 
            </Link>
          );
        })}
      </div>
    </div>
    </main>
  );
}

export default CategoryPage;
