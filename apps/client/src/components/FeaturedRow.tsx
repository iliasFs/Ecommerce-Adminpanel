import axios from 'axios'
import { useState, useEffect } from 'react'

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
const FeaturedRow = () => {
  const [data, setData] = useState<data[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:8080/featured-products')
      .then((response) => setData(response.data))
  }, [])
  return (
    <div>
      <h2 className="text-4xl font-bold pt-4">Featured</h2>
      <div className="flex gap-5">
        {data.map((item, index) => (
          <div className="max-w-[120px] my-8" key={index}>
            <h1>{item?.name}</h1>
            <div>
              <img src={item.images[index]} alt="" />
              <button className="border border-black m-2 px-2 py-4 bg-black text-white font-bold ">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedRow
