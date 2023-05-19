import React, { useState } from 'react'
interface filterProps {
  handleFilterClick: (filterBy: string, price?: number) => Promise<void>
}

const FilterModal: React.FC<filterProps> = ({ handleFilterClick }) => {
  const [showModal, setShowModal] = useState(true)

  function handleFilterModal() {
    setShowModal(!showModal)
  }

  return (
    <div className="mt-4 ">
      {showModal && (
        <div className="">
          <ul className="flex flex-col gap-8">
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault
                  handleFilterClick('All')
                }}
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault
                  handleFilterClick('Featured')
                }}
              >
                Featured
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault
                  handleFilterClick('New Arraivals')
                }}
              >
                New Arraivals
              </button>
            </li>
            <li>
              <select
                name="select"
                id="lang"
                onChange={(e) => {
                  e.preventDefault
                  e.target.value
                  handleFilterClick(e.target.value)
                }}
              >
                <option value="selected">Price</option>
                <option value="All">all</option>
                <option value="Desc">desc</option>
                <option value="Asc">asc</option>
              </select>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
export default FilterModal
