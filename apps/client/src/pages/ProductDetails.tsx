import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IProduct } from "../types";
import { useShoppingCart } from "../contexts/CartContext";
import "./Detailedpage.css";
import "../index.css";
import clientAPI from "../library/clientAPI";
const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<IProduct>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [similar, setSimilar] = useState<IProduct[]>();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { increaseCartQuantity } = useShoppingCart();

  async function reloadRecipes() {
    if (product) {
      const res = await clientAPI.fetchCategory(product?.category.toString());
      setSimilar(res.products);
    }
  }
  useEffect(() => {
    reloadRecipes();
  }, []);
  const handleSizeClick = (size: string) => {
    setSelectedSize((prevSize) => (prevSize === size ? null : size));
  };

  const params = useParams();
  const BASE_URL = "http://localhost:8080/product";
  const fetchProducts = async () => {
    if (params.productId) {
      const res = await axios.get(`${BASE_URL}/${params.productId}`);
      setProduct(res.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSlideChange = (index: number) => {
    setSelectedImageIndex(index);
  };

  const CustomPrevArrow = (props: any) => (
    <div
      className="slick-prev custom-arrow"
      style={{
        ...props.style,
        display: "block",
        left: "0",
        zIndex: 1,
      }}
      onClick={props.onClick}
    />
  );

  const CustomNextArrow = (props: any) => (
    <div
      className="slick-next custom-arrow"
      style={{
        ...props.style,
        display: "block",
        right: "0",
        zIndex: 1,
      }}
      onClick={props.onClick}
    />
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (current: number, next: number) => handleSlideChange(next),
  };

  return (
    <>
      <main className="w-full h-full">
        <article className="flex flex-col md:flex-row gap-[100px] ">
          <section className=" snaps-inline">
            {/* <img src={product?.images[0]} alt="Prodct Detail" /> */}
            <Slider {...settings} className="m-4 max-w-[480px] h-full">
              {product?.images.map((image, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="w-full rounded-xl h-full transition-transform transform hover:scale-105"
                  />
                </div>
              ))}
            </Slider>
          </section>
          <section className="p-1">
            <div>
              <h1 className="text-[2.8rem]">{product?.name}</h1>
              <p className="product__description">{product?.description}</p>
              <div className="flex flex-col gap-2 my-4">
                <h2 className="choose-size">choose one size</h2>
                <div className="flex flex-row gap-2 ">
                  <div
                    className={`w-10 h-10 border border-gray-500 rounded-full flex justify-center items-center ${
                      selectedSize === "XS" ? "bg-blue-950 text-white" : ""
                    }`}
                    onClick={() => handleSizeClick("XS")}
                  >
                    <p className="text-sm">XS</p>
                  </div>
                  <div
                    className={`w-10 h-10 border border-gray-500 rounded-full flex justify-center items-center ${
                      selectedSize === "S" ? "bg-blue-950 text-white" : ""
                    }`}
                    onClick={() => handleSizeClick("S")}
                  >
                    <p className="text-sm">S</p>
                  </div>
                  <div
                    className={`w-10 h-10 border border-gray-500 rounded-full flex justify-center items-center ${
                      selectedSize === "M" ? "bg-blue-950 text-white" : ""
                    }`}
                    onClick={() => handleSizeClick("M")}
                  >
                    <p className="text-sm">M</p>
                  </div>
                </div>
                <div className="flex flex-row gap-2 ">
                  <div
                    className={`w-10 h-10 border border-gray-500 rounded-full flex justify-center items-center ${
                      selectedSize === "L" ? "bg-blue-950 text-white" : ""
                    }`}
                    onClick={() => handleSizeClick("L")}
                  >
                    <p className="text-sm">L</p>
                  </div>
                  <div
                    className={`w-10 h-10 border border-gray-500 rounded-full flex justify-center items-center ${
                      selectedSize === "XL" ? "bg-blue-950 text-white" : ""
                    }`}
                    onClick={() => handleSizeClick("XL")}
                  >
                    <p className="text-sm">XL</p>
                  </div>
                  <div
                    className={`w-10 h-10 border border-gray-500 rounded-full flex justify-center items-center ${
                      selectedSize === "XXL" ? "bg-blue-950 text-white" : ""
                    }`}
                    onClick={() => handleSizeClick("XXL")}
                  >
                    <p className="text-sm">XXL</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 grid-rows-2 w-[400px]">
                <div className="flex justify-between">
                  <p className="font-thin text-2xl">
                    USD
                    <span className="discount-price__value">
                      ${product?.price}
                    </span>
                  </p>
                  <div className="flex flex-row gap-3">
                    {product?.featured && (
                      <div className="flex items-start justify-center">
                        <p className="prod_attribute featured">featured</p>
                      </div>
                    )}
                    {product?.newArrivals && (
                      <div className="flex items-start justify-center">
                        <p className="prod_attribute newArrival">new arrival</p>
                      </div>
                    )}
                  </div>
                </div>
                <form action="#" className="flex justify-between">
                  <input
                    type="number"
                    min="1"
                    className="border border-solid w-20 p-[10px] border-#e0e0e0;"
                  />

                  <button
                    type="button"
                    className="px-5  w-[160px] py-3 transition-transform duration-200 ease-in active:scale-[0.9]  text-sm text-white font-bold bg-[#1D3557] rounded"
                  >
                    Add to cart
                  </button>
                </form>
              </div>
            </div>
            <div>
              <div>
                <div className="media-scroller snaps-inline">
                  {similar?.map((item) => {
                    return (
                      <div
                        key={`featured_${item.id}`}
                        className="min-w-[250px]  relative media-element shadow-lg hover:shadow-xl cursor-pointer"
                      >
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
                          <h2 className="text-gray-300 text-center">
                            ${item.price}
                          </h2>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

export default ProductDetails;

{
  /* <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6 lg:col-span-7">

    <main className="container mx-auto py-8">
      {product !== null && (
        <div className="grid grid-cols-12">
          <div className="w-full md:w-8/12 col-span-12 md:col-span-6  lg:col-span-7">

            <Slider {...settings} className="mb-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer overflow-hidden"
                  style={{ aspectRatio: '16/9' }}
                >
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="object-cover w-full rounded-xl h-96 transition-transform transform hover:scale-105"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5  p-4 pl-0">
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-2xl text-red-600 font-bold mr-2">
                €{product.price}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <span className="text-sm text-gray-500">Size:</span>
                <div className="flex ml-2">
                  <div
                    className={`w-10 h-10 border border-gray-500 rounded-full flex justify-center items-center ${
                      selectedSize === "S" ? "bg-blue-950 text-white" : ""
                    }`}
                    onClick={() => handleSizeClick("S")}
                  >
                    <p className="text-sm">S</p>
                  </div>
                  <div
                    className={`w-10 h-10 border border-gray-500 rounded-full flex justify-center items-center ${
                      selectedSize === "M" ? "bg-blue-950 text-white" : ""
                    }`}
                    onClick={() => handleSizeClick("M")}
                  >
                    <p className="text-sm">M</p>
                  </div>
                  <div
                    className={`w-10 h-10 border border-gray-500 rounded-full flex justify-center items-center ${
                      selectedSize === "L" ? "bg-blue-950 text-white" : ""
                    }`}
                    onClick={() => handleSizeClick("L")}
                  >
                    <p className="text-sm">L</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">Color:</span>
                <div className="flex ml-2">
                  <div className="w-6 h-6 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-500 mr-2"></div>
                  <div className="w-6 h-6 rounded-full bg-green-500 mr-2"></div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => increaseCartQuantity(product.id)}
                className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-transparent hover:text-blue-950 hover:border border-blue-950 transition-colors duration-200"
              >
                Add to Cart
              </button>
              <button className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-transparent hover:text-blue-950 hover:border border-blue-950 transition-colors duration-200">
                <Link to="/">Back Home</Link>
              </button>
            </div>
          </div>
        </div>
      */
}
