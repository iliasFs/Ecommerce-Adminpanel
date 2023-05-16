import React, { useState } from "react";
interface filterProps {
  handleFilterClick: (filterBy: string, price?: number) => Promise<void>;
}

const FilterModal: React.FC<filterProps> = ({ handleFilterClick }) => {
  const [showModal, setShowModal] = useState(false);

  function handleFilterModal() {
    setShowModal(!showModal);
  }

  return (
    <div>
      <button onClick={handleFilterModal}>Open Modal</button>
      {showModal && (
        <div className="absolute w-40 inset-0 bg-red-500">
          <ul>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault;
                  handleFilterClick("All");
                }}
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault;
                  handleFilterClick("Featured");
                }}
              >
                Featured
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault;
                  handleFilterClick("New Arraivals");
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
                  e.preventDefault;
                  e.target.value;
                  handleFilterClick(e.target.value);
                }}
              >
                <option value="selected">Price</option>
                <option value="All">all</option>
                <option value="Desc">desc</option>
                <option value="Asc">asc</option>
              </select>
            </li>
          </ul>
          <button onClick={handleFilterModal}>Close</button>
        </div>
      )}
    </div>
  );
};
export default FilterModal;
