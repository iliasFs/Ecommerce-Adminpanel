import { Link } from "react-router-dom";
const CategorySection = () => {
  return (
    <div className="w-full h-full section__padding section__margin flex flex-col gap-20 items-center justify-center">
      <h1 className="font-bold text-4xl text-center">Picks For Everyone</h1>
      <div className="w-full flex items-center justify-around flex-wrap gap-5">
        <Link
          to="/category/women"
          className="shadow-xl hover:shadow-2xl rounded-xl cursor-pointer"
        >
          <div className="w-full h-full flex flex-col justify-center items-center gap-5">
            <img
              className="w-[360px] h-[292px] rounded-t-xl object-cover"
              src="/figma/women.png"
              alt=""
            />
          </div>
          <div className="w-[360px] h-[68px] rounded-b-xl border-b border-l border-r flex items-center justify-start">
            <h2 className="pl-[20px] text-[20px] font-bold">Women</h2>
          </div>
        </Link>
        <Link
          to="/category/men"
          className="shadow-xl hover:shadow-2xl rounded-xl cursor-pointer"
        >
          <div>
            <img
              className="w-[360px] h-[292px] rounded-t-xl object-cover"
              src="/figma/men.jpg"
              alt=""
            />
          </div>
          <div className="w-[360px] h-[68px] rounded-b-xl border-b border-l border-r flex items-center justify-start">
            <h2 className="pl-[20px] text-[20px] font-bold">Men</h2>
          </div>
        </Link>
        <Link
          to="/category/kids"
          className="shadow-xl hover:shadow-2xl rounded-xl cursor-pointer"
        >
          <div>
            <img
              className="w-[360px] h-[292px] rounded-t-xl object-cover"
              src="/figma/kid.jpg"
              alt=""
            />
          </div>
          <div className="w-[360px] h-[68px] rounded-b-xl border-b border-l border-r flex items-center justify-start">
            <h2 className="pl-[20px] text-[20px] font-bold">Kids</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategorySection;
