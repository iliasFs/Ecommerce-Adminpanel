const HeroSection = () => {
  return (
    <div className=" flex items-center w-full h-[calc(100vh-168px)] ">
      <div className="relative w-full bg-[#1D3557] h-[73%] overflow-hidden ">
        <div className="hidden lg:flex absolute h-[294] leading-[293.5px] tracking-[-37px] top-[-64px] left-[480px] font-extrabold">
          <h1 className="whitespace-nowrap text-[26vw] border-text ">
            Tees to
          </h1>
        </div>
        <div className="hidden lg:flex absolute leading-[293.5px] tracking-[-37px] top-[250px] left-[562px] font-extrabold">
          <h1 className="text-[26vw] border-text ">bliss</h1>
        </div>
        <div className="absolute hidden md:flex top-[60px] md: w-[291px] h-[120px] left-[500px] ">
          <h1 className="text-6xl text-[100px] leading-none font-extrabold tracking-tight text-white ">
            Tees <br /> to <br /> bliss
          </h1>
        </div>
      </div>
      <div className="hidden sm:flex absolute h-[70%] bg-gray-600 left-[80px] rounded-lg">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="../../public/figma/hero.png"
          alt=""
        />
      </div>
      <div className="absolute shrink-0 grow-0 w-[80%] h-[230px] bg-gray-600 left-[42px] top-[480px] rounded-lg sm:hidden ">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="../../public/figma/hero.png"
          alt=""
        />
      </div>
      <div className="w-[219px] h-[120px] absolute top-[225px] left-[60px]  sm:hidden">
        <h2 className="text-[80px] text-[white] leading-[80px] tracking-tight font-extrabold">
          Tees to bliss
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;
