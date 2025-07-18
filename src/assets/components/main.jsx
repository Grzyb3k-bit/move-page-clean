import { GrFormView } from "react-icons/gr";
import { FaComments } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import FilmData from "./FilmData";

const MainList = () => {
  const [activeTab, setActiveTab] = useState("Recent");
  const [sortedfilm, setSortedFilm] = useState(FilmData);
  const SortedBycomment = (sortedfilm) => {
    const sorted = [...sortedfilm].sort((a, b) => b.dm - a.dm);
    setSortedFilm(sorted);
  };
  const SortedByview = () => {
    const sorted = [...sortedfilm].sort((a, b) => b.vive - a.vive);
    setSortedFilm(sorted);
  };
  const SortedBylikes = () => {
    const sorted = [...sortedfilm].sort((a, b) => b.likes - a.likes);
    setSortedFilm(sorted);
  };

  return (
    <>
      <div className="w-full h-[8%] flex bg-white">
        <div className="w-[90%] flex items-center mr-auto ml-auto max-[800px]:justify-center">
          <ul className="flex flex-row text-[16px] tracking-wide">
            <li
              onClick={() => {
                setActiveTab("Recent");
                SortedBycomment();
              }}
              className={`p-[10px] pl-0 hover:cursor-pointer ${
                activeTab === "Recent" ? "text-black" : " text-gray-600"
              } `}
            >
              Recent
            </li>
            <li
              onClick={() => {
                setActiveTab("Most Liked");
                SortedBylikes();
              }}
              className={`p-[10px]  hover:cursor-pointer ${
                activeTab === "Most Liked" ? "text-black" : " text-gray-600"
              } `}
            >
              Most Liked
            </li>
            <li
              onClick={() => {
                setActiveTab("Most Viewed");
                SortedByview();
              }}
              className={`p-[10px]  hover:cursor-pointer ${
                activeTab === "Most Viewed" ? "text-black" : " text-gray-600"
              } `}
            >
              Most Viewed
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full flex justify-center items-center  bg-white h-auto">
        <div className="w-[90%] flex flex-row   max-[800px]:justify-center flex-wrap">
          {sortedfilm.map((item, index) => (
            <div
              key={index}
              className="w-[380px] opacity-0 animate-[fadeIn_0.5s_ease_forwards]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-[360px] h-[400px] flex mb-4 flex-wrap">
                <div className="w-full flex-row">
                  <div className="border border-b-cyan-950">
                    <div>
                      <img className="h-[300px] w-full" src={item.bg} alt="" />
                    </div>
                    <div className="flex justify-start flex-row h-[40px] items-center p-2">
                      <div className="mr-2 flex items-center">
                        <GrFormView className="w-[20px] h-[40px]mr-1" />
                        <span>{item.vive}</span>
                      </div>
                      <div className="mr-2 flex items-center">
                        <FaComments className="w-[20px] h-[20px]mr-1" />
                        <span>{item.dm}</span>
                      </div>
                      <div className="mr-2 flex items-center">
                        <FaHeart className="w-[20px] h-[20px] mr-1" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[50px] flex flex-row items-center justify-start mt-2">
                    <img
                      className="w-[40px] h-[40px] rounded-full bg-black"
                      src={item.img}
                      alt=""
                    />
                    <div className="ml-2.5">
                      <p>{item.title}</p>
                      <p>
                        by
                        <a className="text-blue-500" href="#">
                          <span> {item.creator}</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default MainList;
