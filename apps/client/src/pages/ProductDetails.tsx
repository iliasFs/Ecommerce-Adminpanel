import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IProduct } from "../types";
import { useShoppingCart } from "../contexts/CartContext";

const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<IProduct>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { increaseCartQuantity } = useShoppingCart();

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

    <main className="container flex flex-col items-center gap-7">
      <div>
        <Link
          to={"/"}
          className="text-sm text-bold flex hover:pointer hover:underline"
        >
          <h1>FOTO</h1>
          <p>Back Home</p>
        </Link>
        <h1 className="text-3xl font-semibold">{product?.name}</h1>
        <div className="flex justify-between">
          <p>${product?.price}</p>
          <span className="flex flex-col items-end">
            <div className="flex">
              <img
                className="h-[20px] w-[20px]"
                src="../../startRating.png"
                alt=""
              />
              <img
                className="h-[20px] w-[20px]"
                src="../../startRating.png"
                alt=""
              />
              <img
                className="h-[20px] w-[20px]"
                src="../../startRating.png"
                alt=""
              />
              <img
                className="h-[20px] w-[20px]"
                src="../../startRating.png"
                alt=""
              />
              <img
                className="h-[20px] w-[20px]"
                src="../../startRating.png"
                alt=""
              />
            </div>
            FREEEE
          </span>
        </div>
      </div>
      <Slider {...settings} className="w-[300px]">
        {product?.images.map((image, index) => (
          <div key={index} className="border rounded">
            <img
              src={image}
              alt={`Product Image ${index + 1}`}
              className=" object-cover w-full h-full rounded"
            />
          </div>
        ))}
      </Slider>

      {/* {product !== null && (
        <div className="grid grid-cols-12 gap-8">
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
      )} */}
    </main>
  );
};

export default ProductDetails;
