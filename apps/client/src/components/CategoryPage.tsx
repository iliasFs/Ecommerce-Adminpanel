import { useEffect, useState } from "react";
import clientAPI from "../library/clientAPI";
import { IProduct } from "../types";
import "./CategoryList.css";
import FilterModal from "./FilterModal";

const endPoint = "kids";

function CategoryPage() {
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
    <>
      <div className="h-28">NAVBAR</div>
      <div>
        <FilterModal handleFilterClick={handleFilterClick} />
      </div>
      <div>
        <input type="range" min={0} max={50} onChange={handlePriceChange} />
        <label>{minPrice}</label>
      </div>

      <ul className="product-container ">
        {categoryList.map((prod) => {
          return (
            <li className="product" key={`product-${prod.id}`}>
              <img
                className="product-image"
                src={prod.images[0]}
                alt={prod.name}
              />

              <div>
                <strong>{prod.name}</strong> - ${prod.price}
              </div>
              <div>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-shopping-cart"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CategoryPage;
