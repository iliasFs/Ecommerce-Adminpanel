import { IProduct } from "../types";

const BASE_URL = "http://localhost:8080";
async function fetchCategory(
  category: string
): Promise<{ products: IProduct[] }> {
  const res = await fetch(`${BASE_URL}/category/${category}`);
  const categoryList = await res.json();
  return categoryList;
}

const clientAPI = {
  fetchCategory,
};

export default clientAPI;
