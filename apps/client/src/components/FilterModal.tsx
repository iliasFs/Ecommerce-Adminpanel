interface filterProps {
  handleFilterClick: (filterBy: string, price?: number) => Promise<void>;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  minPrice: number;
}

const FilterModal: React.FC<filterProps> = ({
  handleFilterClick,
  handlePriceChange,
  minPrice,
}) => {
  return (
    <div className="min-w-[360px] xl:min-w-[260px] mb-7 justify-center items-center xl:relative">
      <div className="w-full ">
        <div className="bg-white shadow-md rounded px-8 pb-[0.5px] pt-6">
          <h2 className="text-lg font-semibold mb-4">Product Filters</h2>
          <div className="mb-4 ">
            <label className="block  text-gray-700 text-sm font-semibold mb-2">
              Attribute:
            </label>
            <ul className="flex flex-col  text-gray-700  text-sm font-medium mb-2 border rounded w-full py-2 px-3 leading-tight">
              <li>
                <button
                  className="hover:bg-gray-100 rounded-xl px-3 py-2"
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
                  className="hover:bg-gray-100 rounded-xl px-3 py-2"
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
                  className="hover:bg-gray-100 rounded-xl px-3 py-2"
                  onClick={(e) => {
                    e.preventDefault;
                    handleFilterClick("New Arraivals");
                  }}
                >
                  New Arraivals
                </button>
              </li>
            </ul>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Price Order:
            </label>

            <select
              name="select"
              id="lang"
              className="text-sm font-medium appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => {
                e.preventDefault;
                e.target.value;
                handleFilterClick(e.target.value);
              }}
            >
              <option selected value="All">
                neutral
              </option>
              <option value="Desc">desc</option>
              <option value="Asc">asc</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="price"
            >
              Price Range:
            </label>
            <div className="flex flex-col gap-2 items-center">
              <input
                className="prevent-scroll appearance-none w-full h-1 rounded-full bg-gray-200 "
                type="range"
                min={0}
                max={50}
                onChange={handlePriceChange}
              />
              <label className="text-gray-700">${minPrice}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterModal;
