const CategorySection = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold pt-4">For the Family</h2>
      <div className="flex items-center justify-center p-4 m-2">
        <div className="relative mr-2 max-w-[25%]">
          <img src="man.jpg" alt="Image" className="w-full" />

          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded">
            Men
          </button>
        </div>
        <div className="relative mr-2 max-w-[25%]">
          <img src="woman.jpg" alt="Image" className="w-full h-full" />

          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded">
            Women
          </button>
        </div>
        <div className="w-[100%] h-[100%] relative mr-2 max-w-[25%]">
          <img
            src="kid.jpg"
            alt="Image"
            className="w-[100%] h-[100%] object-cover "
          />

          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded">
            Kids
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
