import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./assets/components/header";
import Navi from "./assets/components/nav";
import MainList from "./assets/components/main";

function App() {
  return (
    <>
      <div className="flex  flex-wrap content-start h-full overflow-x-hidden">
        <div className="w-full h-[8%] flex justify-center items-center bg-black ">
          <Header />
        </div>
        <div className="w-full h-[8%] flex justify-center bg-white">
          <Navi />
        </div>
        <MainList />
      </div>
    </>
  );
}

export default App;
