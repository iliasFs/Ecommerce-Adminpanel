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
const NewArrivalsRow = () => {
  const [data, setData] = useState<data[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:8080/new-arrivals')
      .then((response) => setData(response.data))
  }, [])
  return (
    <div className="w-[80%] m-auto">
      <h2 className="text-4xl font-bold pt-4">New Arrivals</h2>
      <div className=" gap-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {data.map((item, index) => (
          <div key={`New-Arrivals-${item.id}`} className=" my-8">
            <div className=" my-4" key={index}>
              <h1>{`${item?.name.slice(0, 30)}...`}</h1>
              <div>
                <img src={item.images[index]} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewArrivalsRow
