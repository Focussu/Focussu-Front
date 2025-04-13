import React from "react";
import MyRanking from "../MyRanking";

export default function Ranking() {
  return (
    <div className="bg-[#FFFFFF] rounded-lg w-[420px] h-[345px]">
      <div className="font-bold text-[15px] mt-[16px] ml-[25px]">내 랭킹</div>
      <div className="w-[380px] border-t-1 mt-[10px] ml-[18px]"></div>
      <MyRanking />
    </div>
  );
}
