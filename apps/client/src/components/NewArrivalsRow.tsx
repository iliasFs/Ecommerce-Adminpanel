
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
    <div>
      <h2 className="text-4xl font-bold pt-4">New Arrivals</h2>
      <div className="flex gap-5">
        {data.map((item, index) => (

          <div key={`New-Arrivals-${item.id}`} className="max-w-[120px] my-8">

          <div className="max-w-[120px] my-8" key={index}>

            <h1>{item?.name}</h1>
            <div>
              <img src={item.images[index]} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewArrivalsRow
