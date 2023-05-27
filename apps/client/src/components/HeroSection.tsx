const HeroSection = () => {
  return (
    <div className="flex section__margin items-center w-full h-[calc(100vh-168px)] ">
      <div className="relative w-full bg-[#1D3557] h-[73%] overflow-hidden ">
        <div className="hidden lg:flex main-letters-1 absolute h-[294px] leading-[293.5px] tracking-[-30px] top-[-64px] left-[490px] font-extrabold">
          <h1 className="whitespace-nowrap text-[450px] border-text ">
            Tees to
          </h1>
        </div>
        <div className="hidden lg:flex main-letters-2 absolute leading-[293.5px] tracking-[-30px] top-[275px] left-[578px] font-extrabold">
          <h1 className="text-[450px] border-text ">bliss</h1>
        </div>
        <div className="absolute third-letters hidden sm:flex top-[10px] w-[291px] h-[120px] left-[620px] ">
          <h1 className="text-[90px] font-extrabold tracking-tight text-white z-20 ">
            Tees <br /> to <br /> bliss
          </h1>
        </div>
      </div>
      <div className="hidden sm:flex absolute h-[70%] bg-gray-600 left-[80px] rounded-lg">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="figma/hero.png"
          alt=""
        />
      </div>
      <div className="secondary-picture absolute w-[80%] h-[220px] left-[42px] top-[660px] rounded-lg sm:hidden ">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="figma/hero.png"
          alt=""
        />
      </div>
      <div className="secondary-letters w-[219px] h-[120px] absolute top-[320px] left-[60px]  sm:hidden">
        <h2 className="text-[65px] text-[white] leading-[80px] tracking-tight font-extrabold">
          Tees <br /> to <br /> bliss
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;
