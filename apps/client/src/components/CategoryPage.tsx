import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import clientAPI from "../library/clientAPI";
import { IProduct } from "../types";
import "./CategoryList.css";

const props = "kids";

function CategoryPage() {
  const [categoryList, setCategoryList] = useState<IProduct[]>([]);
  const [filters, setFilters] = useState({
    category: "featured" || "newArrivals",
    minPrice: 0,
  });
  const filterProducts = (categoryList: IProduct[]) => {
    return categoryList.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        ((filters.category === "featured" && product.featured === true) ||
          (filters.category === "newArrivals" && product.newArrivals === true))
      );
    });
  };
  async function reloadRecipes() {
    const res = await clientAPI.fetchCategory(props);
    console.log(res.products[0]);
    console.log(res);
    setCategoryList(res.products);
  }
  useEffect(() => {
    if (!categoryList.length) {
      reloadRecipes();
    }
  }, []);
  function handleFilterClick(e: React.MouseEvent<HTMLLabelElement>): void {
    e.preventDefault();
    console.log(e);
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
            Filter
          </label>
          <ul className="product-container ">
            {categoryList.map((prod) => {
              return (
                <li className="product" key={prod.id}>
                  <img
                    className="product-image"
                    src={prod.images[0]}
                    alt={prod.name}
                  />
                  <div>
                    <strong>{prod.name}</strong> - ${prod.price}
                  </div>
                  <div>
                    <button className="btn btn-ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li value="men">
              <form>
                <label
                  onClick={handleFilterClick}
                  htmlFor="my-drawer"
                  className="btn btn-ghost drawer-button"
                >
                  men
                </label>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
