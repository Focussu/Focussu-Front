import React from "react";
import MyRanking from "../MyRanking";

export default function Ranking() {
  return (
    <div className="bg-white border-0 rounded-lg w-full h-full flex flex-col justify-start items-center px-[10px]">
      <div className="w-full font-bold text-[15px] mt-[16px] ml-[25px] flex justify-start">
        내 랭킹
      </div>
      <div className="w-full border-t-1 mt-[10px] mx-[18px]"></div>
      <MyRanking />
    </div>
  );
}
