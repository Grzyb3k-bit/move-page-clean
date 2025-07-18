import { useState } from "react";
import MainList from "./main";

const ListNavi = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const menuItems = ["Popular", "Recent", "Clonenable"];

  return (
    <div className=" max-[800px]:hidden  flex items-center space-x-6 h-full">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)}
          className="relative cursor-pointer h-full flex items-center"
        >
          <p
            className={`text-base ${
              activeIndex === index ? "text-black" : "text-gray-600"
            }`}
          >
            {item}
          </p>
          {activeIndex === index && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
          )}
        </div>
      ))}
    </div>
  );
};

const Navi = () => {
  return (
    <div className="w-[90%] flex justify-between max-[800px]:justify-center h-full">
      <div className="flex flex-row items-center space-x-6 h-full">
        <div className="text-2xl text-black">
          <span>Explore the Showcase</span>
        </div>
        <ListNavi />
      </div>
    </div>
  );
};

export default Navi;
