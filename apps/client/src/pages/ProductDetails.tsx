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
const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<IProduct>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { increaseCartQuantity, cartItems } = useShoppingCart();

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

  function handleAddClick(product: IProduct): void {
    if (!cartItems.some((obj) => obj.id === product?.id)) {
      increaseCartQuantity(product.id, product.price);
    }
  }

  return (
    <div className="">
      {product && (
        <main className=" w-full h-full ">
          <article className="flex flex-col md:flex-row gap-[100px] w-full   ">
            <section className="">
              <Slider
                {...settings}
                className="xl:m-4 slider h-full md:max-w-[500px]"
              >
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
            <section className="p-1 ">
              <div className="">
                <h1 className="max-w-[300px] text-[2.3rem] md:text-[2.8rem]">
                  {product?.name}
                </h1>
                <p className="product__description">{product?.description}</p>
                <div className="flex flex-col w-full items-center">
                  <div className="w-full items-start flex flex-col gap-2 my-4">
                    <h2 className="choose-size font-semibold">
                      choose one size
                    </h2>
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
                </div>
                <div className=" grid grid-cols-1 grid-rows-2 w-[400px]">
                  <div className="my-2 flex gap-12">
                    <p className="font-thin text-2xl">
                      {"USD "}
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
                          <p className="prod_attribute newArrival">
                            new arrival
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddClick(product)}
                    type="button"
                    className="px-5 my-2 w-[160px] py-3 transition-transform duration-200 ease-in active:scale-[0.9]  text-sm text-white font-bold bg-[#1D3557] rounded"
                    disabled={cartItems.some((obj) => obj.id === product?.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <div>
                <div>
                  <div className="media-scroller snaps-inline"></div>
                </div>
              </div>
            </section>
          </article>
        </main>
      )}
    </div>
  );
};

export default ProductDetails;
