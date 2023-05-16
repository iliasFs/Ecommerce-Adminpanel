import axios from 'axios'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Product } from '../../types/customTypes'
const ProductDetails: React.FC<Product> = () => {
  const [product, setProduct] = useState([])
  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:8002/product/5')
    setProduct(res.data)
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  console.log(product)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <main className="h-full w-full p-8">
      {Object.keys(product).length !== 0 && (
        <>
          <section className="w-full h-[60%] flex  justify-between mb-4">
            <div>
              <img src={product.images[0]} className="rounded" />
            </div>
            <aside>
              <div className="flex justify-between">
                <h1 className="text-4xl">{product.name}</h1>
                <p>€{product.price}</p>
              </div>
              <p className="text-2xl mb-4">{product.description}</p>
              <div className="flex flex-col gap-4 border p-8 mb-4 border-gray-400">
                <div className="flex w-full justify-around">
                  <div className="w-16 h-16 border border-gray-500 rounded-full flex justify-center items-center">
                    <p className="text-white text-lg">S</p>
                  </div>
                  <div className="w-16 h-16 border border-gray-500 rounded-full flex justify-center items-center">
                    <p className="text-white text-lg">XS</p>
                  </div>
                  <div className="w-16 h-16 border border-gray-500 rounded-full flex justify-center items-center">
                    <p className="text-white text-lg">M</p>
                  </div>
                </div>
                <div className="flex w-full justify-around gap-4 mb-4">
                  <div className="w-16 h-16 border border-gray-500 rounded-full flex justify-center items-center">
                    <p className="text-white text-lg">L</p>
                  </div>
                  <div className="w-16 h-16 border border-gray-500 rounded-full flex justify-center items-center">
                    <p className="text-white text-lg">XL</p>
                  </div>
                  <div className="w-16 h-16 border border-gray-500 rounded-full flex justify-center items-center">
                    <p className="text-white text-lg">XXL</p>
                  </div>
                </div>
              </div>
              <button className="btn">Add to Cart</button>
            </aside>
          </section>

          <Slider
            infinite
            slidesToShow={2}
            slidesToScroll={1}
            speed={500}
            className="slider"
          >
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
