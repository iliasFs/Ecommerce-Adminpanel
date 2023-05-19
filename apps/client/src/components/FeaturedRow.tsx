import axios from 'axios'
import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import { useShoppingCart } from '../contexts/CartContext'
import { IProduct } from '../types'

interface data {
  id: number
  name: string
  price: number
  size: string
  images: string[]
  description: string
  stockQuantity: number
  featured: boolean
  newArrivals: boolean
}

const FeaturedRow = ({ id }: IProduct) => {
  const [data, setData] = useState<data[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:8080/featured-products')
      .then((response) => setData(response.data))
  }, [])

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseItemQuantity,
    removeFromCart,
  } = useShoppingCart()

  const CustomPrevArrow = (props: any) => (
    <div
      className="slick-prev "
      style={{
        ...props.style,
        display: 'block',
        left: '0',
        zIndex: 1,
      }}
      onClick={props.onClick}
    />
  )

  const CustomNextArrow = (props: any) => (
    <div
      className="slick-next custom-arrow"
      style={{
        ...props.style,
        display: 'block',
        right: '0',
        zIndex: 1,
      }}
      onClick={props.onClick}
    />
  )

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  }

  return (
    <div className="w-[80%] h-[80%] m-auto">
      <h2 className="text-4xl font-bold pt-4 mb-4">Featured</h2>

      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item, index) => (
          <div className="my-2 w-full" key={`featured-row-${item.id}`}>
            <h1>{`${item?.name.slice(0, 30)}...`}</h1>
            <h3>{getItemQuantity(item.id)}</h3>

            <div className="relative mb-40" style={{ height: '250px' }}>
              <Slider {...settings}>
                {item.images.map((image, index) => (
                  <div key={index} className="h-full">
                    <img
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      className="object-cover rounded "
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 transition-opacity  bg-black hover:opacity-40">
                      <button
                        onClick={() => increaseCartQuantity(item.id)}
                        className="text-white font-bold p-2 text-4xl"
                      >
                        +
                      </button>
                      <button
                        onClick={() => decreaseItemQuantity(item.id)}
                        className="text-white font-bold p-2 text-4xl"
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedRow
