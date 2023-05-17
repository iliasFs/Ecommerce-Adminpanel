import axios from 'axios'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Product } from '../types/customTypes'
const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:8002/product/5')
    setProduct(res.data)
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  console.log(product)
  const handleSlideChange = (index: number) => {
    setSelectedImageIndex(index)
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current: number, next: number) => handleSlideChange(next),
  }

  return (
    <main className="h-full w-full p-8 bg-blue-950 text-white">
      {Object.keys(product).length !== 0 && (
        <>
          <section className="w-full h-[60%] flex flex-col md:flex-row justify-between  mb-4">
            <div className="">
              <img
                src={product.images[selectedImageIndex]}
                alt={`Product Image ${selectedImageIndex + 1}`}
                className="rounded"
              />
            </div>
            <aside>
              <div className="flex justify-between">
                <h1 className="text-4xl uppercase">{product.name}</h1>
                <p>€{product.price}</p>
              </div>
              <p className="text-2xl mb-4">{product.description}</p>
              <div className="flex flex-col gap-4 border p-8 mb-4 border-gray-400 ">
                <div className="flex w-full justify-around">
                  <div className="w-16 h-16 border border-gray-500 rounded-full flex justify-center items-center">
                    <p className=" text-lg">S</p>
                  </div>
                  <div className="w-16 h-16 border border-gray-500 rounded-full flex justify-center items-center">
                    <p className=" text-lg">XS</p>
                  </div>
                  <div className="w-16 h-16 border border-gray-500 rounded-full flex justify-center items-center">
                    <p className=" text-lg">M</p>
                  </div>
                </div>
                <div className="flex w-full justify-around gap-4 mb-4">
                  <div className="w-16 h-16 border border-gray-500 rounded-full flex justify-center items-center">
                    <p className=" text-lg">L</p>
                  </div>
                  <div className="w-16 h-16 border border-gray-500 rounded-full flex justify-center items-center">
                    <p className=" text-lg">XL</p>
                  </div>
                  <div className="w-16 h-16 border border-gray-500 rounded-full flex justify-center items-center">
                    <p className=" text-lg">XXL</p>
                  </div>
                </div>
              </div>
              <button className="btn">Add to Cart</button>
            </aside>
          </section>

          <Slider {...settings}>
            <div>
              <img src={product.images[0]} alt="Product Image 1" />
            </div>
            <div>
              <img src={product.images[0]} alt="Product Image 2" />
            </div>
            <div>
              <img src={product.images[0]} alt="Product Image 3" />
            </div>
            <div>
              <img src={product.images[0]} />
            </div>
            <div>
              <img src={product.images[0]} />
            </div>
            <div>
              <img src={product.images[0]} />
            </div>
            <div>
              <img src={product.images[0]} />
            </div>
            <div>
              <img src={product.images[0]} />
            </div>
          </Slider>
        </>
      )}
    </main>
  )
}

export default ProductDetails
